const mulSeparator = 'mul(';
const mulSeparatorLength = mulSeparator.length;

const first = (input: string) => {
  let sum = 0;
  for (let i = 0; i < input.length - 1; i++) {
    // try to match with mul(
    const start = input.slice(i, i + mulSeparatorLength);
    if (start === mulSeparator) {
      // Keep reading until we get the end of the input
      const firstOutput = readMulPart(input, i + mulSeparatorLength, ',');
      if (!firstOutput.valid) {
        continue;
      }

      const secondOutput = readMulPart(input, firstOutput.index, ')');
      if (!secondOutput.valid) {
        continue;
      }

      sum += firstOutput.value * secondOutput.value;
    }
  }

  return sum.toString();
};

function readMulPart(input: string, index: number, endingChar: string) {
  let value = '';
  let valid = false;

  while (!isNaN(parseInt(input[index].trim()))) {
    value += input[index];
    index++;
  }

  const result = parseInt(value);

  if (!isNaN(result) && input[index] === endingChar) {
    valid = true;
  }

  return {
    value: result,
    valid,
    index: index + 1,
  };
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  let sum = 0;
  let read = true; // do + don't

  for (let i = 0; i < input.length - 1; i++) {
    // try to match with mul(
    if (input.slice(i, i + 'do()'.length) === 'do()') {
      read = true;
      continue;
    }

    if (input.slice(i, i + "don't()".length) === "don't()") {
      read = false;
      continue;
    }

    const start = input.slice(i, i + mulSeparatorLength);
    if (start === mulSeparator && read) {
      // Keep reading until we get the end of the input
      const firstOutput = readMulPart(input, i + mulSeparatorLength, ',');
      if (!firstOutput.valid) {
        continue;
      }

      const secondOutput = readMulPart(input, firstOutput.index, ')');
      if (!secondOutput.valid) {
        continue;
      }

      sum += firstOutput.value * secondOutput.value;
    }
  }

  return sum.toString();
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
