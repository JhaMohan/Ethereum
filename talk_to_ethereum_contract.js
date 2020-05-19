const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/589ef671b6894b53a8d301c572fd8095')


const account1 = '0x9Cc74953633cF3675465384BF0f3Cd5B0B37c772'
const account2 = '0x7A795b400eeF60259CEb8B5D4789d679052aF31a'


const private_key_1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex')
const private_key_2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex')

const contractAddress = '0xd03696B53924972b9903eB17Ac5033928Be7D3Bc'

const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]


var contract = new web3.eth.Contract(contractABI,contractAddress)

// console.log(contract)

const data = contract.methods.transfer(account2,1000).encodeABI()

// console.log(data)

web3.eth.getTransactionCount(account1, (err,txCount)=>{
//create transaction object

const txobject = {
        nonce:web3.utils.toHex(txCount),
        gasLimit:web3.utils.toHex(3000000),
        gasPrice:web3.utils.toHex(web3.utils.toWei('100','gwei')),
        to:contractAddress,
        data:data
    }

    //sign the transaction
const tx = new Tx(txobject,{'chain':'ropsten'});
tx.sign(private_key_1)

const serializeTransaction  = tx.serialize() 
const raw = '0x' + serializeTransaction.toString('hex')

console.log(raw)

    //broadcast the transaction
web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log('err :',err,'txHash :',txHash)
    })
})
