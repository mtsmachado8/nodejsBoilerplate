import RequestError from './parent-errors/request-error'
import CODE_ERROR   from '../../../@infra/error/e-code-error'

export default class DataNotFound extends RequestError{

	/**
	 * @param {string} code 
	 * @param {string} message 
	 */
	constructor(code = 'DATA_NOT_FOUND', message = 'The data was not found'){
		super(404, CODE_ERROR.DATA_NOT_FOUND, message);
		this.name = this.constructor.name; 
	}
}