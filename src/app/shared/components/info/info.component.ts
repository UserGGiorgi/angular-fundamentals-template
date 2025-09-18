import { Component, Input } from '@angular/core';
import { mockedAuthorsList } from '../../mocks/mocks';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent {
    @Input() course: any;

    getAuthorsNames(): string {
        if (!this.course?.authors) return 'Unknown authors';

        return this.course.authors.map((authorId: string) => {
            const author = mockedAuthorsList.find(a => a.id === authorId);
            return author ? author.name : 'Unknown Author';
        }).join(', ');
    }

    get title(): string {
        return this.course?.title || 'No title';
    }

    get text(): string {
        return this.course?.description || 'No description';
    }
}
