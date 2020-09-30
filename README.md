# GraphQL
Graph Ql query and mutations using express, graphql, graphql-express, lodash

In package.json, in scripts section I have added - 
"scripts": {
	"start" : "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

Naviagte to root folder in command prompt. Run npm start

open http://localhost:3000 to check if server is running.
open http://localhost:3000/gql to open graphQl IDE in browser.

Query and Mutation to test the graphql endpoints
get book by id
{
  book(id: "1"){    
    bid
    name
    genre
  }
}

get book by name
{
  bookname(name: "ReactJs"){    
    bid
    name
    genre
  }
}

get all books
query {
  books{    
    bid
    name
    genre
    author{
      name
    }
  }
}

get author by id
{  
  author(id: "2"){
    age
    name
  }
}

// add book
mutation {
	addBook(input : {name: "NodeJs", genre: "Technology" ,bid:"7", authorId: "3"}) {
	 bid
    name
    genre
    author{
      name
    }
	}
}

// update book
mutation {
	updateBookName(input : {id:"3", name: "ReactJs"}) {
	 bid
    name
    genre
    author{
      name
    }
	}
}

// remove book
mutation {
	removeBook(id:"7") {
	 bid
	}
}

