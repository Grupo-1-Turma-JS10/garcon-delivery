import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Category } from "../entities/category.entity";
import { CategoryService } from "../service/category.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth-guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Category')
@Controller("/category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: Category })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(category);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all categories' })
    @ApiResponse({ status: 200, description: 'List of all categories', type: [Category] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve a category by its ID' })
    @ApiResponse({ status: 200, description: 'The category has been successfully retrieved.', type: Category })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Get('/name/:name')
    @ApiOperation({ summary: 'Retrieve categories by name' })
    @ApiResponse({ status: 200, description: 'List of categories matching the name', type: [Category] })
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Category[]> {
        return this.categoryService.findByName(name);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update an existing category' })
    @ApiResponse({ status: 200, description: 'The category has been successfully updated.', type: Category })
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() category: CreateCategoryDto): Promise<Category> {
        return this.categoryService.update(id, category);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a category by its ID' })
    @ApiResponse({ status: 204, description: 'The category has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.delete(id);
    }
}