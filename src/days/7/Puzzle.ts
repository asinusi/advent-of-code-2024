enum Operator {
  Add = 'Add',
  Multiply = 'Multiply',
  Concatenation = 'Concatenation',
}

const first = (input: string) => {
  const rules = input.split('\n').map((x) => {
    const [value, o] = x.split(':');
    const numbers = o
      .trim()
      .split(' ')
      .map((op) => +op);
    return {
      value: +value,
      numbers,
    };
  });

  let sum = 0;
  const operations = [Operator.Add, Operator.Multiply];
  for (const rule of rules) {
    if (operationValid(rule.value, rule.numbers, operations)) {
      sum += rule.value;
    }
  }

  return sum;
};

function generateOperators(amount: number, operators: Operator[]) {
  let base: Operator[][] = [];
  for (const op of operators) {
    base.push([op]);
  }
  let total = amount - 2;
  while (total > 0) {
    const newOne: Operator[][] = [];
    for (let i = 0; i < base.length; i++) {
      for (const op of operators) {
        newOne.push([...base[i], op]);
      }
    }
    base = newOne;
    total--;
  }
  return base;
}

function operationValid(
  value: number,
  numbers: number[],
  operations: Operator[]
) {
  const operators = generateOperators(numbers.length, operations);
  for (const operator of operators) {
    if (calculateSum(numbers, operator) === value) {
      return true;
    }
  }

  return false;
}

function calculateSum(numbers: number[], operators: Operator[]) {
  let sum = 0;

  if (operators[0] === Operator.Add) {
    sum = numbers[0] + numbers[1];
  } else if (operators[0] === Operator.Multiply) {
    sum = numbers[0] * numbers[1];
  } else if (operators[0] === Operator.Concatenation) {
    sum = parseInt(numbers[0].toString() + numbers[1].toString());
  } else {
    throw Error('Invalid operator');
  }

  for (let i = 1; i < operators.length; i++) {
    if (operators[i] === Operator.Add) {
      sum += numbers[i + 1];
    } else if (operators[i] === Operator.Multiply) {
      sum *= numbers[i + 1];
    } else if (operators[i] === Operator.Concatenation) {
      sum = parseInt(sum.toString() + numbers[i + 1].toString());
    } else {
      throw Error('Invalid operator');
    }
  }

  return sum;
}

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const rules = input.split('\n').map((x) => {
    const [value, o] = x.split(':');
    const numbers = o
      .trim()
      .split(' ')
      .map((op) => +op);
    return {
      value: +value,
      numbers,
    };
  });

  let sum = 0;
  const operations = [Operator.Add, Operator.Multiply, Operator.Concatenation];
  for (const rule of rules) {
    if (operationValid(rule.value, rule.numbers, operations)) {
      sum += rule.value;
    }
  }

  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
