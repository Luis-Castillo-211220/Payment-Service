const { UpdateStatusTransactionByPaypalIdUseCase } = require("../../../application/transaction/updateStatusTransactionByPaypalIdUseCase")

class UpdateStatusTransactionByPaypalIdController {
    constructor(updateStatusTransactionByPaypalIdUseCase = new UpdateStatusTransactionByPaypalIdUseCase()) {
        this.updateStatusTransactionByPaypalIdUseCase = updateStatusTransactionByPaypalIdUseCase;
    }

    async run(req = Request, res = Response) {
        try{
            const { paypal_payment_id } = req.params;
            const transaction = await this.updateStatusTransactionByPaypalIdUseCase.run(paypal_payment_id)
            
            if(transaction){
                return res.status(200).json({
                    transaction,
                    message: "Transaction status updated successfully"
                });
            }else{
                return res.status(404).json({ 
                    message: "Transaction not found" 
                });
            }

        }catch(err){
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }


    }
}

module.exports = { UpdateStatusTransactionByPaypalIdController }