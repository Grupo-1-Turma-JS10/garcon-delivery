import { Controller } from "@nestjs/common";
import { AddressService } from "../service/address.service";

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}
}