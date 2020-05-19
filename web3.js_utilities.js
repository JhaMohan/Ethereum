const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/d4dbc79ea192404fb42689cc55ce2fc0')



// web3.eth.getGasPrice().then((result)=>{
//     console.log(web3.utils.fromWei(result,'ether'))
// })


// console.log(web3.utils.sha3('Dapp University'))

//underscore js library 

const _ = web3.utils._

// console.log(_)



_.each({key1: 'value1',key2: 'value2'},(value,key)=>{
    console.log(key)
})