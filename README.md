# Micrositio de recursos Fromus — RUP + Licitar

Micrositio independiente para capturar correos de dueños de empresa y
entregarles dos guías ("RUP" y "Paso a paso para licitar") como páginas web.
Guarda cada lead en Supabase y dispara un correo de entrega con Resend.

> **Repo separado a propósito.** No comparte código ni deploy con el SaaS de
> Fromus ni con Radar SECOP. Vive y se despliega solo.

---

## Stack

| Capa        | Tecnología                                     |
| ----------- | ---------------------------------------------- |
| Framework   | Next.js 14 (App Router) + TypeScript           |
| Estilos     | Tailwind CSS (identidad Fromus, dark-mode)     |
| Base de datos | Supabase (tabla `leads`, RLS activado)       |
| Email       | Resend (remitente `recursos@fromus.tech`)      |
| Hosting     | Vercel                                          |

---

## Estructura de rutas

```
/                  Home: las dos guías
/rup               Landing RUP (gate de correo) → revela la guía in-line
/rup/guia          Guía completa del RUP (enlace permanente del correo)
/licitar           Landing Licitar (gate de correo)
/licitar/guia      Guía completa para licitar
/privacidad        Política de tratamiento de datos (Ley 1581/2012)
/gracias           Confirmación opcional
/admin             Panel privado: lista de leads, conteo y descarga CSV
/api/lead          POST: valida, upsert del lead, dispara el correo
/api/unsubscribe   GET: baja firmada (marca unsubscribed = true)
```

---

## 1. Desarrollo local

```bash
npm install
cp .env.example .env.local   # en Windows PowerShell: copy .env.example .env.local
# rellena .env.local con tus valores (ver más abajo)
npm run dev                  # http://localhost:3000
```

El proyecto **compila y corre con valores placeholder**: las landings, las
guías y la página de privacidad funcionan sin credenciales. Solo el guardado
del lead y el envío del correo requieren Supabase y Resend configurados (si
faltan, el sitio igual revela la guía y registra el error en consola, sin
romperse).

Para verificar el build de producción:

```bash
npm run build
```

---

## 2. Variables de entorno

Todas están documentadas en [`.env.example`](./.env.example):

| Variable                      | Para qué                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | URL pública (sin slash final), p. ej. `https://recursos.fromus.tech`. Construye los enlaces de las guías y de baja. |
| `SUPABASE_URL`                | URL del proyecto Supabase.                                   |
| `SUPABASE_SERVICE_ROLE_KEY`   | **Secreta.** service_role key, solo lado servidor.          |
| `UNSUBSCRIBE_SECRET`          | Secreto para firmar (HMAC) los enlaces de baja y la sesión del panel. |
| `ADMIN_PASSWORD`              | Contraseña del panel privado `/admin` (ver y exportar leads). |
| `EMAIL_DELIVERY_ENABLED`      | _Opcional._ `false` por defecto: el sitio **no envía correo**, solo captura. Ponlo en `true` para reactivar el correo de entrega. |
| `RESEND_API_KEY`              | _Opcional_ (solo si `EMAIL_DELIVERY_ENABLED=true`). API key de Resend. |
| `RESEND_FROM`                 | _Opcional._ Remitente verificado, p. ej. `Fromus <recursos@fromus.tech>`. |

> **Por ahora el envío de correo está apagado a propósito.** El sitio solo
> guarda el correo en Supabase; el email marketing se hará por separado. Por eso
> **no necesitas Resend para lanzar** — basta con Supabase. Cuando quieras
> activar correos, pon `EMAIL_DELIVERY_ENABLED=true` y las dos variables de Resend.

Genera el secreto de baja con:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Supabase

1. Crea un proyecto nuevo en [supabase.com](https://supabase.com) (org free).
2. Abre **SQL Editor** y ejecuta el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql). Eso crea la tabla `leads`,
   el índice único `(email, source)`, el trigger que normaliza el correo a
   minúsculas y **activa RLS sin políticas de cliente** (toda escritura ocurre
   desde el servidor con la service role key).
3. En **Settings → API** copia:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (no la `anon`)

> La service role key **nunca** se expone al browser: solo la usa el Route
> Handler `/api/lead` y `/api/unsubscribe`, que corren en el servidor.

---

## 4. Resend + verificación de dominio (SPF/DKIM)

1. Crea una cuenta en [resend.com](https://resend.com).
2. **Domains → Add Domain** → `fromus.tech`.
3. Resend te dará registros DNS para agregar en tu proveedor de DNS (donde
   administras `fromus.tech`):
   - **SPF** — un registro `TXT` (tipo `MX`/`TXT` según indique Resend) para
     el subdominio de envío.
   - **DKIM** — uno o varios registros `TXT`/`CNAME` con la clave de firma.
   - (Opcional pero recomendado) **DMARC** — registro `TXT` en `_dmarc`.
4. Agrega los registros en tu DNS y espera la propagación (minutos a horas).
   En Resend, el dominio debe quedar en estado **Verified**.
5. **API Keys → Create API Key** → cópiala en `RESEND_API_KEY`.
6. Define `RESEND_FROM="Fromus <recursos@fromus.tech>"` (la dirección debe usar
   el dominio verificado).

> Hasta que el dominio esté verificado, Resend solo deja enviar a tu propio
> correo de prueba. Verifica antes del lanzamiento.

---

## 5. Deploy en Vercel

1. Sube este repo a GitHub (ver más abajo) — **proyecto nuevo, separado** del
   SaaS.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el
   repo. Vercel detecta Next.js automáticamente.
3. En **Settings → Environment Variables** agrega las 6 variables de la
   sección 2 (para los entornos Production y Preview).
   - `NEXT_PUBLIC_SITE_URL` debe ser la URL final, p. ej.
     `https://recursos.fromus.tech`.
4. **Deploy.**
5. **Dominio:** Settings → Domains → agrega `recursos.fromus.tech` y crea el
   `CNAME` que Vercel indique en tu DNS.

---

## 6. Prueba end-to-end

1. Con el dominio de Resend verificado y las variables puestas, entra a `/rup`.
2. Ingresa un correo real tuyo, marca el consentimiento y envía.
3. Verifica que:
   - La guía se revela in-line ("También te lo enviamos a tu correo").
   - Aparece una fila en la tabla `leads` de Supabase (`source = rup`,
     `consent_marketing = true`).
   - Llega el correo de entrega (revisa spam la primera vez).
   - El enlace **"Date de baja"** del correo marca `unsubscribed = true`.

---

## Panel de leads (`/admin`)

Dónde recoges los correos sin tener que entrar a Supabase. Entra a
`https://recursos.fromus.tech/admin`, ingresa la `ADMIN_PASSWORD` y verás:

- Conteo total, por fuente (`rup` / `licitar`) y de contactos activos.
- La lista completa de leads con correo, fuente, estado y fecha.
- Botones para **descargar el CSV** (todos, solo RUP o solo Licitar) y subirlo
  a tu herramienta de email marketing.

El acceso queda en una cookie firmada (HMAC) que expira a los 7 días. La sesión
se cierra con el botón "Cerrar sesión".

---

## Notas de cumplimiento (Habeas Data — Ley 1581/2012)

- Checkbox de consentimiento **no premarcado** junto al formulario.
- Página `/privacidad` con responsable (Fromus S.A.S., NIT 902074666-4),
  finalidad, derechos del titular y canal de contacto.
- Enlace de baja funcional en cada correo (`/api/unsubscribe`, firmado con
  HMAC), que marca `unsubscribed = true`.
- Se guarda IP + fecha como prueba del consentimiento.

---

## Identidad visual

Definida en `tailwind.config.ts` y `src/app/globals.css`. Terminal dark-mode:
base `#000000`, superficies `#050505`/`#0F0F0F`, bordes `#1A1A1A`. Naranja
`#E8672E` solo para CTAs y acentos. Tipografías vía `next/font`: Dela Gothic One
(titulares), Inter (cuerpo), JetBrains Mono (todos los números/KPIs), Caveat
(acentos). Mobile-first.
