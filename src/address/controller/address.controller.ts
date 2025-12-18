import {Body,Controller,Delete,Get,Param,Post,Put,Query,} from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { Address } from '../entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Query('userId') userId: number,
    @Body() address: Address,
  ) {
    return this.addressService.create(address, userId);
  }

  //  READ - todos
  // GET /address
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.addressService.findById(id);
  }

  //  UPDATE
  // PUT /address/1?userId=1
  @Put(':id')
  update(
    @Param('id') id: number,
    @Query('userId') userId: number,
    @Body() address: Address,
  ) {
    return this.addressService.update(id, address, userId);
  }

  //  DELETE
  // DELETE /address/1
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}