import mongoose       from 'mongoose';
import InvalidRequest from '../error/invalid-request-400';



export default function(req, res, next){
	if(!mongoose.Types.ObjectId.isValid(req.params.id))
		throw new InvalidRequest(`The given ${ req.params.id} id is invalid. Its not an instance of the expected type`);

	next();
}