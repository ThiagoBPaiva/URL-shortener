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
		const sqlComand: string = "INSERT INTO urls (url, mask) VALUES (?, ?)"
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

export async function getUrl(mask: string): Promise<string[]> {
	const arrayResult: string[] = [];
	try {
		const dbCode = "SELECT * FROM urls WHERE mask = ?";
		const [rows] = await pool.execute<RowDataPacket[]>(dbCode, [mask]);

		if (rows.length > 0) {
			arrayResult.push(rows[0].Url, rows[0].Mask);
		}
		
	} catch (err) {
		console.log(err);
		arrayResult.push(String(err));
	}

	return arrayResult;
}
