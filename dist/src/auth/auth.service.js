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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const tokens_entity_1 = require("./entities/tokens.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_cach_decorator_1 = require("../decorators/error-cach.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const save_cookie_obj_1 = require("../utils/save-cookie-obj");
let AuthService = class AuthService {
    constructor(userRepository, tokensRepository, userService, jwtService) {
        this.userRepository = userRepository;
        this.tokensRepository = tokensRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user && isPasswordValid) {
            return user;
        }
        throw new common_1.UnauthorizedException('Email os password are incorrect');
    }
    async validateToken(token) {
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        return this.jwtService.verify(token);
    }
    async responseTokenNormalize(tokenAll) {
        const { accessToken: token } = tokenAll;
        return token;
    }
    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '5m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '15d',
        });
        return { accessToken, refreshToken };
    }
    async saveToken(userId, tokens) {
        const { refreshToken, accessToken } = tokens;
        const data = await this.userService.findOneByID(userId.id);
        if (!data.tokenId) {
            throw new common_1.UnauthorizedException();
        }
        return await this.tokensRepository.save({
            ...data.tokenId,
            refreshToken,
            accessToken,
        });
    }
    async signUp(createUserDto) {
        const user = await this.userService.create(createUserDto);
        return await this.userService.responseUserNormalize(user);
    }
    async signIn(res, userEmail, password) {
        const user = await this.validateUser(userEmail, password);
        const { id, email, userName } = user;
        const tokens = await this.generateTokens({
            id,
            email,
            userName,
        });
        const newTokens = await this.saveToken(user, tokens);
        const goodUser = await this.userService.findOneByID(id);
        const token = goodUser.tokenId.accessToken;
        res.cookie('refreshToken', newTokens.refreshToken, save_cookie_obj_1.cookieOptions);
        return {
            token,
            user: await this.userService.responseUserNormalize(goodUser),
        };
    }
    async logOut(refreshToken) {
        const { id } = await this.tokensRepository.findOne({
            where: { refreshToken },
        });
        await this.tokensRepository.update(id, {
            refreshToken: '',
            accessToken: '',
        });
        return { massage: 'The exit was completed successfully!' };
    }
    async refresh(res, refToken) {
        await this.validateToken(refToken);
        const token = await this.tokensRepository.findOne({
            where: { refreshToken: refToken },
            relations: ['userId'],
        });
        const { id, email, userName } = token.userId;
        const tokens = await this.generateTokens({
            id,
            email,
            userName,
        });
        const { refreshToken, accessToken } = await this.saveToken(token.userId, tokens);
        res.cookie('refreshToken', refreshToken, save_cookie_obj_1.cookieOptions);
        return {
            token: accessToken,
            user: await this.userService.responseUserNormalize(token.userId),
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "validateUser", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "validateToken", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "responseTokenNormalize", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "generateTokens", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "saveToken", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signUp", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logOut", null);
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "refresh", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(tokens_entity_1.Tokens)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map