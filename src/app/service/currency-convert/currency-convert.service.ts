import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertService {
  private apiUrl = 'https://api.fastforex.io';
  private apiKey='ff61f0c07a-805316711a-sfe0or'
  constructor(private http:HttpClient) { }

  getExchangeRate(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/fetch-one?from=${fromCurrency}&to=${toCurrency}&api_key=${this.apiKey}`)
      .pipe(
        map(response => response.result[toCurrency])
      );
  }
}
