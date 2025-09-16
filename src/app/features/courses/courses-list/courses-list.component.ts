import { Component } from '@angular/core';
import { mockedCoursesList } from '../../../shared/mocks/mocks';

@Component({
	selector: 'app-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
	courses = mockedCoursesList;
}