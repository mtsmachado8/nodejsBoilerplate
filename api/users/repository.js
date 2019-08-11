import { model, Schema }        from 'mongoose'
import CrudInterface            from '../@util/crud-interface';


class UserRepository extends CrudInterface{
	constructor(){
		super();

		this.schema = new Schema(
			UserRepository.schemaJson()
		);

		this.model = model('User', this.schema);
	}


	static schemaJson(){
		return (
			{
				name: {
					type: String,
					required: true,
					minlength: 3,
					maxlength: 50
				},
				username: {
					type:String,
					required: true,
					unique: true,
					minlength: 3,
					maxlength: 50,
				},
				email: {
					type: String,
					unique: true,
					minlength: 3,
					maxlength: 255,
				},
				picture_url: {
					type: String,
					minlength: 5,
					maxlength: 255
				},
			}
		);
	}

	async getAllPaginated({skip, limit}){
		return {
			_data: await this.model.find()
				.skip(skip)
				.limit(limit).sort('name'),

			_total: await this.model.find().countDocuments()
		};
	}

	getAll(){
		return this.model.find().sort('name');
	}

	get(data){
		return isId(data) ?
			this.model.findById(_id).select('-password') :
			this.model.findOne({name: data})
	}

	delete(_id){
		return this.model.findByIdAndDelete(_id);
	}

	post(_data){
		return new this.model(_data).save();
	}

	put(_id, _data){
		return this.model.findByIdAndUpdate(_id, _data,{new: true});
	}

	isId(_id){
		return mongoose.Types.ObjectId.isValid(_id)
	}
}

export default new UserRepository();