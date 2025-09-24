import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../../services/courses.service';
import { CoursesStateFacade } from '../../../store/courses/courses.facade';
import { UserStoreService } from '../../../user/services/user-store.service';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
    courses$: Observable<Course[]>;
    isLoading$: Observable<boolean>;
    isAdmin$: Observable<boolean | null>;
    private destroy$ = new Subject<void>();

    constructor(
        private coursesFacade: CoursesStateFacade,
        private userStore: UserStoreService,
        private router: Router
    ) {
        this.courses$ = this.coursesFacade.courses$;
        this.isLoading$ = this.coursesFacade.isAllCoursesLoading$;
        this.isAdmin$ = this.userStore.isAdmin$;
    }

    ngOnInit(): void {
        this.coursesFacade.getAllCourses();
        this.userStore.getUser();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSearch(value: string): void {
        if (value) {
            this.coursesFacade.getFilteredCourses(value);
        } else {
            this.coursesFacade.getAllCourses();
        }
    }

    onEditCourse(courseId: string): void {
        this.router.navigate(['/courses/edit', courseId]);
    }

    onShowCourse(courseId: string): void {
        this.router.navigate(['/courses', courseId]);
    }

    onAddCourse(): void {
        this.router.navigate(['/courses/add']);
    }

    onDeleteCourse(courseId: string): void {
        if (confirm('Are you sure you want to delete this course?')) {
            this.coursesFacade.deleteCourse(courseId);
        }
    }
}