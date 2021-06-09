let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Probando la API', () =>{
    /**Metodo GET */
    describe("GET /api/task", () =>{
        it("Deberia realizar un GET de todos los ejemplos", (done) =>{
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                done();
                })
        })

        it("Deberia no poder realizar un GET de los ejemplos", (done) =>{
            chai.request(server)
            //Error inducido en task
                .get("/api/task")
                .end((err, response) =>{
                    response.should.have.status(404);
                    
                done();
                });
        });
    });
    /**Metodo POST */
    describe("POST /api/task", () =>{
        it("Deberia realizar POST de un nuevo ejemplo", (done) =>{
            /**Se genera un objeto task que contiene nombre, estado y completado 
             * @type {{name:string, state: string, completed: boolean}}
            */
            const task ={
                name: "Ejemplo 4",
                state: "Pendiente",
                completed: false
            }
            chai.request(server)
                .post("/api/tasks")
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq("Ejemplo 4");
                    response.body.should.have.property('state').eq("Pendiente");
                    response.body.should.have.property('completed').eq(false);
                done();
                });
        });

        it("Deberia no poder realizar POST de un nuevo ejemplo", (done) =>{
            /**Se genera un objeto task
             *  @type {{state: string, completed: boolean}}
             */
            const task ={
                //Error inducido al no enviar el name
                //name: "Ejemplo 4",
                state: "Pendiente",
                completed: false
            }
            chai.request(server)
                .post("/api/tasks")
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(400);
                    response.text.should.be.eq("El nombre debe ser mas largo que 3 caracteres");
                done();
                });
        });
    });
    /**Metodo PUT */
    describe("PUT /api/task:id", () =>{
        it("Deberia realizar un PUT de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API
             *  @type {number}
             */
            const taskId = 1;
            /**Se genera un objeto task
             *  @type {{name:string, state: string, completed: boolean}}
            */
            const task ={
                name: "Ejemplo 1 update",
                state: "Completado",
                completed: true
            }
            chai.request(server)
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Ejemplo 1 update");
                    response.body.should.have.property('state').eq("Completado");
                    response.body.should.have.property('completed').eq(true);
                done();
                });
        });
        it("Deberia no poder realizar un PUT de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API
             * @type {number}
             */
            const taskId = 1;
            /**Se genera un objeto task
             * @type {{name:string, state: string, completed: boolean}}
            */
            const task ={
                //Error inducido al no enviar el name
                name: "Ej",
                state: "Completado",
                completed: true
            }
            chai.request(server)
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(400);
                    response.text.should.be.eq("El nombre debe ser mas largo que 3 caracteres!");
                done();
                });
        });
    });
    /**Metodo PATCH */
    describe("PATCH /api/task:id", () =>{
        it("Deberia realizar un PATCH (estado) de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API 
             * @type {number}
            */
            const taskId = 1;
            /**Se genera un objeto task
             * @type {{name:string, state: string}}
            */
            const task ={
                name: "Ejemplo 1 state",
                state: "Completado"
            }
            chai.request(server)
                .patch("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('state').eq("Completado");
                    response.body.should.have.property('completed').eq(true);
                done();
                });
        });
        it("Deberia no poder realizar un PATCH (estado) de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API 
             * @type {number}
            */
            const taskId = 1;
            /**Se genera un objeto task
             * @type {{name:string, state: string}}
            */
            const task ={
                name: "Ejemplo 1 state",
                state: "Co"
            }
            chai.request(server)
                .patch("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) =>{
                    response.should.have.status(400);
                    response.text.should.be.eq("El estado debe ser mas largo que 3 caracteres!");
                done();
                });
        });
        
    });
    /**Metodo Delete */
    describe("DELETE /api/task:id", () =>{
        it("Deberia realizar un Delete de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API 
             * @type {number}
            */
            const taskId = 1;
            chai.request(server)
                .delete("/api/tasks/" + taskId)
                .end((err, response) =>{
                    response.should.have.status(200);
                done();
                });
        });
        it("Deberia no poder realizar un Delete de un ejemplo", (done) =>{
            /** Esta es una variable para almacenar el id proveniente de la API 
             * @type {number}
            */
            const taskId = 166;
            chai.request(server)
                .delete("/api/tasks/" + taskId)
                .end((err, response) =>{
                    response.should.have.status(404);
                    response.text.should.be.eq("El ejemplo con ese identificador no existe.");
                done();
                });
        });               
    });
});