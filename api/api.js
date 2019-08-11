import express                        		from 'express'
import cors         						from 'cors'

// Startup functions
import { configEnvironment, testVariables } from './@env/environment'
import configLogger                         from './@infra/startup/config-logger'
import startDb                              from './@infra/startup/start-db'
import configPagination                     from './@infra/startup/config-pagination'

// Api Routes
import routes        from './router';


const router = express.Router();

export async function setup(){
	await configEnvironment();
	await testVariables(['NODE_ENV', 'LOGGING_LEVEL', 'DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_NAME']);
	await configLogger();
	await startDb();

	router.use('/*', cors());
	router.use('/*', express.json());
	router.use('/*', configPagination);
	router.use('/', routes);

	return router
}
