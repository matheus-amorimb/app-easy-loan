import pgp from "pg-promise";

export default class DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgp()(
      "postgres://postgres:148036@localhost:5432/easyloan"
    );
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
