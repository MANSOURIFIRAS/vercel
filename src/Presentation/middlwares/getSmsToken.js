const axios = require('axios');


function getSmsToken (clientID,receive,content,context){
    axios({
        method: 'POST',
        headers: {
          'Authorization': `Basic ${clientID}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        data: 'grant_type=client_credentials',
        url: 'https://api.orange.com/oauth/v3/token',
      })
        .then( async (response)=> {
            console.log('token is here '+response.data['access_token']);
            await sendSMS('+21658431557',receive,content,context,response.data['access_token']);
          return response.data['access_token']
        }).catch((error)=>{
        console.log('there are eror here ');
        console.log(error);
      });
}
async function sendSMS(senderAdress, address, message,context, token){
    await axios(`https://api.orange.com/smsmessaging/v1/outbound/tel:${senderAdress}/requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        "outboundSMSMessageRequest":{
          "address":`tel:${address}`,
          "senderAddress" : `tel:${senderAdress}`,
          "outboundSMSTextMessage":{
            "message":context+""+message
          }
        }
      })
    })
      .then( response => {
        console.log('response sms send');
        return response}).catch((error)=>{
        console.log('my error ',error);
  
      })
  }

 module.exports= getSmsToken;   
