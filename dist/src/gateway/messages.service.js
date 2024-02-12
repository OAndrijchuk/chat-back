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
exports.MessagesService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const error_cach_decorator_1 = require("../decorators/error-cach.decorator");
const pagination_util_1 = require("../utils/pagination.util");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("./entities/message.entity");
let MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }
    async findAll(page = 1, limit = 20) {
        const messages = await this.messagesRepository.find({
            relations: ['userId'],
        });
        const paginatedMessages = (0, pagination_util_1.paginate)(messages.map((el) => ({
            ...el,
            userId: el.userId.id,
            login: el.userId.userName,
        })), { page, limit });
        return await Promise.all(paginatedMessages);
    }
};
exports.MessagesService = MessagesService;
__decorate([
    (0, error_cach_decorator_1.TryCatchWrapper)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MessagesService.prototype, "findAll", null);
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Messages)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map