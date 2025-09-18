import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormArray,
    FormControl,
    Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    form!: FormGroup;

    constructor(private fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            author: [''],
            authors: this.fb.array([]),
            duration: ['', Validators.required],
        });
    }

    get authors(): FormArray {
        return this.form.get('authors') as FormArray;
    }

    addAuthor(): void {
        const authorName = this.form.get('author')?.value?.trim();
        if (authorName) {
            this.authors.push(new FormControl(authorName));
            this.form.get('author')?.reset();
        }
    }

    removeAuthor(index: number): void {
        this.authors.removeAt(index);
    }

    get durationInHours(): string {
        const minutes = this.form.get('duration')?.value;
        if (!minutes) return '';
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}m`;
    }

    onSubmit(): void {
        if (this.form.valid) {
            console.log('Course Data:', this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}
