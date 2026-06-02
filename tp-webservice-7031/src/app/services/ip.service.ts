import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  // 1) End-point para Neutrino IP Info (POST)
  private urlIpInfo = 'https://neutrinoapi.p.rapidapi.com/ip-info';
  
  // 2) End-point para obtener Dirección desde Lat/Long (GET)
  private urlAddress = 'https://address-from-to-latitude-longitude.p.rapidapi.com/coordinates-to-address';

  // Configuración de Headers Generales (Recuerda colocar tu API Key)
  private apiKey = 'b8691ca599msh5d7f8103da85d37p18dce8jsnc1a8764558d1';

  constructor(private http: HttpClient) { }

  // 1) POST IP Info: Recibe la IP en el Body como un objeto JSON
  postIpInfo(ipAddress: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'neutrinoapi.p.rapidapi.com'
    });
    
    const body = { ip: ipAddress };
    return this.http.post<any>(this.urlIpInfo, body, { headers });
  }

  // 2) GET Coordinates to Address: Envía latitud y longitud por Query Params
  getAddressFromCoords(lat: number, lon: number): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
    });

    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString());

    return this.http.get<any>(this.urlAddress, { headers, params });
  }
}