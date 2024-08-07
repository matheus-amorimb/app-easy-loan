export default interface ApplyForLoanInput {
  userCpf: string;
  userUf: string;
  userBirthdate: Date;
  total: number;
  monthlyInstallment: number;
}
