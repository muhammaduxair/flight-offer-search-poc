import { Component, Injector } from '@angular/core';
import { BaseDirective } from '../directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IFlightOffer,
  IFlightOfferDictionary,
  IFlightStop,
  ILocation,
  IOption,
} from '../interface';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent extends BaseDirective {
  departureLocations: ILocation[] = [];
  departureLocationsForAutocomplete: IOption[] = [];
  arrivalLocations: ILocation[] = [];
  arrivalLocationsForAutocomplete: IOption[] = [];
  selectedDeprature = '';
  selectedArrival = '';
  fromDate = undefined as unknown as Date;
  searchLoading = false;

  flightOffers: IFlightOffer[] = [];
  flightOfferDictionary = {} as IFlightOfferDictionary;

  constructor(injector: Injector) {
    super(injector);
  }

  async searchLocation(
    keyword: string,
    type: 'departure' | 'arrival' = 'departure'
  ): Promise<void> {
    const response = await this.get<{ data: ILocation[] }>('airports', {
      keyword,
    });
    if (response.isSuccess) {
      if (type === 'departure') {
        this.departureLocations = response.data?.data ?? [];
        this.departureLocationsForAutocomplete = this.departureLocations
          .filter((x) => x.subType === 'AIRPORT')
          .map((location) => ({
            label: `${location.address.cityName}, ${location.name} AIRPORT`,
            value: location.iataCode,
          }));
      } else {
        this.arrivalLocations = response.data?.data ?? [];
        this.arrivalLocationsForAutocomplete = this.arrivalLocations
          .filter((x) => x.subType === 'AIRPORT')
          .map((location) => ({
            label: `${location.address.cityName}, ${location.name} AIRPORT`,
            value: location.iataCode,
          }));
      }
    }
  }

  async flightoffers(): Promise<void> {
    this.searchLoading = true;
    const response = await this.get<{
      data: IFlightOffer[];
      dictionaries: IFlightOfferDictionary;
    }>('flightoffers', {
      departure: this.selectedDeprature,
      arrival: this.selectedArrival,
      departureDate: moment(this.fromDate).format('YYYY-MM-DD'),
      adults: '1',
      max: 50,
    });
    if (response.isSuccess) {
      this.flightOffers = response.data?.data ?? [];
      this.flightOfferDictionary = response.data
        ?.dictionaries as IFlightOfferDictionary;
    }
    this.searchLoading = false;
  }

  getDepartureDetail(item: IFlightOffer): IFlightStop {
    const point = item.itineraries[0].segments[0];
    const loc = this.departureLocations?.find(
      (x) => x.iataCode === point.departure.iataCode
    );
    return {
      terminal: point.departure.terminal,
      airportCode: point.departure.iataCode,
      airportName: loc?.name ?? '',
      aircraftCode: point.aircraft.code,
      aircraftName: this.flightOfferDictionary.aircraft[point.aircraft.code],
      carrierCode: point.carrierCode,
      carrierName: this.flightOfferDictionary.carriers[point.carrierCode],
      cityName: loc?.address.cityName ?? '',
    };
  }

  getArrivalDetail(item: IFlightOffer): IFlightStop {
    const point =
      item.itineraries[0].segments[item.itineraries[0].segments.length - 1];
    const loc = this.arrivalLocations?.find(
      (x) => x.iataCode === point.arrival.iataCode
    );

    return {
      terminal: point.arrival.terminal,
      airportCode: point.arrival.iataCode,
      airportName: loc?.name ?? '',
      aircraftCode: point.aircraft.code,
      aircraftName: this.flightOfferDictionary.aircraft[point.aircraft.code],
      carrierCode: point.carrierCode,
      carrierName: this.flightOfferDictionary.carriers[point.carrierCode],
      cityName: loc?.address.cityName ?? '',
    };
  }

  getTotalStops(item: IFlightOffer): string {
    const target = item.itineraries[0].segments;
    if (target.length <= 1) {
      return 'Non stop';
    } else {
      const stops = target.length - 1;
      if (stops === 1) {
        return `${stops} stop`;
      } else {
        return `${stops} stops`;
      }
    }
  }

  getFullFlightDuartion(item: IFlightOffer): string {
    const [hours, minutes] = item.itineraries[0].duration
      .substring(2)
      .split(/[HM]/);

    let str = '';

    if (hours && Number(hours)) {
      if (Number(hours) > 1) {
        str += `${Number(hours)} hours `;
      } else {
        str += `${Number(hours)} hour `;
      }
    }

    if (minutes && Number(minutes)) {
      if (Number(minutes) > 1) {
        str += `${Number(minutes)} minutes`;
      } else {
        str += `${Number(minutes)} minute`;
      }
    }

    return str;
  }
}
