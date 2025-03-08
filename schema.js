// For schema validation using joi tool we made this file inside the majorproject folder

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0), //Yaha .min(0) ka matalb hamara price nuber to ho lekin negative na ho minimum 0 ho
        image: Joi.object({
            url: Joi.string().allow("", null)
        }),
         
    }).required(),
}); 

// Review ko validate kar rahai hai server side mai

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),

    }).required(),

});