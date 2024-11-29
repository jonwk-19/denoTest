// app.js
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// Crea una nueva instancia de la aplicación
const app = new Application();

// Crea un enrutador
const router = new Router();

// Página principal con el formulario de la calculadora
router.get("/", (context) => {
  context.response.body = `
    <html>
      <head><title>Calculadora en Deno</title></head>
      <body>
        <h1>Calculadora Básica</h1>
        <form action="/calculate" method="POST">
          <label for="num1">Número 1:</label>
          <input type="number" name="num1" required><br>
          
          <label for="num2">Número 2:</label>
          <input type="number" name="num2" required><br>
          
          <label for="operation">Operación:</label>
          <select name="operation">
            <option value="sum">Suma</option>
            <option value="subtract">Resta</option>
            <option value="multiply">Multiplicación</option>
            <option value="divide">División</option>
          </select><br><br>
          
          <button type="submit">Calcular</button>
        </form>
      </body>
    </html>
  `;
});

// Ruta para manejar la solicitud del formulario y calcular el resultado
router.post("/calculate", async (context) => {
    console.log("Calculando...");
  const body = await context.request.body({ type: "form" }).value;
//   const num1 = parseFloat(body.get("num1"));
//   const num2 = parseFloat(body.get("num2"));
  const operation = body.get("operation");
  let result;
const num1 = parseInt(body.get("num1"), 10);
const num2 = parseInt(body.get("num2"), 10);

  console.log(`Operación: ${operation}`);
    console.log(`Número 1: ${num1}`);
    console.log(`Número 2: ${num2}`);

  switch (operation) {
    case "sum":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num2 !== 0 ? num1 / num2 : "Error: División por cero";
      break;
    default:
      result = "Operación no válida";
      break;
  }

  context.response.body = `
    <html>
      <head><title>Resultado</title></head>
      <body>
        <h1>Resultado: ${result}</h1>
        <a href="/">Volver</a>
      </body>
    </html>
  `;
});

// Usa el enrutador con la aplicación
app.use(router.routes());
app.use(router.allowedMethods());

// Define el puerto donde se ejecutará la app
const port = 8000;
console.log(`Servidor corriendo en http://localhost:${port}`);
await app.listen({ port });
