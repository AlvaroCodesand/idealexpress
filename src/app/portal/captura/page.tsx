"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Agent, Client, Recipient } from "@/types";
import { SEED_AGENTS } from "@/constants/seedData";
import { encodeShipmentToQR } from "@/utils/qrPayload";
import {
  Store,
  User,
  Search,
  CheckCircle2,
  Package,
  Printer,
  Sparkles,
  MapPin,
  RotateCcw,
  LogOut,
  Calculator,
} from "lucide-react";

export default function CapturaEnvioPage() {
  const router = useRouter();
  const [activeAgent, setActiveAgent] = useState<Agent>(SEED_AGENTS[0]);

  useEffect(() => {
    const saved = localStorage.getItem("ideal_active_agent");
    if (saved) {
      try {
        setActiveAgent(JSON.parse(saved));
      } catch {
        // default
      }
    }
  }, []);

  // 1. Control y Encabezado de la Forma (Llenado a Mano)
  const [agentNameInput, setAgentNameInput] = useState<string>("El Correcaminos Multiservicios");
  const [boxNumber, setBoxNumber] = useState<string>("BC-1306");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const formatted = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    setDate(formatted);
  }, []);

  useEffect(() => {
    if (activeAgent?.storeName) {
      setAgentNameInput(activeAgent.storeName);
    }
  }, [activeAgent]);

  // 2. Quién Envía (Remitente en EE. UU.) con Autopopulate inteligente
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Sugerencias directas en los inputs de Nombre y Teléfono
  const [nameSuggestions, setNameSuggestions] = useState<Client[]>([]);
  const [showNameDropdown, setShowNameDropdown] = useState(false);

  const [sender, setSender] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Milwaukee",
    state: "WI",
    zip: "53204",
  });

  const handleSenderNameChange = async (val: string) => {
    setSender((prev) => ({ ...prev, fullName: val }));
    if (val.trim().length >= 1) {
      try {
        const res = await fetch(`/api/historial?q=${encodeURIComponent(val)}`);
        const json = await res.json();
        if (json.success && json.data) {
          setNameSuggestions(json.data);
          setShowNameDropdown(true);
        }
      } catch {
        // error
      }
    } else {
      setNameSuggestions([]);
      setShowNameDropdown(false);
    }
  };

  const handleSenderPhoneChange = async (val: string) => {
    setSender((prev) => ({ ...prev, phone: val }));
    const clean = val.replace(/\D/g, "");
    if (clean.length >= 2) {
      try {
        const res = await fetch(`/api/historial?q=${encodeURIComponent(clean)}`);
        const json = await res.json();
        if (json.success && json.data) {
          setNameSuggestions(json.data);
          setShowNameDropdown(true);
        }
      } catch {
        // error
      }
    }
  };

  // 3. Quién Recibe (Destinatario en México) con opción de destinatarios previos
  const [recipient, setRecipient] = useState({
    fullName: "",
    phone: "",
    phone2: "",
    deliveryType: "Domicilio" as "Domicilio" | "Oficina de Estafeta",
    street: "",
    colonia: "",
    city: "",
    state: "",
    zip: "",
    references: "",
  });

  // 4. Paquete (Llenado a Mano)
  const [serviceType, setServiceType] = useState<"Regular" | "Plus" | "Express">("Regular");
  const [dimX, setDimX] = useState<string>("18");
  const [dimY, setDimY] = useState<string>("18");
  const [dimZ, setDimZ] = useState<string>("18");
  const [weight, setWeight] = useState<string>("30");
  const [sobrepesoLbs, setSobrepesoLbs] = useState<string>("");
  const [sobrepesoTotal, setSobrepesoTotal] = useState<string>("");
  const [tvSize, setTvSize] = useState<string>("");
  const [tvCost, setTvCost] = useState<string>("");
  const [declaredContent, setDeclaredContent] = useState<string>("Ropa, calzado familiar, regalos");

  // Aseguranza al 5% (Llenado manual)
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const [insuranceValue, setInsuranceValue] = useState<string>("");
  const [insuranceCost, setInsuranceCost] = useState<string>("");

  // 5. Costos (Todo Llenado a Mano)
  const [costEnvio, setCostEnvio] = useState<string>("89.70");
  const [costCaja, setCostCaja] = useState<string>("");
  const [costPaleta, setCostPaleta] = useState<string>("");
  const [costDescuento, setCostDescuento] = useState<string>("");
  const [costTotal, setCostTotal] = useState<string>("89.70");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Consulta predictiva a la API para autollenar Remitente
  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/historial?q=${encodeURIComponent(searchQuery)}`);
        const json = await res.json();
        if (json.success) {
          setSearchResults(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setSender({
      fullName: client.fullName,
      phone: client.phone,
      address: client.street,
      city: client.city,
      state: client.state,
      zip: client.zip,
    });
    setSearchQuery("");
    setSearchResults([]);
    setNameSuggestions([]);
    setShowNameDropdown(false);

    if (client.recipients.length > 0) {
      handleSelectRecipient(client.recipients[0]);
    }
  };

  const handleSelectRecipient = (rec: Recipient) => {
    setRecipient({
      fullName: rec.fullName,
      phone: rec.phone,
      phone2: rec.phone2 || "",
      deliveryType: rec.deliveryType || "Domicilio",
      street: rec.street,
      colonia: rec.colonia || "",
      city: rec.city,
      state: rec.state,
      zip: rec.zip,
      references: rec.references || "",
    });
  };

  const handleClearForm = () => {
    setSelectedClient(null);
    setSearchQuery("");
    setBoxNumber("BC-" + Math.floor(1000 + Math.random() * 9000));
    setSender({
      fullName: "",
      phone: "",
      address: "",
      city: activeAgent.city || "Milwaukee",
      state: activeAgent.state || "WI",
      zip: activeAgent.zip || "53204",
    });
    setRecipient({
      fullName: "",
      phone: "",
      phone2: "",
      deliveryType: "Domicilio",
      street: "",
      colonia: "",
      city: "",
      state: "",
      zip: "",
      references: "",
    });
    setDimX("18");
    setDimY("18");
    setDimZ("18");
    setWeight("30");
    setSobrepesoLbs("");
    setSobrepesoTotal("");
    setTvSize("");
    setTvCost("");
    setDeclaredContent("");
    setHasInsurance(false);
    setInsuranceValue("");
    setInsuranceCost("");
    setCostEnvio("");
    setCostCaja("");
    setCostPaleta("");
    setCostDescuento("");
    setCostTotal("");
  };

  // Botón opcional de suma rápida si el agente no quiere sumar en calculadora manual
  const handleAutoSum = () => {
    const envio = parseFloat(costEnvio) || 0;
    const caja = parseFloat(costCaja) || 0;
    const aseg = parseFloat(insuranceCost) || 0;
    const sobrepeso = parseFloat(sobrepesoTotal) || 0;
    const tv = parseFloat(tvCost) || 0;
    const paleta = parseFloat(costPaleta) || 0;
    const descuento = parseFloat(costDescuento) || 0;
    const sum = envio + caja + aseg + sobrepeso + tv + paleta - descuento;
    setCostTotal(sum > 0 ? sum.toFixed(2) : "0.00");
  };

  const handleSaveAndPrint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boxNumber || !sender.fullName || !recipient.fullName || !costTotal) {
      alert("Por favor completa el Número de Caja, Remitente, Destinatario y Total.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/envios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: activeAgent.id,
          agentName: agentNameInput || activeAgent.storeName,
          sender,
          recipient,
          packageDetails: {
            serviceType,
            weightLbs: parseFloat(weight) || 0,
            boxSize: `${dimX}x${dimY}x${dimZ}`,
            declaredContent,
            hasInsurance,
            declaredValueUSD: parseFloat(insuranceValue) || 0,
            shippingCostUSD: parseFloat(costEnvio) || 0,
            insuranceCostUSD: parseFloat(insuranceCost) || 0,
            boxPriceUSD: parseFloat(costCaja) || 0,
            tvSizeInches: tvSize || undefined,
            tvPriceUSD: parseFloat(tvCost) || 0,
            discountUSD: parseFloat(costDescuento) || 0,
            totalUSD: parseFloat(costTotal) || 0,
            boxNumber,
            date,
          },
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const qrCodeData = encodeShipmentToQR(json.data);
        router.push(`/portal/impresion/${json.data.id}?d=${encodeURIComponent(qrCodeData)}`);
      } else {
        alert("Error al registrar el envío. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al contactar al servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* HEADER DE LA TIENDA Y ACCIONES RÁPIDAS */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0E283F] text-white flex items-center justify-center font-bold">
            <Store size={22} className="text-[#8FB838]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-display font-bold text-[#0E283F]">
                {activeAgent.storeName}
              </h1>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Punto Autorizado
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Atiende: {activeAgent.contactName} · {activeAgent.address}, {activeAgent.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/portal/envios"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0E283F] hover:text-white bg-[#FAF8F5] hover:bg-[#0E283F] border border-[#E8E1D5] rounded-lg transition"
            title="Ver todas las cajas y descargar manifiesto de carga"
          >
            <Package size={14} className="text-[#3E5C10]" />
            <span>Manifiesto de Cajas</span>
          </Link>

          <button
            type="button"
            onClick={handleClearForm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
            title="Limpiar formulario para un nuevo envío"
          >
            <RotateCcw size={14} />
            <span>Nueva Hoja</span>
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("ideal_agent_authenticated");
              router.push("/portal");
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={14} />
            <span>Salir</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveAndPrint} className="space-y-6">
        {/* ENCABEZADO OFICIAL: NÚMERO DE CAJA, AGENTE Y FECHA (LLENADO A MANO) */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-black pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E283F] block">
                FORMATO OFICIAL DE MOSTRADOR
              </span>
              <h2 className="text-2xl font-display font-black text-black uppercase">
                FORMA DE ENVÍO
              </h2>
            </div>

            {/* Recuadro Negro Oficial de NÚMERO DE CAJA (Editable a mano) */}
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-xs uppercase tracking-wider text-black">
                NÚMERO DE CAJA:
              </span>
              <input
                type="text"
                required
                value={boxNumber}
                onChange={(e) => setBoxNumber(e.target.value)}
                placeholder="BC-1306"
                className="w-40 px-3 py-1.5 text-xl font-mono font-black text-black bg-amber-50 border-3 border-black rounded text-center tracking-wider uppercase shadow-xs"
              />
            </div>
          </div>

          {/* Fila directa de Agente y Fecha exactamente como en la hoja física */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1 font-mono text-xs">
            <div className="sm:col-span-8 flex items-center gap-2">
              <label className="font-bold text-black uppercase shrink-0">
                Agente:
              </label>
              <input
                type="text"
                required
                value={agentNameInput}
                onChange={(e) => setAgentNameInput(e.target.value)}
                placeholder="Nombre del Agente o Tienda"
                className="w-full px-3 py-1.5 text-xs font-bold border-b-2 border-stone-400 focus:border-black bg-transparent focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <label className="font-bold text-black uppercase shrink-0">
                Fecha:
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="DD/MM/AAAA"
                className="w-full px-3 py-1.5 text-xs font-bold font-mono border-b-2 border-stone-400 focus:border-black bg-transparent focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* 1. QUIÉN ENVÍA (AUTOPOPULA CON BÚSQUEDA Y EDITABLE) */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
          <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-display font-bold text-[#0E283F] flex items-center gap-2">
                <User size={18} className="text-[#7BA029]" />
                <span>Quién Envía (Remitente en EE.UU.)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Escribe en el buscador para autollenar datos de clientes habituales.
              </p>
            </div>
          </div>

          {/* BUSCADOR DE HISTORIAL */}
          <div className="relative">
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar cliente en base histórica por nombre o teléfono (ej. Juan, María, 414)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-[#8FB838]/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E283F] bg-[#FAF8F5]"
              />
              {isSearching && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                  Buscando...
                </div>
              )}
            </div>

            {/* Dropdown de Clientes */}
            {searchResults.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                <div className="p-2 bg-stone-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Clientes encontrados en el historial ({searchResults.length})
                </div>
                {searchResults.map((cli) => (
                  <button
                    key={cli.id}
                    type="button"
                    onClick={() => handleSelectClient(cli)}
                    className="w-full text-left p-3 hover:bg-[#FAF8F5] transition border-b border-stone-100 flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-xs sm:text-sm text-slate-900 font-bold">
                        {cli.fullName}
                      </strong>
                      <span className="text-xs text-slate-500">
                        Tel: {cli.phone} · {cli.street}, {cli.city}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#3E5C10] bg-[#EBF3DC] px-2.5 py-1 rounded-md shrink-0">
                      Autollenar →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedClient && (
            <div className="bg-[#EBF3DC] border border-[#7BA029]/40 rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#3E5C10] font-medium">
              <CheckCircle2 size={16} className="text-[#3E5C10] shrink-0" />
              <span>Cliente autollenado: <strong>{selectedClient.fullName}</strong>. Puedes modificar cualquier campo.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="sm:col-span-2 relative">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Nombre y Apellido(s):</span>
                <span className="text-xs text-slate-500 font-normal">Autocompleta mientras escribes</span>
              </label>
              <input
                type="text"
                required
                value={sender.fullName}
                onChange={(e) => handleSenderNameChange(e.target.value)}
                onFocus={() => {
                  if (nameSuggestions.length > 0) setShowNameDropdown(true);
                }}
                placeholder="Escribe el nombre del cliente (ej. Juan, María)..."
                className="w-full px-3 py-2 text-xs sm:text-sm border-2 border-stone-300 focus:border-[#0E283F] rounded-xl font-medium"
              />

              {/* DROPDOWN FLOTANTE DE AUTOCOMPLETADO */}
              {showNameDropdown && nameSuggestions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white border-2 border-[#0E283F] rounded-xl shadow-2xl max-h-56 overflow-y-auto">
                  <div className="p-2 bg-[#FAF8F5] text-[11px] font-mono font-bold text-[#0E283F] uppercase border-b border-stone-200 flex justify-between items-center">
                    <span>Clientes frecuentes ({nameSuggestions.length}) · Clic para autollenar</span>
                    <button
                      type="button"
                      onClick={() => setShowNameDropdown(false)}
                      className="text-slate-400 hover:text-black font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                  {nameSuggestions.map((cli) => (
                    <button
                      key={cli.id}
                      type="button"
                      onClick={() => handleSelectClient(cli)}
                      className="w-full text-left p-3 hover:bg-[#EBF3DC] transition border-b border-stone-100 flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <strong className="block text-xs sm:text-sm text-slate-900 group-hover:text-[#3E5C10]">
                          {cli.fullName}
                        </strong>
                        <span className="text-xs text-slate-600 font-mono">
                          Tel: {cli.phone} · {cli.street}, {cli.city}
                        </span>
                        {cli.recipients.length > 0 && (
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            Destinatarios en México: {cli.recipients.map((r) => r.fullName).join(", ")}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#3E5C10] bg-white px-2.5 py-1 rounded-lg border border-[#7BA029]/40 shrink-0 shadow-2xs">
                        Autollenar ↵
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono: (___) ___-____</label>
              <input
                type="tel"
                required
                value={sender.phone}
                onChange={(e) => handleSenderPhoneChange(e.target.value)}
                placeholder="(414) 000-0000"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Dirección:</label>
              <input
                type="text"
                required
                value={sender.address}
                onChange={(e) => setSender({ ...sender, address: e.target.value })}
                placeholder="Calle y número"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad:</label>
                <input
                  type="text"
                  value={sender.city}
                  onChange={(e) => setSender({ ...sender, city: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estado:</label>
                <input
                  type="text"
                  value={sender.state}
                  onChange={(e) => setSender({ ...sender, state: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">C.P.:</label>
                <input
                  type="text"
                  value={sender.zip}
                  onChange={(e) => setSender({ ...sender, zip: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. QUIÉN RECIBE (CON OPCIÓN DE DESTINATARIOS HISTÓRICOS) */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
          <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-display font-bold text-[#0E283F] flex items-center gap-2">
                <MapPin size={18} className="text-[#7BA029]" />
                <span>Quién Recibe (Destinatario en México)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Elige de los destinatarios anteriores del cliente o llena manualmente.
              </p>
            </div>

            {/* Recibe En: Domicilio / Oficina Estafeta */}
            <div className="inline-flex items-center gap-3 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#E8E1D5] text-xs font-bold">
              <span className="text-slate-500 text-[11px] uppercase pl-1">Recibe En:</span>
              <label className="flex items-center gap-1.5 cursor-pointer px-2.5 py-1 rounded-lg transition has-checked:bg-[#0E283F] has-checked:text-white">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Domicilio"
                  checked={recipient.deliveryType === "Domicilio"}
                  onChange={() => setRecipient({ ...recipient, deliveryType: "Domicilio" })}
                  className="sr-only"
                />
                <span>Domicilio</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer px-2.5 py-1 rounded-lg transition has-checked:bg-[#0E283F] has-checked:text-white">
                <input
                  type="radio"
                  name="deliveryType"
                  value="Oficina de Estafeta"
                  checked={recipient.deliveryType === "Oficina de Estafeta"}
                  onChange={() => setRecipient({ ...recipient, deliveryType: "Oficina de Estafeta" })}
                  className="sr-only"
                />
                <span>Oficina de Estafeta</span>
              </label>
            </div>
          </div>

          {/* Destinatarios previos si se seleccionó un cliente */}
          {selectedClient && selectedClient.recipients.length > 0 && (
            <div className="space-y-2 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E1D5]">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#7BA029]" />
                <span>Destinatarios registrados de {selectedClient.fullName}:</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {selectedClient.recipients.map((rec) => {
                  const isSelected = recipient.fullName === rec.fullName;
                  return (
                    <button
                      key={rec.id || rec.fullName}
                      type="button"
                      onClick={() => handleSelectRecipient(rec)}
                      className={`text-left p-2.5 rounded-xl border transition flex items-start justify-between ${
                        isSelected
                          ? "bg-white border-[#0E283F] shadow-xs ring-2 ring-[#7BA029]/20"
                          : "bg-white/80 border-stone-200 hover:border-[#0E283F]/30"
                      }`}
                    >
                      <div>
                        <strong className="block text-xs font-bold text-slate-900">{rec.fullName}</strong>
                        <span className="text-[11px] text-slate-500 block">
                          {rec.city}, {rec.state} · Tel: {rec.phone}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={16} className="text-[#3E5C10] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre y Apellido(s):</label>
              <input
                type="text"
                required
                value={recipient.fullName}
                onChange={(e) => setRecipient({ ...recipient, fullName: e.target.value })}
                placeholder="Nombre completo de quien recibe"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono 1:</label>
              <input
                type="tel"
                required
                value={recipient.phone}
                onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                placeholder="(000) 000-0000"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono 2:</label>
              <input
                type="tel"
                value={recipient.phone2}
                onChange={(e) => setRecipient({ ...recipient, phone2: e.target.value })}
                placeholder="Teléfono alternativo"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Dirección:</label>
              <input
                type="text"
                required
                value={recipient.street}
                onChange={(e) => setRecipient({ ...recipient, street: e.target.value })}
                placeholder="Calle y número"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Colonia:</label>
              <input
                type="text"
                value={recipient.colonia}
                onChange={(e) => setRecipient({ ...recipient, colonia: e.target.value })}
                placeholder="Colonia o fraccionamiento"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:col-span-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad/Municipio:</label>
                <input
                  type="text"
                  required
                  value={recipient.city}
                  onChange={(e) => setRecipient({ ...recipient, city: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estado:</label>
                <input
                  type="text"
                  required
                  value={recipient.state}
                  onChange={(e) => setRecipient({ ...recipient, state: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Código Postal:</label>
                <input
                  type="text"
                  value={recipient.zip}
                  onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. PAQUETE Y DESGLOSE DE COSTOS (FORMATO FÍSICO A MANO) */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-display font-bold text-[#0E283F] flex items-center gap-2">
                <Package size={18} className="text-[#7BA029]" />
                <span>3. Paquete y Costos (Llenado a Mano)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Llena las casillas y los valores en dólares exactamente como en el papel.
              </p>
            </div>

            <div className="flex gap-2">
              {(["Regular", "Plus", "Express"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setServiceType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition border ${
                    serviceType === t
                      ? "bg-[#0E283F] text-white border-black"
                      : "bg-[#FAF8F5] text-slate-700 border-stone-300"
                  }`}
                >
                  [ {serviceType === t ? "X" : " "} ] {t}
                </button>
              ))}
            </div>
          </div>

          {/* Dos Columnas como en la Forma Física */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-2 border-black rounded-xl overflow-hidden">
            {/* LADO IZQUIERDO: PAQUETE, MEDIDAS Y ASEGURANZA */}
            <div className="md:col-span-7 p-4 border-b md:border-b-0 md:border-r border-black space-y-4 bg-white">
              <strong className="font-mono font-black text-xs uppercase block text-black border-b border-stone-200 pb-1">
                Paquete:
              </strong>

              <div className="grid grid-cols-2 gap-4">
                {/* Medidas X x Y x Z */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-700 mb-1">
                    Medidas: ___ x ___ x ___
                  </label>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <input
                      type="text"
                      value={dimX}
                      onChange={(e) => setDimX(e.target.value)}
                      placeholder="X"
                      className="w-12 px-1 py-1 border border-stone-300 rounded text-center font-bold"
                    />
                    <span>x</span>
                    <input
                      type="text"
                      value={dimY}
                      onChange={(e) => setDimY(e.target.value)}
                      placeholder="Y"
                      className="w-12 px-1 py-1 border border-stone-300 rounded text-center font-bold"
                    />
                    <span>x</span>
                    <input
                      type="text"
                      value={dimZ}
                      onChange={(e) => setDimZ(e.target.value)}
                      placeholder="Z"
                      className="w-12 px-1 py-1 border border-stone-300 rounded text-center font-bold"
                    />
                  </div>
                </div>

                {/* Peso */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-700 mb-1">
                    Peso: _____ lbs
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="30"
                    className="w-24 px-2 py-1 text-sm font-mono font-bold border border-stone-300 rounded"
                  />
                </div>

                {/* Sobrepeso */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-mono font-bold text-slate-700 mb-1">
                    Sobrepeso: _____ lbs x $2.99 = $ _____
                  </label>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <input
                      type="text"
                      value={sobrepesoLbs}
                      onChange={(e) => setSobrepesoLbs(e.target.value)}
                      placeholder="0"
                      className="w-16 px-2 py-1 border border-stone-300 rounded font-bold"
                    />
                    <span>lbs x $2.99 = $</span>
                    <input
                      type="text"
                      value={sobrepesoTotal}
                      onChange={(e) => setSobrepesoTotal(e.target.value)}
                      placeholder="0.00"
                      className="w-24 px-2 py-1 border border-stone-300 rounded font-bold"
                    />
                  </div>
                </div>

                {/* TV - Tamaño */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-mono font-bold text-slate-700 mb-1">
                    TV - Tamaño: _____ pulgadas = $ _____
                  </label>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <input
                      type="text"
                      value={tvSize}
                      onChange={(e) => setTvSize(e.target.value)}
                      placeholder='Ej. 55"'
                      className="w-20 px-2 py-1 border border-stone-300 rounded font-bold"
                    />
                    <span>pulgadas = $</span>
                    <input
                      type="text"
                      value={tvCost}
                      onChange={(e) => setTvCost(e.target.value)}
                      placeholder="0.00"
                      className="w-24 px-2 py-1 border border-stone-300 rounded font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Aseguranza al 5% */}
              <div className="border-t border-stone-200 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-mono font-bold text-xs">
                    <input
                      type="checkbox"
                      checked={hasInsurance}
                      onChange={(e) => setHasInsurance(e.target.checked)}
                      className="w-4 h-4 text-black rounded"
                    />
                    <span>Aseguranza:*</span>
                  </label>

                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span>Valor: $</span>
                    <input
                      type="text"
                      value={insuranceValue}
                      onChange={(e) => setInsuranceValue(e.target.value)}
                      placeholder="200"
                      className="w-20 px-1 py-1 border border-stone-300 rounded text-center font-bold"
                    />
                    <span>x 5% = $</span>
                    <input
                      type="text"
                      value={insuranceCost}
                      onChange={(e) => setInsuranceCost(e.target.value)}
                      placeholder="10.00"
                      className="w-20 px-1 py-1 border border-stone-300 rounded text-center font-bold text-[#3E5C10]"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 italic leading-tight">
                  *La Aseguranza solo aplica a la Pérdida Total del paquete y solo cubre el contenido del envío declarado al momento de enviar su paquete y del cual el cliente tenga evidencia de compra de este al momento de hacer alguna reclamación, si la misma excede $500. La Aseguranza de Ideal Express NO CUBRE herramientas, electrónicos ni objetos frágiles ni perecederos, ni paquetes mal empacados por el cliente.
                </p>
              </div>

              {/* Contenido del Paquete */}
              <div className="border-t border-stone-200 pt-2 space-y-1">
                <label className="block text-xs font-mono font-bold text-slate-700">
                  Contenido del Paquete:
                </label>
                <textarea
                  rows={2}
                  required
                  value={declaredContent}
                  onChange={(e) => setDeclaredContent(e.target.value)}
                  placeholder="Escribe lo que contiene la caja (ropa, calzado, cobijas, etc.)..."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            {/* LADO DERECHO: COSTOS LLENADOS A MANO */}
            <div className="md:col-span-5 p-4 bg-stone-50 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between border-b border-black pb-1 mb-3">
                  <strong className="font-mono font-black text-xs uppercase text-black">
                    Costo Paquetería Regular:
                  </strong>
                  <button
                    type="button"
                    onClick={handleAutoSum}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0E283F] bg-white px-2 py-0.5 rounded border border-stone-300 hover:bg-stone-100"
                    title="Sumar valores automáticamente"
                  >
                    <Calculator size={12} />
                    <span>Auto Sumar</span>
                  </button>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span>Envío: $</span>
                    <input
                      type="text"
                      required
                      value={costEnvio}
                      onChange={(e) => setCostEnvio(e.target.value)}
                      placeholder="89.70"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right font-bold"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Caja: +$</span>
                    <input
                      type="text"
                      value={costCaja}
                      onChange={(e) => setCostCaja(e.target.value)}
                      placeholder="0.00"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Aseguranza: +$</span>
                    <input
                      type="text"
                      value={insuranceCost}
                      onChange={(e) => setInsuranceCost(e.target.value)}
                      placeholder="0.00"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right text-[#3E5C10] font-bold"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Sobrepeso / TV: +$</span>
                    <input
                      type="text"
                      value={sobrepesoTotal || tvCost}
                      onChange={(e) => setSobrepesoTotal(e.target.value)}
                      placeholder="0.00"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Paleta (Solo si aplica): $</span>
                    <input
                      type="text"
                      value={costPaleta}
                      onChange={(e) => setCostPaleta(e.target.value)}
                      placeholder="0.00"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right"
                    />
                  </div>

                  <div className="flex items-center justify-between text-emerald-800">
                    <span>Descuento: -$</span>
                    <input
                      type="text"
                      value={costDescuento}
                      onChange={(e) => setCostDescuento(e.target.value)}
                      placeholder="0.00"
                      className="w-28 px-2 py-1 bg-white border border-stone-300 rounded text-right font-bold text-emerald-800"
                    />
                  </div>
                </div>
              </div>

              {/* TOTAL A MANO */}
              <div className="border-t-2 border-black pt-3">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-black text-sm uppercase text-black">TOTAL: $</span>
                  <input
                    type="text"
                    required
                    value={costTotal}
                    onChange={(e) => setCostTotal(e.target.value)}
                    placeholder="89.70"
                    className="w-36 px-2 py-1.5 bg-white border-2 border-black rounded text-right font-black text-xl text-[#0E283F]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN PARA GUARDAR E IMPRIMIR */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0E283F] hover:bg-[#183D61] disabled:opacity-50 text-white font-extrabold rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition shadow-lg active:scale-95"
          >
            <Printer size={18} className="text-[#8FB838]" />
            <span>{isSubmitting ? "Registrando..." : "Guardar e Imprimir Forma Oficial (2 Hojas)"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
