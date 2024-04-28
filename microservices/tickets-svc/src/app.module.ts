import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
