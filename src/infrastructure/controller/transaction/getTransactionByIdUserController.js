const { GetTransactionByIdUserUseCase } = require("../../../application/transaction/getTransactionByIdUserUseCase")

class GetTransactionByIdUserController{
    constructor(getTransactionByIdUserUseCase = new GetTransactionByIdUserUseCase()){
        this.getTransactionByIdUserUseCase = getTransactionByIdUserUseCase
    }

    async run(req= Request, res = Response){
        const {user_id} = req.params
        const transaction = await this.getTransactionByIdUserUseCase.run(user_id)

        if(transaction){
            return res.status(200).json({
                transaction
            })
        }else{
            res.status(404).json({
                status: "error, no transaction found",
            })
        }
    }
}

module.exports = { GetTransactionByIdUserController }