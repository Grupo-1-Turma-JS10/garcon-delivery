import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserService } from "../../user/service/user.service";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UserService,
        private jwtService: JwtService,
        private bcrypt: BcryptService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        let user: User | null;
        let passwordMatch: boolean;

        try {
            user = await this.usuarioService.findByEmail(email);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            passwordMatch = await this.bcrypt.comparePassword(password, user.password);
        } catch (error) {
            error instanceof Error ? error.message : String(error);
            throw new InternalServerErrorException('Error on validate user');
        }

        if (!user || !passwordMatch) {
            throw new NotFoundException('Invalid credentials');
        }

        const userResponse = { ...user };
        delete (userResponse as Partial<User>).password;
        return userResponse;

    }

    async login(usuarioLogin: UsuarioLogin) {
        const user = await this.usuarioService.findByEmail(
            usuarioLogin.email,
        );

        if (!user) {
            throw new NotFoundException('User not found');
        }

        try {
            const payload = { id: user?.id, email: user?.email, username: user?.name };
            const signedToken = this.jwtService.sign(payload);

            return {
                username: user?.name,
                email: user?.email,
                token: `Bearer ${signedToken}`,
                role: user?.role
            };
        } catch (error) {
            throw new InternalServerErrorException('Error generating token');
        }
    }
}  