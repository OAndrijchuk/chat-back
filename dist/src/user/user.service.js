"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const error_cach_decorator_1 = require("../decorators/error-cach.decorator");
const pagination_util_1 = require("../utils/pagination.util");
const tokens_entity_1 = require("../auth/entities/tokens.entity");
let UserService = class UserService {
    constructor(userRepository, tokensRepository) {
        this.userRepository = userRepository;
        this.tokensRepository = tokensRepository;
    }
    async checkEmail(email) {
        const existUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existUser) {
            throw new common_1.BadRequestException('This email already exists!');
        }
        return existUser;
    }
    async checkUserExist(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['tokenId'],
        });
        if (!user) {
            throw new common_1.BadRequestException(`User with id:${id} does not exist!`);
        }
        return user;
    }
    async responseUserNormalize(res) {
        const { id, email, userName } = res;
        const normalizeRes = {
            id,
            email,
            userName,
        };
        return normalizeRes;
    }
    async findAll(page = 1, limit = 20) {
        const users = await this.userRepository.find();
        const paginatedUsers = (0, pagination_util_1.paginate)(users, { page, limit });
        return await Promise.all(paginatedUsers);
    }
    async create(createUserDto) {
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
    async findOneByID(id) {
        const user = await this.checkUserExist(id);
        return user;
    }
    async findOneByEmail(email) {
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
            throw new common_1.BadRequestException(`User with email:${email} does not exist!`);
        }
        return existUser;
    }
    async update(id, updateUserDto) {
        const user = await this.checkUserExist(id);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = { ...user, ...updateUserDto };
        const newUser = await this.userRepository.save(updatedUser);
        return await this.responseUserNormalize(newUser);
    }
    async remove(id) {
        await this.checkUserExist(id);
        const newUser = await this.userRepository.delete({
            id,
        });
        return await this.responseUserNormalize({ user: newUser });
    }
};
exports.UserService = UserService;
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "checkEmail", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "checkUserExist", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "responseUserNormalize", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findAll", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findOneByID", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "findOneByEmail", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "update", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "remove", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(tokens_entity_1.Tokens)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map