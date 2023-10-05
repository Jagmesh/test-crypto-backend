import { DataSource } from 'typeorm';
import { Log } from '../helpers/log';
import { Transactions } from 'src/entities/transactions.entity';

export class PostgresDB {
  PostgresDataSource: DataSource;
  connectionConfig: ConnectionConfigInterface;

  constructor(config: ConnectionConfigInterface) {
    this.connectionConfig = config;
  }
  
  async connect() {
    this.log(`Connecting to Postgres via ${this.connectionConfig.host}:${this.connectionConfig.port}`);
    this.PostgresDataSource = new DataSource({
      type: 'postgres',
      ...this.connectionConfig,
    });

    try {
      await this.PostgresDataSource.initialize();
      this.log('Connected to Postgres!');
    } catch (error) {
      this.log(`Connection to Postgres failed. Error: ${error}`);
    }
  }

  async insert(entity: any, data: any) {
    try {
      await this.PostgresDataSource
        .createQueryBuilder()
        .insert()
        .into(entity)
        .values(data)
        .execute();

      this.log('Inserted successfully')
    } catch (error) {
      this.log(`Couldn't insert data into DB. Error: ${error}`);
      return false;
    }
  }

  async getTopValueTransaction() {
    try {
      return await this.PostgresDataSource
        .getRepository(Transactions)
        .createQueryBuilder('transactions')
        .orderBy('value_decimal', 'DESC')
        .getOne();

    } catch (error) {
      this.log(`Couldn't insert data into DB. Error: ${error}`);
      return false;
    }
  }

  private log(message: string) {
    Log.write('[POSTGRES]', message);
  }
}
