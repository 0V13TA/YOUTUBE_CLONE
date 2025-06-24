import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDef";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

if (!PORT || !secretKey) {
  console.error("Environment variables PORT and SECRET_KEY must be set.");
  process.exit(1);
}

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({
        req,
        res
      }: {
        req: express.Request;
        res: express.Response;
      }) => ({
        req,
        res
      })
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
