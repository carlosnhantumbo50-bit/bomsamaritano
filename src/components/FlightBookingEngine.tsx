import React, { useState, useEffect } from 'react';
import {
  Plane,
  Calendar,
  Users,
  Search,
  Filter,
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Luggage,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Printer,
  ChevronDown,
  X,
  Building2,
  BadgeCheck,
} from 'lucide-react';
import { FlightOffer, FlightSearchParams, PassengerInfo, FlightBookingResult, TravelProviderStatus } from '../types';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

export const POPULAR_AIRPORTS = [
  { code: 'MPM', city: 'Maputo', country: 'Moçambique', name: 'Aeroporto Internacional de Mavalane' },
  { code: 'BEW', city: 'Beira', country: 'Moçambique', name: 'Aeroporto da Beira' },
  { code: 'APL', city: 'Nampula', country: 'Moçambique', name: 'Aeroporto de Nampula' },
  { code: 'VNX', city: 'Vilankulo', country: 'Moçambique', name: 'Aeroporto de Vilankulo' },
  { code: 'POL', city: 'Pemba', country: 'Moçambique', name: 'Aeroporto de Pemba' },
  { code: 'LIS', city: 'Lisboa', country: 'Portugal', name: 'Aeroporto Humberto Delgado' },
  { code: 'JNB', city: 'Joanesburgo', country: 'África do Sul', name: 'O.R. Tambo International' },
  { code: 'DXB', city: 'Dubai', country: 'Emirados Árabes Unidos', name: 'Dubai International' },
  { code: 'DOH', city: 'Doha', country: 'Catar', name: 'Hamad International' },
  { code: 'ADD', city: 'Adis Abeba', country: 'Etiópia', name: 'Bole International' },
  { code: 'IST', city: 'Istambul', country: 'Turquia', name: 'Istanbul Airport' },
];

export const FlightBookingEngine: React.FC = () => {
  // Search parameters
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [origin, setOrigin] = useState('MPM');
  const [destination, setDestination] = useState('LIS');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 18);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Económica');

  // Search execution state
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [providerStatus, setProviderStatus] = useState<TravelProviderStatus | null>(null);

  // Filters
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | 'stops'>('all');
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(100000);
  const [selectedAirline, setSelectedAirline] = useState<string>('all');

  // Booking Modal State
  const [selectedOffer, setSelectedOffer] = useState<FlightOffer | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'passengers' | 'payment' | 'confirmation'>('passengers');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<FlightBookingResult | null>(null);

  // Passenger form state
  const [passengerDetails, setPassengerDetails] = useState<PassengerInfo[]>([
    {
      title: 'Sr.',
      firstName: '',
      lastName: '',
      gender: 'M',
      dateOfBirth: '',
      passportNumber: '',
      passportExpiry: '',
      nationality: 'Moçambicana',
    },
  ]);

  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'card' | 'bank_transfer' | 'pay_at_agency'>('mpesa');
  const [specialRequests, setSpecialRequests] = useState('');

  // Load provider status on mount
  useEffect(() => {
    fetch('/api/travel/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProviderStatus(data.data);
        }
      })
      .catch((err) => console.warn('Could not fetch travel provider status:', err));

    // Initial search
    executeSearch();
  }, []);

  // Update passenger details array size if passengers count changes
  useEffect(() => {
    setPassengerDetails((prev) => {
      const copy = [...prev];
      while (copy.length < passengers) {
        copy.push({
          title: 'Sr.',
          firstName: '',
          lastName: '',
          gender: 'M',
          dateOfBirth: '',
          passportNumber: '',
          passportExpiry: '',
          nationality: 'Moçambicana',
        });
      }
      return copy.slice(0, passengers);
    });
  }, [passengers]);

  const executeSearch = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate: tripType === 'round-trip' ? returnDate : undefined,
          passengers,
          cabinClass,
          tripType,
        }),
      });

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setOffers(json.data);
        setHasSearched(true);
        if (json.data.length > 0) {
          const maxP = Math.max(...json.data.map((o: FlightOffer) => o.priceMzn));
          setFilterMaxPrice(maxP + 5000);
        }
      } else {
        setErrorMsg(json.error || 'Nenhum voo encontrado para as datas e rota solicitadas.');
      }
    } catch (err: any) {
      console.error('Error fetching flights:', err);
      setErrorMsg('Falha ao comunicar com o servidor de reservas em tempo real.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  // Filter offers
  const filteredOffers = offers.filter((offer) => {
    if (filterStops === 'direct' && offer.stops !== 0) return false;
    if (filterStops === 'stops' && offer.stops === 0) return false;
    if (offer.priceMzn > filterMaxPrice) return false;
    if (selectedAirline !== 'all' && offer.airlineCode !== selectedAirline) return false;
    return true;
  });

  // Open booking modal
  const handleInitiateBooking = (offer: FlightOffer) => {
    setSelectedOffer(offer);
    setBookingStep('passengers');
    setBookingModalOpen(true);
  };

  // Submit booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    for (let i = 0; i < passengerDetails.length; i++) {
      const p = passengerDetails[i];
      if (!p.firstName.trim() || !p.lastName.trim()) {
        alert(`Por favor, preencha o nome completo do Passageiro ${i + 1}.`);
        return;
      }
      if (!p.passportNumber.trim()) {
        alert(`Por favor, indique o número de passaporte do Passageiro ${i + 1}.`);
        return;
      }
    }

    if (!contactInfo.name.trim() || !contactInfo.phone.trim()) {
      alert('Por favor, informe o nome e telefone do responsável pela reserva.');
      return;
    }

    setBookingLoading(true);
    try {
      const res = await fetch('/api/flights/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightOfferId: selectedOffer?.id,
          flightOffer: selectedOffer,
          passengers: passengerDetails,
          contact: contactInfo,
          paymentMethod,
          specialRequests,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setConfirmedBooking(json.data);
        setBookingStep('confirmation');

        // Save to local quote manager as confirmed reservation
        saveQuoteLocally({
          type: 'Voo',
          clientName: contactInfo.name,
          clientPhone: contactInfo.phone,
          details: `Reserva Confirmada PNR: ${json.data.pnr} • ${selectedOffer?.airlineName} (${selectedOffer?.flightNumber}) • Rota: ${selectedOffer?.origin.code} ➔ ${selectedOffer?.destination.code} • ${passengers} Passageiro(s) • Total: ${(selectedOffer?.priceMzn || 0) * passengers} MT • Pagamento: ${paymentMethod.toUpperCase()}`,
        });
      } else {
        alert(json.error || 'Erro ao emitir reserva.');
      }
    } catch (err: any) {
      alert('Falha ao processar reserva: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSendBookingToWhatsApp = () => {
    if (!confirmedBooking || !selectedOffer) return;

    const msg = [
      '✈️ *CONFIRMAÇÃO DE RESERVA DE VOO — BOM SAMARITANO*',
      '',
      `📋 *Código PNR:* ${confirmedBooking.pnr}`,
      `🎫 *Bilhete Referência:* ${confirmedBooking.ticketNumber}`,
      `👤 *Responsável:* ${confirmedBooking.contact.name}`,
      `📞 *Contacto:* ${confirmedBooking.contact.phone}`,
      `✉️ *E-mail:* ${confirmedBooking.contact.email || 'Não informado'}`,
      '',
      '🛫 *DADOS DO VOO:*',
      `• Companhia: ${selectedOffer.airlineName} (${selectedOffer.flightNumber})`,
      `• Aeronave: ${selectedOffer.aircraft}`,
      `• Partida: ${selectedOffer.origin.city} (${selectedOffer.origin.code}) às ${selectedOffer.origin.time} em ${selectedOffer.origin.date}`,
      `• Chegada: ${selectedOffer.destination.city} (${selectedOffer.destination.code}) às ${selectedOffer.destination.time}`,
      `• Duração: ${selectedOffer.duration} (${selectedOffer.stops === 0 ? 'Voo Directo' : selectedOffer.stopsDetails || 'Com escala'})`,
      `• Classe: ${selectedOffer.cabinClass}`,
      `• Bagagem: ${selectedOffer.baggage}`,
      '',
      `👥 *PASSAGEIROS (${confirmedBooking.passengers.length}):*`,
      ...confirmedBooking.passengers.map(
        (p, idx) => `  ${idx + 1}. ${p.title} ${p.firstName} ${p.lastName} — Passaporte: ${p.passportNumber} (${p.nationality})`
      ),
      '',
      `💳 *Forma de Pagamento:* ${paymentMethod.toUpperCase()}`,
      `💰 *Valor Total:* ${(selectedOffer.priceMzn * confirmedBooking.passengers.length).toLocaleString('pt-PT')} MT`,
      '',
      'Solicito a validação do bilhete e confirmação de emissão oficial. Obrigado!',
    ].join('\n');

    openWhatsApp(msg);
  };

  const uniqueAirlines = Array.from(new Set(offers.map((o) => o.airlineCode))).map((code) => {
    const item = offers.find((o) => o.airlineCode === code);
    return { code, name: item?.airlineName || code };
  });

  return (
    <div className="space-y-8">
      {/* Live Provider Badge */}
      <div className="bg-gradient-to-r from-[#11164D] via-[#1a216e] to-[#11164D] text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F58220] flex items-center justify-center text-white shrink-0 shadow-md">
            <BadgeCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-orange-400">Motor de Reservas em Tempo Real</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              GDS Amadeus & Integração Directa com Linhas Aéreas em Maputo
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-white/10 px-4 py-2 rounded-2xl border border-white/15">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Emissão imediata de PNR • Suporte na Av. Eduardo Mondlane</span>
        </div>
      </div>

      {/* Dynamic Search Box */}
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          {/* Trip Type Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setTripType('round-trip')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tripType === 'round-trip' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ida e Volta
            </button>
            <button
              type="button"
              onClick={() => setTripType('one-way')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tripType === 'one-way' ? 'bg-[#11164D] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Apenas Ida
            </button>
          </div>

          {/* Cabin & Passenger Quick Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700">
              <Users className="w-3.5 h-3.5 text-[#F58220]" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                aria-label="Número de Passageiros"
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Passageiro' : 'Passageiros'}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                aria-label="Classe de Cabine"
                className="bg-transparent font-semibold outline-none cursor-pointer"
              >
                <option value="Económica">Classe Económica</option>
                <option value="Executiva">Classe Executiva (Business)</option>
                <option value="Primeira">Primeira Classe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220] focus-within:ring-2 focus-within:ring-[#F58220]/20">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Origem (Partida)</label>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#F58220] shrink-0 rotate-45" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                aria-label="Aeroporto de Origem"
                className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer"
              >
                {POPULAR_AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) — {a.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
            <button
              type="button"
              onClick={handleSwapAirports}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:border-[#F58220] hover:text-[#F58220] flex items-center justify-center transition-all z-10"
              title="Trocar Origem e Destino"
            >
              <ArrowRightLeft className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220] focus-within:ring-2 focus-within:ring-[#F58220]/20">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Destino (Chegada)</label>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#11164D] shrink-0" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Aeroporto de Destino"
                className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer"
              >
                {POPULAR_AIRPORTS.filter((a) => a.code !== origin).map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) — {a.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Departure Date */}
          <div className={`${tripType === 'round-trip' ? 'md:col-span-2' : 'md:col-span-3'} bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220]`}>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data de Ida</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="date"
                value={departureDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDepartureDate(e.target.value)}
                aria-label="Data de Ida"
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Return Date (if round-trip) */}
          {tripType === 'round-trip' && (
            <div className="md:col-span-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220]">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data de Regresso</label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="date"
                  value={returnDate}
                  min={departureDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setReturnDate(e.target.value)}
                  aria-label="Data de Regresso"
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                />
              </div>
            </div>
          )}

          {/* Search CTA */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={executeSearch}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-[#F58220] hover:bg-[#d96f14] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
              title="Pesquisar Voos"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {/* Results Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#11164D]">
              Voos Disponíveis em Tempo Real ({filteredOffers.length})
            </h3>
            <p className="text-xs text-slate-500">
              Rota: <strong className="text-slate-800">{origin}</strong> para <strong className="text-slate-800">{destination}</strong> • Datas verificadas no GDS
            </p>
          </div>

          {/* Filter Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => setFilterStops('all')}
                className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'all' ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setFilterStops('direct')}
                className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'direct' ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                Directos
              </button>
              <button
                type="button"
                onClick={() => setFilterStops('stops')}
                className={`px-3 py-1 rounded-lg transition-all ${filterStops === 'stops' ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                Com Escala
              </button>
            </div>

            {uniqueAirlines.length > 1 && (
              <select
                value={selectedAirline}
                onChange={(e) => setSelectedAirline(e.target.value)}
                aria-label="Filtrar por Companhia Aérea"
                className="bg-slate-100 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl outline-none border-none cursor-pointer"
              >
                <option value="all">Todas as Companhias</option>
                {uniqueAirlines.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 shadow-sm border border-slate-100">
            <div className="w-12 h-12 border-3 border-[#F58220] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-1">
              <p className="text-base font-bold text-slate-800">A consultar disponibilidades no GDS...</p>
              <p className="text-xs text-slate-500">Verificando tarifas mais baixas, assentos e conexões de voo</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && errorMsg && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-3xl p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Aviso de Pesquisa</p>
              <p className="text-xs text-amber-800 mt-1">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && hasSearched && filteredOffers.length === 0 && !errorMsg && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
            <Plane className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-bold text-slate-700">Nenhum voo encontrado com os filtros actuais</p>
            <p className="text-xs text-slate-500">Tente alterar os filtros de escala ou aumentar o valor máximo.</p>
            <button
              onClick={() => {
                setFilterStops('all');
                setSelectedAirline('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Flight Offers Cards List */}
        {!loading && (
          <div className="space-y-4">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left: Airline & Itinerary */}
                  <div className="flex-1 space-y-4 w-full">
                    {/* Airline Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-[#11164D] shrink-0">
                          {offer.airlineCode}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                            {offer.airlineName}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Voo {offer.flightNumber} • {offer.aircraft} • {offer.cabinClass}
                          </p>
                        </div>
                      </div>

                      {offer.availableSeats <= 5 && (
                        <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          Apenas {offer.availableSeats} lugares
                        </span>
                      )}
                    </div>

                    {/* Route Schedule Line */}
                    <div className="grid grid-cols-7 items-center bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                      {/* Departure */}
                      <div className="col-span-2 text-left">
                        <p className="text-xl sm:text-2xl font-black text-[#11164D]">{offer.origin.time}</p>
                        <p className="text-xs font-bold text-slate-700">{offer.origin.code}</p>
                        <p className="text-[11px] text-slate-500 truncate">{offer.origin.city}</p>
                        <p className="text-[10px] text-slate-400">{offer.origin.date}</p>
                      </div>

                      {/* Flight Path Middle */}
                      <div className="col-span-3 text-center px-2">
                        <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{offer.duration}</span>
                        </div>
                        <div className="relative flex items-center justify-center">
                          <div className="w-full h-0.5 bg-slate-300"></div>
                          <div className="absolute w-2 h-2 rounded-full bg-[#F58220]"></div>
                        </div>
                        <p className={`text-[11px] font-bold mt-1 ${offer.stops === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {offer.stops === 0 ? 'Voo Directo' : offer.stopsDetails || '1 Escala'}
                        </p>
                      </div>

                      {/* Arrival */}
                      <div className="col-span-2 text-right">
                        <p className="text-xl sm:text-2xl font-black text-[#11164D]">{offer.destination.time}</p>
                        <p className="text-xs font-bold text-slate-700">{offer.destination.code}</p>
                        <p className="text-[11px] text-slate-500 truncate">{offer.destination.city}</p>
                        <p className="text-[10px] text-slate-400">{offer.destination.date}</p>
                      </div>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-600">
                      <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <Luggage className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>{offer.baggage}</span>
                      </div>
                      {offer.includedAmenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Pricing & CTA */}
                  <div className="lg:w-64 w-full flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-3">
                    <div className="text-left lg:text-right w-full">
                      <span className="text-[11px] uppercase font-bold text-slate-400 block">Tarifa por Passageiro</span>
                      <div className="text-2xl sm:text-3xl font-black text-[#11164D]">
                        {offer.priceMzn.toLocaleString('pt-PT')}{' '}
                        <span className="text-sm font-bold text-[#F58220]">MT</span>
                      </div>
                      <p className="text-[11px] text-slate-400">≈ ${offer.priceUsd} USD • Taxas incluídas</p>
                      {passengers > 1 && (
                        <p className="text-xs font-bold text-slate-700 mt-1">
                          Total ({passengers} pax): {(offer.priceMzn * passengers).toLocaleString('pt-PT')} MT
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleInitiateBooking(offer)}
                      className="w-full py-3.5 rounded-2xl bg-[#11164D] hover:bg-[#F58220] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all group-hover:bg-[#F58220]"
                    >
                      <span>Reservar Imediatamente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Checkout Modal */}
      {bookingModalOpen && selectedOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100 animate-fade-in my-6">
            {/* Modal Header */}
            <div className="bg-[#11164D] p-5 sm:p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Reserva de Voo Online</span>
                <h3 className="text-lg sm:text-xl font-bold">
                  {selectedOffer.airlineName} • {selectedOffer.flightNumber}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedOffer.origin.city} ({selectedOffer.origin.code}) ➔ {selectedOffer.destination.city} ({selectedOffer.destination.code})
                </p>
              </div>

              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Step 1: Passenger Form */}
              {bookingStep === 'passengers' && (
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Total a Pagar ({passengers} passageiro{passengers > 1 ? 's' : ''}):</span>
                      <span className="text-lg font-black text-[#11164D]">
                        {(selectedOffer.priceMzn * passengers).toLocaleString('pt-PT')} MT
                      </span>
                    </div>
                    <div className="text-right text-slate-600">
                      <span>{selectedOffer.cabinClass}</span> • <span>{selectedOffer.baggage}</span>
                    </div>
                  </div>

                  {/* Responsible Contact Info */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#11164D] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#F58220]" />
                      <span>Contacto do Titular da Reserva</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                          placeholder="Ex: Carlos Nhantumbo"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Telefone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          placeholder="+258 84 000 0000"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-600 block mb-1">E-mail (para envio do e-ticket)</label>
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          placeholder="exemplo@email.com"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passengers Detail List */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-[#11164D] flex items-center gap-2">
                      <Plane className="w-4 h-4 text-[#F58220]" />
                      <span>Dados dos Passageiros (Conforme Passaporte)</span>
                    </h4>

                    {passengerDetails.map((p, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <p className="text-xs font-bold text-slate-700">Passageiro {idx + 1}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          <div className="sm:col-span-2">
                            <label className="text-[11px] text-slate-500 block mb-1">Título</label>
                            <select
                              value={p.title}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].title = e.target.value;
                                setPassengerDetails(copy);
                              }}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                            >
                              <option value="Sr.">Sr.</option>
                              <option value="Sra.">Sra.</option>
                              <option value="Dr.">Dr.</option>
                              <option value="Menor">Menor</option>
                            </select>
                          </div>

                          <div className="sm:col-span-5">
                            <label className="text-[11px] text-slate-500 block mb-1">Primeiro Nome *</label>
                            <input
                              type="text"
                              required
                              value={p.firstName}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].firstName = e.target.value;
                                setPassengerDetails(copy);
                              }}
                              placeholder="Primeiro nome"
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                            />
                          </div>

                          <div className="sm:col-span-5">
                            <label className="text-[11px] text-slate-500 block mb-1">Apelido (Sobrenome) *</label>
                            <input
                              type="text"
                              required
                              value={p.lastName}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].lastName = e.target.value;
                                setPassengerDetails(copy);
                              }}
                              placeholder="Apelido"
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="text-[11px] text-slate-500 block mb-1">Nº de Passaporte *</label>
                            <input
                              type="text"
                              required
                              value={p.passportNumber}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].passportNumber = e.target.value.toUpperCase();
                                setPassengerDetails(copy);
                              }}
                              placeholder="Ex: AA123456"
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-mono uppercase outline-none"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="text-[11px] text-slate-500 block mb-1">Data de Nascimento</label>
                            <input
                              type="date"
                              value={p.dateOfBirth}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].dateOfBirth = e.target.value;
                                setPassengerDetails(copy);
                              }}
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="text-[11px] text-slate-500 block mb-1">Nacionalidade</label>
                            <input
                              type="text"
                              value={p.nationality}
                              onChange={(e) => {
                                const copy = [...passengerDetails];
                                copy[idx].nationality = e.target.value;
                                setPassengerDetails(copy);
                              }}
                              placeholder="Moçambicana"
                              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#11164D] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#F58220]" />
                      <span>Forma de Liquidação / Pagamento</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'mpesa', title: 'M-Pesa', badge: 'Instantâneo' },
                        { id: 'emola', title: 'e-Mola', badge: 'Instantâneo' },
                        { id: 'card', title: 'Cartão Visa/Mastercard', badge: 'Online' },
                        { id: 'pay_at_agency', title: 'Pagamento no Balcão', badge: 'Av. Eduardo Mondlane' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                            paymentMethod === m.id
                              ? 'border-[#F58220] bg-orange-50/50 text-[#11164D] ring-2 ring-[#F58220]/20 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <p className="font-bold">{m.title}</p>
                          <span className="text-[10px] text-slate-500">{m.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="px-8 py-3.5 rounded-2xl bg-[#F58220] hover:bg-[#d96f14] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>A Emitir Reserva no GDS...</span>
                        </>
                      ) : (
                        <>
                          <span>Emitir Reserva Imediata</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Confirmation Screen */}
              {bookingStep === 'confirmation' && confirmedBooking && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#11164D]">Reserva Confirmada com Sucesso!</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      O seu registo de passageiro (PNR) foi emitido no sistema de distribuição aérea.
                    </p>
                  </div>

                  {/* PNR Certificate Card */}
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Código PNR (Reserva)</span>
                        <span className="text-2xl font-black font-mono text-[#F58220]">{confirmedBooking.pnr}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nº de Bilhete / Referência</span>
                        <span className="text-sm font-mono font-bold text-slate-800">{confirmedBooking.ticketNumber}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Companhia</span>
                        <span className="font-bold text-slate-800">{selectedOffer.airlineName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Voo</span>
                        <span className="font-bold text-slate-800">{selectedOffer.flightNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Rota</span>
                        <span className="font-bold text-slate-800">
                          {selectedOffer.origin.code} ➔ {selectedOffer.destination.code}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Data de Partida</span>
                        <span className="font-bold text-slate-800">{selectedOffer.origin.date} ({selectedOffer.origin.time})</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 text-xs">
                      <span className="text-slate-400 block text-[10px] mb-1">Passageiro(s)</span>
                      {confirmedBooking.passengers.map((p, i) => (
                        <p key={i} className="font-semibold text-slate-700">
                          • {p.title} {p.firstName} {p.lastName} (Passaporte: {p.passportNumber})
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendBookingToWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Validar no WhatsApp Oficial (+258 852 808 080)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Imprimir Comprovativo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
