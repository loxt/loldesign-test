import { Injectable } from '@nestjs/common';
import { CreatePlanInput } from './dto/create-plan.input';
import { UpdatePlanInput } from './dto/update-plan.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>
  ) {}

  create(createPlanInput: CreatePlanInput) {
    return this.planRepository.save(createPlanInput);
  }

  findAll() {
    return this.planRepository.find();
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOne(id);

    if (!plan) {
      throw new GraphQLError(`A Plan with ID ${id} doesn't exists`);
    }

    return plan;
  }

  async update(id: string, updatePlanInput: UpdatePlanInput) {
    const plan = await this.findOne(id);
    if (!plan) {
      return new GraphQLError(`A plan with ID ${id} doesn't exist`);
    }

    const newPlan = new Plan();
    Object.assign(newPlan, updatePlanInput);

    return await this.planRepository.save({
      id: plan.id,
      ...plan,
      ...newPlan,
    });
  }

  async remove(id: string) {
    const plan = await this.findOne(id);
    if (!plan) {
      return new GraphQLError(`A plan with ID ${id} doesn't exist`);
    }

    return this.planRepository.remove(plan);
  }
}
