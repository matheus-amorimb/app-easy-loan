import ApplyForLoan from "../../src/application/use-cases/Loan/ApplyForLoan";
import GetLoan from "../../src/application/use-cases/GetLoan";
import DatabaseConnection from "../../src/infrastructure/database/DatabaseConnection";
import InstallmentRepository from "../../src/infrastructure/repositories/InstallmentRepository";
import LoanRepository from "../../src/infrastructure/repositories/LoanRepository";

test("Should get loan based on id", async function () {
  const connection = new DatabaseConnection();
  const loanRepository = new LoanRepository(connection);
  const installmentRepository = new InstallmentRepository(connection);
  const applyForLoan = new ApplyForLoan(loanRepository, installmentRepository);
  const applyForLoanInput = {
    userCpf: "148036",
    userUf: "MG",
    userBirthdate: new Date("1998-06-18T03:00:00.000Z"),
    total: 75000,
    monthlyInstallment: 20000,
  };
  const applyForLoanOutput = await applyForLoan.execute(applyForLoanInput);
  const getLoan = new GetLoan(loanRepository);
  const getLoanInput = {
    loanId: applyForLoanOutput.loanId,
  };
  const getLoanOutput = await getLoan.execute(getLoanInput);
  expect(getLoanOutput.id).toBe(applyForLoanOutput.loanId);
  expect(getLoanOutput.total).toBe(applyForLoanInput.total);
  expect(getLoanOutput.monthlyInstallment).toBe(
    applyForLoanInput.monthlyInstallment
  );
  await connection.close();
});
