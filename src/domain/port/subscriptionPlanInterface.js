const { SubscriptionPlan } = require('../entity/subscriptionPlan');

class SubscriptionPlanInterface {
    /**
     * @param {String} name
     * @param {Float} price
     * @param {Number} duration
     * @param {String} description
     * @returns {Promise<SubscriptionPlan|string|null>}
     */
    async createSubscriptionPlan(name, price, duration, description) {
        throw new Error("createSubscriptionPlan method not implemented");
    }

    /**
     * @returns {Promise<Array<SubscriptionPlan>|null>}
     */
    async listSubscriptionsPlans(){
        throw new Error("listSubscriptionsPlan method not implemented");
    }

    /**
     * 
     * @param {Number} plan_id
     * @returns {Promise<SubscriptionPlan|String|null>} 
     */
    async getByIdSuscritptionPlan(plan_id) {
        throw new Error("getByIdSuscritptionPlan method not implemented");
    }
    
    /**
     * @param {Number} plan_id
     * @param {Float} newPrice
     * @returns {Promise<SubscriptionPlan|null>}
     */
    async updateByIdSuscritptionPlanPrice(plan_id, newPrice) {
        throw new Error("updateByIdSuscritptionPlanPrice method not implemented");
    }

    /**
     * 
     * @param {Number} plan_id
     * @returns {Boolean}
     */
    async deleteByIdSubscriptionPlan(plan_id){
        throw new Error("deleteByIdSuscritptionPlan method not implemented");
    }
}

module.exports = SubscriptionPlanInterface
