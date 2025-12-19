import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { plainToClass } from "class-transformer";
import { BcryptService } from "../../auth/bcrypt/bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(BcryptService)
    private readonly bcrypt: BcryptService
  ) { }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: user.email }
      });

      if (existingUser) {
        throw new BadRequestException(`User with email ${user.email} already exists`);
      }

      user.password = await this.bcrypt.hashPassword(user.password);

      const newUser = this.userRepository.create(user);
      const createdUser = await this.userRepository.save(newUser);
      return createdUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    const usuarios = await this.userRepository.find();
    return plainToClass(User, usuarios);
  }

  async findById(id: number): Promise<User> {
    const buscaUsuario = await this.userRepository.findOne({
      where: { id }
    });

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return plainToClass(User, buscaUsuario);
  }

  async findByEmail(email: string): Promise<User | null> {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOne({
        where: { email }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching user by email');
    }

    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    const usuarioExistente = await this.findById(id);

    const buscaUsuario = await this.userRepository.findOne({
      where: { email: user.email }
    });

    if (buscaUsuario && buscaUsuario.id !== id) {
      throw new HttpException('Email já cadastrado para outro usuário!', HttpStatus.BAD_REQUEST);
    }

    const usuarioAtualizado = {
      ...usuarioExistente,
      ...user,
      id
    };

    const salvo = await this.userRepository.save(usuarioAtualizado);
    return plainToClass(User, salvo);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.userRepository.delete(id);
  }
}