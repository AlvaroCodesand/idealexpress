import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SeasonAlert } from "@/components/layout/SeasonAlert";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.idealexpresswi.com"),
  title: {
    default: "Ideal Express | Envíos y Paquetería a todo México desde Milwaukee",
    template: "%s | Ideal Express",
  },
  description:
    "Más de 10 años enviando encomiendas y paquetería familiar a todo México desde Milwaukee, Racine, Sheboygan y Wisconsin. Entrega garantizada a domicilio en 2 a 3 semanas. Tarifas desde $2.99/lb.",
  keywords: [
    "envíos a México desde Milwaukee",
    "paquetería a México en Milwaukee Wisconsin",
    "enviar paquete a México",
    "encomiendas a México",
    "cajas a México Racine Caledonia",
    "paquetería mexicana Milwaukee",
    "Ideal Express",
    "Ideal Express Milwaukee",
    "cruce aduanal Laredo",
    "paquetería a Michoacán Jalisco Guanajuato",
  ],
  authors: [{ name: "Ideal Express" }],
  creator: "Ideal Express",
  publisher: "Ideal Express",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Ideal Express | Envíos y Paquetería a todo México desde Milwaukee",
    description:
      "Más de 10 años conectando familias en Wisconsin con todo México. Entrega garantizada en 2 a 3 semanas. Tarifas oficiales y tiendas cercanas.",
    url: "https://www.idealexpresswi.com",
    siteName: "Ideal Express",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Ideal Express - Encomiendas y Paquetería a todo México",
      },
      {
        url: "/images/hero-warehouse.jpg",
        width: 1200,
        height: 800,
        alt: "Bodega Matriz de Ideal Express en Milwaukee",
      },
    ],
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Express | Envíos y Paquetería a todo México desde Milwaukee",
    description:
      "Entrega garantizada de 2 a 3 semanas a todo México. Trato familiar y seguro en tiendas de tu barrio en Wisconsin.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://www.idealexpresswi.com",
    languages: {
      "es-US": "https://www.idealexpresswi.com",
    },
  },
  other: {
    "geo.region": "US-WI",
    "geo.placename": "Milwaukee, Wisconsin",
    "geo.position": "43.0163;-87.9333",
    "ICBM": "43.0163, -87.9333",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessJsonLd />
        <FaqJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <SeasonAlert />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <WhatsAppFloat />
        </Suspense>
      </body>
    </html>
  );
}
