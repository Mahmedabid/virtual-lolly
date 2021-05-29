const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();
// const axios = require("axios");
const shortid = require("shortid");

const typeDefs = gql`
type Query {
  allLolly : [Lolly!]
  getLolly(path:String!) : Lolly
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

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const resolvers = {
  Query: {
    getLolly: async (_, { path }) => {
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index("lolly_path"), path))
        );

        return result.data
      }
      catch (error) {
        console.log('specific lolly', error);
      }
    },
    allLolly: async (_, args) => {
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index('lollies')))
        );

        return result.data
      } catch (error) {
        console.log('all lollies', error);
      }
    },
  },
  Mutation: {
    addLolly: async (_, args) => {
      try {
        const id = shortid.generate();
        args.lollyPath = id;
        const result = await client.query(
          q.Create(q.Collection("lolly"), {
            data: args
          })
        );
        // axios
        //   .post(
        //     "https://api.netlify.com/build_hooks/60a20faca9d48696f31f63c3"
        //   )
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
        console.log(result);
        return result.data
      }
      catch (error) {
        console.log(error);
      }

    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler();
// exports.handler = server.createHandler({
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });