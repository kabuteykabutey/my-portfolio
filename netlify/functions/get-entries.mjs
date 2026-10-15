import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    const store = getStore("guestbook");
    const { blobs } = await store.list();

    const entries = [];
    for (const blob of blobs) {
      try {
        const data = await store.get(blob.key, { type: "json" });
        if (data) entries.push(data);
      } catch (_) {
        // skip malformed blobs
      }
    }

    // Sort newest first
    entries.sort((a, b) => b.time - a.time);

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("get-entries error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/entries" };
