# censatech.net — landing en Cloudflare Pages


1) **Sube** estos archivos a un repo de GitHub.
2) En Cloudflare → *Workers & Pages* → **Create** → *Pages* → **Connect to Git** → selecciona el repo.
- Framework preset: **None**
- Build command: *(vacío)*
- Output directory: **/**
3) Tras el deploy, ve a **Custom domains** y agrega `www.censatech.net` (y/o `censatech.net`).
4) En *Settings → Environment variables*, añade si quieres:
- `CONTACT_WEBHOOK_URL` = tu webhook (Slack/Discord/Teams)


> El formulario envía a **POST /contact** que está en `/functions/contact.ts`.


### Opcional: D1 para almacenar contactos
- Crea una base D1 y enlázala al proyecto como binding `DB`.
- Crea la tabla:
```sql
CREATE TABLE contactos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
email TEXT,
mensaje TEXT,
ts INTEGER
);
