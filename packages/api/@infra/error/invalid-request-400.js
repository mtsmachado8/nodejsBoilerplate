import RequestError from "./parent-errors/request-error";
import CODE_ERROR   from '../../../@infra/error/e-code-error'

export default class InvalidRequest extends RequestError{

	/**
	 * @param {string} message 
	 */
	constructor(message = 'Invalid request'){
		super(400, CODE_ERROR.INVALID_REQUEST, message);
		this.name = this.constructor.name; 
	}
}