import { Module } from '@nestjs/common';
import { ConfigModule } from '@provider/config';

import { PrismaModule } from '@provider/prisma';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
