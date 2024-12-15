const first = (input: string) => {
  const machines = input.split('\n');
  let total = 0;
  for (let i = 0; i < machines.length; i += 4) {
    const a = machines[i]
      .split(':')[1]
      .split(',')
      .map((x) => +x.split('+')[1]);
    const b = machines[i + 1]
      .split(':')[1]
      .split(',')
      .map((x) => +x.split('+')[1]);
    const prize = machines[i + 2]
      .split(':')[1]
      .split(',')
      .map((x) => +x.split('=')[1]);
    // Assume we can never be at the winning position immediately
    const result = calculateLowestButtonPresses(a, b, prize);
    if (result) {
      total += result;
    }
  }
  return total;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const machines = input.split('\n');
  let total = 0;
  for (let i = 0; i < machines.length; i += 4) {
    const a = machines[i]
      .split(':')[1]
      .split(',')
      .map((x) => +x.split('+')[1]);
    const b = machines[i + 1]
      .split(':')[1]
      .split(',')
      .map((x) => +x.split('+')[1]);
    const prize = machines[i + 2]
      .split(':')[1]
      .split(',')
      // .map((x) => 10000000000000 + +x.split('=')[1]);
      .map((x) => +x.split('=')[1]);
    const result = calculateLowestButtonPresses(a, b, prize);
    if (result) {
      // console.log(result);
      total += result;
    }
  }
  return total;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };

function calculateLowestButtonPresses(
  a: number[],
  b: number[],
  target: number[]
) {
  // use linear equation system to determine what two values are hit

  // A: X94 + Y22 = 8400 * 34
  // B: X34 + Y67 = 5400 * 94

  const xx = [a[0] * b[0], b[0] * a[0]];
  const yy = [a[1] * a[0], b[1] * a[0]];

  // X3146 + Y748 = 8400
  // X3146 + Y6298 = 8400
  // A0 + B(-5550) = 8400

  // B = 8400 - 5400 / -5550
  // 22 * 40
  // 480

  // 94
  // 100
  // 22
  let total = 0;
  let index = 0;

  // let index = 10000000008400
  while (total < target[0]) {
    total = a[0] * index;
    // console.log(total);
    if ((target[0] - total) % b[0] === 0) {
      const index2 = (target[0] - total) / b[0];
      const total2 = a[1] * index + b[1] * index2;
      if (total2 === target[1]) {
        return index * 3 + index2;
      }
    }

    index++;
  }

  // 30, 70
  return null;
}
