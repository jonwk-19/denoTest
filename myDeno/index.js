// server.js
import { serve } from "https://deno.land/std/http/server.ts";

const handler = (req) => {
  const url = new URL(req.url);
  
  if (url.pathname === "/") {
    return new Response("¡Hola desde Deno!", { status: 200 });
  }
  
  return new Response("Página no encontrada", { status: 404 });
};

const port = 8000;
console.log(`Servidor corriendo en http://localhost:${port}`);
await serve(handler, { port });
