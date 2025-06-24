import { mergeTypeDefs } from "@graphql-tools/merge";

import { userTypeDefs } from "./user.typedef";

export const typeDefs = mergeTypeDefs([
  userTypeDefs
  // Add other type definitions here as needed
]);
