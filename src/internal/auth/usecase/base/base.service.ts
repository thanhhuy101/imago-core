import { Inject, Injectable } from "@nestjs/common";
import { AuthRepository, AuthUseCase } from "../../../../domain/auth.domain";

@Injectable()
export class BaseService implements AuthUseCase {
  constructor(@Inject('AuthRepository') private authRepository: AuthRepository) {
  }

  async verifyToken(token: string) {
    return this.authRepository.verifyToken(token);
  }
}
