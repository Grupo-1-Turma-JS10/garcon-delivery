import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm"; 
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

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

        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const buscaUsuario = await this.userRepository.findOne({
            where: { id }
        });

        if (!buscaUsuario) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        return buscaUsuario;
    }

    async update(id: number, user: UpdateUserDto): Promise<User> {
        await this.findById(id);

        const buscaUsuario = await this.userRepository.findOne({ 
            where: { email: user.email } 
        });

        if (buscaUsuario && buscaUsuario.id !== id) {
            throw new HttpException('Email já cadastrado para outro usuário!', HttpStatus.BAD_REQUEST);
        }

        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.userRepository.delete(id);
    }
}