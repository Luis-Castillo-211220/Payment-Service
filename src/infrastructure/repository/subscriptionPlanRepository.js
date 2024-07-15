const { SubscriptionPlan } = require('../../domain/entity/subscriptionPlan');
const SubscriptionPlanInterface = require('../../domain/port/subscriptionPlanInterface');

class SubscriptionPlanRepository extends SubscriptionPlanInterface {

    async createSubscriptionPlan(name= String, price = Float, duration= Number, description= String){
        try{
            const plan = await SubscriptionPlan.create(
                {
                    name: name,
                    price: price,
                    duration: duration,
                    description: description
                },{
                    fields:["name", "price", "duration", "description"]
                }
            )
            return plan;
        }catch(error){
            throw new Error('Error creating subscription plan')
        }
    }

    async listSubscriptionsPlans(){
        try{
            const plans = await SubscriptionPlan.findAll({
                attributes: {exclude:["cratedAt", "updatedAt"]}
            })
            return plans
        }catch(error){
            throw new Error('Error fetching subscription plans')
            return error
        }
    }

    async getByIdSuscritptionPlan(plan_id){
        try{
            const plan = await SubscriptionPlan.findByPk(plan_id)
            return plan
        }catch(error){
            throw new Error('Error fetching subscription plan by id')
            return error
        }
    }

    async updateByIdSuscritptionPlanPrice(plan_id, newPrice){
        try{
            const plan = await SubscriptionPlan.findByPk(plan_id)
            console.log(plan_id, newPrice)
            if(plan){
                await plan.update({price: newPrice})
                // const updatedPlan = await SubscriptionPlan.update({price: newPrice})
                await plan.save()
                return plan
            }else{
                throw new Error('Subscription plan not found')
                return null
            }
        }catch(error){
            throw new Error('Error updating subscription plan price')
            return error
        }
    }

    async deleteByIdSubscriptionPlan(plan_id){
        try{
            const plan = await SubscriptionPlan.findByPk(plan_id)
            if(plan){
                await plan.destroy()
                return true
            }else{
                throw new Error('Subscription plan not found')
                return false
            }
        }catch(error){
            throw new Error('Error deleting subscription plan')
            return false
        }
    }
}

module.exports = { SubscriptionPlanRepository }
    