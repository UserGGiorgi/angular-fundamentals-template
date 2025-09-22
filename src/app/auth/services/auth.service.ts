import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

export interface User {
    email: string;
    password: string;
    name?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService,
        private router: Router
    ) {
        // Check if token exists on service initialization
        this.isAuthorized$$.next(!!this.sessionStorage.getToken());
    }

    login(user: User) {
        return this.http.post<{ token: string }>('http://localhost:4000/auth/login', user)
            .pipe(
                tap(response => {
                    this.sessionStorage.setToken(response.token);
                    this.isAuthorized$$.next(true);
                })
            );
    }

    logout() {
        return this.http.post('http://localhost:4000/auth/logout', {})
            .pipe(
                tap(() => {
                    this.sessionStorage.deleteToken();
                    this.isAuthorized$$.next(false);
                    this.router.navigate(['/login']);
                })
            );
    }

    register(user: User) {
        return this.http.post<{ token: string }>('http://localhost:4000/auth/register', user)
            .pipe(
                tap(response => {
                    this.sessionStorage.setToken(response.token);
                    this.isAuthorized$$.next(true);
                })
            );
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return 'http://localhost:4000/auth/login';
    }
}