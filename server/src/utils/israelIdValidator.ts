export const validateIsraeliID = (id: number): boolean => {
  let idStr = id.toString().padStart(9, '0');

  if (idStr.length !== 9) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = Number(idStr[i]) * ((i % 2) + 1);
    if (num > 9) {
      num -= 9;
    }
    sum += num;
  }

  return sum % 10 === 0;
};
