"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatchWrapper = void 0;
const common_1 = require("@nestjs/common");
const TryCatchWrapper = () => (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        try {
            return originalMethod.apply(this, args);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Server error! ${error.message}`);
        }
    };
};
exports.TryCatchWrapper = TryCatchWrapper;
//# sourceMappingURL=error-cach.decorator.js.map