import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthService } from './jwt.service';

@Controller('jwt')
export class JwtAuthController {
  @Inject(JwtAuthService)
  private readonly service: JwtAuthService;

  @MessagePattern('parse-token')
  public async parseToken(@Payload() data: any, @Ctx() context: RmqContext) {
    const payload = await this.service.parseToken(data.token)
    const chanel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { replyTo, correlationId } = originalMsg.properties;
    let result;
    if (payload && payload.sub) {
      result = payload
    } else {
      result = { error: 'forbidden' }
    }
    const buffer = Buffer.from(JSON.stringify(result));
    await chanel.sendToQueue(replyTo, buffer, { correlationId: correlationId });

    chanel.ack(originalMsg)
  }
}
