import CodeError  from './parent-errors/code-error'
import CODE_ERROR from '../../../@infra/error/e-code-error'

export default class InternalError extends CodeError{

	/**
	 * @param {string} message 
	 */
	constructor(message = `Sorry! A strange internal error ocurred, the admin was already contacted and will solve the problem as soon as possible!`){
		super(500, CODE_ERROR.INTERNAL_ERROR, message);
		this.name = this.constructor.name; 
	}
}