const express = require('express');
const server = express();
var count = 0;

server.use(express.json());

/**
 * middleware to count all reqs from client
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
*/
server.use((req, res, next) =>{

    console.log(`Total reqs count: ${++count}`);
    return next();
});

const projects = [];

/**
 * creates a new project on array
 * @param {*} req 
 * @param {*} res 
 */
server.post('/projects', (req, res) =>{

    const { id, title } = req.body;

    projects.push({'id': id, 'title': title, tasks: []});

    return res.json(projects);
});

/**
 * add a new task on specific project
 * @param {*} req 
 * @param {*} res 
*/
server.put('/projects/:id/tasks', checkIdIfExists, (req, res) =>{

    const { id } = req.params;
    const { title } = req.body;

    index = getIndexById(id);
    projects[index].tasks.push(title);

    return res.json(projects[index]);
});

/**
 * change project's name by id
 */
server.put('/projects/:id', checkIdIfExists, (req, res) =>{

    const { id } = req.params;
    const { title } =  req.body;
    const index = getIndexById(id);

    projects[index].title = title;

    return res.json(projects[index]);
});

server.get('/projects', (req, res) =>{
    return res.json(projects);
});

server.get('/projects/:id', checkIdIfExists, (req, res) =>{

    const { id } = req.params;

    return res.json(getProjectById(id));
});

/**
 * get object instance by id
 * @param {*} id 
 */
function getProjectById(id){

    const project = projects.filter((element) =>{
        return element.id === id;
    });

    return project;
}

/**
 * get index from the sended id
 * @param {*} id 
 */
function getIndexById(id){

    var index = undefined;

    for(let i = 0; i < projects.length; i++){
        if(id === projects[i].id){
            index = i;
            break;
        }
    }

    return index;
}

/**
 * middlewere to verify if Id exists on array
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkIdIfExists(req, res, next){

    const { id } = req.params;
    const index = getIndexById(id);

    if(index !== undefined){
        return next();
    }

    return res.status(404).json({error: 'Project not founded'});
}

server.listen(3000, () =>{
    console.log("App's running on port 3000");
});