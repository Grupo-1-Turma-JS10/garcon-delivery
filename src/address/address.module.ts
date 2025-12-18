import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressController } from "./controller/address.controller";
import { AddressService } from "./service/address.service";
import { Address } from "./entities/address.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
