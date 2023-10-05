interface ConnectionConfigInterface {
  host: string | undefined;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any[];
  synchronize?: boolean,
}

interface LastBlockInterface {
  jsonrpc: string;
  id: number;
  result: string
}

interface TranscationsInBlockInterface {
  jsonrpc: string;
  id: 1,
  result: {
    baseFeePerGas: string;
    difficulty: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: TranscationInterface[],
    transactionsRoot: string;
    uncles: [],
    withdrawals: [],
    withdrawalsRoot: string;
  }
}

interface TranscationInterface {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
}
