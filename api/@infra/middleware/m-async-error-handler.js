import log              from 'winston'
import ApiError         from '../error/parent-errors/api-error';
import InternalError    from '../error/internal-error-500';
import Envelope 		from '../../../@infra/envelope/response-envelope';

export default function(err, req, res, next){
	// Returning known errors with the respective status and messages
	if(err instanceof ApiError){
		log.silly(err.stack);

		log.error(`${getErrorMetadata(err)} Message: ${err.message}`);

		const err_to_send = Envelope.error({code: err.code, message: err.message});

		return res.status(err.status).json(err_to_send);
	}

	log.error('(Unhandled on Async Handler): ', err);
	log.error(err.stack);

	// Returning a friendly error message
	const friendly_error = Envelope.error(new InternalError());
	return res.status(friendly_error.status).json(friendly_error);
};

function getErrorMetadata(error) {
	return `(Code ${error.code} Status ${error.status})`
}