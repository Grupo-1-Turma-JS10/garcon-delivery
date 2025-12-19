import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class BcryptService {
    async hashPassword(password: string): Promise<string> {
        try {
            const saltRounds: number = 10;
            return await hash(password, saltRounds);
        } catch (error) {
            throw new InternalServerErrorException('Error hashing password');
        }
    }

    async comparePassword(
        typedPassword: string,
        storedPassword: string
    ): Promise<boolean> {
        try {
            return await compare(typedPassword, storedPassword);
        } catch (error) {
            throw new InternalServerErrorException('Error comparing passwords');
        }
    }
}