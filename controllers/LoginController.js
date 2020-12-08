const Login = require('../models/LoginModel')

module.exports = {
    saveLogin: async (done) => {
        let ozge = Login({
            email: "ozgenuronec@gmail.com",
            password: "112233"
        })
        await ozge.save(function(err, data) {
            if (err) console.log(err)
            console.log(data)
        })
        return ozge
    }
}