import dotenv from 'dotenv'
import path   from 'path'

const environment = process.env.NODE_ENV;
const environmentFile = environment === 'production' ? '.env' : `.env.${environment}`;

export function configEnvironment(){
	// const __dirname = path.dirname(new URL(import.meta.url).pathname); // Used for ESM (common js already have __dirname globally)
	const __dirname = path.join(process.cwd(), '/api/@env'); // TODO change to the above solution (Hardcoded for now)
	const environmentPath = path.join(__dirname,`./${environmentFile}`);
	dotenv.config({path: environmentPath});
}

export function testVariables(variables){
	variables.forEach(variable => {
		if(!process.env[variable])
			throw new Error(`FATAL: ${variable} not defined on file ${environmentFile}`);
	});
}