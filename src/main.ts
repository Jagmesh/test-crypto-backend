import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PostgresDB } from './postgre/postgres';
import { Log } from './helpers/log';
import { Transactions } from './entities/transactions.entity';

export let PostgresClient: PostgresDB;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.APP_PORT) || 3000);

  const DBconfig: ConnectionConfigInterface = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    entities: [Transactions],
    synchronize: true,
  };

  PostgresClient = new PostgresDB(DBconfig);
  await PostgresClient.connect();

  Log.write(`[BOOTSTRAP]`, `Launched successfully!`)
}

bootstrap();
