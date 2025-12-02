const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");

console.log(data);
console.log(typeof data);

const lines = data
      .trim()
      .split(/\r\n/);

console.log(lines);
console.log(typeof lines);

let pointer = 50;
let zeroCounter = 0;

lines.forEach((line, index) => {
      const direction = line[0];
      const distance = Number(line.slice(1));

      const step = direction === "R" ? 1 : -1;

      for (let i = 0; i < distance; i++) {
            pointer += step;

            if (pointer > 99) pointer = 0;
            if (pointer < 0) pointer = 99;

            if (pointer === 0) {
                  zeroCounter++;
            }
      }

      console.log(index, line, "->", pointer);
      console.log("Zero count:", zeroCounter);
});
console.log("Final zero count:", zeroCounter);