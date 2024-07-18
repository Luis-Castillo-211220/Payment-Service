const express = require('express');
const { paypalWebhook } = require('../../infrastructure/controller/weebhookPaypal/weebhookController');
const { getToken } = require("../Services/paypal/paypalClient")
const { capturePayment } = require("../Services/paypal/paypalAdapter")
const { TransactionRepository } = require("../repository/transactionRepository")

const router = express.Router();



router.post('/webhook/paypal', async (req, res) => {
    const event = req.body

    if(event.event_type === "CHECKOUT.ORDER.APPROVED"){
        const paypal_payment_id = event.resource.id
        console.log(paypal_payment_id)
        try{
            const response = await fetch(`https://payment-service-wdzc.onrender.com/api/v3/transactions/${paypal_payment_id}/certificate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response){
                const data = await response.json()
                res.status(200).json({
                    message: 'Payment certificate generated successfully',
                    certificate: data
                })
            }else{
                res.status(400).send({message: 'Error fetching payment certificate'})
            }

        }catch(err){
            console.error('Error:', err)
            res.status(500).send({message: 'Error processing webhook'})
        }
    }

});

module.exports = router;
