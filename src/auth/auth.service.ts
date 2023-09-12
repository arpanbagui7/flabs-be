import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async signup(dto: SignUpDto, res: Response) {
    try {
      const { email, password } = dto;
      const hashPassword = await hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          hash: hashPassword,
        },
      });
      const { id } = user;
      return this.generateToken(id, res);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  async signin(dto: SignInDto, res: Response) {
    try {
      const { email, password } = dto;
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new UnauthorizedException('User does not exist');
      const { id, hash } = user;
      const isPasswordVerified = await verify(hash, password);
      if (!isPasswordVerified)
        throw new UnauthorizedException('User does not exist');
      return this.generateToken(id, res);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  async generateToken(id: string, res: Response) {
    try {
      const payload = { sub: id };
      const token = await this.jwtService.signAsync(payload, {
        expiresIn: '6h',
        secret: this.config.get('JWT_SECRET'),
      });
      const currentDate = new Date();
      currentDate.setMinutes(currentDate.getMinutes() + 360);
      const options = {
        expires: currentDate,
        httpOnly: true,
      };
      res.cookie('token', token, options);
      return { access_token: token };
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
