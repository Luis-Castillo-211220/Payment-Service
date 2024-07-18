const crypto = require('crypto');
const { Subscription } = require("../../../domain/entity/subscription")
const { Transactions } = require("../../../domain/entity/transaction")
const paypalAdapter = require('./paypalAdapter');
const { getToken } = require("./paypalClient")

const verifySignature = async (req) => {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID; // ID del webhook configurado en PayPal
    const transmissionId = req.headers['paypal-transmission-id'];
    const transmissionTime = req.headers['paypal-transmission-time'];
    const certUrl = req.headers['paypal-cert-url'];
    const authAlgo = req.headers['paypal-auth-algo'];
    const transmissionSig = req.headers['paypal-transmission-sig'];
    const webhookEvent = req.body;

    if (!webhookId || !process.env.PAYPAL_WEBHOOK_SECRET) {
        throw new Error('Missing PayPal webhook environment variables');
    }

    const expectedSignature = crypto.createHmac('sha256', process.env.PAYPAL_WEBHOOK_SECRET)
        .update(transmissionId + transmissionTime + webhookId + JSON.stringify(webhookEvent))
        .digest('base64');

    return expectedSignature === transmissionSig;
};

const updateStatusTransactionsByPaypalId = async (paypal_payment_id) => {
    try {
        const transaction = await Transactions.findOne({ where: { paypal_payment_id } });

        if (!transaction) {
            return null;
        }

        const token = await getToken();

        const captureResult = await paypalAdapter.capturePayment(paypal_payment_id, token.token_type, token.access_token);
        if (captureResult.statusText === 'Created') {
            await transaction.update({ status: 'Completed' });
            await transaction.save();

            const updateSubs = await Subscription.findOne({ where: { user_id: transaction.user_id } });
            if (updateSubs) {
                await updateSubs.update({ status: 'Active' });
                await updateSubs.save();
            } else {
                throw new Error('Subscription not found');
            }

            return transaction;
        } else {
            await transaction.update({ status: 'Failed' });
            await transaction.save();
            return transaction;
        }
    } catch (err) {
        console.error('Error updating transaction status:', err.message);
        return null;
    }
};


module.exports = { verifySignature, updateStatusTransactionsByPaypalId };
