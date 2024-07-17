// paypalClient.js

const paypal = require('@paypal/checkout-server-sdk');

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID; // Asegúrate de configurar tus variables de entorno
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

const getToken = async () => {
    const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}` // Codifica tus credenciales en base64
    };

    const body = 'grant_type=client_credentials';

    const responseToken = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })

    const data = await responseToken.json();
    return data;
}




module.exports = { client, getToken } ;
