import { NextRequest, NextResponse } from "next/server";
import { SEED_CLIENTS } from "@/constants/seedData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  if (query.length < 3) {
    return NextResponse.json({
      success: true,
      data: [],
      message: "Ingrese al menos 3 caracteres para buscar en el historial.",
    });
  }

  // Filtrar por nombre completo o por teléfono
  const results = SEED_CLIENTS.filter((client) => {
    const cleanPhone = client.phone.replace(/\D/g, "");
    const cleanQuery = query.replace(/\D/g, "");
    const matchesName = client.fullName.toLowerCase().includes(query);
    const matchesPhone = cleanQuery.length >= 3 && cleanPhone.includes(cleanQuery);
    return matchesName || matchesPhone;
  });

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}
