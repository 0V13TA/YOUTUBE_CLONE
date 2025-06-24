import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../schema/user";

export const userResolvers = {
  Mutation: {
    async updateUser(_: any, { input }: any, context: any) {
      const authUser = context.req.user;
      if (!authUser) throw new Error("Unauthorized");

      const { username, avatarUrl, bio } = input;
      const updatedUser = await db
        .update(users)
        .set({ username, avatarUrl, bio })
        .where(eq(users.id, authUser.id))
        .returning()
        .then((res) => res[0]);

      if (!updatedUser) throw new Error("User not found");
      return updatedUser;
    },
    async deleteUser(parent: any, args: any, context: any) {
      const authUser = context.req.user;
      if (!authUser) throw new Error("Unauthorized");

      await db.delete(users).where(eq(users.id, authUser.id));
      return true;
    }
  }
};
