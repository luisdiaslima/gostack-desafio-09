import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const custumerExists = await this.customersRepository.findByEmail(email);

    if (custumerExists) {
      throw new AppError('This e-mail is alredy assign to a custumer');
    }

    const custumer = await this.customersRepository.create({
      name,
      email,
    });

    return custumer;
  }
}

export default CreateCustomerService;
