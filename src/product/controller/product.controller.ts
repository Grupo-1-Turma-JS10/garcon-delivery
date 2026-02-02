import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { Product } from "../entities/product.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth-guard";


@ApiBearerAuth()
@ApiTags('Product')
@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.', type: Product })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: CreateProductDto): Promise<Product> {
        return this.productService.create(product);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all products' })
    @ApiResponse({ status: 200, description: 'List of all products', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/restaurant/:restaurantId')
    @ApiOperation({ summary: 'Retrieve products by restaurant' })
    @ApiResponse({ status: 200, description: 'List of products for the specified restaurant', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findByRestaurantId(@Param('restaurantId', ParseIntPipe) restaurantId: number): Promise<Product[]> {
        return this.productService.findByRestaurantId(restaurantId);
    }

    @Get('/name/:name')
    @ApiOperation({ summary: 'Retrieve products by name' })
    @ApiResponse({ status: 200, description: 'List of products matching the name', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Product[]> {
        return this.productService.findByName(name);
    }

    @Get('/category/:category')
    @ApiOperation({ summary: 'Retrieve products by category' })
    @ApiResponse({ status: 200, description: 'List of products matching the category', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findByCategory(@Param('category') category: string): Promise<Product[]> {
        return this.productService.findByCategory(category);
    }

    @Get('/available')
    @ApiOperation({ summary: 'Retrieve available products' })
    @ApiResponse({ status: 200, description: 'List of available products', type: [Product] })
    @HttpCode(HttpStatus.OK)
    findAvailable(): Promise<Product[]> {
        return this.productService.findAvailable();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve a product by its ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully retrieved.', type: Product })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.findById(id);
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update an existing product' })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.', type: Product })
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() product: UpdateProductDto): Promise<Product> {
        return this.productService.update(id, product);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a product by its ID' })
    @ApiResponse({ status: 204, description: 'The product has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }
}
