const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInputObjectType, GraphQLSchema } = graphql;
const _ = require('lodash');

const { books,authors } = require('../data');

//console.log(books);
//console.log(authors)

const BookType = new GraphQLObjectType({
	name : 'Book',
	fields: () => ({
		bid : { type : GraphQLID },
		name : { type : GraphQLString },
		genre : { type : GraphQLString },
		author : {
			type : new GraphQLList(AuthorType),
			resolve(parent, args){
				//console.log(" AUTHORS " , parent,  parent.authorId, _.filter(authors, { aid: parent.authorId }))
				// code to get author by book id
				return _.filter(authors, { aid: parent.authorId })
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name : 'Author',
	fields: () => ({
		aid : { type : GraphQLID },
		name : { type : GraphQLString },
		age : { type : GraphQLInt },
		books : {
			type : new GraphQLList(BookType),
			resolve(parent, args){
				//console.log(" BOOKS " , parent,  parent.aid, _.filter(books, { authorId: parent.aid }))
				// code to get author by book id
				return _.filter(books, { authorId: parent.aid })
			}
		}
	}) 
});

const inputBookType = new GraphQLInputObjectType({
    name: 'BookInput',
    fields: () =>({
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        bid: { type: GraphQLID },
        authorId: { type: GraphQLID }

    })
});

const mutationType = new GraphQLObjectType({
	name : 'BookMutation',
	fields: {
		addBook : {
			type : new GraphQLList(BookType),
			args : {
				input : {type : inputBookType}
			},
			resolve: (parent, args) => {
				let b = {
					name : args.input.name, 
					genre : args.input.genre,
					bid : args.input.bid,
					authorId : args.input.authorId
				}				
				books.push(b)
               return books
            }
		},
		removeBook : {
			type : new GraphQLList(BookType),
			args : { id : { type : GraphQLString} },
			resolve: (parent, args) => {
				_.remove(books, (b) => b.bid === args.id);
				return books
			}
		},
		updateBookName : {
			type : new GraphQLList(BookType),
			/*args : { 
				id : { type : GraphQLString},
				name : { type : GraphQLString}
			},*/
			
			args : {
				input : {type : inputBookType}
			},
			
			resolve: (parent, args) => {
				books.map(book => {
					if(book.bid === args.input.bid){book.name = args.input.name; return book;}
				})
				//console.log(books)
				return books
			}
		}
	}
});


const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	fields : {
		book : {
			type : BookType,
			args : { id : { type : GraphQLString} },
			resolve(parent, args){
				// code to get book by id
				return _.find(books, { bid: args.id })
			}
		},
		books : {
			type : new GraphQLList(BookType),
			resolve(parent, args){
				// code to get all books
				return books
			}
		},
		author : {
			type : AuthorType,
			args : { id : { type : GraphQLString} },
			resolve(parent, args){
				// code to get author by id
				return _.find(authors, { aid: args.id })
			}
		},
		bookname : {
			type : new GraphQLList(BookType),
			args : { name : { type : GraphQLString} },
			resolve(parent, args){
				// code to get book by name
				//console.log(args.name)
				//console.log(books.filter(book => book.name === args.name))
				return books.filter(book => book.name == args.name);
			}
		}
		
		
		
	}
});

module.exports = new GraphQLSchema({
	query : RootQuery,
	mutation : mutationType
});

/*
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

get author by id
{  
  author(id: "2"){
    books{
		name
	}
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


 */