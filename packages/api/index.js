import * as server from './server'

(function start(){
	server.setupApi()
		.then(server => server.start());
})();