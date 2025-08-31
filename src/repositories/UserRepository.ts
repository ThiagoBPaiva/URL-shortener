import { ResultSetHeader, RowDataPacket  } from "mysql2";
import { pool } from "../config/DataBase";

interface InsertResponse<T> {
	status: number;
	data: T;
}

export async function teste(): Promise<number> {
	const [rows] = await pool.query<RowDataPacket[]>(
    	"SELECT 1 + 1 AS Result"
	);

	return rows[0].Result;
}

export async function createNewURL(url: string, name: string): Promise<InsertResponse<ResultSetHeader> | string> {
	try {
		const sqlComand: string = "INSERT INTO urls (original_url, short_code) VALUES (?, ?)"
		const values: string[] = [url, name];

		const [result] = await pool.execute<ResultSetHeader>(sqlComand, values);
		console.log("URL Criada com sucesso");
		
		return {
			status: 200,
			data: result
		};
	} catch (err) {
		console.log(`Erro ao tentar criar nova url: ${err}`);
		return `Erro ao tentar criar nova url: ${err}`;
	}

}
