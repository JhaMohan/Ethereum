const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')

const url = 'https://ropsten.infura.io/v3/589ef671b6894b53a8d301c572fd8095'

const web3 = new Web3(url)

var account1 = "0x9Cc74953633cF3675465384BF0f3Cd5B0B37c772"

var account2 = "0x7A795b400eeF60259CEb8B5D4789d679052aF31a"

var private_key_1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex')

var private_key_2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex')

// web3.eth.getBalance(account1,(err,bal)=>{
//     console.log('balance of account1',web3.utils.fromWei(bal,'ether'))
// })


// web3.eth.getBalance(account2,(err,bal)=>{
//     console.log('balance of account2',web3.utils.fromWei(bal,'ether'))
// })


// to send the transaction we have to do 3 step

// step1: build the transaction

web3.eth.getTransactionCount(account1,(err,txCount)=>{

const txobject = {
    nonce: web3.utils.toHex(txCount),
    to: account2 ,
    value: web3.utils.toHex(web3.utils.toWei('0.2','ether')),
    gasLimit:web3.utils.toHex(21000),
    gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei')),
}

// console.log(txobject)

// step2: sign the transaction
// const tx = new Tx(txobject)
const tx = new Tx(txobject, {'chain':'ropsten'});
tx.sign(private_key_1)

const serializeTransaction  = tx.serialize() 
const raw = '0x' + serializeTransaction.toString('hex')

// console.log(raw)

// step3: broadcast the transaction into the ethereum network
web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
    console.log('txHash:',txHash)
})


})


// web3.eth.getBalance(account1,(err,bal)=>{
//     console.log('balance of account1',web3.utils.fromWei(bal,'ether'))
// })


// web3.eth.getBalance(account2,(err,bal)=>{
//     console.log('balance of account2',web3.utils.fromWei(bal,'ether'))
// })