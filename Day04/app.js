const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf8").trim();
const lines = raw.split(/\r?\n/);
const grid = lines.map(line => line.split(""));

function countPaperNeighbors(grid, row, col) {
      const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
      ];

      let count = 0;
      const rows = grid.length;
      const cols = grid[0].length;

      for (const [dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;

            if (r < 0 || r >= rows || c < 0 || c >= cols) continue;

            if (grid[r][c] === "@") {
                  count++;
            }
      }

      return count;
}

function isAccessibleRoll(grid, row, col) {
      if (grid[row][col] !== "@") return false;

      const neighborCount = countPaperNeighbors(grid, row, col);
      return neighborCount < 4;
}

function removeAccessibleRollsOnce(grid) {
      const rows = grid.length;
      const cols = grid[0].length;

      const toRemove = [];

      for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                  if (isAccessibleRoll(grid, row, col)) {
                        toRemove.push([row, col]);
                  }
            }
      }

      for (const [r, c] of toRemove) {
            grid[r][c] = "."; 
      }

      return toRemove.length;
}

function countTotalRemovableRolls(grid) {
      let totalRemoved = 0;

      while (true) {
            const removedThisRound = removeAccessibleRollsOnce(grid);
            if (removedThisRound === 0) {
                  break; 
            }
            totalRemoved += removedThisRound;
      }

      return totalRemoved;
}

const total = countTotalRemovableRolls(grid);
console.log("Total rolls removed:", total);
