import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VerifyIdMiddleware } from '../middlewares/userId.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyIdMiddleware).forRoutes({ path: 'user/:id', method: RequestMethod.GET}, {path: "user/:id", method: RequestMethod.PUT});
  }
}