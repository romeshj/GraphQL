const { buildSchema } = require('graphql');
const { coursesData } = require('../data/data1');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
	type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);



const getCourse = (args) => { 
    const id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

const getCourses = (args) => {
    if (args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

const updateCourseTopic = ({id, topic}) => {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id) [0];
}

const root = {
    course: getCourse,
    courses: getCourses,
	updateCourseTopic: updateCourseTopic
};

module.exports = { schema,  root}
