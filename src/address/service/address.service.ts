import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: Repository<Address>) {}
}