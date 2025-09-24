import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    CourseCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CourseFormComponent
} from "./components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

const components = [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    ModalComponent,
    CourseCardComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CourseFormComponent,
];

const pipes = [
    DurationPipe,
    CustomDatePipe
];

@NgModule({
    declarations: [
        ...components,
        ...pipes,
        EmailValidatorDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ...components,
        ...pipes,
        EmailValidatorDirective,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ]
})
export class SharedModule { }