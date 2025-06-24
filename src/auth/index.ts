import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

import { db } from "../db";
import { users } from "../schema/user";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
  console.error(
    "Environment variables GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL must be set."
  );
  process.exit(1);
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in the database
        const existingUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.googleId, profile.id)
        });

        if (existingUser) return done(null, existingUser);

        if (!profile.emails) throw new Error("Email address is required");

        // If user does not exist, create a new user
        const userData = {
          googleId: profile.id,
          email: profile.emails ? profile.emails[0].value : "",
          username: profile.username ?? (profile.displayName || ""),
          fullname: profile.displayName,
          avatar: profile.photos ? profile.photos[0].value : ""
        };

        const newUser = await db
          .insert(users)
          .values(userData)
          .returning()
          .then((res) => res[0]);

        return done(null, newUser);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
      }
    }
  )
);
