import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    creationDate: string | Date;
    authors: any[];
}

export interface Author {
    id?: string;
    name: string;
}

interface ApiResponse<T> {
    successful: boolean;
    result: T;
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Course[]> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses`).pipe(
            map(response => response.result)
        );
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<ApiResponse<Course>>(`${this.apiUrl}/courses`, course).pipe(
            map(response => response.result)
        );
    }

    editCourse(id: string, course: Course): Observable<Course> {
        return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course).pipe(
            map(response => response.result)
        );
    }

    getCourse(id: string): Observable<Course> {
        return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`).pipe(
            map(response => response.result)
        );
    }

    deleteCourse(id: string): Observable<void> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/courses/${id}`).pipe(
            map(response => undefined)
        );
    }

    filterCourses(value: string): Observable<Course[]> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/filter?search=${value}`).pipe(
            map(response => response.result)
        );
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<ApiResponse<Author[]>>(`${this.apiUrl}/authors`).pipe(
            map(response => response.result)
        );
    }

    createAuthor(name: string): Observable<Author> {
        return this.http.post<ApiResponse<Author>>(`${this.apiUrl}/authors`, { name }).pipe(
            map(response => response.result)
        );
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`).pipe(
            map(response => response.result)
        );
    }
}