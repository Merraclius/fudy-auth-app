import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../utils/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private hashService: HashService,
  ) {}

  findById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.hashService.generateHashWithSalt(
      createUserDto.password,
    );

    const user = this.userRepo.create({
      ...createUserDto,
      password: hashPassword,
    });

    return this.userRepo.save(user);
  }
}
