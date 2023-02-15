import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { VerifyIdMiddleware } from '../middlewares/userId.middleware';
import { VerifyUserEmailMiddleware } from 'src/middlewares/verifyUserEmail.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(VerifyIdMiddleware)
    .forRoutes({ path: 'user/:id', method: RequestMethod.GET }, { path: "user/:id", method: RequestMethod.PUT });
    
    consumer
    .apply(VerifyUserEmailMiddleware)
    .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}