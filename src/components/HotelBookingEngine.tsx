import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  Users,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  AlertCircle,
  Coffee,
  ShieldCheck,
  Printer,
  X,
  ArrowRight,
  Sparkles,
  Bed,
} from 'lucide-react';
import { HotelOffer, HotelRoom, HotelBookingResult, TravelProviderStatus } from '../types';
import { openWhatsApp, saveQuoteLocally } from '../utils/whatsapp';

export const POPULAR_DESTINATIONS = [
  { name: 'Maputo', country: 'Moçambique', tag: 'Capital & Negócios' },
  { name: 'Vilankulo', country: 'Moçambique', tag: 'Praia & Bazaruto' },
  { name: 'Inhambane', country: 'Moçambique', tag: 'Tofo & Barra' },
  { name: 'Lisboa', country: 'Portugal', tag: 'Europa' },
  { name: 'Dubai', country: 'Emirados Árabes Unidos', tag: 'Compras & Luxo' },
  { name: 'Joanesburgo', country: 'África do Sul', tag: 'Sandton & Hub' },
];

export const HotelBookingEngine: React.FC = () => {
  // Search parameters
  const [destination, setDestination] = useState('Maputo');
  const [checkIn, setCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Search execution state
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<HotelOffer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [providerStatus, setProviderStatus] = useState<TravelProviderStatus | null>(null);

  // Filters
  const [minStars, setMinStars] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  // Booking Modal State
  const [selectedHotel, setSelectedHotel] = useState<HotelOffer | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'details' | 'confirmation'>('details');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<HotelBookingResult | null>(null);

  // Guest details form
  const [guestLead, setGuestLead] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'card' | 'bank_transfer' | 'pay_at_agency'>('mpesa');

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // On mount
  useEffect(() => {
    fetch('/api/travel/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProviderStatus(data.data);
        }
      })
      .catch((err) => console.warn('Could not fetch travel provider status:', err));

    executeSearch();
  }, []);

  const executeSearch = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/hotels/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          checkIn,
          checkOut,
          guests,
          rooms,
        }),
      });

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setHotels(json.data);
        setHasSearched(true);
      } else {
        setErrorMsg(json.error || 'Nenhum hotel encontrado para o destino informado.');
      }
    } catch (err: any) {
      console.error('Error fetching hotels:', err);
      setErrorMsg('Falha ao comunicar com o servidor de reservas hoteleiras.');
    } finally {
      setLoading(false);
    }
  };

  // Filter & Sort
  const filteredHotels = hotels
    .filter((h) => (minStars > 0 ? h.stars >= minStars : true))
    .sort((a, b) => {
      const priceA = a.rooms[0]?.pricePerNightMzn || 0;
      const priceB = b.rooms[0]?.pricePerNightMzn || 0;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });

  // Open Booking
  const handleInitiateBooking = (hotel: HotelOffer, room: HotelRoom) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setBookingStep('details');
    setBookingModalOpen(true);
  };

  // Confirm Booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestLead.name.trim() || !guestLead.phone.trim()) {
      alert('Por favor, informe o nome e telefone do hóspede principal.');
      return;
    }

    setBookingLoading(true);
    try {
      const res = await fetch('/api/hotels/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: selectedHotel?.id,
          roomId: selectedRoom?.id,
          hotelName: selectedHotel?.name,
          roomName: selectedRoom?.name,
          checkIn,
          checkOut,
          guests,
          rooms,
          guestLead,
          paymentMethod,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setConfirmedBooking(json.data);
        setBookingStep('confirmation');

        const totalCost = (selectedRoom?.pricePerNightMzn || 0) * nights * rooms;

        // Save to local quote manager
        saveQuoteLocally({
          type: 'Hotel',
          clientName: guestLead.name,
          clientPhone: guestLead.phone,
          details: `Reserva Confirmada Voucher: ${json.data.voucherCode} • ${selectedHotel?.name} • ${selectedRoom?.name} • ${nights} noite(s) • Check-in: ${checkIn} / Check-out: ${checkOut} • Total: ${totalCost} MT • Pagamento: ${paymentMethod.toUpperCase()}`,
        });
      } else {
        alert(json.error || 'Erro ao processar reserva hoteleira.');
      }
    } catch (err: any) {
      alert('Falha ao processar reserva: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleSendVoucherToWhatsApp = () => {
    if (!confirmedBooking || !selectedHotel || !selectedRoom) return;

    const totalCost = selectedRoom.pricePerNightMzn * nights * rooms;

    const msg = [
      '🏨 *CONFIRMAÇÃO DE VOUCHER DE HOTEL — BOM SAMARITANO*',
      '',
      `🎫 *Código do Voucher:* ${confirmedBooking.voucherCode}`,
      `🏨 *Hotel:* ${selectedHotel.name}`,
      `📍 *Endereço:* ${selectedHotel.address}`,
      `🛏️ *Acomodação:* ${selectedRoom.name} (${selectedRoom.bedType})`,
      `📅 *Período:* ${checkIn} até ${checkOut} (${nights} Noite${nights > 1 ? 's' : ''})`,
      `👥 *Hóspedes:* ${guests} pessoa(s) em ${rooms} quarto(s)`,
      `☕ *Regime:* ${selectedRoom.boardBasis}`,
      '',
      `👤 *Hóspede Principal:* ${guestLead.name}`,
      `📞 *Contacto:* ${guestLead.phone}`,
      `✉️ *E-mail:* ${guestLead.email || 'Não informado'}`,
      `💳 *Pagamento:* ${paymentMethod.toUpperCase()}`,
      `💰 *Total Geral:* ${totalCost.toLocaleString('pt-PT')} MT`,
      '',
      'Solicito o envio da confirmação de acolhimento e orientações de check-in. Obrigado!',
    ].join('\n');

    openWhatsApp(msg);
  };

  return (
    <div className="space-y-8">
      {/* Live Provider Banner */}
      <div className="bg-gradient-to-r from-[#11164D] via-[#1c2378] to-[#11164D] text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F58220] flex items-center justify-center text-white shrink-0 shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-orange-400">Canal Directo de Tarifas Hoteleiras</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Rede de Hotéis em Maputo, Vilankulo, Lisboa, Dubai e Joanesburgo
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-white/10 px-4 py-2 rounded-2xl border border-white/15">
          <Coffee className="w-4 h-4 text-orange-300" />
          <span>Voucher Imediato • Pequeno-Almoço & Cancelamento Flexível</span>
        </div>
      </div>

      {/* Dynamic Search Box */}
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Destination */}
          <div className="md:col-span-4 bg-slate-50 hover:bg-slate-100/80 transition-colors p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220] focus-within:ring-2 focus-within:ring-[#F58220]/20">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Destino ou Cidade</label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F58220] shrink-0" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Destino ou Cidade"
                className="w-full bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer"
              >
                {POPULAR_DESTINATIONS.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}, {d.country} ({d.tag})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Check-In */}
          <div className="md:col-span-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Check-in</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                aria-label="Data de Check-in"
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Check-Out */}
          <div className="md:col-span-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 focus-within:border-[#F58220]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Check-out</label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                aria-label="Data de Check-out"
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="md:col-span-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hóspedes</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                aria-label="Número de Hóspedes"
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Hóspede' : 'Hóspedes'}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-l border-slate-200 pl-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Quartos</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                aria-label="Número de Quartos"
                className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Quarto' : 'Quartos'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={executeSearch}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-[#F58220] hover:bg-[#d96f14] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
              title="Pesquisar Hotéis"
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

      {/* Results Header & Filters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#11164D]">
              Acomodações Disponíveis ({filteredHotels.length})
            </h3>
            <p className="text-xs text-slate-500">
              Destino: <strong className="text-slate-800">{destination}</strong> • Estadia de{' '}
              <strong className="text-slate-800">{nights} noite(s)</strong>
            </p>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => setMinStars(0)}
                className={`px-3 py-1 rounded-lg transition-all ${minStars === 0 ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                Todas ★
              </button>
              <button
                type="button"
                onClick={() => setMinStars(4)}
                className={`px-3 py-1 rounded-lg transition-all ${minStars === 4 ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                4★ e 5★
              </button>
              <button
                type="button"
                onClick={() => setMinStars(5)}
                className={`px-3 py-1 rounded-lg transition-all ${minStars === 5 ? 'bg-white shadow-xs font-bold text-[#11164D]' : ''}`}
              >
                Apenas 5★
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Ordenar Hotéis"
              className="bg-slate-100 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl outline-none border-none cursor-pointer"
            >
              <option value="rating">Maior Avaliação</option>
              <option value="price-asc">Preço: Mais Baixo</option>
              <option value="price-desc">Preço: Mais Alto</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 shadow-sm border border-slate-100">
            <div className="w-12 h-12 border-3 border-[#F58220] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-base font-bold text-slate-800">A verificar disponibilidade de quartos em {destination}...</p>
          </div>
        )}

        {/* Error */}
        {!loading && errorMsg && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-3xl p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs">{errorMsg}</p>
          </div>
        )}

        {/* Hotels Grid */}
        {!loading && (
          <div className="space-y-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Photo Column */}
                  <div className="lg:col-span-4 relative min-h-[240px] lg:min-h-full">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#11164D]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.stars} Estrelas</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md text-white p-2.5 rounded-2xl text-xs flex items-center justify-between">
                      <span className="font-semibold truncate">{hotel.locationCategory}</span>
                      <span className="bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-lg shrink-0">
                        ★ {hotel.rating}
                      </span>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-lg sm:text-xl font-black text-[#11164D]">{hotel.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#F58220] shrink-0" />
                          <span>{hotel.city}, {hotel.country}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{hotel.description}</p>

                      {/* Amenities Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {hotel.amenities.slice(0, 5).map((a, i) => (
                          <span
                            key={i}
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#F58220]" />
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Room Offers Options */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Opções de Acomodação Disponíveis
                      </span>

                      {hotel.rooms.map((room) => {
                        const totalRoomPrice = room.pricePerNightMzn * nights * rooms;

                        return (
                          <div
                            key={room.id}
                            className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 hover:border-[#F58220]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Bed className="w-4 h-4 text-[#F58220]" />
                                <h5 className="font-bold text-sm text-slate-900">{room.name}</h5>
                              </div>
                              <p className="text-xs text-slate-500">{room.description}</p>
                              <div className="flex items-center gap-3 text-[11px] text-emerald-700 font-semibold pt-1">
                                <span>{room.boardBasis}</span>
                                <span>•</span>
                                <span>{room.cancellationPolicy}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                              <div className="text-left md:text-right">
                                <span className="text-[10px] text-slate-400 block">Preço por noite</span>
                                <span className="text-base sm:text-lg font-black text-[#11164D]">
                                  {room.pricePerNightMzn.toLocaleString('pt-PT')}{' '}
                                  <span className="text-xs text-[#F58220]">MT</span>
                                </span>
                                <span className="text-[10px] text-slate-500 block">
                                  Total ({nights} nts): {totalRoomPrice.toLocaleString('pt-PT')} MT
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleInitiateBooking(hotel, room)}
                                className="px-5 py-2.5 rounded-xl bg-[#11164D] hover:bg-[#F58220] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                              >
                                <span>Reservar Quarto</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Booking Modal */}
      {bookingModalOpen && selectedHotel && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100 animate-fade-in my-6">
            {/* Header */}
            <div className="bg-[#11164D] p-5 sm:p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Reserva de Alojamento</span>
                <h3 className="text-lg sm:text-xl font-bold">{selectedHotel.name}</h3>
                <p className="text-xs text-slate-300">
                  {selectedRoom.name} • {nights} Noite(s) ({checkIn} até {checkOut})
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

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {bookingStep === 'details' && (
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Total da Estadia ({rooms} quarto{rooms > 1 ? 's' : ''}, {nights} noites):</span>
                      <span className="text-xl font-black text-[#11164D]">
                        {(selectedRoom.pricePerNightMzn * nights * rooms).toLocaleString('pt-PT')} MT
                      </span>
                    </div>
                    <div className="text-right text-slate-600">
                      <span className="text-emerald-600 font-bold">{selectedRoom.boardBasis}</span>
                      <p className="text-[11px] text-slate-400">{selectedRoom.cancellationPolicy}</p>
                    </div>
                  </div>

                  {/* Guest Info */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#11164D] flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#F58220]" />
                      <span>Dados do Hóspede Titular</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          value={guestLead.name}
                          onChange={(e) => setGuestLead({ ...guestLead, name: e.target.value })}
                          placeholder="Ex: Alberto Macamo"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Telefone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={guestLead.phone}
                          onChange={(e) => setGuestLead({ ...guestLead, phone: e.target.value })}
                          placeholder="+258 84 000 0000"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-600 block mb-1">E-mail (para envio do Voucher)</label>
                        <input
                          type="email"
                          value={guestLead.email}
                          onChange={(e) => setGuestLead({ ...guestLead, email: e.target.value })}
                          placeholder="exemplo@email.com"
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Pedidos Especiais ao Hotel (Opcional)</label>
                        <textarea
                          rows={2}
                          value={guestLead.specialRequests}
                          onChange={(e) => setGuestLead({ ...guestLead, specialRequests: e.target.value })}
                          placeholder="Ex: Chegada tardia, cama de casal, andar alto..."
                          className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#F58220] outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#11164D] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#F58220]" />
                      <span>Método de Pagamento</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'mpesa', title: 'M-Pesa', badge: 'Instantâneo' },
                        { id: 'emola', title: 'e-Mola', badge: 'Instantâneo' },
                        { id: 'card', title: 'Cartão de Débito/Crédito', badge: 'Online' },
                        { id: 'pay_at_agency', title: 'Pagar na Agência', badge: 'Maputo' },
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

                  {/* CTAs */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
                    >
                      Voltar
                    </button>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="px-8 py-3.5 rounded-2xl bg-[#F58220] hover:bg-[#d96f14] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>A Confirmar Reserva com o Hotel...</span>
                        </>
                      ) : (
                        <>
                          <span>Emitir Voucher Imediato</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Confirmation Screen */}
              {bookingStep === 'confirmation' && confirmedBooking && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#11164D]">Voucher Emitido com Sucesso!</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      A sua estadia no {selectedHotel.name} está pré-reservada e garantida pela BOM Samaritano.
                    </p>
                  </div>

                  {/* Voucher Preview Card */}
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 text-left space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Código do Voucher</span>
                        <span className="text-2xl font-black font-mono text-[#F58220]">{confirmedBooking.voucherCode}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Regime de Alimentação</span>
                        <span className="text-xs font-bold text-emerald-600">{selectedRoom.boardBasis}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hotel</span>
                        <span className="font-bold text-slate-800">{selectedHotel.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Acomodação</span>
                        <span className="font-bold text-slate-800">{selectedRoom.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Check-in</span>
                        <span className="font-bold text-slate-800">{checkIn}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Check-out</span>
                        <span className="font-bold text-slate-800">{checkOut} ({nights} noites)</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Hóspede Titular</span>
                        <span className="font-bold text-slate-800">{guestLead.name} ({guestLead.phone})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Valor Total</span>
                        <span className="text-base font-black text-[#11164D]">
                          {(selectedRoom.pricePerNightMzn * nights * rooms).toLocaleString('pt-PT')} MT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSendVoucherToWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Validar Voucher no WhatsApp Oficial</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Imprimir Voucher</span>
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
