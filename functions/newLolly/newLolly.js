const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();
const shortid = require("shortid");

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const typeDefs = gql`
type Query {
  lolly: [Lolly!]
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
  addLolly( 
    c1: String!,
    c2: String!,
    c3: String!,
    sender: String!,
    msg: String!,
    receiver: String!,
    lollyPath: String!): Lolly,
}
`

const resolvers = {
  Query: {
    lolly: () => [{c1: 'asd', c2: 'sad', c3: 'qe', msg: 'qqewe', receiver: 'asdqwe', sender: '13', lollyPath: '12324'}] 
  },
  Mutation: {
    addLolly: async(_, args) => {
      
      const id = shortid.generate();
      args.lollyPath = id;

      const results = await client.query(
        q.Create(q.Collection("lolly"), {
          data: args,
        })
      );

      console.log('result', result);
      console.log('result', result.data);
      return results.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
