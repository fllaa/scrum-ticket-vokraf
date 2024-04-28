import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from '@flla/nestjs-grpc-exceptions';
import { ITicketService } from '../interfaces/ticket.service.interface';
import { TicketServiceClientOptions } from '../../common/options/client.options';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth.user.decorator';
import { TicketCreateApiDto } from 'src/ticket/dtos/ticket.create.dto';
import { TicketUpdateApiDto } from 'src/ticket/dtos/ticket.update.dto';
import { TicketAddRemoveAssigneeApiDto } from 'src/ticket/dtos/ticket.add-remove-assignee.dto';
import { TicketChangeAssigneeApiDto } from 'src/ticket/dtos/ticket.change-assignee.dto';

@Controller('tickets')
export class TicketController implements OnModuleInit {
  @Client(TicketServiceClientOptions)
  private readonly ticketServiceClient: ClientGrpc;

  private ticketService: ITicketService;

  onModuleInit() {
    this.ticketService =
      this.ticketServiceClient.getService<ITicketService>('TicketService');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  create(
    @AuthUser() { sub }: { sub: string },
    @Body() data: TicketCreateApiDto,
  ) {
    return this.ticketService.create({
      ...data,
      creatorId: sub,
    });
  }

  @Get('summary')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  summary(@AuthUser() { sub }: { sub: string }) {
    return this.ticketService.summary({ userId: sub });
  }

  @Get('performance')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  performance(@AuthUser() { sub }: { sub: string }) {
    return this.ticketService.performance({ userId: sub });
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  get(@Param('id') id: string) {
    return this.ticketService.get({ id });
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  list(@AuthUser() { sub }: { sub: string }) {
    return this.ticketService.listByUser({ userId: sub });
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  update(
    @AuthUser() { sub }: { sub: string },
    @Param('id') id: string,
    @Body() data: TicketUpdateApiDto,
  ) {
    return this.ticketService.update({
      id,
      userId: sub,
      ...data,
    });
  }

  @Post(':id/assignee')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  addAssignee(
    @AuthUser() { sub }: { sub: string },
    @Param('id') id: string,
    @Body() data: TicketAddRemoveAssigneeApiDto,
  ) {
    return this.ticketService.addAssignee({
      id,
      userId: sub,
      assigneeId: data.assigneeId,
    });
  }

  @Patch(':id/assignee/change')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  changeAssignee(
    @AuthUser() { sub }: { sub: string },
    @Param('id') id: string,
    @Body() data: TicketChangeAssigneeApiDto,
  ) {
    return this.ticketService.changeAssignee({
      id,
      userId: sub,
      oldAssigneeId: data.oldAssigneeId,
      newAssigneeId: data.newAssigneeId,
    });
  }

  @Delete(':id/assignee')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  removeAssignee(
    @AuthUser() { sub }: { sub: string },
    @Param('id') id: string,
    @Body() data: TicketAddRemoveAssigneeApiDto,
  ) {
    return this.ticketService.removeAssignee({
      id,
      userId: sub,
      assigneeId: data.assigneeId,
    });
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.ticketService.delete({ id });
  }
}
