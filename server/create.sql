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

CREATE TABLE easyloan.installment (
  id UUID PRIMARY KEY,
  loan_id UUID,
  number NUMERIC NOT NULL,
  outstanding_balance NUMERIC NOT NULL,
  interest NUMERIC NOT NULL,
  adjusted_outstanding_balance NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  due_date TIMESTAMP
);