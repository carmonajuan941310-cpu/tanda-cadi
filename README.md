# Tanda CADI — instalación paso a paso (segura)

Esta versión no tiene ninguna clave secreta dentro del código. El guardado
compartido lo maneja **Netlify Blobs**, que vive del lado del servidor —
el navegador de las personas que abran el link nunca ve ni puede leer
ninguna credencial. Por eso necesita conectarse por GitHub en vez de
arrastrar y soltar: así Netlify puede instalar la pieza que falta
(`@netlify/blobs`) antes de publicar el sitio.

Son ~10 minutos, todo desde el navegador, sin terminal ni instalar nada
en tu computadora.

---

## Paso 1 — Crea una cuenta en GitHub (si no tienes)

1. Ve a **https://github.com/signup**
2. Sigue los pasos (correo, usuario, contraseña). Es gratis.

## Paso 2 — Crea un repositorio nuevo

1. Ya con sesión iniciada, ve a **https://github.com/new**
2. En "Repository name" escribe: `tanda-cadi`
3. Déjalo como **Public** (no importa, no hay nada secreto adentro).
4. Click en **"Create repository"** (botón verde, abajo).

## Paso 3 — Sube los archivos

1. En la página del repositorio recién creado, busca el link que dice
   **"uploading an existing file"** (aparece en el recuadro de instrucciones).
2. Descomprime el `.zip` que te compartí en tu computadora.
3. Arrastra **todo el contenido** de la carpeta (no la carpeta misma, lo
   que está *dentro*: `index.html`, `netlify.toml`, `package.json`, `README.md`
   y la carpeta `netlify`) a la zona de arrastre de GitHub.
4. Espera a que termine de subir todo.
5. Abajo, en "Commit changes", deja lo que está y click en el botón verde
   **"Commit changes"**.

Verifica que en la lista de archivos del repo aparezca una carpeta
llamada `netlify` — si no aparece, vuelve a intentar el arrastre solo
con esa carpeta.

## Paso 4 — Conecta el repositorio a Netlify

1. Ve a **https://app.netlify.com**
2. Inicia sesión o crea una cuenta gratis (puedes usar "Sign up with GitHub"
   para que quede todo conectado de una vez).
3. Click en **"Add new site"** → **"Import an existing project"**.
4. Elige **"Deploy with GitHub"** y autoriza el acceso si te lo pide.
5. Busca y selecciona el repositorio **`tanda-cadi`**.
6. En la pantalla de configuración de build:
   - **Build command:** déjalo vacío.
   - **Publish directory:** escribe un punto → `.`
7. Click en **"Deploy tanda-cadi"**.

Netlify va a tardar 1–2 minutos instalando `@netlify/blobs` y publicando
el sitio. Cuando termine, verás una URL arriba como
`https://algo-al-azar.netlify.app` — ese es el link que vas a compartir
por WhatsApp.

## Paso 5 — Pruébalo

1. Abre esa URL.
2. Marca un pago como "Pagado".
3. Debe aparecer arriba "Guardado y sincronizado con el grupo ✓" (verde),
   no el aviso rojo de error.
4. Recarga la página (F5) — el check debe seguir marcado. Eso confirma
   que sí se guardó de verdad.

Si ves el aviso rojo, revisa la sección "Si algo falla" más abajo.

## Paso 6 — Comparte el link

Copia la URL de Netlify y mándala por WhatsApp al grupo. Cualquiera que
la abra —tenga o no cuenta de algo— puede ver y marcar pagos, y todos
ven la misma información porque se guarda en el servidor de Netlify.

Si quieres una URL más bonita: en Netlify, ve a **Site configuration →
Domain management → Options → Edit site name**, y cámbiale el nombre
(por ejemplo `tanda-cadi-2026.netlify.app`).

---

## Si quieres editar algo después (nombres, fechas, montos)

1. Ve a tu repositorio en GitHub → abre `index.html` → click en el
   ícono de lápiz (editar) → busca el arreglo `TURNS` cerca del final
   del archivo y cambia lo que necesites.
2. Click en **"Commit changes"**.
3. Netlify detecta el cambio solo y vuelve a publicar el sitio en un
   par de minutos — no necesitas hacer nada más.

## Si algo falla

- **Aviso rojo "No se guardó en el servidor"** → Ve a Netlify → tu sitio
  → pestaña **"Deploys"** → abre el despliegue más reciente → revisa el
  log. Si dice algo sobre `@netlify/blobs` o "module not found", significa
  que el `package.json` no llegó a subirse bien a GitHub — repite el Paso 3.
- **La página se ve en blanco** → revisa que `index.html` esté en la
  raíz del repositorio, no dentro de una subcarpeta.
- **Quieres reiniciar el estado** (por ejemplo, para una tanda nueva) →
  En Netlify, ve a tu sitio → pestaña **"Blobs"** → busca el store
  `tanda` → borra el valor guardado con la clave `estado`.

## Por qué esta versión es segura

No hay ninguna clave, token ni contraseña dentro de `index.html` ni de
ningún archivo que el navegador descargue. El guardado lo hace la función
`netlify/functions/estado.mjs`, que corre **en el servidor de Netlify**,
no en el navegador de quien visita la página — por eso nadie que abra
"Ver código fuente" puede ver ni robar ninguna credencial.
