# Ideal Express - Demo Interactivo (Next.js)

Prototipo interactivo desarrollado por **Codesand** para la **Fase 1** de la Transformación Digital de **Ideal Express** (Milwaukee, WI).

Construido con **Next.js (App Router), TypeScript, Tailwind CSS y Lucide Icons**, preparado arquitectónicamente para escalar a la base de datos relacional y PWA con escaneo QR en las siguientes fases.

---

## 🚀 Cómo ejecutar el proyecto

```bash
# Entrar a la carpeta del demo
cd demo

# Instalar dependencias (si no se ha hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev

# O compilar e iniciar en modo producción
npm run build
npm run start
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## 📱 Estructura y Vistas del Demo

### 1. Sitio Web Público (Móvil Primero y SEO Local)
* **`/` (Inicio):** Mensaje principal de valor, propuesta de entrega garantizada en 2 a 3 semanas, banner de temporada navideña (límite 2 de diciembre), 3 llamadas a la acción clave (*Cotizar por WhatsApp*, *Ver Tarifas*, *Buscar Tienda*), proceso en 4 pasos y preguntas frecuentes.
* **`/como-enviar`:** Guía detallada de embalaje, tiempos de tránsito y desglose visual de **artículos permitidos vs. prohibidos por la aduana**.
* **`/tarifas`:** Calculadora de costos en tiempo real ($2.99 / lb, mínimo 15 lbs), selector de tamaños de cajas estándar y botón generador de cotizaciones prellenadas directo a WhatsApp.
* **`/agentes`:** Directorio de tiendas y comercios aliados con buscador y filtro por ciudad (Milwaukee, Racine, Sheboygan), accesos a "Cómo llegar" en Google Maps y sección de reclutamiento de nuevos agentes aliados.
* **`/contacto`:** Datos unificados de la bodega matriz en Milwaukee (Greenfield Ave), teléfonos y formulario de contacto.

---

### 2. Portal de Agentes (`/portal`)
Simulación del flujo de recepción y captura de encomiendas frente al cliente:
* **`/portal` (Acceso):** Login con PIN estático por tienda aliada. Incluye botones de acceso rápido para demostración:
  * *El Correcaminos Multiservicios* (`ideal2026`)
  * *Rivera's Western Wear* (`rivera123`)
  * *Super Mercado Jimenez* (`jimenez88`)
  * *Taquería y Tienda Luisito* (`luisito77`)
* **`/portal/captura` (Formulario Inteligente):**
  * **Búsqueda Predictiva de Remitente:** Al escribir 3 letras o parte del teléfono (ej. `"Juan"`, `"María"` o `"414"`), consulta el endpoint `/api/historial` simulando Microsoft Graph / Lists y rellena los datos del cliente.
  * **Destinatarios Frecuentes Relacionados:** Si el cliente ya ha enviado antes, despliega sus destinatarios habituales en México para seleccionarlos con un solo clic.
  * **Cálculo de Paquete:** Peso, medidas, seguro opcional (10%) y total a cobrar.
* **`/portal/impresion/[id]` (Hojas Imprimibles Oficiales):**
  * **Hoja 1 (Cliente):** Comprobante oficial, desglose económico, términos con plazo estipulado de 2 a 3 semanas, aviso de privacidad y línea de firma.
  * **Hoja 2 (Caja):** Etiqueta de control logístico con destino en tamaño grande (Ciudad/Estado en México), datos del destinatario, código de barras y recuadro de Código QR para escaneo en bodega y cruce aduanal.
  * Optimizado para papel tamaño Carta con saltos de página y estilos de impresión (`window.print()`).

---

### 3. Endpoints Serverless Simulados (`/api`)
* `GET /api/historial?q={nombre_o_telefono}`: Búsqueda reactiva con autocompletado en la base de clientes históricos.
* `POST /api/envios`: Registro del nuevo envío y generación de folio único (ej. `IE-2026-B103`).
* `GET /api/envios?id={id}`: Consulta de información para la plantilla de impresión.
