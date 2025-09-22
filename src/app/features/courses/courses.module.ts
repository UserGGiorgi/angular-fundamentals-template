import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        CoursesListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoursesRoutingModule,
        SharedModule
    ]
})
export class CoursesModule { }