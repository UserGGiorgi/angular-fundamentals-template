import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from '../../../services/courses.service';
import { CoursesStoreService } from '../../../services/courses-store.service';
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
        private coursesStore: CoursesStoreService,
        private userStore: UserStoreService,
        private router: Router
    ) {
        this.courses$ = this.coursesStore.courses$;
        this.isLoading$ = this.coursesStore.isLoading$;
        this.isAdmin$ = this.userStore.isAdmin$;
    }

    ngOnInit(): void {
        this.coursesStore.getAll();
        this.userStore.getUser();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSearch(value: string): void {
        if (value) {
            this.coursesStore.filterCourses(value);
        } else {
            this.coursesStore.getAll();
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
            this.coursesStore.deleteCourse(courseId).subscribe();
        }
    }
}