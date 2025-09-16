import { Component, Input } from '@angular/core';
import { mockedAuthorsList } from '../../mocks/mocks';
@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
    @Input() course: any;

    getAuthorsNames(): string {
        if (!this.course?.authors) return 'Unknown authors';

        return this.course.authors.map((authorId: string) => {
            const author = mockedAuthorsList.find(a => a.id === authorId);
            return author ? author.name : 'Unknown Author';
        }).join(', ');
    }

    getFormattedDuration(): string {
        if (!this.course?.duration) return 'Unknown duration';

        const hours = Math.floor(this.course.duration / 60);
        const minutes = this.course.duration % 60;

        return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
    }
    showCourse(): void {
        console.log('Show course:', this.course?.id);
    }

    editCourse(): void {
        console.log('Edit course:', this.course?.id);
    }

    deleteCourse(): void {
        console.log('Delete course:', this.course?.id);
    }
}
