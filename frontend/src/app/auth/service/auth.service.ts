import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken); // Save the token to local storage
        }
        return response;
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}