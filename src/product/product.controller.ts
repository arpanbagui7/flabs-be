import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/gurad';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';

@UseGuards(JwtGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly product: ProductService) {}

  @Post()
  createProduct(@Body() dto: AddProductDto) {
    return this.product.createProduct(dto);
  }

  @Get()
  getProducts() {
    return this.product.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.product.getProductById(productId);
  }

  @Patch(':id')
  updateProduct(@Param('id') productId: string, @Body() dto: UpdateProductDto) {
    return this.product.updateProduct(productId, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.product.deleteProduct(productId);
  }
}
