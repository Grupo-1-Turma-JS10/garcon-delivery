import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>) {}
}