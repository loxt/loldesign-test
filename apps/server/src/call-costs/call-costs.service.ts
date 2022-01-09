import { Injectable } from '@nestjs/common';
import { CreateCallCostInput } from './dto/create-call-cost.input';
import { UpdateCallCostInput } from './dto/update-call-cost.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CallCost } from './entities/call-cost.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';

@Injectable()
export class CallCostsService {
  constructor(
    @InjectRepository(CallCost)
    private readonly callCostRepository: Repository<CallCost>
  ) {}

  async create(createCallCostInput: CreateCallCostInput) {
    const test = await this.callCostRepository.create(createCallCostInput);
    return this.callCostRepository.save(test);
  }

  findAll() {
    return this.callCostRepository.find();
  }

  findOne(id: string) {
    return this.callCostRepository.findOneOrFail(id);
  }

  async update(id: string, updateCallCostInput: UpdateCallCostInput) {
    const callCost = await this.findOne(id);
    if (!callCost) {
      return new GraphQLError(`A callCost with ID ${id} doesn't exist`);
    }

    const newCallCost = new CallCost();
    Object.assign(newCallCost, updateCallCostInput);

    return await this.callCostRepository.save({
      id: callCost.id,
      ...callCost,
      ...newCallCost,
    });
  }

  async remove(id: string) {
    const callCost = await this.findOne(id);
    if (!callCost) {
      return new GraphQLError(`A callCost with ID ${id} doesn't exist`);
    }

    return this.callCostRepository.remove(callCost);
  }
}
