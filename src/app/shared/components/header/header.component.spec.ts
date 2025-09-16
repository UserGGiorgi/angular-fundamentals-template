import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component'; // Adjust path as needed

// Test host component for content projection
@Component({
    template: `
    <app-header>
      <div right>
        <app-button [buttonText]="'Test Button'"></app-button>
        <button class="test-button">Another Button</button>
      </div>
    </app-header>
  `
})
class TestHostComponent { }

describe('HeaderComponent', () => {
    describe('Standalone Component', () => {
        let component: HeaderComponent;
        let fixture: ComponentFixture<HeaderComponent>;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
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

    describe('Content Projection', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let hostComponent: TestHostComponent;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [HeaderComponent, TestHostComponent, ButtonComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestHostComponent);
            hostComponent = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should project buttons on the right side', () => {
            const rightContent = fixture.nativeElement.querySelector('[right]');
            expect(rightContent).toBeTruthy();

            const buttons = fixture.nativeElement.querySelectorAll('.header-right button, .header-right app-button');
            expect(buttons.length).toBeGreaterThan(0);

            const headerRight = fixture.nativeElement.querySelector('.header-right');
            expect(headerRight).toBeTruthy();
            expect(headerRight.children.length).toBeGreaterThan(0);
        });

        it('should maintain original header content while projecting', () => {
            const logo = fixture.nativeElement.querySelector('img');
            const title = fixture.nativeElement.querySelector('h1');
            const rightContent = fixture.nativeElement.querySelector('[right]');

            expect(logo).toBeTruthy();
            expect(title.textContent).toBe('Course Management System');
            expect(rightContent).toBeTruthy();
        });
    });
});