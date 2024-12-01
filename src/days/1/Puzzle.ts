const first = (input: string) => {
  const lines = input.split('\r\n');
  // sort the lines
  const left: Array<number> = [];
  const right: Array<number> = [];

  lines.forEach(element => {
    const res = element.split('   ');
    left.push(+res[0]);
    right.push(+res[1]);
  });

  left.sort();
  right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }
  
  return sum.toString();
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\r\n');
  const left = new Set<number>();
  const right = new Map<number, number>();
  lines.forEach(element => {
    const res = element.split('   ');
    left.add(+res[0]);
    if (right.has(+res[1])) {
      right.set(+res[1], right.get(+res[1]) + 1);
    } else {
      right.set(+res[1], 1);
    }
  });

  let sum = 0;
  left.forEach(num => {
    if (right.has(num)) {
      sum += num * right.get(num);
    }
  });


  return sum.toString();
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
