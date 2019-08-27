export default class ResponsePagination{

	constructor(total){
		this._total = total;
	}


	/**
	 *
	 * @param {Object|ResponsePagination} obj
	 * @returns {ResponsePagination}
	 */
	static from(obj){
		return new ResponsePagination(obj._total);
	}


	/**
	 *
	 * @returns {Number}
	 */
	get total(){
		return this._total;
	}

}