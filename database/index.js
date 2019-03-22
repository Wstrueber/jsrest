const { Pool } = require('pg')

const pool = new Pool({
	user: 'william',
	host: 'localhost',
	database: 'postgres',
	password: 'password',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
})

module.exports = {
	pool,
}
