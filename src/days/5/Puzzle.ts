let rules = new Map<number, number[]>();

const first = (input: string) => {
  const splitInput = input.split('-').map((x) => x.split('\n'));

  setRules(splitInput[0]);

  const updates = splitInput[1];
  // First entry is empty so just remove it
  updates.splice(0, 1);

  let sum = 0;
  for (let i = 0; i < updates.length; i++) {
    const sequence = updates[i].split(',').map((x) => +x);
    if (isSequenceOrdered(sequence)) {
      sum += sequence[Math.floor(sequence.length / 2)];
    }
  }

  return sum.toString();
};

function setRules(str: string[]) {
  rules = str.reduce((prev, curr) => {
    const [x, y] = curr.split('|').map((x) => +x);

    if (!prev.has(x)) {
      prev.set(x, []);
    }

    prev.get(x).push(y);

    return prev;
  }, new Map<number, number[]>());
}

function isSequenceOrdered(sequence: number[]) {
  // For each number in the sequence, ensure that the following numbers can be found
  for (let j = 0; j < sequence.length; j++) {
    const remainingNumbers = sequence.slice(0, j);

    if (remainingNumbers.length === 0) {
      continue;
    }

    const number = sequence[j];
    const numbersToFind = rules.get(number)?.slice();

    if (
      numbersToFind?.some((numToFind) => remainingNumbers.includes(numToFind))
    ) {
      return false;
    }
  }

  return true;
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const splitInput = input.split('-').map((x) => x.split('\n'));

  setRules(splitInput[0]);

  const updates = splitInput[1];
  // First entry is empty so just remove it
  updates.splice(0, 1);

  let sum = 0;
  for (let i = 0; i < updates.length; i++) {
    const sequence = updates[i].split(',').map((x) => +x);
    if (!isSequenceOrdered(sequence)) {
      const orderedSequence = orderSequence(sequence);
      sum += sequence[Math.floor(orderedSequence.length / 2)];
    }
  }

  return sum.toString();
};

function orderSequence(sequence: number[]): number[] {
  // Keep shuffling until we get the desired output
  while (!isSequenceOrdered(sequence)) {
    for (let i = sequence.length - 1; i >= 0; i--) {
      const remainingNumbers = sequence.slice(0, i);

      if (remainingNumbers.length === 0) {
        continue;
      }

      const number = sequence[i];
      const numbersToFind = rules.get(number)?.slice();

      // Swap as soon as we find the first match
      for (let j = i; j >= 0; j--) {
        if (numbersToFind.includes(sequence[j])) {
          const temp = sequence[i];
          sequence[i] = sequence[j];
          sequence[j] = temp;
          break;
        }
      }
    }
  }

  return sequence;
}

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
