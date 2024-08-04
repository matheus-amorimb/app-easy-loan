import pgp, { IDatabase } from "pg-promise";
import dotenv from "dotenv";
import { IClient } from "pg-promise/typescript/pg-subset";

dotenv.config();

export default class DatabaseConnection {
  connection: IDatabase<any, IClient>;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }
    this.connection = pgp()(databaseUrl);
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }

  task(callback: (t: any) => any) {
    return this.connection.task(callback);
  }

  transaction(callback: (t: any) => any) {
    return this.connection.tx(callback);
  }
}
