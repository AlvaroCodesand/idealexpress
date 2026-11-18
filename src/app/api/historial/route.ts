import { NextRequest, NextResponse } from "next/server";
import { searchClientsFromDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get("q") || "").trim();

    // Consulta en SQLite modo WAL (< 1ms)
    const results = searchClientsFromDb(query);

    return NextResponse.json({
      success: true,
      total: results.length,
      data: results,
    });
  } catch (err) {
    console.error("Error en /api/historial", err);
    return NextResponse.json(
      { success: false, error: "Error al consultar historial de clientes" },
      { status: 500 }
    );
  }
}
