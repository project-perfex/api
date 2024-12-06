import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOpportunityDto } from '../dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';

@Injectable()
export class OpportunitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOpportunityDto: CreateOpportunityDto) {
    const opportunity = this.prisma.opportunity.create({
      data: {
        ...createOpportunityDto,
      },
    });

    return opportunity;
  }

  async findAll() {
    const opportunities = this.prisma.opportunity.findMany();

    return {
      data: opportunities,
    };
  }

  async findOne(id: string) {
    const opportunity = this.prisma.opportunity.findUnique({
      where: {
        id,
      },
    });

    return opportunity;
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    const opportunity = this.prisma.opportunity.update({
      where: {
        id,
      },
      data: {
        ...updateOpportunityDto,
      },
    });

    return opportunity;
  }

  async remove(id: string) {
    const opportunity = this.prisma.opportunity.delete({
      where: {
        id,
      },
    });

    return opportunity;
  }
}
