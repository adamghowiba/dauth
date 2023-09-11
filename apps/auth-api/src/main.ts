import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import { AppModule } from './app/app.module';

const client = new PrismaClient();

const expressSession = session({
  secret: 'daw31231231231dd',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
  store: new PrismaSessionStore(client, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
    logger: console,
  }),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
