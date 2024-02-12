"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_1 = require("./gateway");
const message_entity_1 = require("./entities/message.entity");
const typeorm_1 = require("@nestjs/typeorm");
const messages_service_1 = require("./messages.service");
const messages_controller_1 = require("./messages.controller");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        providers: [gateway_1.MyGateway, messages_service_1.MessagesService],
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.Messages])],
        controllers: [messages_controller_1.MessagesController],
    })
], GatewayModule);
//# sourceMappingURL=gateway.module.js.map