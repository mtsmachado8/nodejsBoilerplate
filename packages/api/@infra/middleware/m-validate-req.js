import InvalidRequest from '../error/invalid-request-400'



export default (validator) => {
	return (req, res, next) => {

		if(!req.body)
			throw new InvalidRequest(`(${Object.keys(req.route.methods)} ${req.originalUrl}) The body of the request is not valid`);

		const { error } = validator(req.body);
		if(error)
			throw new InvalidRequest(`(${Object.keys(req.route.methods)} ${req.originalUrl}) ${error.details[0].message}`);
		next();
	}
}