export interface RegistrationDTO {
  name: string;
  email: string;
  surname: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthDTO {
  email: string;
  password: string;
}

export interface JwtDTO {
  jwtToken: string;
}

export const loginDtoToAuthDto = ({ email, password }: LoginDTO): AuthDTO => ({
  email,
  password,
});

export const registrationDtoToLoginDto = ({
  email,
  password,
}: RegistrationDTO): LoginDTO => ({
  email,
  password,
});
