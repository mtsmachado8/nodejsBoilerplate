import ResponsePagination from './response-pagination';



export default class ResponseEnvelope{

	constructor(){
		/**
		 *
		 * @type {Object|Array|undefined}
		 * @private
		 */
		this._data = undefined;
		/**
		 *
		 * @type {Error|undefined}
		 * @private
		 */
		this._error = undefined;
		/**
		 *
		 * @type {ResponsePagination}
		 * @private
		 */
		this._pagination = undefined;
		/**
		 *
		 * @type {String[]|undefined}
		 * @private
		 */
		this._links = undefined;
	}


	/**
	 *
	 * @param {Object|ResponseEnvelope} obj
	 * @returns {ResponseEnvelope}
	 */
	static from(obj){
		const envelope = new ResponseEnvelope();
		envelope.setData(obj._data);
		envelope.setError(obj._error);
		envelope.setPagination(obj._pagination);
		envelope.setLinks(obj._links);
		return envelope;
	}


	/**
	 *
	 * @param {Object} data
	 * @returns {ResponseEnvelope}
	 */
	static data(data){
		return new ResponseEnvelope().setData(data);
	}


	/**
	 *
	 * @param {Object} paginated_result
	 * @param {Number} paginated_result._total
	 * @param {Object} paginated_result._data
	 * @returns {ResponseEnvelope}
	 */
	static paginated(paginated_result){
		// 'own paginate middleware'
		return ResponseEnvelope.data(paginated_result._data).setPagination(ResponsePagination.from(paginated_result));
	}


	/**
	 *
	 * @param {Object} created_result
	 * @param {String} created_result._id
	 */
	static created(created_result){
		// 'mongoose' specific
		return ResponseEnvelope.data({ _id: created_result._id });
	}


	/**
	 *
	 * @param {Error} error
	 * @returns {ResponseEnvelope}
	 */
	static error(error){
		return new ResponseEnvelope().setError(error);
	}


	/**
	 *
	 * @param {String} link
	 * @returns {ResponseEnvelope}
	 */
	static link(link){
		return new ResponseEnvelope().setLinks([ link ]);
	}


	/**
	 *
	 * @param {String[]} links
	 * @returns {ResponseEnvelope}
	 */
	static links(links){
		return new ResponseEnvelope().setLinks([ ...links ]);
	}


	/**
	 *
	 * @param {Object|Array} data
	 * @returns {ResponseEnvelope}
	 */
	setData(data){
		this._data = data;
		return this;
	}


	/**
	 *
	 * @returns {Object|Array|undefined}
	 */
	get data(){
		return this._data;
	}


	/**
	 *
	 * @param {ResponsePagination} pagination
	 * @returns {ResponseEnvelope}
	 */
	setPagination(pagination){
		this._pagination = pagination;
		return this;
	}


	/**
	 *
	 * @returns {ResponsePagination|undefined}
	 */
	get pagination(){
		return this._pagination;
	}


	/**
	 *
	 * @param {Error} error
	 * @returns {ResponseEnvelope}
	 */
	setError(error){
		this._error = error;
		return this;
	}


	/**
	 *
	 * @returns {Error|undefined}
	 */
	get error(){
		return this._error;
	}


	/**
	 *
	 * @param {String[]} links
	 * @returns {ResponseEnvelope}
	 */
	setLinks(links){
		this._links = links;
		return this;
	}


	/**
	 *
	 * @returns {String[]|undefined}
	 */
	get links(){
		return this._links;
	}

}