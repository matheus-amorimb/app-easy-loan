import GetLoans from "../../src/application/use-cases/GetLoans";
import DatabaseConnection from "../../src/infrastructure/database/DatabaseConnection";
import LoanRepository from "../../src/infrastructure/repositories/LoanRepository";
import InstallmentRepository from "../../src/infrastructure/repositories/InstallmentRepository";
import ApplyForLoan from "../../src/application/use-cases/ApplyForLoan";
import GetLoanOutput from "../../src/application/dtos/loan/GetLoanOutput";

test("Should list all loans created", async function () {
  const connection = new DatabaseConnection();
  const loanRepository = new LoanRepository(connection);
  const installmentRepository = new InstallmentRepository(connection);
  await loanRepository.deleteAll();
  await installmentRepository.deleteAll();
  const applyForLoan = new ApplyForLoan(loanRepository, installmentRepository);

  for (let index = 1; index < 4; index++) {
    const applyForLoanInput = {
      userCpf: "148036",
      userUf: "MG",
      userBirthdate: new Date("1998-06-18T03:00:00.000Z"),
      total: 200000 * index,
      monthlyInstallment: 25000,
    };
    await applyForLoan.execute(applyForLoanInput);
  }
  const getLoans = new GetLoans(loanRepository);
  const loans = await getLoans.execute();
  expect(loans.length).toBe(3);
  loans.forEach((loan: GetLoanOutput, index: number) => {
    expect(loan.total).toBe((index + 1) * 200000);
  });
  await connection.close();
});
