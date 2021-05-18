const path = require("path");
const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config();
// var client = new faunadb.Client({
//     secret: process.env.FAUNADB_SECRET,
//   });
//   async function asd(){
//     const result = await client.query(
//         q.Get(q.Ref(q.Collection('lolly'), "298774386378277389"))
//       );
//       console.log(result);
//   }
// const result = await client.query(
//     q.Map(
//       q.Paginate(q.Match(q.Index("lollies"))),
//       q.Lambda((x) => q.Get(x))
//     )
//   );
//   result.data.forEach((lolly) => {
//     console.log(lolly.data.c1);
//   })
//     }
//   asd();

  
exports.createPages = async ({ graphql, actions }) => {

    try {
        var client = new faunadb.Client({
            secret: process.env.FAUNADB_SECRET,
          });
          const result = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("lollies"))),
              q.Lambda((x) => q.Get(x))
            )
          );
            
          result.data.forEach((lolly) => {
            actions.createPage({
              path: `lolly/${lolly.data.lollyPath}`,
              component: require.resolve(`./src/components/LollyPage.tsx`),
              context: {
                lollyPath: lolly.data.lollyPath,
              },
            });
          });
        }
    catch(error) {
        console.log(error);
    }
}