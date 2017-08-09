// construct database schematic using GraphQL's shorthand schema notation
// learn GraphQL shorthand notation : https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6

import { buildSchema } from 'graphql'

/** GraphQL schemas expressed in shorthand notation */
const schema = buildSchema(`
  # Custom scalar representing urls
  scalar Url

  # Custom scalar representing date & time
  scalar Time

  # Profile avatar
  type Avatar {
    imageUrl: Url!
  }

  # Registered account
  interface Account {
    id: ID!
    firstName: String
    lastName: String
    is_online: Boolean!
    lastOnline: Time!
    avatar: Avatar
  }

  # Default user
  type User implements Account {
    id: ID!
    firstName: String
    lastName: String
    is_online: Boolean!
    lastOnline: Time!
    avatar: Avatar
    imamQuestions: [ImamQuestion]!
    reputation: Int
    bookmarks: [Bookmark]!
  }

  # People who like banning
  type Moderator implements Account {
    id: ID!
    firstName: String
    lastName: String
    is_online: Boolean!
    lastOnline: Time!
    avatar: Avatar
    usersBanned: [User]!
  }

  # User-submitted message enclosed into a block containing the user's details and the date and time it was submitted contained in Threads
  type Post {
    poster: User!
    message: String!
    whenSubmitted: Time!
    upvotes: Int!
    downvotes: Int!
  }

  # Collection of posts
  interface Thread {
    title: String
    description: String
    originalPoster: User!
    whenSubmitted: Time!
    is_anonymous: Boolean
    replies: [Post]!
    lastUpdated: Time
  }

  # Question asked to the Imaam
  type ImamQuestion implements Thread {
    title: String
    description: String
    originalPoster: User!
    whenSubmitted: Time!
    is_anonymous: Boolean
    replies: [Post]!
    lastUpdated: Time
    is_answered: Boolean
  }

  # The imam of the masjid
  type Imam implements Account {
    id: ID!
    firstName: String
    lastName: String
    is_online: Boolean!
    lastOnline: Time!
    avatar: Avatar
    questions: [ImamQuestion]!
  }

  # Thread that a user is subscribed to / following
  type Bookmark {
    subscribedThread: Thread!
    lastRead: Time!
    # Whether the user who owns the bookmark has read all of thread's updates
    is_read: Boolean!
  }

  # Root Query
  type RootQuery {
    me: User
    allUsers: [User]!
  }

  # Root Mutation
  type RootMutation {
    # create a user
    createUser(firstName: String!): User!
  }

  # Schema configuration
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

export default schema
