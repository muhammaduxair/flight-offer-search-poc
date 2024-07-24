export interface IApiResponse<T = unknown> {
  isSuccess: boolean;
  message?: string;
  statusCode?: number;
  data?: T;
  errors?: any;
}

export interface ILocation {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    regionCode: string;
  };
  analytics: {
    travelers: {
      score: number;
    };
  };
}

export interface IOption {
  label: string;
  value: string;
}

export interface IFlightOffer {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        terminal: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      operating: {
        carrierCode: string;
      };
      duration: string;
      id: string;
      numberOfStops: number;
      blacklistedInEU: boolean;
    }[];
  }[];
  price: {
    currency: string;
    total: string;
    base: string;
    fees: {
      amount: string;
      type: string;
    }[];
    grandTotal: string;
  };
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: {
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: {
      currency: string;
      total: string;
      base: string;
    };
    fareDetailsBySegment?: {
      segmentId: string;
      cabin: string;
      fareBasis: string;
      brandedFare?: string;
      brandedFareLabel?: string;
      class: string;
      includedCheckedBags: {
        quantity: number;
      };
      amenities?: {
        description: string;
        isChargeable: boolean;
        amenityType: string;
        amenityProvider: {
          name: string;
        };
      }[];
    }[];
  }[];
}

export interface IFlightOfferDictionary {
  locations: {
    [key: string]: {
      cityCode: string;
      countryCode: string;
    };
  };
  aircraft: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: string;
  };
  carriers: {
    [key: string]: string;
  };
}

export interface IFlightStop {
  terminal: string;
  airportCode: string;
  airportName: string;
  aircraftCode: string;
  aircraftName: string;
  carrierCode: string;
  carrierName: string;
  cityName: string;
}
