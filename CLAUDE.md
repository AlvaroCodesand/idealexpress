# Proyecto Ideal Express - Guía de Operación y Memoria para Claude Code

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

## 🧭 Navegación Pública Simplificada (Estado Actual)
- **Enlaces Públicos Visibles:**
  1. **Inicio** (`/`)
  2. **Tiendas y Sucursales** (`/agentes`)
  3. **Contacto** (`/contacto`)
  - Área de herramientas: botón **Portal Agentes** (`/portal`) y botón de WhatsApp directo.
- **Páginas Secundarias Preservadas en Código (Ocultas al Público):**
  - `/tarifas` (Calculadora y medidas)
  - `/como-enviar` (Reglas de aduana y empaque)
  - `/calendario` (Garantía navideña)
  - `SeasonAlert` (Barra superior de aviso)
  - *Nota:* Ninguna de estas páginas fue borrada; su código sigue 100% funcional y listo para reactivarse cuando el cliente lo requiera.

---

## 🛠️ Stack Tecnológico y Arquitectura
- **Framework:** Next.js 16.4.6 (App Router con Turbopack y `output: "standalone"`).
- **Directorio de código:** raíz del repo.
- **Tipografía Oficial:** `Archivo` (display sans-serif rotunda industrial) y `DM Sans` (cuerpo y lectura), con `JetBrains Mono` para folios y tarifas. (Sin fuentes serif clásicas).
- **Paleta de Marca:** Azul Medianoche (`#0E283F`), Azul Real (`#1E3A5F`), Verde Olivo/Lima (`#7BA029` / `#8FB838`), Fondo Cálido (`#FAF8F5`).
- **Ilustraciones Vectoriales:** 4 escenas SVG artesanales a medida en `ProcessIllustrations.tsx` (Recepción en tienda, Registro digital, Tránsito en carretera y Entrega a domicilio en México).
- **Favicon Oficial:** `public/favicon.ico` y `src/app/favicon.ico` multirresolución con el isotipo de marca.

---

## 📐 Métricas y Estándares de Calidad Validados
- **Impeccable Detect:** **0 anti-patterns**, **0 advisories** (clean sheet con Chromium).
- **Google PageSpeed Insights / Lighthouse (Móvil 4G lenta):**
  - **Accesibilidad:** 100/100 (incluyendo nombres accesibles ARIA y title en marcadores Leaflet `div.leaflet-marker-icon`).
  - **Prácticas recomendadas:** 100/100.
  - **SEO:** 100/100 (JSON-LD estructurado para `LocalBusiness` y `FAQPage`).
  - **Navegación Agéntica (AI-ready):** 2/2.
  - **Rendimiento:** 96–97/100 (FCP 1.1s, TBT 0-30ms, CLS 0.021).
  - **LCP Optimizado:** Precarga prioritaria con `fetchPriority="high"`, formato WebP (`hero-warehouse.webp`) y motor `sharp`.
  - **Mapa Satelital Diferido:** Leaflet cargado vía `IntersectionObserver` (`rootMargin: "300px"`), eliminando la descarga de 806 KB de mosaicos OpenStreetMap en la carga inicial móvil.
- **Auditorías Externas Adicionales:**
  - Yellow Lab Tools: **95/100**
  - Pingdom Tools: **94/100**
  - SpeedVitals: **92/100**

---

## 📱 Módulos y Portal de Agentes (`/portal`)
- **PINs de demostración:** `ideal2026`, `rivera123`, `jimenez88`, `luisito77`.
- **Formulario Inteligente (`/portal/captura`):** Búsqueda reactiva de remitentes (ej. "Juan", "414") y carga de destinatarios frecuentes en México.
- **Plantilla de Impresión Tamaño Carta (`/portal/impresion/[id]`):** Hoja 1 para cliente con firma y términos (plazo 2-3 semanas) y Hoja 2 etiqueta para caja con Código QR.
