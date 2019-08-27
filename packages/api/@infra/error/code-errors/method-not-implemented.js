import CodeError  from '../parent-errors/code-error'
import CODE_ERROR from '../../../../@infra/error/e-code-error'

export default class MethodNotImplemented extends CodeError{

	/**
	 * @param {string} message
	 */
	constructor(message = `Method not implemented yet!`){
		super(500, CODE_ERROR.INTERNAL_ERROR, message);
		this.name = this.constructor.name;
	}
}