const ORDER = require('../models/OrderModel')

module.exports = {
    createAndSaveOrder: async (done) => {
        const order = ORDER({
            buyer: "5fd8f9375644ec42a05e863f",
            seller: "5feb7b416ae2301810c251a1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel nibh dolor. " +
                "Nulla at laoreet libero, in molestie ex. Duis molestie sollicitudin efficitur. " +
                "Donec justo magna, vestibulum eget nulla quis, lobortis faucibus quam. Nulla facilisi." +
                "Mauris pretium, est sed tristique ultricies, metus risus pretium erat, eu egestas risus justo a erat. " +
                "Vivamus a risus nec orci mattis rutrum. " +
                " Nulla facilisi. Nam ultricies purus neque, eget accumsan magna porttitor mollis.",
            budget: 5
        })
        await order.save(function(err, data) {
            if (err) {console.log(err)}
            console.log(data)
        })
        return order
    },
    createOrder: async (buyer, description, budget) => {
        const order =  ORDER({
            buyer: buyer,
            description: description,
            budget: budget
        })
        try {
            return await order.save()
        } catch (error) {
            throw error
        }
    },
    getAllOrdersByUser: async (user) => {
        let order =  await ORDER.findOne({buyer: user}).populate('buyer')
        return order
    }

}