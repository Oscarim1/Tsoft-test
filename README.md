# Tsoft-test
Proyecto de testing automatizado de 5 test de aceptación para la empresa Tsoft 

### Introducción
Se realizaron 5 test de aceptación con el fin de construir un proyecto de automatización de pruebas, para optar a una oferta laboral.

### construcción
* [Node.js](https://nodejs.org/es/)
* [NPM](https://www.npmjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Express](https://expressjs.com/es/)
* [Visual Studio Code](https://code.visualstudio.com/)

### Pre-requisitos
Necesitar tener instalado Node.js, lo puedes descargar de acá

  * [Node.js](https://nodejs.org/es/)

Tambien necesitarás tener instalado Visual Studio Code

* [Visual Studio Code](https://code.visualstudio.com/)

### Instalación
1. Clona el repositorio

   ``` sh
   git clone https://github.com/Oscarim1/Tsoft-test.git
   ```
2. Instalacion de dependencias

   ``` sh
   npm install
   ```
### Ejecutando las pruebas
Dentro del proyecto, abrimos la terminal e ingresamos el siguiente comando

  ``` sh
   npm test
   ```
### Análisis de las pruebas
Las pruebas verifican la funcionalidad de una API REST, donde se probarán los siguientes métodos.

  ``` sh
   GET-POST-PUT-PATCH-DELETE
   ```

Se visualizará explícitamente si la prueba paso con éxito o hubo un fallo inducido, este sera el formato.
``` sh
    GET /api/task
      ✔ Deberia realizar un GET de todos los ejemplos
      ✔ Deberia no poder realizar un GET de los ejemplos
    POST /api/task
      ✔ Deberia realizar POST de un nuevo ejemplo
      ✔ Deberia no poder realizar POST de un nuevo ejemplo
    PUT /api/task:id
      ✔ Deberia realizar un PUT de un ejemplo
      ✔ Deberia no poder realizar un PUT de un ejemplo
    PATCH /api/task:id
      ✔ Deberia realizar un PATCH (estado) de un ejemplo
      ✔ Deberia no poder realizar un PATCH (estado) de un ejemplo
    DELETE /api/task:id
      ✔ Deberia realizar un Delete de un ejemplo
      ✔ Deberia no poder realizar un Delete de un ejemplo
   ```
    
### Reportes
Para los reportes se utilizo Mochawesome, logrando con esto generar reportes automaticos despues de cada testeo.

### Posibles errores
Es posible que no están habilitadas tus políticas de excepción, para verificar esto debes:
* Abrir PowerShell y ejecutar este comando
 ``` sh
   Get-ExecutionPolicy -list
   ```
Si en la lista que te aparecerá están todas las opciones en "Undefined" debes hacer lo siguiente
 ``` sh
   Set-ExecutionPolicy RemoteSigned -force
   ```
Esto hará que la ejecución de script estén habilitados en tu LocalMachine, por lo que esa opción de la lista pasara de "Undefined" a "RemoteSigned".
Con esto se solucionará un error común encontrado en proyectos como este.

### Autor
* **Oscar Reyes** - [Oscarim1](https://github.com/Oscarim1)

