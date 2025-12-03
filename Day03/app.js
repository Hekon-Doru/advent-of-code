const fs = require("fs");
const { parse } = require("path");
const data = fs.readFileSync("input.txt", "utf8");

console.log(data);
console.log(typeof data);

const joltageStrings = data.trim().split("\r\n");
console.log(joltageStrings);

function maxJoltageForBank(bankString) {
      let maxFirstDigit = -1;
      let maxPairValue = -1;

      for (let i = 0; i < bankString.length; i++) {
            const currentDigit = Number(bankString[i]);

            if (maxFirstDigit !== -1) {
                  const candidate = maxFirstDigit * 10 + currentDigit;

                  if (candidate > maxPairValue) {
                        maxPairValue = candidate;
                  }
            }

            if (currentDigit > maxFirstDigit) {
                  maxFirstDigit = currentDigit;
            }
      }

      return maxPairValue;
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
