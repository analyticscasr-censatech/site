export const onRequestPost: PagesFunction = async ({ request, env }) => {
try {
const contentType = request.headers.get("content-type") || "";
let data: any = {};


if (contentType.includes("application/json")) {
data = await request.json();
} else if (contentType.includes("application/x-www-form-urlencoded")) {
const form = await request.formData();
data = Object.fromEntries(form.entries());
} else {
return new Response(JSON.stringify({ ok: false, error: "Unsupported content type" }), { status: 415 });
}


const nombre = (data.nombre || "").toString();
const email = (data.email || "").toString();
const mensaje = (data.mensaje || "").toString();


if (!nombre || !email || !mensaje) {
return new Response(JSON.stringify({ ok: false, error: "Faltan campos" }), { status: 400 });
}


// Webhook opcional (Slack/Discord)
if (env.CONTACT_WEBHOOK_URL) {
await fetch(env.CONTACT_WEBHOOK_URL, {
method: "POST",
headers: { "content-type": "application/json" },
body: JSON.stringify({ nombre, email, mensaje, ts: new Date().toISOString() }),
});
}


return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
} catch (err: any) {
return new Response(JSON.stringify({ ok: false, error: err?.message || "Error" }), { status: 500 });
}
};
