import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: User })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }

    @Get('/all')
    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({ status: 200, description: 'List of all users', type: [User] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve a user by its ID' })
    @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.', type: User })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findById(id);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update an existing user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: User })
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a user by its ID' })
    @ApiResponse({ status: 204, description: 'The user has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}