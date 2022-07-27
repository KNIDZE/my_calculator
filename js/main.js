const resultBlock = document.getElementById('result')
symbols = '*/+-'
function add(number) {
  resultBlock.innerHTML += number.toString()
}

function count() {
  let symbolsArray = splitToParts(resultBlock.innerHTML)

  if (symbolsArray.includes('*') || symbolsArray.includes('/')) {
    symbolsArray = countMath(symbolsArray, ['*', '/'])
  }
  if (symbolsArray.includes('+') || symbolsArray.includes('-')) {
    symbolsArray = countMath(symbolsArray, ['+', '-'])
  }
  let result = +(symbolsArray[0]).toFixed(3)
  resultBlock.innerHTML = result.toString()
}

function splitToParts(string) {
  let result = [];
  let formulaPart = '';
  for (let part of string) {
    if (!symbols.includes(part)) {
      formulaPart += part
    } else {
      result.push(formulaPart)
      result.push(part)
      formulaPart = ''
    }
  }
  result.push(formulaPart)
  return result
}

function countMath(array, symbol) {
  const result = []
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === symbol[0] || array[i] === symbol[1]) {
      let previous = +result[result.length - 1]
      let next = +array[i + 1]
      switch (array[i]) {
        case "+":
          result.pop();
          result.push(previous + next);
          break;
        case "-":
          result.pop();
          result.push(previous - next);
          break;
        case "*":
          result.pop();
          result.push(previous * next);
          break;
        case "/":
          result.pop();
          result.push(previous / next);
          break;
      }
      i++;
    } else {
      result.push(array[i]);
      if (i === array.length - 2) result.push(array[array.length - 1])
    }

  }
  return result
}