import LoanBuilder from "../utils/LoanBuilder";
import LoanRepository from "../../src/infrastructure/repositories/LoanRepository";
import ApplyForLoan from "../../src/application/use-cases/ApplyForLoan";
import DatabaseConnection from "../../src/infrastructure/database/DatabaseConnection";
import GetLoan from "../../src/application/use-cases/GetLoan";
import InstallmentRepository from "../../src/infrastructure/repositories/InstallmentRepository";
import GetInstallments from "../../src/application/use-cases/GetInstallments";

test("Should apply for loan successfully", async function () {
  const connection = new DatabaseConnection();
  const loanRepository = new LoanRepository(connection);
  const installmentRepository = new InstallmentRepository(connection);
  const applyForLoan = new ApplyForLoan(loanRepository, installmentRepository);
  const getLoan = new GetLoan(loanRepository);
  const getInstallments = new GetInstallments(installmentRepository);

  const applyForLoanInput = {
    userCpf: "148036",
    userUf: "MG",
    userBirthday: new Date("1998-06-18T03:00:00.000Z"),
    total: 60000,
    monthlyInstallment: 15000,
  };
  const applyForLoanOutput = await applyForLoan.execute(applyForLoanInput);
  const getLoanInput = {
    loanId: applyForLoanOutput.loanId,
  };
  const getLoanOutput = await getLoan.execute(getLoanInput);
  const getInstallmentsInput = {
    loanId: applyForLoanOutput.loanId,
  };
  const getInstallmentsOutput = await getInstallments.execute(
    getInstallmentsInput
  );
  expect(getLoanOutput.id).toBeDefined();
  expect(getLoanOutput.id).toBe(applyForLoanOutput.loanId);
  expect(getLoanOutput.total).toBe(applyForLoanInput.total);
  expect(getLoanOutput.monthlyInstallment).toBe(
    applyForLoanInput.monthlyInstallment
  );
  const firstInstallment = getInstallmentsOutput[0];
  expect(firstInstallment.number).toBe(1);
  expect(firstInstallment.outstandingBalance).toBe(60000);
  expect(firstInstallment.interest).toBe(600);
  expect(firstInstallment.adjustedOutstandingBalance).toBe(60600);
  expect(firstInstallment.amount).toBe(15000);
  await connection.close();
});
