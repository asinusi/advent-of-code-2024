type Coordinate = {
  x: number;
  y: number;
};

const first = (input: string) => {
  const locations = input.split('\n').map((x) => x.split(''));
  const antinodes = new Set<string>();

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[0].length; j++) {
      if (locations[i][j] !== '.') {
        // Attempt to find a matching frequency
        const startingFrequency: Coordinate = {
          x: i,
          y: j,
        };
        const frequencies = getMatchingFrequencies(locations, { x: i, y: j });
        for (const frequency of frequencies) {
          // Calculate the distance between them
          const diffX = Math.abs(i - frequency.x);
          const diffY = Math.abs(j - frequency.y);
          // Set the antinodes in a line and keep going until we're out of bounds
          getAntinode(
            startingFrequency,
            frequency,
            diffX,
            diffY,
            locations,
            antinodes
          );
          getAntinode(
            frequency,
            startingFrequency,
            diffX,
            diffY,
            locations,
            antinodes
          );
        }
      }
    }
  }
  return antinodes.size;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const locations = input.split('\n').map((x) => x.split(''));
  const antinodes = new Set<string>();

  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[0].length; j++) {
      if (locations[i][j] !== '.') {
        // Attempt to find a matching frequency
        const startingFrequency: Coordinate = {
          x: i,
          y: j,
        };
        const frequencies = getMatchingFrequencies(locations, { x: i, y: j });
        if (frequencies.length > 0) {
          antinodes.add(`${startingFrequency.x}_${startingFrequency.y}`);
        }
        for (const frequency of frequencies) {
          // Calculate the distance between them
          const diffX = Math.abs(i - frequency.x);
          const diffY = Math.abs(j - frequency.y);
          antinodes.add(`${frequency.x}_${frequency.y}`);
          // Create antinodes between the two antennas with the same pattern

          // Set the antinodes
          let firstAntinode = getAntinode(
            startingFrequency,
            frequency,
            diffX,
            diffY,
            locations,
            antinodes
          );
          while (firstAntinode !== null) {
            firstAntinode = getAntinode(
              firstAntinode,
              startingFrequency,
              diffX,
              diffY,
              locations,
              antinodes
            );
          }

          let secondAntinode = getAntinode(
            frequency,
            startingFrequency,
            diffX,
            diffY,
            locations,
            antinodes
          );

          while (secondAntinode !== null) {
            secondAntinode = getAntinode(
              secondAntinode,
              startingFrequency,
              diffX,
              diffY,
              locations,
              antinodes
            );
          }
        }
      }
    }
  }

  return antinodes.size;
};

const expectedSecondSolution = 'solution 2';

function getAntinode(
  firstFrequency: Coordinate,
  secondFrequency: Coordinate,
  diffX: number,
  diffY: number,
  locations: string[][],
  antinodes: Set<string>
) {
  const antinode: Coordinate = {
    x: 0,
    y: 0,
  };

  if (firstFrequency.x < secondFrequency.x) {
    antinode.x = firstFrequency.x - diffX;
  } else {
    antinode.x = firstFrequency.x + diffX;
  }

  if (firstFrequency.y < secondFrequency.y) {
    antinode.y = firstFrequency.y - diffY;
  } else {
    antinode.y = firstFrequency.y + diffY;
  }

  if (
    antinode.x < 0 ||
    antinode.x > locations.length - 1 ||
    antinode.y < 0 ||
    antinode.y > locations[0].length - 1
  ) {
    return null;
  }

  antinodes.add(`${antinode.x}_${antinode.y}`);
  return antinode;
}

// Return x, y coords of the matching frequency
function getMatchingFrequencies(locations: string[][], start: Coordinate) {
  const frequency = locations[start.x][start.y];
  // For now assume they can be only found diagonally
  const frequencies: Coordinate[] = [];
  // BOTTOM RIGHT
  for (let i = start.x; i < locations.length; i++) {
    for (let j = start.y; j < locations[0].length; j++) {
      if (i == start.x && j === start.y) {
        continue;
      }
      if (locations[i][j] === frequency) {
        frequencies.push({ x: i, y: j });
      }
    }
  }

  // TOP RIGHT
  for (let i = start.x; i >= 0; i--) {
    for (let j = start.y; j < locations[0].length; j++) {
      if (i == start.x && j === start.y) {
        continue;
      }
      if (locations[i][j] === frequency) {
        frequencies.push({ x: i, y: j });
      }
    }
  }

  // BOTTOM LEFT
  for (let i = start.x; i < locations.length; i++) {
    for (let j = start.y; j >= 0; j--) {
      if (i == start.x && j === start.y) {
        continue;
      }
      if (locations[i][j] === frequency) {
        frequencies.push({ x: i, y: j });
      }
    }
  }

  // TOP LEFT
  for (let i = start.x; i >= 0; i--) {
    for (let j = start.y; j >= 0; j--) {
      if (i == start.x && j === start.y) {
        continue;
      }
      if (locations[i][j] === frequency) {
        frequencies.push({ x: i, y: j });
      }
    }
  }

  return frequencies;
}

export { first, expectedFirstSolution, second, expectedSecondSolution };
