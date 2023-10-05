import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EtherscanService } from './etherscan.service';
import { Log } from 'src/helpers/log';
import { PostgresClient } from 'src/main';
import { Transactions } from 'src/entities/transactions.entity';
import { hexToDec } from 'hex2dec'

@Injectable()
export class TransactionsService {
    constructor(private readonly Etherscan: EtherscanService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async saveTranscations() {
    const foundTag = await this.Etherscan.getLastBlockTag();
    if(!foundTag) {
      this.log('No tag recieved')
      return;
    }

    if(Number(hexToDec(foundTag.result)) < 17583000) {
        this.log(`Tag ${foundTag.result} is less than 17583000`)
        return;
    }
    
    //For api.etherscan.io to stop whining about reaching rate limit
    await new Promise(r => setTimeout(r, 5000));

    const blockInfo = await this.Etherscan.getBlockInfoByTag(foundTag.result);
    if(!blockInfo) {
      this.log('No block info recieved')
      return;
    }

    this.log(`${blockInfo.result.transactions.length} transactions in block with tag ${foundTag.result}`)
    
    for (const element of blockInfo.result.transactions) {
      await PostgresClient.insert(Transactions, {
        ...element,
        value_decimal: hexToDec(element.value)
      })
    }
  }

  async getBiggestValueTransaction() {
    const topValueTransaction = await PostgresClient.getTopValueTransaction();

    if(!topValueTransaction) {
        throw new HttpException('No such transcation', HttpStatus.NOT_FOUND)
    }

    return {
      to: topValueTransaction.to,
      from: topValueTransaction.from
    }
  }

  private log(message: string) {
    Log.write('[Save_Transactions_Cron]', message);
  }
}
