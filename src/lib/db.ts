import mysql from "mysql2/promise";

const dbConfig = {
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "Udayrajsahu12@",
	database: process.env.DB_NAME || "school_management",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
};

let pool: mysql.Pool;

export function getDb() {
	if (!pool) {
		pool = mysql.createPool(dbConfig);
	}
	return pool;
}

export interface School {
	id?: number;
	name: string;
	address: string;
	city: string;
	state: string;
	contact: number;
	image?: string;
	email_id: string;
}
