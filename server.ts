import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import {
  generateRealtimeFlights,
  generateRealtimeHotels,
  createFlightBooking,
  createHotelBooking,
  getBooking,
  getProviderStatus,
  AIRPORT_DIRECTORY,
} from './server/travelApi';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// ==========================================
// TRAVEL PROVIDER & BOOKING API ENDPOINTS
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BOM Samaritano Travel Agency Backend',
    timestamp: new Date().toISOString(),
  });
});

// Travel Provider Status & Capabilities
app.get('/api/travel/status', async (req, res) => {
  try {
    const status = await getProviderStatus();
    res.json({ success: true, data: status });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Erro ao obter estado do provedor' });
  }
});

// List Airports & Locations
app.get('/api/travel/airports', (req, res) => {
  res.json({
    success: true,
    data: AIRPORT_DIRECTORY,
  });
});

// Real-Time Flight Offers Search
app.post('/api/flights/search', (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate, passengers, cabinClass, tripType } = req.body;

    const flights = generateRealtimeFlights({
      origin: origin || 'MPM',
      destination: destination || 'LIS',
      departureDate,
      returnDate,
      passengers: Number(passengers) || 1,
      cabinClass: cabinClass || 'Económica',
      tripType: tripType || 'round-trip',
    });

    res.json({
      success: true,
      totalOffers: flights.length,
      searchCriteria: {
        origin: origin || 'MPM',
        destination: destination || 'LIS',
        departureDate,
        returnDate,
        passengers: Number(passengers) || 1,
        cabinClass: cabinClass || 'Económica',
      },
      data: flights,
    });
  } catch (error: any) {
    console.error('Error searching flights:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao pesquisar voos' });
  }
});

// Direct Real-Time Flight Booking
app.post('/api/flights/book', (req, res) => {
  try {
    const { flightOfferId, flightOffer, passengers, contact, paymentMethod, specialRequests } = req.body;

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({ success: false, error: 'Informação dos passageiros é obrigatória.' });
    }

    if (!contact || !contact.name || !contact.phone) {
      return res.status(400).json({ success: false, error: 'Nome e telefone do responsável são obrigatórios.' });
    }

    const booking = createFlightBooking({
      flightOfferId: flightOfferId || 'FL-UNKNOWN',
      flightOffer,
      passengers,
      contact,
      paymentMethod: paymentMethod || 'pay_at_agency',
      specialRequests,
    });

    res.json({
      success: true,
      message: 'Reserva de voo gerada com sucesso!',
      data: booking,
    });
  } catch (error: any) {
    console.error('Error booking flight:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao processar reserva de voo' });
  }
});

// Real-Time Hotel Search
app.post('/api/hotels/search', (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests, rooms } = req.body;

    const hotels = generateRealtimeHotels({
      destination: destination || 'Maputo',
      checkIn: checkIn || '',
      checkOut: checkOut || '',
      guests: Number(guests) || 2,
      rooms: Number(rooms) || 1,
    });

    res.json({
      success: true,
      totalHotels: hotels.length,
      destination: destination || 'Maputo',
      data: hotels,
    });
  } catch (error: any) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao pesquisar hotéis' });
  }
});

// Direct Real-Time Hotel Booking
app.post('/api/hotels/book', (req, res) => {
  try {
    const {
      hotelId,
      roomId,
      hotelName,
      roomName,
      checkIn,
      checkOut,
      guests,
      rooms,
      guestLead,
      paymentMethod,
    } = req.body;

    if (!guestLead || !guestLead.name || !guestLead.phone) {
      return res.status(400).json({ success: false, error: 'Nome e telefone do hóspede principal são obrigatórios.' });
    }

    const booking = createHotelBooking({
      hotelId,
      roomId,
      hotelName,
      roomName,
      checkIn,
      checkOut,
      guests: Number(guests) || 1,
      rooms: Number(rooms) || 1,
      guestLead,
      paymentMethod: paymentMethod || 'pay_at_agency',
    });

    res.json({
      success: true,
      message: 'Reserva de hotel confirmada com sucesso!',
      data: booking,
    });
  } catch (error: any) {
    console.error('Error booking hotel:', error);
    res.status(500).json({ success: false, error: error.message || 'Erro ao reservar hotel' });
  }
});

// Retrieve Booking by PNR or Code
app.get('/api/bookings/:code', (req, res) => {
  const code = req.params.code;
  const booking = getBooking(code);

  if (!booking) {
    return res.status(404).json({ success: false, error: 'Reserva não encontrada.' });
  }

  res.json({ success: true, data: booking });
});

// ==========================================
// ZIP DOWNLOADS FOR HOSTING / EXPORT
// ==========================================
app.use('/downloads', express.static(path.join(process.cwd(), 'public', 'downloads')));

app.get('/api/download/dist', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'downloads', 'bomsamaritano-dist-pronto-hospedagem.zip');
  res.download(filePath, 'bomsamaritano-dist-pronto-hospedagem.zip', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Erro ao descarregar o ficheiro ZIP.');
    }
  });
});

app.get('/api/download/source', (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'downloads', 'bomsamaritano-codigo-fonte-completo.zip');
  res.download(filePath, 'bomsamaritano-codigo-fonte-completo.zip', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Erro ao descarregar o ficheiro ZIP.');
    }
  });
});

// ==========================================
// VITE INTEGRATION / STATIC SPA SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BOM Samaritano server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
