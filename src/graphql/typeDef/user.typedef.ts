export const userTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    googleId: String!
    email: String!
    username: String!
    fullname: String!
    avatarUrl: String
    bio: String
    createdAt: DateTime!
  }

  input UserInput {
    googleId: String!
    email: String!
    username: String!
    fullname: String!
    avatarUrl: String
    bio: String
  }

  input UpdateUserInput {
    username: String
    avatarUrl: String
    bio: String
  }

  type Mutation {
    deleteUser(id: ID!): Boolean!
    updateUser(id: ID!, input: UpdateUserInput!): User
  }
`;
