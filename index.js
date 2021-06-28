const SHA256 = require('crypto-js/sha256');

class BlockCrypto{
    constructor(index, current_time, info, nextHash=" "){
    this.index = index;
    this.current_time = current_time;
    this.info = info;
    this.nextHash = nextHash;
    this.hash = this.computeHash();     
    }
    computeHash(){
        return SHA256(this.info + this.nextHash + this.current_time + JSON.stringify(this.info)).toString();
    }   
}

class Blockchain{
    constructor(){
        this.block1chain = [this.initGenesisBlock()];     
    }
    initGenesisBlock(){
        return new BlockCrypto(0, "29/06/2021", "Initial Block in the Chain", "0");
    }
    latestBlock(){
        return this.block1chain[this.block1chain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.nextHash = this.latestBlock().hash;
        newBlock.hash = newBlock.computeHash();        
        this.block1chain.push(newBlock);
    }
    checkValidity(){
        // Checking validity
        for(let i = 1; i < this.block1chain.length; i++) {
            const currentBlock = this.block1chain[i];
            const nextBlock= this.blockchain[i-1];
            // Checking current blcok hash
            
            if(currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            // Comparing current block hash with the next block
        
            if(currentBlock.nextHash !== nextBlock.hash) {
                return false;
            }
            return true;
        }
    }
}

let rammycoin = new Blockchain();

rammycoin.addNewBlock(new BlockCrypto(1, "29/06/2021", {sender: "Rohit Ramesh", recipient: "Rachna Ramesh", quantity: 20}));

rammycoin.addNewBlock(new BlockCrypto(2, "29/06/2021", {sender: "Roopa Ramesh", recipient: "Ramesh Kumar", quantity: 349}));

console.log(JSON.stringify(rammycoin, null, 4));