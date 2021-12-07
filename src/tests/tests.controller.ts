import { Controller, Get, Param } from '@nestjs/common';
import { TestsService } from './tests.service';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'test', version: '1' })
@ApiTags('Tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  findAll() {
    return this.testsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.testsService.findOne(id);
  }
}
