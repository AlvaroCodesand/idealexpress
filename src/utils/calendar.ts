import { HolidayCheckResult } from "@/types";
import { TARIFF_CONFIG } from "@/constants/config";

export function checkChristmasArrival(selectedDateStr: string): HolidayCheckResult {
  if (!selectedDateStr) {
    return {
      status: "unselected",
      message: "Selecciona una fecha en el calendario para verificar si tu caja llega a tiempo.",
    };
  }

  // Comparar con fecha límite: 2026-12-02
  const selectedDate = new Date(selectedDateStr + "T00:00:00");
  const deadlineDate = new Date(TARIFF_CONFIG.christmasDeadlineDate + "T23:59:59");

  if (isNaN(selectedDate.getTime())) {
    return {
      status: "unselected",
      message: "Fecha inválida. Por favor selecciona una fecha válida.",
    };
  }

  if (selectedDate <= deadlineDate) {
    return {
      status: "on-time",
      message: "¡Excelente! Tu envío llega a tiempo para Nochebuena y Navidad.",
      subMessage: `Si entregas tu caja el ${selectedDate.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })}, llegará a domicilio en México antes del 24 de Diciembre (plazo habitual 2 a 3 semanas).`,
      suggestedAction: "ship-now",
    };
  } else {
    return {
      status: "late",
      message: "Atención: La fecha elegida supera el límite de garantía navideña.",
      subMessage: `Para garantizar entrega antes del 24 de Diciembre, la fecha límite es el ${TARIFF_CONFIG.christmasDeadlineDisplay}. Los envíos posteriores a esta fecha continuarán en tránsito regular de 2 a 3 semanas pero podrían entregarse después de Navidad.`,
      suggestedAction: "contact-whatsapp",
    };
  }
}
