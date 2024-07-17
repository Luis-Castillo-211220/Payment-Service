const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
const { client } = require('./paypalClient');


async function createPayment(amount) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'MXN',
                value: amount
            }
        }]
    });

    try {
        const response = await client().execute(request);
        return {
            status: 'success',
            id: response.result.id, // PayPal Payment ID
            approvalUrl: response.result.links.find(link => link.rel === 'approve').href
        };
    } catch (error) {
        return {
            status: 'fail',
            error: error.message
        };
    }
}

async function capturePayment(id, tokenType, bearerToken) {
    // const request = new paypal.orders.OrdersCaptureRequest(orderId);
    // request.requestBody({});
    
    try {
        // const response = await client().execute(request);
        const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${id}/capture`, {
            method: 'POST',
            headers: {
                // 'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
                'Authorization': `${tokenType} ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });
        await response.json()
        console.log(response)

        if (response.statusText === 'Created') {
            // return {
            //     status: 'completed',
            //     details: response.result
            // };
            return response
        } else {
            // return {
            //     status: 'failed',
            //     details: response.result
            // };
            return response
        }
    } catch (error) {
        return {
            status: 'failed',
            error: error.message
        };
    }
}

module.exports = { createPayment, capturePayment };
