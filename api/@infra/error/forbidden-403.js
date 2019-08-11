import BusinessError from './parent-errors/business-error'
import CODE_ERROR    from '../../../@infra/error/e-code-error'

export default class Forbidden extends BusinessError{

	/**
	 * @param {string} message 
	 */
	constructor(message = 'Forbidden, only allowed to admins'){
		super(403, CODE_ERROR.FORBIDDEN, message);
		this.name = this.constructor.name; 
	}
}