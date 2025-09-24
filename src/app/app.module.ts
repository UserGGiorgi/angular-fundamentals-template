import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';

// Add these NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'; // Add this import

import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { UserService } from '@app/user/services/user.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { ComponentNameComponent } from './component-name/component-name.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { reducers, effects } from './store';

@NgModule({
    declarations: [
        AppComponent,
        CourseInfoComponent,
        ComponentNameComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        FontAwesomeModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
    ],
    providers: [
        AuthorizedGuard,
        NotAuthorizedGuard,
        AdminGuard,
        CoursesService,
        CoursesStoreService,
        UserService,
        UserStoreService,
        AuthService,
        SessionStorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }