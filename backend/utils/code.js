import crypto from "crypto";

export const generateCode = (n) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let i = 0; i < n; i++) {
    let idx = crypto.randomInt(chars.length);
    code += chars[idx];
  }
  if (n === 4) return code;
  return `AC-${code.slice(0, 4)}-${code.slice(4, 8)}`;
};
