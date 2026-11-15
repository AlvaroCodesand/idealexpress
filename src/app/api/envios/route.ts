import { NextRequest, NextResponse } from "next/server";
import { Shipment } from "@/types";
import { INITIAL_SHIPMENTS } from "@/constants/seedData";

// Memoria volátil para el demo de la sesión
const shipmentsStore: Shipment[] = [...INITIAL_SHIPMENTS];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const shipment = shipmentsStore.find((s) => s.id === id || s.folio === id);
    if (!shipment) {
      return NextResponse.json(
        { success: false, error: "Envío no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: shipment });
  }

  return NextResponse.json({ success: true, data: shipmentsStore });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = shipmentsStore.length + 102;
    const newFolio = `IE-2026-B${count}`;
    const newId = `SHIP-${Date.now().toString().slice(-4)}`;

    const newShipment: Shipment = {
      id: newId,
      folio: newFolio,
      createdAt: new Date().toISOString(),
      agentId: body.agentId || "AG-01",
      agentName: body.agentName || "El Correcaminos Multiservicios",
      sender: body.sender,
      recipient: body.recipient,
      packageDetails: body.packageDetails,
      status: "Recibido en Tienda",
    };

    shipmentsStore.unshift(newShipment);

    return NextResponse.json({
      success: true,
      message: "Envío registrado con éxito en Microsoft Lists (simulado)",
      data: newShipment,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Error al procesar el envío" },
      { status: 400 }
    );
  }
}
