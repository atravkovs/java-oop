import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtDTO, LoginDTO, loginDtoToAuthDto, RegistrationDTO } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationRepository {
  constructor(private http: HttpClient) {}

  login(loginDto: LoginDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(
      '/api/users/authenticate',
      loginDtoToAuthDto(loginDto)
    );
  }

  register(registrationDTO: RegistrationDTO) {
    return this.http.post(
      '/api/users/register',
      registrationDTO
    );
  }
}
