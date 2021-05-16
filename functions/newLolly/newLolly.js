const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
const shortid = require("shortid");
require("dotenv").config();

const typeDefs = gql`
type Query {
  hello: String!
}
type Lolly {
  c1: String!
  c2: String!
  c3: String!
  sender: String!
  msg: String!
  receiver: String!
  lollyPath: String!
}
type Mutation{
  addLolly ( c1: String!, c2: String!, c3: String!, sender: String!, msg: String!, receiver: String!): Lolly,
}
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello, Lolly!'
    },
  },
  Mutation : {
    addLolly: async (_, args) => {
      
      const client = new faunadb.Client({secret: process.env.FAUNADB_SECRET});
      const id = shortid.generate();
      args.lollyPath = id

      const result = await client.query(
        q.Create(q.Collection("lolly"), {
          data: args
        })
      );

      return result.data
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()