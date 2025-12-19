import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm"; 
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(user: CreateUserDto): Promise<User> {
        const buscaUsuario = await this.userRepository.findOne({ 
            where: { email: user.email } 
        });
        
        if (buscaUsuario) {
            throw new HttpException('O Usuário (Email) já existe!', HttpStatus.BAD_REQUEST);
        }

        const novoUsuario = await this.userRepository.save(user);
        return plainToClass(User, novoUsuario);
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