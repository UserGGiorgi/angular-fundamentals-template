import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '../../services/courses.service';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export const coursesReducer = createReducer(
    initialState,

    // Request All Courses
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        isSearchState: false
    })),

    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    // Request Single Course
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false
    })),

    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    // Request Filtered Courses
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        isSearchState: true,
        errorMessage: ''
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false
    })),

    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    // Delete Course
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        errorMessage: ''
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
        ...state,
        allCourses: state.allCourses.filter(course => course.id !== id)
    })),

    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    // Edit Course
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        errorMessage: ''
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
        course: course
    })),

    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    // Create Course
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        errorMessage: ''
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course]
    })),

    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    }))
);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => coursesReducer(state, action);