import Envelope from '../../../@infra/envelope/response-envelope';

function sendPaginatedData(res, _data){
	res.status(200).json(Envelope.paginated(_data));
}

function sendData(res, _data){
	res.status(200).json(Envelope.data(_data));
}

function sendDeleted(res, _data){
	res.status(200).end();
}

function sendCreated(res, _data, header){
	header
		? res.status(200).header(header).json(Envelope.created(_data))
		: res.status(200).json(Envelope.created(_data))
}

function sendUpdated(res, _data){
	res.status(200).end();
}

export{
	sendData,
	sendPaginatedData,
	sendDeleted,
	sendCreated,
	sendUpdated
}