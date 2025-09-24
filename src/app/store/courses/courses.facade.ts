import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../services/courses.service';
import { CoursesState } from './courses.reducer';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    public isAllCoursesLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isAllCoursesLoadingSelector);
    public isSingleCourseLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isSingleCourseLoadingSelector);
    public isSearchingState$: Observable<boolean> = this.store.select(CoursesSelectors.isSearchingStateSelector);
    public courses$: Observable<Course[]> = this.store.select(CoursesSelectors.getCourses);
    public allCourses$: Observable<Course[]> = this.store.select(CoursesSelectors.getAllCourses);
    public course$: Observable<Course | null> = this.store.select(CoursesSelectors.getCourse);
    public errorMessage$: Observable<string> = this.store.select(CoursesSelectors.getErrorMessage);

    constructor(private store: Store<CoursesState>) { }

    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
    }

    editCourse(id: string, body: Course): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}