const projects = [
	{ id: 1, name: 'Learn React Native' },
	{ id: 2, name: 'Workout' },
	{ id: 3, name: 'Learn GraphQL' },
];

const tasks = [
	{ id: 1, title: 'Install Node', completed: true, projectID: 1 },
	{ id: 2, title: 'Install React Native CLI:', completed: false, projectID: 1 },
	{ id: 3, title: 'Install Xcode', completed: false, projectID: 1 },
	{ id: 4, title: 'Morning Jog', completed: true, projectID: 2 },
	{ id: 5, title: 'Visit the gym', completed: false, projectID: 2 },
	{ id: 6, title: 'Install Apollo Server Express', completed: false, projectID: 3 },
	{ id: 7, title: 'Install Express', completed: false, projectID: 3 }
];

module.exports = { projects, tasks };