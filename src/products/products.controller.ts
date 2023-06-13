import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Patch,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('imagen/imagen')
  aqui(@Body() createProductDto: CreateProductDto) {
    return 'aqui';
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Patch('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5100000, //bytes
        })
        .build({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.updateImage(id, file);
  }

  @Patch('color/:id')
  updateColor(@Param('id') id: string, @Body() color: { imgColor: string }) {
    return this.productsService.updateColor(id, color);
  }
}
