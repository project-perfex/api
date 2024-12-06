import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Opportunities')
@ApiBearerAuth('access-token')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createOpportunityDto: CreateOpportunityDto) {
    return this.opportunitiesService.create(createOpportunityDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'customer', required: false })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('title') title?: string,
    @Query('status') status?: string,
    @Query('customer') customer?: string,
  ) {
    return this.opportunitiesService.findAll({
      page: page ?? 1,
      limit: limit ?? 10,
      title,
      status,
      customer,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.opportunitiesService.remove(id);
  }
}
