import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  blockHash: string;

  @Column()
  blockNumber: string;

  @Column()
  from: string;

  @Column()
  gas: string;

  @Column()
  gasPrice: string;

  @Column()
  hash: string;

  @Column()
  input: string;

  @Column()
  nonce: string;

  @Column()
  to: string;
  
  @Column()
  transactionIndex: string;

  @Column()
  value: string;

  @Column({type: 'bigint'})
  value_decimal: number;

  @Column()
  type: string;

  @Column()
  v: string

  @Column()
  r: string

  @Column()
  s: string
}
