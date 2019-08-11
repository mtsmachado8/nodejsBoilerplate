export default function(req, res, next){
	const {page, limit, skip } = getPaginationVariables({page: req.query.page, limit: req.query.chunk});

	if(!res.locals)
		res.locals = {};

	res.locals.pagination = { page, limit, skip };

	next();
}

/**
* @param {Object}		[options={}]
 * @param {Number}		[options.offset=0] - Use offset or page to get skip position
 * @param {Number}		[options.page=1]
 * @param {Number}		[options.limit=10]
 *
 * @returns {{limit: number, skip: number, page: number}} [skip=0, page=1, limit=10] - skip's the Number of pages to skip on query's
 */
function getPaginationVariables(options) {
	let page = !!Number(options.page) ? Number(options.page) : null;
	let limit = !!Number(options.limit) ? Number(options.limit) : 10;

	let offset, skip;

	if (options.offset) {
		offset = options.offset;
		skip   = offset;
	} else if (page) {
		skip = (page - 1) * limit;
	} else {
		offset = 0;
		page   = 1;
		skip   = offset;
	}

	return { page, limit, skip };
}
