# Proyecto Ideal Express - Guía de Operación para Claude Code

## ⚠️ Mandatos de Operación Obligatorios
- **NUNCA ejecutar cambios de código, componentes o diseño de forma autónoma.** Siempre consultar primero al usuario, presentar opciones claras y esperar confirmación explícita.
- **NUNCA inspeccionar ni manipular credenciales privadas, claves SSH (`~/.ssh`) ni accesos a servidores remotos sin autorización explícita.**
- Al proporcionar comandos para la terminal del usuario, mantenerlos en texto plano simple de una sola línea o comandos ultracortos para evitar roturas por ajuste de línea del emulador.

---

## 🌐 Estado y Despliegue en Producción
- **URL en Vivo:** `https://idealexpress.codesand.online` (SSL activo, Nginx reverse proxy).
- **Repositorio GitHub:** `https://github.com/AlvaroCodesand/idealexpress` (rama `main`).
- **Servidor VPS:** `15.235.41.249` (OVHcloud, usuario `ubuntu`).
  - **Puerto asignado:** `127.0.0.1:3200:3000`.
  - **Contenedor Docker:** `idealexpress-web` (definido en `docker-compose.yml`).
  - **Blindaje de recursos:** Límite estricto de `512M` de memoria RAM y `0.50` CPU para no afectar a Puntabase ni a las demás landings del servidor.
  - **Nginx:** `/etc/nginx/sites-available/idealexpress` enlazado a `sites-enabled/`.
- **CI/CD Automático:** Cada `git push` a `main` dispara el flujo `.github/workflows/deploy.yml` que compila la imagen Docker en la nube, la transfiere por SSH y reinicia el contenedor con limpieza automática de imágenes (`docker image prune -f`).
  - **Secreto de GitHub:** `DEPLOY_SSH_KEY` configurado con la llave autorizada en el servidor `id_idealexpress`.

---

## 🛠️ Stack Tecnológico y Arquitectura
- **Framework:** Next.js 16.4.6 (App Router con Turbopack y `output: "standalone"`).
- **Directorio de código:** raíz del repo.
- **Tipografía Oficial:** `Archivo` (display sans-serif rotunda industrial) y `DM Sans` (cuerpo y lectura), con `JetBrains Mono` para folios y tarifas. (Sin fuentes serif clásicas).
- **Paleta de Marca:** Azul Medianoche (`#0E283F`), Azul Real (`#1E3A5F`), Verde Olivo/Lima (`#7BA029` / `#8FB838`), Fondo Cálido (`#FAF8F5`).
- **Favicon Oficial:** `public/favicon.ico` y `src/app/favicon.ico` multirresolución con el isotipo de marca.

---

## 📐 Estándares de Rendimiento y Calidad
- **Impeccable Detect:** **0 anti-patterns**, **0 advisories** (clean sheet validado con Chromium).
- **Métricas de Rendimiento:**
  - Accesibilidad: 100/100 (incluyendo nombres accesibles ARIA en todos los marcadores Leaflet `div.leaflet-marker-icon`).
  - Prácticas recomendadas: 100/100.
  - SEO: 100/100 (JSON-LD estructurado para `LocalBusiness` y `FAQPage`).
  - LCP: Precarga prioritaria con `fetchPriority="high"`, formato WebP (`hero-warehouse.webp`) y motor `sharp`.
  - Mapa Satelital: Leaflet con carga diferida vía `IntersectionObserver` (`rootMargin: "300px"`) para no descargar mosaicos de OpenStreetMap en el segundo cero.

---

## 📱 Módulos de la Aplicación
1. **Públicos:**
   - `/` (Home con Hero esbelto ~520px alineado a la izquierda, barra rápida de servicio, diagrama de 4 pasos con ilustraciones vectoriales SVG en `ProcessIllustrations.tsx`, y mapa satelital de agentes).
   - `/tarifas` (Calculadora por libra a $2.99 USD/lb, mínimo 15 lbs, y cotizador automático a WhatsApp).
   - `/como-enviar` (Reglas aduanales y empaque).
   - `/agentes` (Directorio y mapa de tiendas en Milwaukee, Racine y Sheboygan).
   - `/calendario` (Garantía navideña con límite al 2 de diciembre).
   - `/contacto` (Bodega central en 1565 W Greenfield Ave, Milwaukee, WI).
2. **Portal de Agentes (`/portal`):**
   - PINs de demostración: `ideal2026`, `rivera123`, `jimenez88`, `luisito77`.
   - `/portal/captura`: Búsqueda reactiva de remitentes (ej. "Juan", "414") y destinatarios frecuentes en México.
   - `/portal/impresion/[id]`: Plantilla tamaño carta de 2 hojas (Recibo con firma y Etiqueta con código QR).
