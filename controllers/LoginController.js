

module.exports = {
    saveLogin: async (done) => {
        let ozge = Login({
            email: "ozgenuronec@gmail.com",
            username:"ozgeonec",
            password: "112233"
        })
        await ozge.save(function(err, data) {
            if (err) console.log(err)
            console.log(data)
        })
        return ozge
    }
}