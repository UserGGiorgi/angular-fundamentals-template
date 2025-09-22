import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AuthorizedGuard } from '../../auth/guards/authorized.guard';
import { AdminGuard } from '../../user/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: CoursesListComponent,
        canActivate: [AuthorizedGuard]
    },
    {
        path: 'add',
        component: AddCourseComponent,
        canActivate: [AuthorizedGuard, AdminGuard]
    },
    {
        path: ':id',
        component: CourseDetailsComponent,
        canActivate: [AuthorizedGuard]
    },
    {
        path: 'edit/:id',
        component: EditCourseComponent,
        canActivate: [AuthorizedGuard, AdminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }