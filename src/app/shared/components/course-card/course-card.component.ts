import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    creationDate: string | Date;
    authors: any[];
}

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
    @Input() course!: Course;
    @Input() isAdmin!: boolean;
    @Output() edit = new EventEmitter<string>();
    @Output() show = new EventEmitter<string>();
    @Output() delete = new EventEmitter<string>();

    getAuthorsNames(): string {
        if (!this.course.authors || this.course.authors.length === 0) {
            return 'No authors';
        }
        return this.course.authors.map(author => author.name).join(', ');
    }

    onEdit(): void {
        this.edit.emit(this.course.id);
    }

    onShow(): void {
        this.show.emit(this.course.id);
    }

    onDelete(): void {
        this.delete.emit(this.course.id);
    }

    showCourse(): void {
        this.show.emit(this.course.id);
    }

    editCourse(): void {
        this.edit.emit(this.course.id);
    }

    deleteCourse(): void {
        this.delete.emit(this.course.id);
    }
}