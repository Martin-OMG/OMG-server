import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    //model for the rest of transactions that no need pagination
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly filesService: FilesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const res = await this.productModel.create(createProductDto);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return this.productModel.find();
  }

  async updateImage(id: string, file: Express.Multer.File) {
    try {
      const resImg = await this.filesService.uploadImage(file);
      const resUrl = await this.productModel.findOneAndUpdate(
        { _id: id },
        { imageUrl: resImg.url },
        { new: true },
      );
      return resUrl;
    } catch (error) {
      console.log(error);
    }
  }

  async updateColor(id: string, color: { imgColor: string }) {
    try {
      const resImageColor = await this.productModel.findOneAndUpdate(
        { _id: id },
        { imageColor: color.imgColor },
        { new: true },
      );
      return resImageColor;
    } catch (error) {
      console.log(error);
    }
  }
}
