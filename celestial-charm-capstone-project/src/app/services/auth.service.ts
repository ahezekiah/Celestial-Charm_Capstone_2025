import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   // Track login state with BehaviorSubject
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);  

  constructor() {
     // Only initialize sessionStorage on the client-side (browser)
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const storedLoginState = sessionStorage.getItem('isUserLoggedIn') === 'true';
        this.isUserLoggedInSubject.next(storedLoginState);
      }
    }

    login(userName: string, password: string): Observable<boolean> {
        const isLoggedIn = userName === 'admin' && password === 'admin';
        
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('isUserLoggedIn', isLoggedIn ? 'true' : 'false');
        }
        // Update the BehaviorSubject with new login state
        this.isUserLoggedInSubject.next(isLoggedIn); 
        return of(isLoggedIn).pipe(
          delay(1000),
          tap(val => console.log("Is User Authentication successful: " + val))
        );
    }

    logout(): void {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.removeItem('isUserLoggedIn');
        }
        // Update the BehaviorSubject to false when logged out
        this.isUserLoggedInSubject.next(false);  
    }

    // Expose the login status as an observable
    get isUserLoggedIn$(): Observable<boolean> {
      return this.isUserLoggedInSubject.asObservable();
    }
  }
