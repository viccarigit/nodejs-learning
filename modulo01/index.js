const express = require('express');

const server = express();
server.use(express.json());

server.use((req, res, next) =>{
    console.log(`Req. enviada: ${req.method} URL: ${req.url} Body: ${JSON.stringify(req.body)}`)
    console.time('method_req');

    next();

    console.timeEnd('method_req');
});

const users = ['Usuario 1', 'Usuario 2', 'Usuario 3'];

// Query params: ?teste=1
// Route params: /users/1
// Request body: {"name": "Eduardo", "email": "teste@teste.com"} // normalmente utilizado nos metodos PUT e POST

// CRUD: create, read, update, delete

/**
 * middlawere
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkUserParam(req, res, next){

    if(!req.body.name){
        return res.status(400).json({error: 'User name is required'});
    }

    return next();
}

/**
 * middlawere
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkUserInArray(req, res, next){

    const user  = users[req.params.index];

    if(!user){
        return res.status(404).json({error: 'User does not exists'})
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) =>{

    return res.json(users);
});

server.get('/users/:index', checkUserInArray,(req, res) =>{

    res.json({message: `Hello user  ${req.user}`});
});

server.post('/users', checkUserParam, (req, res) =>{

    const { name } = req.body;
    users.push(name);

    return res.json(users);
})

server.put('/users/:index', checkUserParam, checkUserInArray, (req, res) =>{

    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

server.delete('/users/:index', (req, res) =>{

    const { index } = req.params;

    users.splice(index, 1);

    return res.json(users);
});

server.listen(3000, () =>{

    console.log('App running on port 3000');
});