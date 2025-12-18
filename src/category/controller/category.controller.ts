import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Category } from "../category/category.entity";
import { CategoryService } from "../service/category.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('/Category')
@Controller("/category")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoryService.findById(id);
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('name') name: string): Promise<Category[]> {
        return this.categoryService.findByName(name);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() category: Category): Promise<Category> {
        return this.categoryService.update(category);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.delete(id);
    }
}