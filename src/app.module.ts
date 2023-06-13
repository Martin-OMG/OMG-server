import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      //make env variables avaliable in the system check (EnvConfig file)
      load: [EnvConfiguration],
      //validate using joi library env variables (if required variable is missing system fails)
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    ProductsModule,
    FilesModule,
  ],
})
export class AppModule {}
