const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const nodemailer = require('nodemailer');

function sendEmail(email,url){
    // Create a new OAuth2 client with the credentials
    const oAuth2Client = new google.auth.OAuth2(
      '1023117389653-3uq7v3imir2v78606s98s5dmoqtcnn8c.apps.googleusercontent.com',
      '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',
      'https://developers.google.com/oauthplayground'
    );
    
    // Set the refresh token to retrieve a new access token
    oAuth2Client.setCredentials({
      refresh_token: '1//04aqdiTwa1p4aCgYIARAAGAQSNwF-L9IrfIriyFxb3VOWNJA404FC8A0g3MhxbjiT4m8NSovtbaaUf-7sg9Doua6gQ84_dRcZUfI'
    });
    
    // Create a transport using OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'lotfi.louiz@esprit.tn',
        clientId: '1023117389653-3uq7v3imir2v78606s98s5dmoqtcnn8c.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04aqdiTwa1p4aCgYIARAAGAQSNwF-L9IrfIriyFxb3VOWNJA404FC8A0g3MhxbjiT4m8NSovtbaaUf-7sg9Doua6gQ84_dRcZUfI',
        accessToken: oAuth2Client.getAccessToken(),
        expires: Date.now() + 3600 * 1000
      }
    });
    
    // Send the OTP to  recovery email
    transporter.sendMail({
      from: 'lotfi.louiz@esprit.tn',
      to: email,
      subject: 'Email verification ',
      html: `
    <form >
    <h1 >Please use the following link to activate your account:</h1>
      <img src="../../../bioup.jpeg"/>
      <a href="${url}">${url}</a>
    </form>
  `
    })
    .then(() =>{
        console.log('OTP sent to  email');
    }
    ).catch(()=>{
        console.log('Error sending OTP to email');
    })
    
     
};

    module.exports = sendEmail;
