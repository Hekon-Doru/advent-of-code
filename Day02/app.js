const fs = require("fs");
const { parse } = require("path");
const data = fs.readFileSync("input.txt", "utf8");

console.log(data);
console.log(typeof data);

const rangeStrings = data.trim().split(",");
console.log(rangeStrings);


let sum = 0;

function isInvalid(id) {
      const string = String(id);
      if (string.length % 2 !== 0) return false;

      const mid = string.length / 2;
      const firstHalf = string.slice(0, mid);
      const secondHalf = string.slice(mid);
      return firstHalf === secondHalf;
};

rangeStrings.forEach(rangeStr => {
      const [startStr, endStr] = rangeStr.split("-");
      const start = Number(startStr);
      const end = Number(endStr);
      for (let i = start; i <= end; i++) {
            if (isInvalid(i)) {
                  sum += i;
                  console.log("Adding invalid ID:", i);

            }
      }
      console.log("Start:", start, "End:", end, "Current Sum:", sum);
});

console.log("Sum:", sum);