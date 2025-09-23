import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should make login API call and store token', () => {
        const mockResponse = { token: 'fake-jwt-token' };
        const credentials = { email: 'test@example.com', password: 'password' };

        service.login(credentials).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne('http://localhost:4000/auth/login');
        expect(req.request.method).toEqual('POST');
        req.flush(mockResponse);
    });

    it('should make logout API call and remove token', () => {
        const mockResponse = { message: 'Logged out successfully' };

        service.logout().subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne('http://localhost:4000/auth/logout');
        expect(req.request.method).toEqual('POST');
        req.flush(mockResponse);
    });

    it('should make register API call', () => {
        const mockResponse = { message: 'User registered successfully' };
        const userData = { name: 'Test User', email: 'test@example.com', password: 'password' };

        service.register(userData).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne('http://localhost:4000/auth/register');
        expect(req.request.method).toEqual('POST');
        req.flush(mockResponse);
    });
});