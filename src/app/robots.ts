import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/portal/impresion/", "/api/"],
      },
    ],
    sitemap: "https://www.idealexpresswi.com/sitemap.xml",
    host: "https://www.idealexpresswi.com",
  };
}
