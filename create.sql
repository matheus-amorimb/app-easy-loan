DROP SCHEMA easyloan CASCADE;

CREATE SCHEMA easyloan;

CREATE TABLE easyloan.loan (
  id UUID PRIMARY KEY,
  user_cpf TEXT NOT NULL,
  user_uf TEXT NOT NULL,
  user_birthdate TIMESTAMP,
  total NUMERIC NOT NULL,
  monthly_installment NUMERIC NOT NULL,
  date TIMESTAMP
);