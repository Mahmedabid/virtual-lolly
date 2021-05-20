module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "allLolly",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "allLolly",
        // Url to query from
        url: `https://ahm-vlolly.netlify.app/.netlify/functions/newLolly`,
      },
    },
  ],
};