import MethodNotImplemented from '../@infra/error/code-errors/method-not-implemented';



class CrudInterface {
	getAll(){
		throw new MethodNotImplemented();
	}

	get(_id){
		throw new MethodNotImplemented();
	}

	delete(_id){
		throw new MethodNotImplemented();
	}

	post(_data){
		throw new MethodNotImplemented();
	}

	put(_data){
		throw new MethodNotImplemented();
	}
}

export default CrudInterface