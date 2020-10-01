const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./schema/schema1');

// Create an express server and a GraphQL endpoint
const PORT = 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.use('/', (req, res) => res.send('GQL Server.....'));

app.listen(PORT, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

/* 

query getSingleCourse($courseID: Int!) {
  course(id: $courseID) {
    title
    author
    description
    topic
    url
  }
}

In QUERY VARIABLES Section : 
{ 
    "courseID":1
}

-------------

Using Aliases & Fragments

query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) {
             ...courseFields
      },
      course2: course(id: $courseID2) {
            ...courseFields
      } 
}
fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

In QUERY VARIABLES Section : 
{ 
    "courseID1":1,
    "courseID2":2
}

// A mutation operation is defined by using the mutation keyword followed by the name of the mutation operation. 
// In the following example the updateCourseTopic mutation is included in the operation and again we’re making use of the courseFields fragment.

mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

In QUERY VARIABLES Section : 
{
  "id": 1,
  "topic": "JavaScript"
}
*/
