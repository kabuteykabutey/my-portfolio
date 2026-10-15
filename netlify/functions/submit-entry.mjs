import { getStore } from "@netlify/blobs";

const MAX_TEXT_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;

export default async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { name, text, signature } = body;

  if (!name || !text || !signature) {
    return new Response(
      JSON.stringify({ error: "name, text and signature are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (name.length > MAX_NAME_LENGTH || text.length > MAX_TEXT_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Input too long" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const store = getStore("guestbook");
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const entry = {
      id,
      name: name.trim(),
      text: text.trim(),
      signature, // base64 data URL from canvas
      time: Date.now(),
    };

    await store.setJSON(id, entry);

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("submit-entry error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/submit" };
