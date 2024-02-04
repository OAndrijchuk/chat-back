import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { paginate } from 'src/utils/pagination.util';
import { Tokens } from 'src/auth/entities/tokens.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
  ) {}

  @TryCatchWrapper()
  private async checkEmail(email: string) {
    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existUser) {
      throw new BadRequestException('This email already exists!');
    }
    return existUser;
  }

  @TryCatchWrapper()
  private async checkUserExist(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tokenId'],
    });
    if (!user) {
      throw new BadRequestException(`User with id:${id} does not exist!`);
    }
    return user;
  }

  @TryCatchWrapper()
  async responseUserNormalize(res: any) {
    const { id, email, userName } = res;
    const normalizeRes = {
      id,
      email,
      userName,
    };
    return normalizeRes;
  }

  @TryCatchWrapper()
  async findAll(page: number = 1, limit: number = 20) {
    const users = await this.userRepository.find();

    const paginatedUsers = paginate(users, { page, limit });

    return await Promise.all(paginatedUsers);
  }

  @TryCatchWrapper()
  async create(createUserDto: CreateUserDto) {
    await this.checkEmail(createUserDto.email);

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
      token: '',
    });
    const setTok = await this.tokensRepository.save({
      userId: user,
    });
    await this.userRepository.update(user.id, {
      tokenId: setTok,
    });
    return user;
  }

  @TryCatchWrapper()
  async findOneByID(id: number) {
    const user = await this.checkUserExist(id);
    return user;
  }

  @TryCatchWrapper()
  async findOneByEmail(email: string) {
    const existUser = await this.userRepository.findOne({
      where: { email },
      relations: ['tokenId'],
      select: [
        'password',
        'id',
        'userName',
        'email',
        'tokenId',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!existUser) {
      throw new BadRequestException(`User with email:${email} does not exist!`);
    }
    return existUser;
  }

  @TryCatchWrapper()
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.checkUserExist(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = { ...user, ...updateUserDto };
    const newUser = await this.userRepository.save(updatedUser);

    return await this.responseUserNormalize(newUser);
  }

  @TryCatchWrapper()
  async remove(id: number) {
    await this.checkUserExist(id);
    const newUser = await this.userRepository.delete({
      id,
    });

    return await this.responseUserNormalize({ user: newUser });
  }
}
