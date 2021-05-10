/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DummyResponse } from './dtos/dummyResponse.dto';
import { DummyService } from './dummy.service';

@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Get('')
  @ApiTags('Dummy Title')
  @ApiBearerAuth('jwt-auth')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: DummyResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid Token',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Se ha producido un error interno',
  })
  public async getDummy(): Promise<DummyResponse> {
    return {
      title: 'Dummy Title',
      description: 'Dummy Description',
    };
  }
}
