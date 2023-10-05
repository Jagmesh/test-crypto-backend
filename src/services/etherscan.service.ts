import { Injectable } from '@nestjs/common';
import axios, {AxiosError} from 'axios';
import { Log } from 'src/helpers/log';

@Injectable()
export class EtherscanService {
    async getLastBlockTag(): Promise<LastBlockInterface | false> {
        this.log(`</getLastBlockTag> Recieveing last block tag id`);

        const config = {
          method: 'GET',
          url: 'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber',
        };
    
        try {
          return (await axios(config)).data;
        } catch (error: any | AxiosError) {
          if (axios.isAxiosError(error)) {
            this.log(`</getLastBlockTag> Error: ${JSON.stringify(error?.response?.data, null, 2)}`);
          } else {
            this.log(`</getLastBlockTag> Error: ${error}`);
          }
          return false;
        }
    }

    async getBlockInfoByTag(tag: string): Promise<TranscationsInBlockInterface | false> {
        this.log(`</getBlockInfoByTag> Getting transaction info by tag: ${tag}`);

        const config = {
          method: 'GET',
          url: `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${tag}&boolean=true`,
        };
    
        try {
          return (await axios(config)).data;
        } catch (error: any | AxiosError) {
          if (axios.isAxiosError(error)) {
            this.log(`</getBlockInfoByTag> Error: ${JSON.stringify(error?.response?.data, null, 2)}`);
          } else {
            this.log(`</getBlockInfoByTag> Error: ${error}`);
          }
          return false;
        }
    }


    private log(message: string) {
        Log.write('[ETHERSCAN]', message);
      }
}
