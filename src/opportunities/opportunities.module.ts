import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesRepository } from './repositories/opportunities.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OpportunitiesService, OpportunitiesRepository, PrismaService],
  exports: [OpportunitiesService, OpportunitiesRepository],
})
export class OpportunitiesModule {}
