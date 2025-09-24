import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { CoursesStateFacade } from './courses.facade';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) { }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                // Try one of these:
                this.coursesService.getAll().pipe( // or getCourses() or getCourseList()
                    // this.coursesService.getCourses().pipe(
                    map(courses => CoursesActions.requestAllCoursesSuccess({ courses: courses as any })),
                    catchError(error => of(CoursesActions.requestAllCoursesFail({ error: error.message })))
                )
            )
        )
    );

    // Effect to filter courses
    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([action, allCourses]) => {
                const searchValue = action.title.toLowerCase();
                const filteredCourses = allCourses.filter(course =>
                    course.title.toLowerCase().includes(searchValue) ||
                    (course.description && course.description.toLowerCase().includes(searchValue))
                );
                return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
            })
        )
    );

    // Effect to get specific course
    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action) =>
                // Try one of these:
                this.coursesService.getCourse(action.id).pipe( // or getSpecificCourse(id)
                    // this.coursesService.getSpecificCourse(action.id).pipe(
                    map(course => CoursesActions.requestSingleCourseSuccess({ course: course as any })),
                    catchError(error => of(CoursesActions.requestSingleCourseFail({ error: error.message })))
                )
            )
        )
    );

    // Effect to delete course
    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action) =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CoursesActions.requestDeleteCourseSuccess({ id: action.id })),
                    catchError(error => of(CoursesActions.requestDeleteCourseFail({ error: error.message })))
                )
            )
        )
    );

    // Effect to edit course
    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action) =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(course => CoursesActions.requestEditCourseSuccess({ course })),
                    catchError(error => of(CoursesActions.requestEditCourseFail({ error: error.message })))
                )
            )
        )
    );

    // Effect to create course
    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action) =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => CoursesActions.requestCreateCourseSuccess({ course })),
                    catchError(error => of(CoursesActions.requestCreateCourseFail({ error: error.message })))
                )
            )
        )
    );

    // Effect to redirect to courses page
    redirectToTheCoursesPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CoursesActions.requestCreateCourseSuccess,
                CoursesActions.requestEditCourseSuccess,
                CoursesActions.requestSingleCourseFail
            ),
            tap(() => this.router.navigate(['/courses']))
        ),
        { dispatch: false }
    );
}