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
exports.WebhooksController = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let WebhooksController = class WebhooksController {
    config;
    stripe;
    constructor(config) {
        this.config = config;
        this.stripe = new stripe_1.default(this.config.get('STRIPE_SECRET_KEY'));
    }
    async handleStripeWebhook(req, sig) {
        let event;
        console.log('🔥 Webhook hit');
        try {
            event = this.stripe.webhooks.constructEvent(req.body, sig, this.config.get('STRIPE_WEBHOOK_SECRET'));
        }
        catch (err) {
            console.error('❌ Webhook signature verification failed:', err.message);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
        console.log('✅ Stripe Webhook Event:', event.type);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log('🎉 Payment succeeded for:', session.customer_email);
        }
        return { received: true };
    }
};
exports.WebhooksController = WebhooksController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('stripe'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "handleStripeWebhook", null);
exports.WebhooksController = WebhooksController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WebhooksController);
//# sourceMappingURL=webhooks.controller.js.map