DROP SCHEMA IF EXISTS appeasyloan CASCADE;

CREATE SCHEMA appeasyloan;

CREATE TABLE appeasyloan.loan (
  id UUID PRIMARY KEY,
  user_cpf TEXT NOT NULL,
  user_uf TEXT NOT NULL,
  total NUMERIC NOT NULL,
  monthly_installment NUMERIC NOT NULL,
  date TIMESTAMP
);

CREATE TABLE appeasyloan.installment (
  id UUID PRIMARY KEY,
  loan_id UUID,
  number NUMERIC NOT NULL,
  outstanding_balance NUMERIC NOT NULL,
  interest NUMERIC NOT NULL,
  adjusted_outstanding_balance NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  due_date TIMESTAMP
);

CREATE TABLE appeasyloan.user (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  password TEXT NOT NULL,
  uf TEXT NOT NULL,
  birthdate TIMESTAMP
);
