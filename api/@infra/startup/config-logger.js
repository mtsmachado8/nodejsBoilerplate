import winston from 'winston'

const printWithColor = winston.format.combine(
	winston.format.colorize(),
	winston.format.printf(log_message => `${log_message.level}: ${log_message.message}`)
);

let env_logging_level, silent_env;
let terminal, file; // Transports

async function configWinston(){
	await defineEnvConstraints();

	winston.clear(); // remove all transports
	winston.add(terminal);
	winston.add(file);

	await winston.exceptions.handle(terminal, file);
}

async function defineEnvConstraints(){
	env_logging_level = process.env.LOGGING_LEVEL;
	silent_env = env_logging_level === 'none'; // Not logging in this condition

	terminal = new winston.transports.Console({
		format: printWithColor, level: env_logging_level, silent: silent_env
	});
	file = new winston.transports.File({ filename: 'log', format: winston.format.json(), silent: silent_env });
}



export default configWinston;

// levels that can be set (only before this level will be logged)
// error
// warn
// info
// verbose
// debug
// silly

