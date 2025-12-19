import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { Address } from '../entities/address.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@ApiTags('Address')
@Controller('/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new address for a user' })
    @ApiResponse({ status: 201, description: 'The address has been successfully created.', type: Address })
    create(@Body() address: CreateAddressDto): Promise<Address> {
        return this.addressService.create(address);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Retrieve all addresses' })
    @ApiResponse({ status: 200, description: 'List of all addresses', type: [Address] })
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Retrieve an address by its ID' })
    @ApiResponse({ status: 200, description: 'The address has been successfully retrieved.', type: Address })
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.findOne(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update an existing address' })
    @ApiResponse({ status: 200, description: 'The address has been successfully updated.', type: Address })
    update(@Param('id') id: number, @Body() address: UpdateAddressDto): Promise<Address> {
        return this.addressService.update(id, address);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete an address by its ID' })
    @ApiResponse({ status: 204, description: 'The address has been successfully deleted.' })
    delete(@Param('id') id: number) {
        return this.addressService.delete(id);
    }
}