const { GetByIdSubscriptionPlanUseCase } = require("../../../application/subscriptionPlan/getByIdSubscriptionUseCase")

class GetByIdSubscriptionPlanController{
    constructor( getByIdSuscritptionPlanUseCase = new GetByIdSubscriptionPlanUseCase){
        this.getByIdSuscritptionPlanUseCase = getByIdSuscritptionPlanUseCase
    }

    async run(req= new Request, res= new Response){
        const { plan_id } = req.params
        const suscritpcion = await this.getByIdSuscritptionPlanUseCase.run(plan_id)

        if(suscritpcion){
            return res.status(200).json({
                suscritpcion
            });
        }else{
            return res.status(404).json({
                error: "No se encontró la suscripción"
            });
        }
    }   
}

module.exports = { GetByIdSubscriptionPlanController }