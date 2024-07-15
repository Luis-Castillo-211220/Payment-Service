const { Subscription } = require("../entity/subscription")

class SubscriptionInterface{

    // * @param {Date|null} start_date
    // * @param {Date} end_date

    /**
     * @param {Number} user_id
     * @param {Number} plan_id

     * @param {String|null} status
     * @returns {Promise<Subscription|null|String>}
     */
    async createSubscription(user_id, plan_id, status){
        throw new Error("createSubscription method not implemented")
    }

    /**
     * @returns {Promise<Array<Subscription>|null>}
     */
    async getAllSubscriptions(){
        throw new Error("getAllSubscriptions method not implemented")
    }

    /**
     * 
     * @param {Number} user_id
     * @returns {Promise<Subscription|null>}
     */
    async getSubscriptionByIdUser(user_id){
        throw new Error("getSubscriptionsByIdUser method not implemented")
    }

    //ACTUALIZAR PENDIENTE

    /**
     * 
     * @param {number} user_id
     * @returns {Promise<Boolean|null>}
     */
    async deleteSubscriptionByIdUser(user_id){
        throw new Error("deleteSubscriptionByIdUser method not implemented")
    }
}

module.exports = SubscriptionInterface;