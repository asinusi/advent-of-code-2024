const first = (input: string) => {
  const output: string[] = [];
  let id = 0;

  for (let i = 0; i < input.length; i++) {
    const block = +input[i];
    for (let j = 1; j <= block; j++) {
      output.push(id.toString());
    }

    if (i + 1 > input.length) {
      break;
    }
    i++;
    const space = +input[i];
    for (let j = 1; j <= space; j++) {
      output.push('.');
    }

    id++;
  }

  // console.log(output);

  for (let j = output.length - 1; j >= 0; j--) {
    if (output[j] !== '.') {
      for (let i = 0; i < j; i++) {
        if (output[i] === '.') {
          output[i] = output[j];
          output[j] = '.';
          break;
        }
      }
    }
  }
  // console.log(output.toString());
  let sum = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i] === '.') {
      break;
    }
    sum += i * +output[i];
  }

  return sum;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const output: string[] = [];
  let id = 0;

  for (let i = 0; i < input.length; i++) {
    const block = +input[i];
    for (let j = 1; j <= block; j++) {
      output.push(id.toString());
    }

    if (i + 1 > input.length) {
      break;
    }
    i++;
    const space = +input[i];
    for (let j = 1; j <= space; j++) {
      output.push('.');
    }

    id++;
  }

  // console.log(output);
  let lastNum = '';
  for (let j = output.length - 1; j >= 0; j--) {
    if (output[j] === lastNum) {
      continue;
    }
    if (output[j] !== '.') {
      if (output[j] === '2') {
        debugger;
      }
      // const num = +output[j];
      // debugger;
      let k = j;
      while (output[k] === output[j]) {
        k--;
      }
      const diff = j - k;

      let startIndex;
      let n = 0;
      for (startIndex = 0; startIndex < j; startIndex++) {
        if (output[startIndex] === '.') {
          n = 0;
          while (n < diff && output[startIndex + n] === '.') {
            n++;
          }
          if (n === diff) {
            break;
          }
        }
      }

      if (n === diff) {
        for (let l = 0; l < n; l++) {
          output[startIndex + l] = output[j - l];
          output[j - l] = '.';
        }
      }

      lastNum = output[j];
    }
  }
  // console.log(output.toString());
  let sum = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i] === '.') {
      continue;
    }
    sum += i * +output[i];
  }

  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
