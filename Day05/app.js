const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf8").trim();

const [rangesBlock] = raw.split(/\r?\n\r?\n/);

const ranges = rangesBlock
      .split(/\r?\n/)
      .filter(line => line.trim().length > 0)
      .map(line => {
            const [startStr, endStr] = line.split("-");
            return {
                  start: Number(startStr),
                  end: Number(endStr),
            };
      });

if (ranges.length === 0) {
      console.log("Total distinct fresh IDs: 0");
      process.exit(0);
}

ranges.sort((a, b) => a.start - b.start);

const merged = [];
let current = { ...ranges[0] };

for (let i = 1; i < ranges.length; i++) {
      const next = ranges[i];


      if (next.start <= current.end) {
            if (next.end > current.end) {
                  current.end = next.end;
            }
      } else {

            merged.push(current);
            current = { ...next };
      }
}

merged.push(current);

let totalFresh = 0n;

for (const { start, end } of merged) {
      const length = BigInt(end - start + 1);
      totalFresh += length;
}

console.log("Total distinct fresh ingredient IDs:", totalFresh.toString());
