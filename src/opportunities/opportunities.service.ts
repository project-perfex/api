import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunitiesRepository } from './repositories/opportunities.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OpportunitiesService {
  constructor(
    private readonly repository: OpportunitiesRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createOpportunityDto: CreateOpportunityDto) {
    return this.repository.create(createOpportunityDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    title?: string;
    status?: string;
    customer?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 10, title, status, customer } = query;

    const where: { title?: object; status?: object; customer?: object } = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (status) {
      where.status = {
        contains: status,
        mode: 'insensitive',
      };
    }

    if (customer) {
      where.customer = {
        OR: [
          {
            id: {
              equals: customer,
            },
          },
          {
            title: {
              contains: customer,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    try {
      const [total, opportunities] = await Promise.all([
        this.prisma.opportunity.count({ where }),
        this.prisma.opportunity.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          orderBy: {
            title: 'asc',
          },
          include: {
            customer: true,
          },
        }),
      ]);

      return {
        data: opportunities,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch opportunities: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    return this.repository.update(id, updateOpportunityDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
