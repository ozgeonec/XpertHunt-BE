const ADVERT = require('../models/AdvertModel')

module.exports = {
    createAndSaveAdvert: async (done) => {
        const gig = ADVERT({
            owner: "5fe31c4073836e533890e5b8",
            title: "Developer",
            about:"I can design and develop your website",
            price: 10
        })
        await gig.save(function(err, data) {
            if (err) {console.log(err)}
            console.log(data)
        })
        return gig
    },
    createAdvert: async (owner,title,about,price) => {
        const advert = ADVERT({
            owner:owner,
            title:title,
            about:about,
            price:price
        })
        try {
            return await advert.save()
        } catch (error) {
            throw error
        }
    },
    getAllAdsByUser: async (user) => {
        let ad =  await ADVERT.findOne({owner: user}).populate('owner')
        return ad
    },
    getAllAdverts: async ()=>{
        let ads =  await ADVERT.find({}).populate('owner')
        return ads
    }




}