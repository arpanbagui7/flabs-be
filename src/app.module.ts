import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, ErrorHandlerModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
