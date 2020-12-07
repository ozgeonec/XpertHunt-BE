const USER = require('../models/user.model')
let mongoose = require('mongoose');

module.exports = {
   getUser: async (id,done) => {
        USER.findById(id, function (err,data){
            if (err) return console.log(err)
            done(null, data)
        })
   },
   createAndSaveUser: async (done) => {
        let ozge = new USER({
            firstname:"Ozge",
            lastname:"Onec",
            username:"ozgeonec",
            short_desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel nibh dolor. Nulla at laoreet libero, in molestie ex. Duis molestie sollicitudin efficitur. Donec justo magna, vestibulum eget nulla quis, lobortis faucibus quam. Nulla facilisi. Mauris pretium, est sed tristique ultricies, metus risus pretium erat, eu egestas risus justo a erat. Vivamus a risus nec orci mattis rutrum. Etiam eleifend elit sed imperdiet lobortis. Donec lectus leo, laoreet ut turpis id, cursus viverra ipsum. Etiam condimentum, diam non maximus pharetra, erat nunc blandit velit, ut fermentum nulla massa sit amet nisl. Mauris nec rutrum velit. Praesent cursus felis id ligula accumsan blandit. Aliquam placerat nibh vitae accumsan consequat. Nulla facilisi. Nam ultricies purus neque, eget accumsan magna porttitor mollis.",
            occupation: "Developer",
            country:"Turkey"
        })

        // USER.create(ozge, function (err, data) {
        //     if (err) return console.error(err);
        //     done(null, data)
        //     console.log("ozge created")
        // })
        await ozge.save(function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(data)
        })
        return ozge
   }
}