const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const PORT = 3000;
const app = express();

app.use('/gql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.use('/', (req, res) => res.send('GQL Server.....'));

app.listen(PORT, () => {
  console.log(`GraphQl server is listening on port ${PORT}`);
});