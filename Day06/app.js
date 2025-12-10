const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf8").replace(/\r/g, "");
const lines = raw.split("\n");

const height = lines.length;
const width = Math.max(...lines.map(l => l.length));
const grid = lines.map(l => l.padEnd(width, " "));


function isSpaceColumn(col) {
      for (let row = 0; row < height; row++) {
            if (grid[row][col] !== " ") return false;
      }
      return true;
}

function processBlock(columns) {
      if (columns.length === 0) return 0;

      let operator = null;
      for (const col of columns) {
            const columnHeight = grid[height - 1][col];
            if (columnHeight === "+" || columnHeight === "*") {
                  operator = columnHeight;
                  break;
            }
      }
      if (!operator) {

            return 0;
      }


      const numbers = [];

      for (let row = 0; row < height - 1; row++) {
            let s = "";
            for (const col of columns) {
                  const ch = grid[row][col];
                  if (/[0-9]/.test(ch)) {
                        s += ch;
                  }
            }
            if (s.length > 0) {
                  numbers.push(Number(s));
            }
      }

      if (numbers.length === 0) return 0;


      let result;
      if (operator === "+") {
            result = numbers.reduce((a, b) => a + b, 0);
      } else {
            result = numbers.reduce((a, b) => a * b, 1);
      }

      return result;
}

let grandTotal = 0;
let blockCols = [];

for (let col = 0; col < width; col++) {
      if (isSpaceColumn(col)) {
            grandTotal += processBlock(blockCols);
            blockCols = [];
      } else {

            blockCols.push(col);
      }
}

grandTotal += processBlock(blockCols);

console.log("Grand total:", grandTotal);
