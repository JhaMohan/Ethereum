const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/d4dbc79ea192404fb42689cc55ce2fc0')


// web3.eth.getBlockNumber().then(console.log)

// web3.eth.getBlock('latest').then(console.log)

// web3.eth.getBlock('latest').then((block)=>{
//     console.log(block.hash)
// })

// web3.eth.getBlock('latest').then((block)=>{
//     console.log({
//         "block hash":block.hash,
//         "block number": block.number
//     })
// })


//last 10 block

web3.eth.getBlockNumber().then((latest)=>{
    for(i=0;i<10;i++){
        web3.eth.getBlock(latest-i).then((block)=>{console.log(block.hash)})
    }
})