const ADVERT = require('../models/AdvertModel')

module.exports = {
    createAndSaveAdvert: async (done) => {
        const gig = ADVERT({
            owner: "5fd8f9375644ec42a05e863f",
            title: "Developer",
            category: "Web Development",
            about:"I can design and develop your website",
            price: 5,
            picture:"https://lh3.googleusercontent.com/ogw/ADGmqu-Z2CJscEKAZuKCIqH7sh_tLDOBbUTGxVILvrYVCeE=s32-c-mo"
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
        return await ADVERT.findOne({}).populate('owner')
    }




}