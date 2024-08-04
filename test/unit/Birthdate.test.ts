import Birthdate from "../../src/domain/value-objects/Birthdate";

test("Should not create Birthdate with invalid date", function () {
  const futureDate = new Date();
  futureDate.setFullYear(futureDate.getFullYear() + 1);
  expect(() => new Birthdate(futureDate)).toThrow(
    new Error("Invalid birthdate")
  );
});
