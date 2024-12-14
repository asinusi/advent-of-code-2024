let alternative = false;

const seen = new Set<string>();
let area: Set<string>;
let perimeterMap: Map<string, number>;
let perimeters: {
  x: number;
  y: number;
  side: 'top' | 'bottom' | 'left' | 'right';
}[] = [];
let mirror: string[][];
const first = (input: string) => {
  const plants = input.split('\n').map((x) => x.split(''));

  let sum = 0;
  for (let i = 0; i < plants.length; i++) {
    for (let j = 0; j < plants[0].length; j++) {
      const pos = `${i}_${j}`;
      if (seen.has(pos)) {
        continue;
      }

      area = new Set<string>();
      perimeterMap = new Map<string, number>();
      mirror = input.split('\n').map((x) => x.split(''));
      findLetter(plants, i, j, i, j);
      const perimeter = Array.from(perimeterMap.values()).reduce(
        (prev, curr) => prev + curr,
        0
      );
      sum += area.size * perimeter;
    }
  }

  return sum;
};

function findLetter(
  plants: string[][],
  prevX: number,
  prevY: number,
  startX: number,
  startY: number
) {
  const pos = `${startX}_${startY}`;

  if (seen.has(pos)) {
    return;
  }

  if (!perimeterMap.has(pos)) {
    let perimeter = 0;
    if (alternative) {
      if (startX - 1 < 0) {
        perimeters.push({ x: startX - 1, y: startY, side: 'top' });
      } else if (plants[startX - 1][startY] !== plants[startX][startY]) {
        perimeters.push({ x: startX - 1, y: startY, side: 'top' });
      }

      if (startX + 1 > plants.length - 1) {
        perimeters.push({ x: startX + 1, y: startY, side: 'bottom' });
      } else if (plants[startX + 1][startY] !== plants[startX][startY]) {
        perimeters.push({ x: startX + 1, y: startY, side: 'bottom' });
      }

      if (startY - 1 < 0) {
        perimeters.push({ x: startX, y: startY - 1, side: 'left' });
      } else if (plants[startX][startY - 1] !== plants[startX][startY]) {
        perimeters.push({ x: startX, y: startY - 1, side: 'left' });
      }

      if (startY + 1 > plants[0].length - 1) {
        perimeters.push({ x: startX, y: startY + 1, side: 'right' });
      } else if (plants[startX][startY + 1] !== plants[startX][startY]) {
        perimeters.push({ x: startX, y: startY + 1, side: 'right' });
      }
    } else {
      if (startX - 1 < 0) {
        perimeter++;
      } else if (plants[startX - 1][startY] !== plants[startX][startY]) {
        perimeter++;
      }

      if (startX + 1 > plants.length - 1) {
        perimeter++;
      } else if (plants[startX + 1][startY] !== plants[startX][startY]) {
        perimeter++;
      }

      if (startY - 1 < 0) {
        perimeter++;
      } else if (plants[startX][startY - 1] !== plants[startX][startY]) {
        perimeter++;
      }

      if (startY + 1 > plants[0].length - 1) {
        perimeter++;
      } else if (plants[startX][startY + 1] !== plants[startX][startY]) {
        perimeter++;
      }
    }
    perimeterMap.set(pos, perimeter);
  }

  mirror[startX][startY] = '#';
  // seen.add(pos);

  if (
    !seen.has(`${startX}_${startY}_${startX - 1}_${startY}`) &&
    startX - 1 >= 0 &&
    plants[startX - 1][startY] === plants[startX][startY]
  ) {
    seen.add(`${startX}_${startY}_${startX - 1}_${startY}`);
    findLetter(plants, startX, startY, startX - 1, startY);
  }

  if (
    !seen.has(`${startX}_${startY}_${startX + 1}_${startY}`) &&
    startX + 1 < plants.length &&
    plants[startX + 1][startY] === plants[startX][startY]
  ) {
    seen.add(`${startX}_${startY}_${startX + 1}_${startY}`);
    findLetter(plants, startX, startY, startX + 1, startY);
  }

  if (
    !seen.has(`${startX}_${startY}_${startX}_${startY - 1}`) &&
    startY - 1 >= 0 &&
    plants[startX][startY - 1] === plants[startX][startY]
  ) {
    seen.add(`${startX}_${startY}_${startX}_${startY - 1}`);
    findLetter(plants, startX, startY, startX, startY - 1);
  }

  if (
    !seen.has(`${startX}_${startY}_${startX}_${startY + 1}`) &&
    startY + 1 < plants[0].length &&
    plants[startX][startY + 1] === plants[startX][startY]
  ) {
    seen.add(`${startX}_${startY}_${startX}_${startY + 1}`);
    findLetter(plants, startX, startY, startX, startY + 1);
  }

  area.add(pos);
  seen.add(pos);

  return;
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const plants = input.split('\n').map((x) => x.split(''));
  alternative = true;
  let sum = 0;
  for (let i = 0; i < plants.length; i++) {
    for (let j = 0; j < plants[0].length; j++) {
      const pos = `${i}_${j}`;
      if (seen.has(pos)) {
        continue;
      }

      area = new Set<string>();
      perimeterMap = new Map<string, number>();
      perimeters = [];

      mirror = input.split('\n').map((x) => x.split(''));
      findLetter(plants, i, j, i, j);

      let walls = 0;
      while (perimeters.length > 0) {
        // Look for perimeter based on the cu rent x
        const wallToFind = perimeters[0];
        // console.log(wallToFind);
        let foundAllWalls = false;
        while (!foundAllWalls) {
          foundAllWalls = true;
          for (let i = perimeters.length - 1; i >= 0; i--) {
            const perim = perimeters[i];
            if (perim.side !== wallToFind.side) {
              continue;
            }

            if (wallToFind.side === 'top' || wallToFind.side === 'bottom') {
              if (wallToFind.x === perim.x) {
                // Check if it's attached
                let currY = wallToFind.y;
                const x = wallToFind.side === 'top' ? 1 : -1;
                const outOfBounds =
                  wallToFind.x < 0 || wallToFind.x > plants.length - 1;
                let attached = true;
                const letter = plants[wallToFind.x + x][wallToFind.y];
                while (currY !== perim.y) {
                  if (
                    plants[perim.x + x][currY] !==
                      plants[wallToFind.x + x][wallToFind.y] ||
                    (outOfBounds ? false : plants[perim.x][currY] === letter)
                  ) {
                    attached = false;
                    break;
                  }
                  currY += wallToFind.y < perim.y ? 1 : -1;
                }

                if (!attached) {
                  continue;
                }

                foundAllWalls = false;
                perimeters.splice(i, 1);
              }
            } else if (
              wallToFind.side === 'left' ||
              wallToFind.side === 'right'
            ) {
              if (wallToFind.y == perim.y) {
                // Check if it's attached
                let currX = wallToFind.x;
                const y = wallToFind.side === 'left' ? 1 : -1;
                const outOfBounds =
                  wallToFind.y < 0 || wallToFind.y > plants[0].length - 1;
                const letter = plants[wallToFind.x][wallToFind.y + y];
                let attached = true;
                while (currX !== perim.x) {
                  if (
                    plants[currX][perim.y + y] !==
                      plants[wallToFind.x][wallToFind.y + y] ||
                    (outOfBounds ? false : plants[currX][perim.y] === letter)
                  ) {
                    attached = false;
                    break;
                  }
                  currX += wallToFind.x < perim.x ? 1 : -1;
                }

                if (!attached) {
                  continue;
                }

                foundAllWalls = false;
                perimeters.splice(i, 1);
              }
            }
          }
        }
        walls++;
      }

      console.log(`Letter: ${plants[i][j]} Walls: ${walls} Area: ${area.size}`);
      sum += area.size * walls;
    }
  }

  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
