import { Opportunity, OpportunityStatus } from '@prisma/client';

export class OpportunityEntity implements Opportunity {
  id: string;
  title: string;
  description: string;
  price: number;
  status: OpportunityStatus;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
}
