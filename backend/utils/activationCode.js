export const generateActivationCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < 8; i++) {
    let idx = crypto.randomInt(chars.length);
    code += chars[idx];
  }

  return `AC-${code.slice(0, 4)}-${code.slice(4, 8)}`;
};
