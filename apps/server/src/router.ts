import Amadeus from 'amadeus';
import express from 'express';
// Getting env variables

// This is AMADEUS client for getting authToken that we need to make actual call to amadeus API
const amadeus = new Amadeus({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const router = express.Router();
// Endpoint
router.get(`/airports`, async (req, res) => {
  try {
    const { keyword } = req.query;
    // API call with params we requested from client app
    const response = await amadeus.client.get('/v1/reference-data/locations', {
      keyword,
      subType: 'AIRPORT,CITY',
    });
    // Sending response for client
    return res.json(JSON.parse(response.body));
  } catch (err) {
    return res.json(err);
  }
});

router.get(`/flightoffers`, async (req, res) => {
  try {
    const { departure, arrival, departureDate, adults, nonStop, max } =
      req.query;
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: departure,
      destinationLocationCode: arrival,
      departureDate: departureDate,
      adults: adults,
      nonStop,
      max,
    });
    return res.json(JSON.parse(response.body));
  } catch (error) {
    return res.json(error);
  }
});

export default router;
