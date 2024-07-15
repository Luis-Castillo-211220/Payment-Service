const { GetAllTransactionsUseCase } = require("../../../application/transaction/getAllTransactionsUseCase")

class GetAllTransactionsController {
    constructor(getAllTransactionsUseCase = new GetAllTransactionsUseCase()) {
        this.getAllTransactionsUseCase = getAllTransactionsUseCase;
    }

    async run(req= Request, res= Response) {

        try{
            const transactions = await this.getAllTransactionsUseCase.run()

            if (transactions) {
                return res.status(200).json({
                    transactions
                });
            } else {
                return res.status(500).json({ message: "Error fetching transactions" });
            }
        }catch(err){
            return res.status(500).json({ message: err.message });
        }

    }
}

module.exports = { GetAllTransactionsController }