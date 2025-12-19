import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";




@Injectable()
export class AuthService {
constructor(
    private usuarioService: UserService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
) {}

async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByEmail(username);

    if (!buscaUsuario)
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

   
    }
    async login(usuarioLogin: UsuarioLogin) {
        const payload = {sub: usuarioLogin.usuario}
        const buscaUsuario = await this.usuarioService.findByEmail(
            usuarioLogin.usuario,
        );
        return {
            
        };
    }
}  