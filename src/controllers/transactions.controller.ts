import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from 'src/services/transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get('biggest-value')
    async getBiggestValueTransaction() {
        return await this.transactionsService.getBiggestValueTransaction();
    }
}
