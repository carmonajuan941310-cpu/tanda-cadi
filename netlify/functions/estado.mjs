import { getStore } from "@netlify/blobs";

const CORS_HEADERS = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const store = getStore({ name: "tanda", consistency: "strong" });

  if (req.method === "GET") {
    try {
      const data = await store.get("estado", { type: "json" });
      return new Response(JSON.stringify(data || {}), {
        status: 200,
        headers: CORS_HEADERS,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "No se pudo leer el estado" }), {
        status: 500,
        headers: CORS_HEADERS,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.setJSON("estado", body);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "No se pudo guardar el estado" }), {
        status: 500,
        headers: CORS_HEADERS,
      });
    }
  }

  return new Response(JSON.stringify({ error: "Método no permitido" }), {
    status: 405,
    headers: CORS_HEADERS,
  });
};

export const config = { path: "/api/estado" };
