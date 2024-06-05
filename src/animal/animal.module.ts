import { Module } from '@nestjs/common';
import { CatService } from './cat/cat.service';
import { DogService } from './dog/dog.service';

@Module({
  providers: [DogService, CatService],
})
export class AnimalModule {}
