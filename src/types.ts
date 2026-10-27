export type PageRoute =
  | 'home'
  | 'about'
  | 'flights'
  | 'visas'
  | 'packages'
  | 'hotels'
  | 'cars'
  | 'car-rental'
  | 'insurance'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'quotes-manager';

export type ServiceType =
  | 'flights'
  | 'visas'
  | 'packages'
  | 'hotels'
  | 'cars'
  | 'insurance'
  | 'general';

export interface ServiceItem {
  id: ServiceType;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  ctaText: string;
  route: PageRoute;
  image: string;
  features: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  region: 'África' | 'Europa' | 'Ásia' | 'Médio Oriente' | 'Moçambique';
  category: 'Férias Familiares' | 'Lua de Mel' | 'Compras & Negócios' | 'Cultural' | 'Aventura & Safari';
  duration: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  image: string;
  description: string;
  isExample: boolean;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularFor: string;
  suggestedDuration: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  summary?: string;
  content: string[];
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: 'Documentação' | 'Dicas de Viagem' | 'Estudos no Exterior' | 'Turismo';
  image: string;
  tags: string[];
}

export interface FlightQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email: string;
  tripType: 'ida-e-volta' | 'so-ida' | 'multi-destinos';
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: 'Económica' | 'Executiva' | 'Primeira';
  additionalMessage?: string;
}

export interface VisaQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  destinationCountry: string;
  visaType: 'Turismo' | 'Estudante' | 'Trabalho' | 'Negócios' | 'Outro';
  nationality: string;
  intendedTravelDate: string;
  message?: string;
}

export interface PackageQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  packageName?: string;
  destination: string;
  travelDate: string;
  travelers: number;
  message?: string;
}

export interface HotelQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomCategory: string;
  boardBasis: string;
  preferences?: string;
}

export interface CarQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  carCategory: string;
  withDriver: boolean;
  passengers: number;
  message?: string;
}

export type CarRentalQuoteRequest = {
  name: string;
  phone: string;
  email?: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;
  vehicleCategory: string;
  withDriver: boolean;
  additionalMessage?: string;
};

export interface InsuranceQuoteRequest {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  planType: string;
  message?: string;
}

export interface ContactMessage {
  id?: string;
  timestamp?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface StoredQuote {
  id: string;
  timestamp: string;
  type: 'Voo' | 'Visto' | 'Pacote' | 'Hotel' | 'Viatura' | 'Seguro' | 'Contacto';
  clientName: string;
  clientPhone: string;
  details: string;
  status: 'Novo' | 'Em Atendimento' | 'Concluído';
}

// ==========================================
// REAL-TIME TRAVEL PROVIDER & BOOKING TYPES
// ==========================================

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: string;
  tripType?: 'round-trip' | 'one-way' | 'multi-city';
}

export interface FlightOffer {
  id: string;
  provider: 'amadeus' | 'gds-direct';
  airlineCode: string;
  airlineName: string;
  airlineLogo?: string;
  flightNumber: string;
  aircraft: string;
  origin: { code: string; city: string; airport: string; terminal?: string; time: string; date: string };
  destination: { code: string; city: string; airport: string; terminal?: string; time: string; date: string };
  duration: string;
  stops: number;
  stopsDetails?: string;
  cabinClass: string;
  baggage: string;
  availableSeats: number;
  priceMzn: number;
  priceUsd: number;
  refundable: boolean;
  includedAmenities: string[];
  returnFlight?: {
    flightNumber: string;
    airlineName: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: number;
  };
}

export interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

export interface FlightBookingResult {
  id: string;
  pnr: string;
  type: 'FLIGHT';
  status: string;
  issueDate: string;
  flightOfferId: string;
  flightOffer?: FlightOffer;
  passengers: PassengerInfo[];
  contact: {
    name: string;
    email: string;
    phone: string;
    emergencyContact?: string;
  };
  paymentMethod: string;
  ticketNumber: string;
  specialRequests?: string;
  agency: {
    name: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  bedType: string;
  pricePerNightMzn: number;
  pricePerNightUsd: number;
  boardBasis: string;
  cancellationPolicy: string;
  availableRooms: number;
  amenities: string[];
}

export interface HotelOffer {
  id: string;
  provider: 'amadeus' | 'gds-direct';
  name: string;
  stars: number;
  rating: number;
  reviewCount: number;
  city: string;
  country: string;
  address: string;
  locationCategory: string;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  rooms: HotelRoom[];
  distanceToAirport?: string;
}

export interface HotelBookingResult {
  id: string;
  voucherCode: string;
  type: 'HOTEL';
  status: string;
  issueDate: string;
  hotelId: string;
  roomId: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  guestLead: {
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  paymentMethod: string;
  agency: {
    name: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export interface TravelProviderStatus {
  provider: string;
  amadeusConfigured: boolean;
  amadeusConnected: boolean;
  environment: string;
  supportedAirportsCount: number;
  activeHotelsCount: number;
  liveBookingEnabled: boolean;
  currencyDefault: string;
  agencyOffice: string;
}

