import mongoose from 'mongoose'
import log    	 from 'winston'

let _connection_pool = null;

async function start(){
    if(_started())
        return _connection_pool;

    configDeprecatedWarnings();

    const { db_path, db_user, db_pass } = _dbVariables();

    // Creating a new connection
    _connection_pool = await mongoose.connect(db_path, {
            user: db_user,
            pass: db_pass,
            useNewUrlParser: true,
            poolSize: 6,
            promiseLibrary: Promise
        })
        .then(() => log.info(`Connected to MongoDB on ${db_path}`))
        .catch(err => log.error('A error happened on database startup: ', err));

    return this;
}


async function stop(){
    if(_started()){
        const { db_path } = _dbVariables();

        log.info(`Disconnected from MongoDB on ${db_path}`);
        await _connection_pool.close();
    }

    _connection_pool = null;
}

function _dbVariables(){
    const db_host = process.env.DATABASE_HOST || '127.0.0.1';
    const db_port = process.env.DATABASE_PORT || '27017';
    const db_name = process.env.DATABASE_NAME;
    const db_user = process.env.DATABASE_USER;
    const db_pass = process.env.DATABASE_PASS;
    const db_path = `mongodb://${ db_host }:${ db_port }/${ db_name }`;

    return { db_path, db_user, db_pass };
}

function configDeprecatedWarnings(){
    mongoose.set('useCreateIndex', true); // To avoid a deprecated warning: collection.ensureIndex
    mongoose.set('useNewUrlParser', true); // To avoid a deprecated warning: URL string parser
    mongoose.set('useFindAndModify', false); // To avoid a deprecated warning: collection.findAndModify
}

function _started(){
    return !!_connection_pool;
}


export {
    start,
    stop
}