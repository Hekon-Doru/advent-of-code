const fs = require("fs");
const { parse } = require("path");
const data = fs.readFileSync("input.txt", "utf8");

console.log(data);
console.log(typeof data);

const joltageStrings = data.trim().split("\r\n");
console.log(joltageStrings);

function maxJoltageForBank(bankString) {
  const batterySize = 12;
  const digits = bankString.trim();
  let toRemove = digits.length - batterySize;

  const stack = [];

  for (let i = 0; i < digits.length; i++) {
    const d = digits[i];

    while (
      toRemove > 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] < d
    ) {
      stack.pop();
      toRemove--;
    }

    stack.push(d);
  }

  const chosenJoltage = stack.slice(0, batterySize);
 
  return Number(chosenJoltage.join(""));
}

function totalJoltageForAllBanks(lines) {
  let total = 0;

  for (const bank of lines) {
    total += maxJoltageForBank(bank);
  }

  return total;
}

const totalJoltage = totalJoltageForAllBanks(joltageStrings);
console.log("Total joltage for all banks:", totalJoltage);
