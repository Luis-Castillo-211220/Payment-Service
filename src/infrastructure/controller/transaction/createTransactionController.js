const { CreateTransactionUseCase } = require("../../../application/transaction/createTransanctionUseCase")

class CreateTransactionController{
    constructor(createTransactionUseCase = new CreateTransactionUseCase){
        this.createTransactionUseCase = createTransactionUseCase
    }

    async run(req= new Request, res= new Response){
        const { user_id, subscription_id } = req.body
        const createTransaction = await this.createTransactionUseCase.run(user_id, subscription_id)
        
        if(createTransaction){
            return res.status(200).json({
                createTransaction,
                message: "Transaction created successfully"
            })
        }else{
            return res.status(404).json({
                message: "Failed to create transaction"
            })
        }
    }
}

module.exports = { CreateTransactionController }