import * as CryptoJs from 'crypto-js';

class Block {
    static calulateBlockHash = (index: number, previouHash: string, timestamp: number, data: string): string => CryptoJs.SHA256(index + previouHash + data).toString();
    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previouHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previouHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previouHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash
        this.previouHash = previouHash
        this.data = data
        this.timestamp = timestamp
    }
}

const genesisBlock: Block = new Block(0, "2020020202023", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previosBlock: Block = getLatestBlock();
    const newIndex: number = previosBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calulateBlockHash(newIndex, previosBlock.hash, newTimeStamp, data);
    const newBlock: Block = new Block(newIndex, newHash, previosBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.calulateBlockHash(aBlock.index, aBlock.previouHash, aBlock.timestamp, aBlock.data);


const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previouHash) {
        return false
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }

}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");

console.log(blockchain);


export { }
