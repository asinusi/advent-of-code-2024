const first = (input: string) => {
  const robots = input.split('\n').map((x) => {
    const [pos, vel] = x.split(' ');
    return {
      position: pos
        .slice(2)
        .split(',')
        .map((x) => +x),
      velocity: vel
        .slice(2)
        .split(',')
        .map((x) => +x),
    };
  });

  // let width = 101;
  // let height = 103;
  let map;
  const width = 100;
  const height = 102;
  for (let i = 0; i < 100; i++) {
    map = Array(103)
      .fill(null)
      .map(() => Array(101).fill('.'));
    for (const robot of robots) {
      robot.position[0] += robot.velocity[0];
      if (robot.position[0] < 0) {
        robot.position[0] = width + robot.position[0] + 1;
      } else if (robot.position[0] > width) {
        robot.position[0] = robot.position[0] - width - 1;
      }

      robot.position[1] += robot.velocity[1];
      if (robot.position[1] < 0) {
        robot.position[1] = height + robot.position[1] + 1;
      } else if (robot.position[1] > height) {
        robot.position[1] = robot.position[1] - height - 1;
      }

      map[robot.position[1]][robot.position[0]] = '1';
    }
  }
  // Remove splits
  // map.splice(map.length / 2, 1);

  const regions = new Map<string, number>([
    ['tl', 0],
    ['bl', 0],
    ['tr', 0],
    ['br', 0],
  ]);
  for (const robot of robots) {
    if (robot.position[0] < 50) {
      if (robot.position[1] < 51) {
        regions.set('tl', regions.get('tl') + 1);
      } else if (robot.position[1] > 51) {
        regions.set('bl', regions.get('bl') + 1);
      }
    } else if (robot.position[0] > 50) {
      if (robot.position[1] < 51) {
        regions.set('tr', regions.get('tr') + 1);
      } else if (robot.position[1] > 51) {
        regions.set('br', regions.get('br') + 1);
      }
    }
  }

  return Array.from(regions.values()).reduce((a, b) => a * b);
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const robots = input.split('\n').map((x) => {
    const [pos, vel] = x.split(' ');
    return {
      position: pos
        .slice(2)
        .split(',')
        .map((x) => +x),
      velocity: vel
        .slice(2)
        .split(',')
        .map((x) => +x),
    };
  });

  let map;
  const width = 100;
  const height = 102;
  const tree = false;
  let seconds = 0;
  while (!tree) {
    map = Array(103)
      .fill(null)
      .map(() => Array(101).fill('.'));
    for (const robot of robots) {
      robot.position[0] += robot.velocity[0];
      if (robot.position[0] < 0) {
        robot.position[0] = width + robot.position[0] + 1;
      } else if (robot.position[0] > width) {
        robot.position[0] = robot.position[0] - width - 1;
      }

      robot.position[1] += robot.velocity[1];
      if (robot.position[1] < 0) {
        robot.position[1] = height + robot.position[1] + 1;
      } else if (robot.position[1] > height) {
        robot.position[1] = robot.position[1] - height - 1;
      }

      map[robot.position[1]][robot.position[0]] = '#';
    }
    seconds++;
    // Check the tree
    if (map[0][50] === '#') {
      debugger;
    }
  }

  console.log(seconds);
  // Remove splits
  // map.splice(map.length / 2, 1);

  const regions = new Map<string, number>([
    ['tl', 0],
    ['bl', 0],
    ['tr', 0],
    ['br', 0],
  ]);
  for (const robot of robots) {
    if (robot.position[0] < 50) {
      if (robot.position[1] < 51) {
        regions.set('tl', regions.get('tl') + 1);
      } else if (robot.position[1] > 51) {
        regions.set('bl', regions.get('bl') + 1);
      }
    } else if (robot.position[0] > 50) {
      if (robot.position[1] < 51) {
        regions.set('tr', regions.get('tr') + 1);
      } else if (robot.position[1] > 51) {
        regions.set('br', regions.get('br') + 1);
      }
    }
  }

  return Array.from(regions.values()).reduce((a, b) => a * b);
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
