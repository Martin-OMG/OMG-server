import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Cloudinary } from './files.provider';

@Injectable()
export class FilesService {
  private v2: any;
  constructor(
    @Inject(Cloudinary)
    private readonly cloudinary,
    private readonly configService: ConfigService,
  ) {
    this.cloudinary.v2.config({
      cloud_name: this.configService.get('cloud_name'),
      api_key: this.configService.get('api_key'),
      api_secret: this.configService.get('api_secret'),
    });
    this.v2 = cloudinary.v2;
  }
  async uploadImage(
    img: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(img.buffer).pipe(upload);
    });
  }
}
