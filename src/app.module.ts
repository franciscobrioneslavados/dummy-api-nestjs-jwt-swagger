/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DummyModule } from './dummy/dummy.module';
import { Configuration } from './shared/config/config.enum';
import { JwtStrategy } from './shared/jwt/jwt.strategy';
import { LoggerService } from './shared/logger/logger.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: AppModule.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
    DummyModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {
  static port: number;
  static jwtSecret: any;

  constructor(private readonly configService: ConfigService, private readonly loggerService: LoggerService) {
    AppModule.port = this.configService.get(Configuration.PORT);
    AppModule.jwtSecret = this.configService.get(Configuration.JWT_SECRET);
    this.loggerService.log(`==> PORT on ${this.configService.get(Configuration.PORT)}`);
  }
}
