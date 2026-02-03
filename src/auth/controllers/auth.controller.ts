import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local.auth.guard';
import { LocalStrategy } from '../strategy/local.strategy';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dto/LoginResponseDTO';

@UseGuards(LocalStrategy)
@ApiTags('User')
@Controller("/auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @ApiResponse({ status: 200, description: 'User logged in successfully.', type: LoginResponseDTO })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() userLogin: UsuarioLogin): Promise<LoginResponseDTO> {
        return this.authService.login(userLogin);
    }

}
