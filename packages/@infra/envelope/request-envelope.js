export default class RequestEnvelope{

	constructor(){
		this._data = undefined;
	}


	/**
	 *
	 * @param {*|RequestEnvelope} obj
	 * @returns {RequestEnvelope}
	 */
	static from(obj){
		const envelope = new RequestEnvelope();
		envelope.setData(obj._data);
		return envelope;
	}


	static data(data){
		return new RequestEnvelope().setData(data);
	}


	setData(data){
		this._data = data;
		return this;
	}


	get data(){
		return this._data;
	}

}