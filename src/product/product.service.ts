import { Injectable } from '@nestjs/common';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async createProduct(dto: AddProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: dto,
      });
      return product;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  async getProducts() {
    try {
      const products = await this.prisma.product.findMany({});
      return products;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      return product;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  async updateProduct(productId: string, dto: UpdateProductDto) {
    try {
      const product = await this.prisma.product.update({
        where: { id: productId },
        data: dto,
      });
      return product;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  async deleteProduct(productId: string) {
    try {
      const product = await this.prisma.product.delete({
        where: { id: productId },
      });
      return product;
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
