import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../services/courses.service';
import { CoursesStateFacade } from '../../store/courses/courses.facade';
import { mockedAuthorsList } from 'src/app/shared/mocks/mocks';

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
    course$: Observable<Course | null>;
    isLoading$: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private coursesFacade: CoursesStateFacade
    ) {
        this.course$ = this.coursesFacade.course$;
        this.isLoading$ = this.coursesFacade.isSingleCourseLoading$;
    }

    ngOnInit(): void {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.coursesFacade.getSingleCourse(courseId);
        }
    }

    getAuthorsNames(authors: any[]): string {
        if (!authors || authors.length === 0) {
            return 'No authors';
        }

        // If authors are objects with name property
        if (authors[0] && authors[0].name) {
            return authors.map(author => author.name).join(', ');
        }

        // If authors are IDs, map them to author names
        if (typeof authors[0] === 'string') {
            return authors.map((authorId: string) => {
                const author = mockedAuthorsList.find(a => a.id === authorId);
                return author ? author.name : 'Unknown Author';
            }).join(', ');
        }

        return 'Unknown authors';
    }
}