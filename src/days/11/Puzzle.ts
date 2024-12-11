const first = (input: string) => {
  const numbers = input.split(' ');

  // for (let num = 0; num < 25; num++) {
  //   let len = numbers.length;
  //   for (let i = 0; i < len; i++) {
  //     if (numbers[i] === '0') {
  //       numbers[i] = '1';
  //     } else if (numbers[i].length % 2 === 0) {
  //       const first = numbers[i].slice(0, numbers[i].length / 2);
  //       const second = numbers[i].slice(numbers[i].length / 2);
  //       numbers[i] = first;
  //       numbers.splice(i + 1, 0, parseInt(second).toString()); // Remove trailing zeroes
  //       len++;
  //       i++;
  //     } else {
  //       numbers[i] = (parseInt(numbers[i]) * 2024).toString();
  //     }
  //   }
  //   // console.log(numbers);
  // }
  return numbers.length;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const numbers = input.split(' ');

  const numberMap = new Map<string, string[]>();

  let cache = new Map<string, number>();
  for (let i = 0; i < numbers.length; i++) {
    cache.set(numbers[i], 1);
  }

  for (let num = 0; num < 75; num++) {
    // const output = [];
    const temp = new Map<string, number>();
    cache.forEach((value, number) => {
      if (!numberMap.has(number)) {
        numberMap.set(number, runTheThing(number));
      }

      const res = numberMap.get(number);
      for (const pp of res) {
        if (!temp.has(pp)) {
          temp.set(pp, 0);
        }
        temp.set(pp, temp.get(pp) + value);
      }
    });
    cache = temp;
  }

  const pp = Array.from(cache.values()).reduce((prev, curr) => prev + curr, 0);
  return pp;
};

function runTheThing(num: string) {
  if (num === '0') {
    return ['1'];
  } else if (num.length % 2 === 0) {
    return [
      num.slice(0, num.length / 2),
      parseInt(num.slice(num.length / 2)).toString(),
    ];
  } else {
    return [(parseInt(num) * 2024).toString()];
  }
}

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
