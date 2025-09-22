import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoursesService, Course, Author } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);

    public isLoading$ = this.isLoading$$.asObservable();
    public courses$ = this.courses$$.asObservable();
    public authors$ = this.authors$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    getAll(): void {
        this.isLoading$$.next(true);
        this.coursesService.getAll().pipe(
            tap(() => this.isLoading$$.next(false))
        ).subscribe(courses => {
            this.courses$$.next(courses);
        });
    }

    createCourse(course: Course): Observable<Course> {
        this.isLoading$$.next(true);
        return this.coursesService.createCourse(course).pipe(
            tap(newCourse => {
                const currentCourses = this.courses$$.value;
                this.courses$$.next([...currentCourses, newCourse]);
                this.isLoading$$.next(false);
            })
        );
    }

    getCourse(id: string): Observable<Course> {
        this.isLoading$$.next(true);
        return this.coursesService.getCourse(id).pipe(
            tap(() => this.isLoading$$.next(false))
        );
    }

    editCourse(id: string, course: Course): Observable<Course> {
        this.isLoading$$.next(true);
        return this.coursesService.editCourse(id, course).pipe(
            tap(updatedCourse => {
                const currentCourses = this.courses$$.value;
                const updatedCourses = currentCourses.map(c =>
                    c.id === id ? updatedCourse : c
                );
                this.courses$$.next(updatedCourses);
                this.isLoading$$.next(false);
            })
        );
    }

    deleteCourse(id: string): Observable<void> {
        this.isLoading$$.next(true);
        return this.coursesService.deleteCourse(id).pipe(
            tap(() => {
                const currentCourses = this.courses$$.value;
                const filteredCourses = currentCourses.filter(c => c.id !== id);
                this.courses$$.next(filteredCourses);
                this.isLoading$$.next(false);
            })
        );
    }

    filterCourses(value: string): void {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
            tap(() => this.isLoading$$.next(false))
        ).subscribe(filteredCourses => {
            this.courses$$.next(filteredCourses);
        });
    }

    getAllAuthors(): void {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors().pipe(
            tap(() => this.isLoading$$.next(false))
        ).subscribe(authors => {
            this.authors$$.next(authors);
        });
    }

    createAuthor(name: string): Observable<Author> {
        this.isLoading$$.next(true);
        return this.coursesService.createAuthor(name).pipe(
            tap(newAuthor => {
                const currentAuthors = this.authors$$.value;
                this.authors$$.next([...currentAuthors, newAuthor]);
                this.isLoading$$.next(false);
            })
        );
    }

    getAuthorById(id: string): Observable<Author> {
        this.isLoading$$.next(true);
        return this.coursesService.getAuthorById(id).pipe(
            tap(() => this.isLoading$$.next(false))
        );
    }
}