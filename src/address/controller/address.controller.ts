import { Body, Controller, Delete, Get, Param, Post, Put, Query, } from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { Address } from '../entities/address.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new address for a user' })
    @ApiResponse({ status: 201, description: 'The address has been successfully created.', type: Address })
    create(
        @Query('userId') userId: number,
        @Body() address: Address,
    ) {
        return this.addressService.create(address, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all addresses' })
    @ApiResponse({ status: 200, description: 'List of all addresses', type: [Address] })
    findAll() {
        return this.addressService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve an address by its ID' })
    @ApiResponse({ status: 200, description: 'The address has been successfully retrieved.', type: Address })
    findById(@Param('id') id: number) {
        return this.addressService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing address' })
    @ApiResponse({ status: 200, description: 'The address has been successfully updated.', type: Address })
    update(
        @Param('id') id: number,
        @Query('userId') userId: number,
        @Body() address: Address,
    ) {
        return this.addressService.update(id, address, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an address by its ID' })
    @ApiResponse({ status: 204, description: 'The address has been successfully deleted.' })
    delete(@Param('id') id: number) {
        return this.addressService.delete(id);
    }
}