const first = (input: string) => {
  const lines = input.split('\r\n');
  let sum = 0;

  const isSafe = (nums: number[], ascending: boolean): boolean => {
    if (ascending) {
      for (let i = 0; i < nums.length - 1; i++) {
        const diff = nums[i] - nums[i + 1];
        if (diff > -1 || diff < -3) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < nums.length - 1; i++) {
        const diff = nums[i] - nums[i + 1];
        if (diff < 1 || diff > 3) {
          return false;
        }
      }
    }

    return true;
  };

  lines.forEach((line) => {
    const nums = line.split(' ').map((n) => +n);
    const diff = nums[0] - nums[1];
    if (diff === 0) {
      return;
    }

    if (isSafe(nums, diff < 0)) {
      sum++;
    }
  });
  return sum.toString();
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const lines = input.split('\r\n');
  let sum = 0;

  const isSafe = (nums: number[]): boolean => {
    // determine asc/desc
    const diff = nums[0] - nums[1];
    if (diff === 0) {
      return false;
    }

    if (diff < 0) {
      // Ascending
      for (let i = 0; i < nums.length - 1; i++) {
        const diff = nums[i] - nums[i + 1];
        // console.log(nums[i], nums[i + 1], diff, hasSkipped);
        if (diff > -1 || diff < -3) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < nums.length - 1; i++) {
        const diff = nums[i] - nums[i + 1];
        if (diff < 1 || diff > 3) {
          return false;
        }
      }
    }

    return true;
  };

  lines.forEach((line) => {
    const nums = line.split(' ').map((n) => +n);

    if (isSafe(nums)) {
      sum++;
    } else {
      for (let i = 0; i < nums.length; i++) {
        const copy = nums.slice();
        copy.splice(i, 1);
        if (isSafe(copy)) {
          sum++;
          break;
        }
      }
    }
  });
  return sum.toString();
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
