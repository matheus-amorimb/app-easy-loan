import LoanBuilder from "../utils/LoanBuilder";
import LoanRepository from "../../src/infrastructure/repositories/LoanRepository";
import ApplyForLoan from "../../src/application/use-cases/ApplyForLoan";
import DatabaseConnection from "../../src/infrastructure/database/DatabaseConnection";
import ApplyForLoanInput from "../../src/application/dtos/loan/ApplyForLoanInput";
import GetLoan from "../../src/application/use-cases/GetLoan";

test("Should apply for loan successfully", async function () {
  const connection = new DatabaseConnection();
  //   const loan = LoanBuilder.New().Build();
  const loanRepository = new LoanRepository(connection);
  const applyForLoan = new ApplyForLoan(loanRepository);
  const getLoan = new GetLoan(loanRepository);
  const loan = {
    userCpf: "148036",
    userUf: "MG",
    userBirthday: new Date("1998-06-18T03:00:00.000Z"),
    total: 60000,
    monthlyInstallment: 15000,
  };
  const applyForLoanOutput = await applyForLoan.execute(loan);
  const getLoanInput = {
    loanId: applyForLoanOutput.loanId,
  };
  const getLoanOutput = await getLoan.execute(getLoanInput);
  expect(getLoanOutput.id).toBeDefined();
  expect(getLoanOutput.id).toBe(applyForLoanOutput.loanId);
  expect(getLoanOutput.total).toBe(loan.total);
  expect(getLoanOutput.monthlyInstallment).toBe(loan.monthlyInstallment);
  await connection.close();
});
