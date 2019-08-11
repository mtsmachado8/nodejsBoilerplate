import UserRepository from './repository';
import DataNotFound   from '../@infra/error/data-not-found-404';
import InvalidRequest from '../@infra/error/invalid-request-400';

async function getAllUsers(pagination){
	return await pagination ? 
		UserRepository.getAllPaginated(pagination) :
		UserRepository.getAllUsers()
}

/**
 * @param {*} data can be either a user name or its _id
 */
async function getUser(data){
	const user = await UserRepository.get(data);

	if(!user)
		throw new DataNotFound('USER_NOT_FOUND', 'The user couldnt be found');

	return user;
}

async function deleteUser(_id){
	const user = await UserRepository.delete(_id);

	if(!user)
		throw new DataNotFound('USER_NOT_FOUND', 'The user couldnt be found');

	return user;
}

async function postUser(_data){
	const user_in_db = await UserRepository.get(_data.name);

	if(user_in_db)
		throw new InvalidRequest('User already registered.');

	let new_user = _data;

	// Saving the new user with its properties in database
	const saved_user = await UserRepository.post(new_user);

	// Deleting the property password from user before sending it. We don't need the password anymore
	delete new_user.password;
	// Adding an id to the raw user
	new_user._id = saved_user._id;

	return new_user;
}

async function putUser(_id, _data){
	const user_to_update = await UserRepository.get(_id);

	if(!user_to_update)
		throw new DataNotFound('USER_NOT_FOUND', 'The user couldnt be found');

	return await UserRepository.put(_id, _data);
}
	
export {
	getAllUsers,
	getUser,
	deleteUser,
	postUser,
	putUser
}