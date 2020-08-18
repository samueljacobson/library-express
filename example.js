const express = require('express');
const app = express();

app.use(express.json()); // adds middleware

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => { // path, callback (route handler) - request, response
    res.send('Hello, world!');
});

// endpoint to get all courses
app.get('/api/courses', (req, res) => {
    // res.send([1, 2, 3]);
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1, // would come from db if connected
        name: req.body.name
    };
    courses.push(course);
    res.send(course);   // return object in body of response
});

// endpoint to get single course
app.get('/api/courses/:id', (req, res) => { // id is parameter
    // res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id)); //req.params.id returns string, need to parse to bool
    if (!course) res.status(404).send('The course with the given ID was not found.') // 404 - object not found
    res.send(course);
});

app.get('/api/courses/:year/:month', (req, res) => { 
    // res.send(req.params); // return all params
    res.send(req.query);
});
// ?sortBy=name - query string parameter

const port = process.env.PORT || 4000   // export PORT=6000
app.listen(port, () => console.log(`Listening on port ${port}...`));