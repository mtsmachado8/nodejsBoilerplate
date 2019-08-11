import Joi from "joi";

function validateNewUser(user){
	const schema = {
		name: Joi.string().min(3).max(50).required(),
		username: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(3).max(255).email(),
		picture_url: Joi.string().min(5).max(255),
	};

	return Joi.validate(user, schema);
}

/**
 * @param new_user_vo
 * Same validation as a new user, except nothing is required
 */
function validateUpdatedUser(new_user_vo){
	const schema = {
		name: Joi.string().min(3).max(50),
		username: Joi.string().min(3).max(50),
		email: Joi.string().min(3).max(255).email(),
		picture_url: Joi.string().min(5).max(255),
	};

	return Joi.validate(new_user_vo, schema);
}

export {
    validateNewUser as validate,
	validateUpdatedUser
}
