const first = (input: string) => {
  const warehouse: string[][] = [];
  let instructions = '';
  const res = input.split('\n');
  const robot = [-1, -1];
  for (let i = 0; i < res.length; i++) {
    if (res[i] === '') {
      i++;
      while (i < res.length) {
        instructions += res[i];
        i++;
      }
      break;
    }
    warehouse.push(res[i].split(''));
    if (robot[1] === -1) {
      robot[1] = warehouse[warehouse.length - 1].indexOf('@');
      if (robot[1] >= 0) {
        robot[0] = i;
      }
    }
  }

  for (const direction of instructions) {
    const next = [0, 0];
    if (direction === '<') {
      next[1] = -1;
    } else if (direction === '>') {
      next[1] = 1;
    } else if (direction === '^') {
      next[0] = -1;
    } else if (direction === 'v') {
      next[0] = 1;
    }

    move(warehouse, robot, next);
    // console.log(`Move: ${direction}`);
    // console.log(warehouse);
  }

  // for (let i = 0; i < warehouse.length; i++) {
  //   console.log(warehouse[i]);
  // }

  let total = 0;
  for (let i = 0; i < warehouse.length; i++) {
    for (let j = 0; j < warehouse[0].length; j++) {
      if (warehouse[i][j] === 'O') {
        total += 100 * i + j;
      }
    }
  }

  return total;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const warehouse: string[][] = [];
  let instructions = '';
  const res = input.split('\n');
  const robot = [-1, -1];
  for (let i = 0; i < res.length; i++) {
    if (res[i] === '') {
      i++;
      while (i < res.length) {
        instructions += res[i];
        i++;
      }
      break;
    }
    warehouse.push([]);
    const symbols = res[i].split('');
    // Duplicate each symbol
    let index = 0;
    for (const symbol of symbols) {
      if (symbol === '@') {
        robot[0] = i;
        robot[1] = index;
        warehouse[warehouse.length - 1].push(symbol);
      } else {
        if (symbol === 'O') {
          warehouse[warehouse.length - 1].push('[', ']');
        } else {
          warehouse[warehouse.length - 1].push(symbol, symbol);
        }

        index++;
      }
      index++;
    }
  }

  for (let i = 0; i < warehouse.length; i++) {
    console.log(warehouse[i]);
  }

  // for (const direction of instructions) {
  //   const next = [0, 0];
  //   if (direction === '<') {
  //     next[1] = -1;
  //   } else if (direction === '>') {
  //     next[1] = 1;
  //   } else if (direction === '^') {
  //     next[0] = -1;
  //   } else if (direction === 'v') {
  //     next[0] = 1;
  //   }

  //   move(warehouse, robot, next);
  //   // console.log(`Move: ${direction}`);
  //   // console.log(warehouse);
  // }

  // for (let i = 0; i < warehouse.length; i++) {
  //   console.log(warehouse[i]);
  // }

  // let total = 0;
  // for (let i = 0; i < warehouse.length; i++) {
  //   for (let j = 0; j < warehouse[0].length; j++) {
  //     if (warehouse[i][j] === 'O') {
  //       total += 100 * i + j;
  //     }
  //   }
  // }

  return '';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };

function move(warehouse: string[][], robot: number[], next: number[]) {
  const position = warehouse[robot[0] + next[0]][robot[1] + next[1]];

  if (position === undefined || position === '#') {
    // Moving into a wall is a noop
    return;
  }
  if (position === '.') {
    // Swap positions with an empty block
    warehouse[robot[0] + next[0]][robot[1] + next[1]] = '@';
    warehouse[robot[0]][robot[1]] = '.';
    robot[0] = robot[0] + next[0];
    robot[1] = robot[1] + next[1];
  } else if (position === 'O') {
    // If there is an empty block then move each block once
    let shifted = false;
    if (next[0] === 1) {
      // Down
      for (let i = robot[0] + 1; i < warehouse.length; i++) {
        if (warehouse[i][robot[1]] === '#') {
          break;
        } else if (warehouse[i][robot[1]] === '.') {
          // Swap the top most block with this one
          warehouse[i][robot[1]] = 'O';
          shifted = true;
          break;
        }
      }
    } else if (next[0] === -1) {
      // Up
      for (let i = robot[0] - 1; i >= 0; i--) {
        if (warehouse[i][robot[1]] === '#') {
          break;
        } else if (warehouse[i][robot[1]] === '.') {
          // Swap the top most block with this one
          warehouse[i][robot[1]] = 'O';
          shifted = true;
          break;
        }
      }
    } else if (next[1] === 1) {
      // Right
      for (let i = robot[1] + 1; i < warehouse[0].length; i++) {
        if (warehouse[robot[0]][i] === '#') {
          break;
        } else if (warehouse[robot[0]][i] === '.') {
          // Swap the top most block with this one
          warehouse[robot[0]][i] = 'O';
          shifted = true;
          break;
        }
      }
    } else if (next[1] === -1) {
      // Left
      for (let i = robot[1] - 1; i >= 0; i--) {
        if (warehouse[robot[0]][i] === '#') {
          break;
        } else if (warehouse[robot[0]][i] === '.') {
          // Swap the top most block with this one
          warehouse[robot[0]][i] = 'O';
          shifted = true;
          break;
        }
      }
    }

    if (shifted) {
      warehouse[robot[0] + next[0]][robot[1] + next[1]] = '@';
      warehouse[robot[0]][robot[1]] = '.';
      robot[0] = robot[0] + next[0];
      robot[1] = robot[1] + next[1];
    }
  }
}
