import { validate, validateUpdatedUser }                                      from './user-validator';
import validateReq                                                            from '../@infra/middleware/m-validate-req';
import validateId                                                             from '../@infra/middleware/m-validate-id'
import express                                                                from 'express';
import { sendCreated, sendData, sendDeleted, sendPaginatedData, sendUpdated } from '../@infra/middleware/m-send-data';
import * as service                                                           from './user-service';
import 'express-async-errors'

const router = express.Router();

// -Get all users paginated with fuzzy search or sorted by name
router.get('/', async (req, res) => {
	res.locals.pagination ? 
		sendPaginatedData(res, await service.getAllUsers(res.locals.pagination)) :
		sendData(res, await service.getAllUsers())
});

// -Get the currently logged user
router.get('/me', async (req, res) => {
	sendData(res, res.locals.me);
});

// -Get a specific user
router.get('/:id', validateId, async (req, res) => {
	sendData(res, await service.getUser(req.params.id));
});

// -Delete the user's own account (Suicide)
router.delete('/me', async (req, res) => {
	sendDeleted(res, await service.deleteUser(res.locals.me._id));
});

// -Post a new user
router.post('/', validateReq(validate), async (req, res) => {
	sendCreated(res, await service.postUser(req.body));
});

// -Put a self updated user
router.put('/me', validateReq(validateUpdatedUser), async (req, res) => {
	sendUpdated(res, await service.putUser(res.locals.me._id, req.body))
});

export default router;
