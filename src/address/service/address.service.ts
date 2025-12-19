import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { User } from '../../user/entities/user.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,

        @Inject(UserService)
        private readonly userService: UserService,
    ) { }

    async create(address: CreateAddressDto): Promise<Address> {
        try {
            await this.userService.findById(address.userId);

            return this.addressRepository.save(address);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Usuário não encontrado para o endereço fornecido.');
            }
            
            throw new NotFoundException('Erro ao criar o endereço: ' + error.message);
        }
    }

    async findAll(): Promise<Address[]> {
        return this.addressRepository.find({
            relations: ['user'],
        });
    }

    async findOne(id: number): Promise<Address> {
        const address = await this.addressRepository.findOne({
            where: { id },
            relations: ['user', 'orders'],
        });

        if (!address) {
            throw new NotFoundException('Endereço não encontrado');
        }

        return address;
    }

    async update(id: number, address: UpdateAddressDto): Promise<Address> {
        await this.addressRepository.update(id, address);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const address = await this.findOne(id);
        await this.addressRepository.delete(address.id);
    }
}
