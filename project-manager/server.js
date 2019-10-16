const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) =>{

    const { id, title } = req.body;

    projects.push({'id': id, 'title': title });

    return res.json(projects);
});

server.put('/projects/:id/tasks', (req, res) =>{

    const { id } = req.params;
    const { title } = req.body;

    index = getIndexById(id);
    projects[index].tasks.push(title);

    return res.json(projects[index]);
});

server.put('/projects/:id', (req, res) =>{

    const { id } = req.params;
    const { title } =  req.body;
    const index = getIndexById(id);

    projects[index].title = title;

    return res.json(projects[index]);
});

server.get('/projects', (req, res) =>{
    return res.json(projects);
});

server.get('/projects/:id', (req, res) =>{

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

server.listen(3000, () =>{
    console.log("App's running on port 3000");
});