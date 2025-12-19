import { forwardRef, Module, Logger } from "@nestjs/common";
import { BcryptService } from "./bcrypt/bcrypt";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigService } from "@nestjs/config";

const logger = new Logger('AuthModule');

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtSecret = configService.get<string>('JWT_SECRET');
                const jwtExpires = configService.get<string>('JWT_EXPIRES_IN') || '3h';
                logger.log(`✅ JWT Secret loaded: ${jwtSecret ? 'YES (length: ' + jwtSecret.length + ')' : 'NO - EMPTY!'}`);
                logger.log(`✅ JWT Expires: ${jwtExpires}`);
                return {
                    secret: jwtSecret,
                    signOptions: {
                        expiresIn: jwtExpires,
                    },
                } as any;
            },
        }),
    ],
    providers: [BcryptService, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [BcryptService],
})
export class AuthModule { };