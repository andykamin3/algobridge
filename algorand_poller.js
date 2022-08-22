const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const ethers = require('ethers')
var fileData = JSON.parse(fs.readFileSync('data.json'))

var transactionIDsRequestConfig = {
  method: 'get',
  url: 'https://testnet-algorand.api.purestake.io/idx2/v2/accounts/M4WW3S4YU64PIMTDYKR2H4IC6GVAUNCPERJ5LZHSX3NCN5OQ6DP7MAP2BY/transactions/',
  headers: { 
    'x-api-key': process.env.APIKEY
  }
};



axios(transactionIDsRequestConfig)
.then(function (response) {
    let currentRound = response.data['current-round'];
    let transactions = response.data['transactions'];
    transactions.forEach(element => {
        if(fileData['lastRound'] < element['confirmed-round'])
        transactionInfo(element['id']);
    });
    //currentRound = response.data.current-round;
    let dataToWrite = {
        'lastRound':currentRound
    };
    fs.writeFileSync('data.json', JSON.stringify(dataToWrite));
    

})
.catch(function (error) {
  console.log(error);
});


const transactionInfo = (txID)=>{
    console.log(txID)
    //Must add tx ID to the end of the URL.
    let transactionInformationRequestDefaultConfig = {
        method: 'get',
        url: 'https://testnet-algorand.api.purestake.io/idx2/v2/transactions/'+txID,
        headers: { 
        'x-api-key': process.env.APIKEY
        }
    };
    axios(transactionInformationRequestDefaultConfig)
        .then((response)=>{
            txParams = response.data['transaction']['asset-config-transaction']['params'];
            const contract = null;
        })
        .catch(function(error){
            console.log(error);
        })
}

function bridgeNFTAlgorandToETH(txParams){
    const contractABI = null;
    const pk = process.env.ETHPK
    const signer = ethers
}