export function validateEmail(email: string) {
  if (!email.match(/^(.)+@(.)+$/)) return 'Email inválido.';
  return true;
}
