import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { FilesService } from 'src/files/files.service';
import * as sharp from 'sharp';

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
      const resColor = await this.getDominant(file.buffer);
      const resImg = await this.filesService.uploadImage(file);
      const resUrl = await this.productModel.findOneAndUpdate(
        { _id: id },
        { imageUrl: resImg.url },
        { new: true },
      );
      if (resColor[0] > 128) {
        await this.updateColor(id, { imgColor: 'light' });
      } else {
        await this.updateColor(id, { imgColor: 'dark' });
      }
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

  async getDominant(file: any) {
    const image = await sharp(file.buffer)
      .modulate({ brightness: 2, saturation: 0 })
      .threshold(128);

    // Flatten the image with a white background
    const flattenedImage = await image.flatten().toBuffer();

    // Extract the pixel data from the flattened image
    const { data, info } = await sharp(flattenedImage)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Count the occurrence of each color in the image
    const colorCounts = new Map();
    for (let i = 0; i < data.length; i += info.channels) {
      const [r, g, b] = data.slice(i, i + info.channels);
      const color = `${r},${g},${b}`;
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    }

    // Sort the colors by count in descending order
    const sortedColors = [...colorCounts.entries()].sort((a, b) => b[1] - a[1]);

    // Return the dominant color, if available
    if (sortedColors.length > 0) {
      const [color, count] = sortedColors[0];
      return color.split(',').map(Number);
    }

    return null; // Return null if there is no dominant color
  }
}
