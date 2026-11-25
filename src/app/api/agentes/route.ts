import { NextRequest, NextResponse } from "next/server";
import { getAllAgentsFromDb, verifyAgentCredentials } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const onlyActive = searchParams.get("all") !== "true";

    const agents = getAllAgentsFromDb(onlyActive);

    return NextResponse.json({
      success: true,
      total: agents.length,
      data: agents,
    });
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      (err as { digest?: string }).digest === "NEXT_PRERENDER_INTERRUPTED"
    ) {
      throw err;
    }
    console.error("Error en GET /api/agentes", err);
    return NextResponse.json(
      { success: false, error: "Error al consultar agentes" },
      { status: 500 }
    );
  }
}

// POST: Validación segura de credenciales de agente directamente en el servidor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agentId, pin } = body;

    if (!agentId || !pin) {
      return NextResponse.json(
        { success: false, error: "Faltan credenciales requeridas" },
        { status: 400 }
      );
    }

    const agent = verifyAgentCredentials(String(agentId), String(pin));
    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Clave de acceso (PIN) incorrecta" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Autenticación exitosa",
      data: agent,
    });
  } catch (err: unknown) {
    console.error("Error en POST /api/agentes", err);
    return NextResponse.json(
      { success: false, error: "Error en el servidor de autenticación" },
      { status: 500 }
    );
  }
}
