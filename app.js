const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, sequelize } = require('./src/database/postgresql');
const { subscriptionPlanRouter } = require("./src/infrastructure/routes/subscriptionPlanRoutes")
const { subscriptionRouter } = require("./src/infrastructure/routes/subscriptionRoutes")
const { transactionRouter } = require("./src/infrastructure/routes/trasanctionsRoutes")
const webhookRoutes = require("./src/infrastructure/routes/weebhookRoutes")

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/api/v1/subscriptions_plans/', subscriptionPlanRouter)
app.use('/api/v2/subscriptions/', subscriptionRouter)
app.use('/api/v3/transactions/', transactionRouter)
app.use('/api/v4/webhook/', webhookRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start the server:', error);
});