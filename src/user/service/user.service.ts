import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}


  async findByEmail(email: string): Promise<User | null> {
    return await this.usuarioRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usuarioRepository.findOne({
      where: { id },
    });
  }

  async findByUsuario(usuario: string): Promise<User | null> {
  return await this.usuarioRepository
    .createQueryBuilder('user')
    .addSelect('usuario.senha')
    .where('user.usuario = :usuario', { usuario })
    .getOne();
}
}
