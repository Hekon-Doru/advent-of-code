const fs = require("fs");
const { parse } = require("path");
const data = fs.readFileSync("input.txt", "utf8");

console.log(data);
console.log(typeof data);

const rangeStrings = data.trim().split(",");
console.log(rangeStrings);


let invalidIdSum = 0;

function isInvalid(id) {
      const idStr = String(id);
      const length = idStr.length;

      if (length < 2) {
            return false;
      }

      for (let patternLength = 1; patternLength <= Math.floor(length / 2); patternLength++) {
            if (length % patternLength !== 0) {
                  continue;
            }

            const pattern = idStr.slice(0, patternLength);
            let isRepeated = true;

            for (let offset = patternLength; offset < length; offset += patternLength) {
                  const chunk = idStr.slice(offset, offset + patternLength);

                  if (chunk !== pattern) {
                        isRepeated = false;
                        break;
                  }
            }

            if (isRepeated) {
                  return true;
            }
      }

      return false;
}

rangeStrings.forEach(rangeStr => {
      const [startStr, endStr] = rangeStr.split("-");
      const start = Number(startStr);
      const end = Number(endStr);
      for (let id = start; id <= end; id++) {
            if (isInvalid(id)) {
                  invalidIdSum += id;
                  console.log("Adding invalid ID:", id);

            }
      }
      console.log("Start:", start, "End:", end, "Current Sum:", invalidIdSum);
});

console.log("Sum:", invalidIdSum);