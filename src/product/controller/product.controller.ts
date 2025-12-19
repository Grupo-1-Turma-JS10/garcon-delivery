import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { Product } from "../entities/product.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Product')
@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/by-category')
    @ApiOperation({ summary: 'Retrieve products by category' })
    @ApiResponse({ status: 200, description: 'List of products for the specified category', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findByCategory(@Query('category') category: string): Promise<Product[]> {
        return this.productService.findByCategory(category);
    }

    @Get('/name/:name')
    @ApiOperation({ summary: 'Retrieve products by name' })
    @ApiResponse({ status: 200, description: 'List of products matching the name', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve a product by its ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully retrieved.', type: Product })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.findById(id);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update an existing product' })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() product: Product): Promise<Product> {
        return this.productService.update(product, id);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a product by its ID' })
    @ApiResponse({ status: 204, description: 'The product has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }
}
