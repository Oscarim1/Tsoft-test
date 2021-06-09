const express = require('express');
const app = express();
const utils = require('./utils/task-schema.js')

//para que express soporte json
app.use(express.json());

const tasks = [
    {
        id: 1,
        name: "Ejemplo 1",
        state: "Pendiente",
        completed: false
    },
    {
        id: 2,
        name: "Ejemplo 2",
        state: "Pendiente",
        completed: false
    },
    {
        id: 3,
        name: "Ejemplo 3",
        state: "Pendiente",
        completed: false
    }
];

//GET
app.get("/api/tasks" , (request, response) => {
    response.send(tasks);
});

//GET (BY ID)
app.get("/api/tasks/:id" , (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) {
        return response.status(404).send("El ejemplo con ese identificador no existe.");
    }
    
    response.send(task);
});

//POST
app.post("/api/tasks", (request, response) => {
    //para validar el esquema que traera 
    const { error } = utils.validateTask(request.body);

    if(error) 
    {
        return response.status(400).send("El nombre debe ser mas largo que 3 caracteres")
    }
    const task = {
        id: tasks.length + 1,
        name: request.body.name,
        state: request.body.state,
        completed: request.body.completed
    };

    tasks.push(task);
    response.status(201).send(task);
});

//PUT
app.put("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) {
        return response.status(404).send("El ejemplo con ese identificador no existe.");
    }
   
    const { error } = utils.validateTask(request.body);

    if(error){
        return response.status(400).send("El nombre debe ser mas largo que 3 caracteres!")
    }
    task.name = request.body.name;
    task.state = request.body.state;
    task.completed = request.body.completed;

    response.send(task);
});

//PATCH
app.patch("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) {
        return response.status(404).send("El ejemplo con ese identificador no existe.");
    }
    

    const { error } = utils.validateTask(request.body);

    if(error){
        return response.status(400).send("El estado debe ser mas largo que 3 caracteres!");
    }
    task.state = request.body.state;

    if(request.body.completed) {
        task.completed = request.body.completed;
    }
    response.send(task);
});

//DELETE
app.delete("/api/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task){
        return response.status(404).send("El ejemplo con ese identificador no existe.");
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    response.send(task);
});

//Para iniciar el servidor
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));
