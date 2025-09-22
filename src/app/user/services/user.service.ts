import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface ApiResponse<T> {
    successful: boolean;
    result: T;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/me`).pipe(
            map(response => response.result)
        );
    }
}