import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleAModule } from './module-a/module-a.module';

@Module({
  imports: [ModuleAModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
