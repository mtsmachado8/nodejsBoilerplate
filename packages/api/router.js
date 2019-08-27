import express            from 'express'
import validateUserWithId from './@infra/middleware/m-validate-user-id'
import RequestEnvelope    from '../@infra/envelope/request-envelope'
import users              from './users/r-users'
import 'express-async-errors'


const router = express.Router();


router.param('user_id', (req, res, next, user_id) => user_id === 'me'
	? ''
	: validateUserWithId(req, res, next));

function openEnvelopedBody(req, res, next){
	if(req.body)
		req.body = RequestEnvelope.from(req.body).data;

	next();
}

router.use('/*', openEnvelopedBody);
router.use('/users/', users);

export default router;