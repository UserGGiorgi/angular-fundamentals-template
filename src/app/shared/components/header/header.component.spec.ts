import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display logo and title', () => {
        const logo = fixture.nativeElement.querySelector('img');
        const title = fixture.nativeElement.querySelector('h1');

        expect(logo).toBeTruthy();
        expect(logo.alt).toBe('logo');
        expect(title.textContent).toBe('Course Management System');
    });
});