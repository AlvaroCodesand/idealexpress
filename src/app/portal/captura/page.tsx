"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Agent, Client, Recipient } from "@/types";
import { SEED_AGENTS } from "@/constants/seedData";
import { TARIFF_CONFIG } from "@/constants/config";
import { calculateShipmentCost } from "@/utils/pricing";
import {
  Store,
  User,
  Search,
  CheckCircle2,
  Package,
  Printer,
  Sparkles,
  MapPin,
  Phone,
  RotateCcw,
  LogOut,
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

  // Estado del Remitente
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const [sender, setSender] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Milwaukee",
    state: "WI",
    zip: "53204",
  });

  // Estado del Destinatario
  const [recipient, setRecipient] = useState({
    fullName: "",
    phone: "",
    street: "",
    colonia: "",
    city: "",
    state: "",
    zip: "",
    references: "",
  });

  // Estado del Paquete y Costos
  const [weight, setWeight] = useState<number>(30);
  const [boxSize, setBoxSize] = useState<string>("18x18x18");
  const [declaredContent, setDeclaredContent] = useState<string>("Ropa y calzado familiar, regalos");
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const [declaredValue, setDeclaredValue] = useState<number>(200);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Consulta predictiva a la API
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

    if (client.recipients.length > 0) {
      handleSelectRecipient(client.recipients[0]);
    }
  };

  const handleSelectRecipient = (rec: Recipient) => {
    setRecipient({
      fullName: rec.fullName,
      phone: rec.phone,
      street: rec.street,
      colonia: rec.colonia,
      city: rec.city,
      state: rec.state,
      zip: rec.zip,
      references: rec.references || "",
    });
  };

  const handleResetSender = () => {
    setSelectedClient(null);
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
      street: "",
      colonia: "",
      city: "",
      state: "",
      zip: "",
      references: "",
    });
  };

  // Cálculo a través de la función pura de pricing
  const pricing = calculateShipmentCost(weight, hasInsurance, declaredValue);

  const handleSaveAndPrint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.fullName || !sender.phone || !recipient.fullName || !recipient.city || !recipient.state) {
      alert("Por favor completa los campos requeridos de remitente y destinatario.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/envios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: activeAgent.id,
          agentName: activeAgent.storeName,
          sender: {
            fullName: sender.fullName,
            phone: sender.phone,
            address: `${sender.address}, ${sender.city}, ${sender.state} ${sender.zip}`,
            city: sender.city,
            state: sender.state,
            zip: sender.zip,
          },
          recipient: {
            fullName: recipient.fullName,
            phone: recipient.phone,
            address: `${recipient.street}, ${recipient.colonia}`,
            city: recipient.city,
            state: recipient.state,
            zip: recipient.zip,
            references: recipient.references,
          },
          packageDetails: {
            weightLbs: weight,
            boxSize,
            declaredContent,
            hasInsurance,
            declaredValueUSD: hasInsurance ? declaredValue : 0,
            shippingCostUSD: pricing.shippingCostUSD,
            insuranceCostUSD: pricing.insuranceCostUSD,
            totalUSD: pricing.totalUSD,
          },
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.id) {
        router.push(`/portal/impresion/${json.data.id}`);
      } else {
        alert("Ocurrió un error al guardar el envío.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al registrar el envío.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* BARRA SUPERIOR DEL AGENTE */}
      <div className="bg-[#0F2438] text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] border border-[#8FB838] flex items-center justify-center shrink-0">
            <Store size={22} className="text-[#8FB838]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white">{activeAgent.storeName}</span>
              <span className="text-[10px] bg-slate-800 text-[#8FB838] px-2 py-0.5 rounded font-mono font-bold">
                {activeAgent.id}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {activeAgent.address}, {activeAgent.city}, {activeAgent.state} · Tel: {activeAgent.phone}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("ideal_active_agent");
            router.push("/portal");
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"
        >
          <LogOut size={14} />
          <span>Cambiar de Agente</span>
        </button>
      </div>

      <form onSubmit={handleSaveAndPrint} className="space-y-8">
        {/* SECCIÓN 1: REMITENTE (BÚSQUEDA PREDICTIVA) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User size={20} className="text-orange-600" />
                <span>Paso 1: Datos del Remitente (Quién envía desde EE.UU.)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Escribe nombre o teléfono para buscar en el historial de Microsoft 365.
              </p>
            </div>

            {selectedClient && (
              <button
                type="button"
                onClick={handleResetSender}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 font-semibold"
              >
                <RotateCcw size={13} />
                <span>Limpiar y nuevo cliente</span>
              </button>
            )}
          </div>

          {/* Buscador */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Búsqueda Inteligente en Historial (Nombre o Teléfono):</span>
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Escribe al menos 3 letras o número (ej. Juan, María, 414)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border-2 border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 bg-amber-50/30"
              />
              {isSearching && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  Buscando en Microsoft 365...
                </div>
              )}
            </div>

            {/* Dropdown */}
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
                    className="w-full text-left p-3 hover:bg-orange-50 transition border-b border-stone-100 flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-xs sm:text-sm text-slate-900 font-bold">
                        {cli.fullName}
                      </strong>
                      <span className="text-xs text-slate-500">
                        Tel: {cli.phone} · {cli.street}, {cli.city}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md shrink-0">
                      Seleccionar →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedClient && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>
                Cliente frecuente cargado desde la base de datos: <strong>{selectedClient.fullName}</strong>.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo:</label>
              <input
                type="text"
                required
                value={sender.fullName}
                onChange={(e) => setSender({ ...sender, fullName: e.target.value })}
                placeholder="Nombre y Apellidos"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono en EE.UU.:</label>
              <input
                type="tel"
                required
                value={sender.phone}
                onChange={(e) => setSender({ ...sender, phone: e.target.value })}
                placeholder="(414) 000-0000"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Dirección (Calle y Número):</label>
              <input
                type="text"
                required
                value={sender.address}
                onChange={(e) => setSender({ ...sender, address: e.target.value })}
                placeholder="Ej. 2412 S 15th St"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">ZIP:</label>
                <input
                  type="text"
                  value={sender.zip}
                  onChange={(e) => setSender({ ...sender, zip: e.target.value })}
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: DESTINATARIO */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin size={20} className="text-orange-600" />
              <span>Paso 2: Datos del Destinatario (Quién recibe en México)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Dirección exacta para entrega a domicilio con paquetería local en México.
            </p>
          </div>

          {selectedClient && selectedClient.recipients.length > 0 && (
            <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles size={14} className="text-orange-600" />
                <span>Destinatarios previos de {selectedClient.fullName} (1 clic para rellenar):</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {selectedClient.recipients.map((rec) => {
                  const isSelected = recipient.fullName === rec.fullName;
                  return (
                    <button
                      key={rec.id}
                      type="button"
                      onClick={() => handleSelectRecipient(rec)}
                      className={`text-left p-3 rounded-xl border transition flex items-start justify-between ${
                        isSelected
                          ? "bg-orange-50 border-orange-500 shadow-xs"
                          : "bg-white border-stone-200 hover:border-orange-300"
                      }`}
                    >
                      <div>
                        <strong className="block text-xs font-bold text-slate-900">{rec.fullName}</strong>
                        <span className="text-[11px] text-slate-500 block">
                          {rec.city}, {rec.state} · Tel: {rec.phone}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{rec.street}</span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={16} className="text-orange-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de quien recibe:</label>
              <input
                type="text"
                required
                value={recipient.fullName}
                onChange={(e) => setRecipient({ ...recipient, fullName: e.target.value })}
                placeholder="Nombre completo del familiar en México"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono en México (+52):</label>
              <input
                type="tel"
                required
                value={recipient.phone}
                onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                placeholder="+52 000 000 0000"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Calle y Número:</label>
              <input
                type="text"
                required
                value={recipient.street}
                onChange={(e) => setRecipient({ ...recipient, street: e.target.value })}
                placeholder="Calle, número exterior e interior"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Colonia / Barrio:</label>
              <input
                type="text"
                required
                value={recipient.colonia}
                onChange={(e) => setRecipient({ ...recipient, colonia: e.target.value })}
                placeholder="Colonia o Fraccionamiento"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad:</label>
                <input
                  type="text"
                  required
                  value={recipient.city}
                  onChange={(e) => setRecipient({ ...recipient, city: e.target.value })}
                  placeholder="Municipio"
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
                  placeholder="Estado"
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">C.P.:</label>
                <input
                  type="text"
                  required
                  value={recipient.zip}
                  onChange={(e) => setRecipient({ ...recipient, zip: e.target.value })}
                  placeholder="Código"
                  className="w-full px-2 py-2 text-xs border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Referencias del Domicilio (Cruces, color de casa, fachadas):
              </label>
              <input
                type="text"
                value={recipient.references}
                onChange={(e) => setRecipient({ ...recipient, references: e.target.value })}
                placeholder="Ej. Casa verde de dos pisos, frente al kinder, entre calle 2 y 4"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: CAJA, CONTENIDO Y TARIFA */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Package size={20} className="text-orange-600" />
              <span>Paso 3: Medidas, Contenido y Cobro</span>
            </h2>
            <p className="text-xs text-slate-500">
              Tarifa estándar de ${TARIFF_CONFIG.pricePerPound} / lb. Se cobra en la tienda al momento de la entrega.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Peso en Báscula (libras):
              </label>
              <input
                type="number"
                min="5"
                max="140"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-lg font-black text-slate-900 border border-stone-300 rounded-xl"
              />
              <span className="text-[11px] text-slate-500 block">
                Mínimo cobrable: {TARIFF_CONFIG.minPounds} lbs (${TARIFF_CONFIG.minPriceUSD} USD)
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Medida de la Caja:
              </label>
              <select
                value={boxSize}
                onChange={(e) => setBoxSize(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm font-semibold border border-stone-300 rounded-xl bg-white"
              >
                <option value="16x16x16">16&quot; x 16&quot; x 16&quot;</option>
                <option value="18x18x18">18&quot; x 18&quot; x 18&quot; (Estándar)</option>
                <option value="20x20x20">20&quot; x 20&quot; x 20&quot;</option>
                <option value="24x24x24">24&quot; x 24&quot; x 24&quot;</option>
                <option value="Medida especial">Medida Especial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={hasInsurance}
                  onChange={(e) => setHasInsurance(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded accent-orange-600"
                />
                <span className="text-xs font-bold text-slate-800">Incluir seguro</span>
              </label>
              {hasInsurance && (
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Valor declarado (USD):</label>
                  <input
                    type="number"
                    min="50"
                    max={TARIFF_CONFIG.maxDeclaredValueUSD}
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-bold border border-stone-300 rounded-xl"
                  />
                  <span className="text-[10px] text-slate-500">
                    Costo seguro (10%): ${pricing.insuranceCostUSD.toFixed(2)} USD
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Descripción del Contenido (para manifiesto aduanal):
              </label>
              <input
                type="text"
                required
                value={declaredContent}
                onChange={(e) => setDeclaredContent(e.target.value)}
                placeholder="Ej. Ropa de mujer, juguetes, zapatos tenis, cobijas"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
              />
              <span className="text-[10px] text-slate-400">
                Recuerda: No se permiten armas, medicamentos controlados, dinero en efectivo ni perecederos.
              </span>
            </div>
          </div>

          {/* Desglose */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-slate-600 text-center sm:text-left">
              <p>
                Peso facturado: <strong>{pricing.billableWeightLbs} lbs</strong> × ${TARIFF_CONFIG.pricePerPound} USD ={" "}
                <strong className="text-slate-900">${pricing.shippingCostUSD.toFixed(2)} USD</strong>
              </p>
              {hasInsurance && (
                <p>
                  Seguro adicional: <strong className="text-emerald-700">+${pricing.insuranceCostUSD.toFixed(2)} USD</strong>
                </p>
              )}
              <p className="text-[11px] text-slate-500">
                Plazo estimado de entrega: <strong>2 a 3 semanas</strong>
              </p>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total a Cobrar al Cliente:
              </span>
              <span className="text-3xl font-black text-orange-600">
                ${pricing.totalUSD.toFixed(2)} USD
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1E3A5F] hover:bg-[#152B47] disabled:opacity-50 text-white font-extrabold rounded-2xl text-sm uppercase tracking-wider transition shadow-lg active:scale-95 border-b-4 border-[#8FB838]"
          >
            <Printer size={20} className="text-[#8FB838]" />
            <span>{isSubmitting ? "Guardando en Microsoft 365..." : "Guardar Envío e Imprimir Hojas (2 Copias)"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
