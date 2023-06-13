import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesService } from './files.service';
import { FilesProvider } from './files.provider';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FilesProvider],
  imports: [ConfigModule],
  exports: [FilesService],
})
export class FilesModule {}
