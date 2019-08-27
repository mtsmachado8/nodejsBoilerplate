import error_handler from './@infra/middleware/m-async-error-handler'
import log           from 'winston'
import express       from 'express'
import * as api      from './api';

const app = express();
const port = process.env.PORT || 1234;

let server_instance = null;
let configured_parts = '';

async function start(){
    return server_instance = await app.listen(port, () => log.info('Server instance started: \n' + configured_parts));
}

async function stop(){
    await server_instance.stop();
}

async function setupApi(){
    app.use('/api/v1/', await api.setup());
    app.use(error_handler);

    configured_parts += `- API: http://localhost:${port}/api/v1/ \n`;
    return this;
}

export {
    start,
    stop,
    setupApi
}