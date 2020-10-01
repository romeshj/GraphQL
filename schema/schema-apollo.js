//import { ApolloServer, gql } from 'apollo-server-express';
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
	type Project {
		id: Int!
		name: String!
		tasks: [Task]
	}
	type Task {
		id: Int!
		title: String!
		project: Project
		completed: Boolean!
	}
	type Query {
		projectByName(name: String!): Project
		fetchTasks: [Task]
		getTask(id: Int!): Task
		getTaskByProjectId(id: Int!) : [Task]
		getProjectByProjectIdFromTask(id: Int!) : Project
	}
	type Mutation {
		markAsCompleted(taskID: Int!): Task
	}
`;

const SERVER = new ApolloServer({
	typeDefs,
	resolvers,
	playground : {
		endpoint : `http://localhost:3000/graphql`,
		settings : {
			'editor.theme' : 'light'
		}
	}
})

module.exports = SERVER;

/*

{
  projectByName(name: "Learn React Native") {
	id
	name
  }
}

{
	fetchTasks{
		title
	    completed
	}
}

{
	getTask(id : 2){
		title
	    completed
	}
}

mutation{
    markAsCompleted(taskID: 2){
      title
      completed
    }
  }
  
{
	 getProjectByProjectIdFromTask(id: 3){
	  name
	}
}

{
	getTaskByProjectId(id: 3){
		title
	}
}
*/