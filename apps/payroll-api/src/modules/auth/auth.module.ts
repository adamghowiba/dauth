import { Module } from '@nestjs/common';
import { GithubApiModule } from '../../common/auth/github/github-api.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session/session.serializer';
import { GithubStrategy } from './strategies/github.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AzureAdAuthStrategy } from './strategies/azure-ad.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    GithubApiModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GithubStrategy,
    GoogleStrategy,
    AzureAdAuthStrategy,
    SessionSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
