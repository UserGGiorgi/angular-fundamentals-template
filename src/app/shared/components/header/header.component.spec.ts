import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
    <app-header>
      <div right>Test Content</div>
    </app-header>
  `
})
class TestHostComponent { }

describe('HeaderComponent', () => {
    describe('Basic Component Tests', () => {
        let component: HeaderComponent;
        let fixture: ComponentFixture<HeaderComponent>;
        let debugElement: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [HeaderComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
            debugElement = fixture.debugElement;
            fixture.detectChanges();
        });

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should display the logo', () => {
            const logo = debugElement.query(By.css('img'));
            expect(logo).toBeTruthy();
            expect(logo.nativeElement.alt).toBe('logo');
        });

        it('should display the title', () => {
            const title = debugElement.query(By.css('h1'));
            expect(title).toBeTruthy();
            expect(title.nativeElement.textContent).toBe('Course Management System');
        });
    });

    describe('Content Projection Tests', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let debugElement: DebugElement;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [HeaderComponent, TestHostComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostComponent);
            debugElement = fixture.debugElement;
            fixture.detectChanges();
        });

        it('should project content on the right side', () => {
            const rightContent = debugElement.query(By.css('[right]'));
            expect(rightContent).toBeTruthy();
            expect(rightContent.nativeElement.textContent).toContain('Test Content');

            const headerRight = debugElement.query(By.css('.header-right'));
            expect(headerRight).toBeTruthy();
        });

        it('should maintain original content while projecting', () => {
            const logo = debugElement.query(By.css('img'));
            const title = debugElement.query(By.css('h1'));

            expect(logo).toBeTruthy();
            expect(title.nativeElement.textContent).toBe('Course Management System');

            const rightContent = debugElement.query(By.css('[right]'));
            expect(rightContent).toBeTruthy();
        });
    });
});