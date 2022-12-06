const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'couple assume parrot hole tragic admit clean enhance want wagon floor lake',
    'https://goerli.infura.io/v3/8185d0b77bee446488e3e63aed075d3c'
);

const web3 = new Web3(provider);

const deploy = async () => {
    // Get List of all accounts
    const accounts = await web3.eth.getAccounts();        
    console.log('Attempting to deploy from account', accounts[0]);

    // Use of of those accounts to deploy the contract
    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({from: accounts[0], gas: '1000000' })
    
    console.log('Contract depoyed to ', result.options.address);

    provider.engine.stop();
}

deploy();