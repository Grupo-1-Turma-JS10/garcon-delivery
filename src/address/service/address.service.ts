import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AddressService {
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  findById(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(address: Address, userId: number): Promise<Address> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    address.user = user;
    return this.addressRepository.save(address);
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

  async update(id: number, address: Address, userId: number): Promise<Address> {
    const existingAddress = await this.findOne(id);
    Object.assign(existingAddress, address);
    return this.addressRepository.save(existingAddress);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
