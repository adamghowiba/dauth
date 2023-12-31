import { createExpressSession } from '@dauth/auth';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import { readFileSync } from 'fs';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { AppModule } from './app/app.module';

const client = new PrismaClient();

const expressSession = createExpressSession({
  client,
  secret: 'daw31231231231dd',
});

const httpsOptions = {
  key: readFileSync(path.join('/Users/adam/code/Cert/', 'localhost-key.pem')),
  cert: readFileSync(path.join('/Users/adam/code/Cert/', 'localhost.pem')),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  const port = process.env.PORT || 5050;

  app.enableCors({
    credentials: true,
    origin: (
      requestOrigin: string,
      callback: (err: Error | null, origin?: any) => void
    ) => {
      return callback(null, requestOrigin);
    },
  });

  app.use(morgan('dev'));
  app.use(expressSession);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

declare module 'express-session' {
  interface SessionData {
    user?: any;
    passport?: any;
    redirectUrl?: string;
  }
}

declare module 'express' {
  interface Request {
    user?: any & { redirectUrl: string };
  }
}

bootstrap();
