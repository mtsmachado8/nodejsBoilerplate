import log            from 'winston'
import InvalidRequest from '../error/invalid-request-400'
import { getUser }    from '../../users/user-service'
import mongoose       from 'mongoose';
import 'express-async-errors'


/**
 * Verify the user_id sent by user and set req.local.user according to it
 * @header x-access-token
 */
export default async function(req, res, next){
	log.silly('Validate User Id Middleware...');
	const user_id = req.params.user_id;

	if(!mongoose.Types.ObjectId.isValid(user_id))
		throw new InvalidRequest(`The given ${ user_id } id is invalid. Its not an instance of the expected type`);
	
	const user_registered = await getUser(user_id)

	res.locals.user = user_registered;
	log.info(`User: ${res.locals.me ? res.locals.me.name: '?'}:${res.locals.me ? res.locals.me._id.toString(): '?'} ${res.locals.me ? res.locals.me.isAdmin ? 'Admin': '': ''} Reading: ${res.locals.user.username}:${user_id}`);
	next();
}