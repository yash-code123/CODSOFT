const display = document.getElementById('display');
const exprEl = document.getElementById('expr');
const keys = document.getElementById('keys');

// State
let currentValue = '0';      // what's currently being typed / shown
let previousValue = null;    // left-hand operand once an operator is chosen
let operator = null;         // '+', '−', '×', '÷'
let justEvaluated = false;   // true right after pressing "="
let overflow = false;        // true if last action errored out

const OP_SYMBOLS = { '+': '+', '−': '-', '×': '*', '÷': '/' };

function formatForDisplay(numStr) {
  if (numStr === 'Error') return numStr;
  // Avoid runaway long decimals on screen
  if (numStr.includes('.')) {
    const [intPart, decPart] = numStr.split('.');
    if (decPart.length > 8) {
      return parseFloat(numStr).toPrecision(10).replace(/\.?0+$/, '');
    }
  }
  if (numStr.replace('-', '').length > 12) {
    const num = parseFloat(numStr);
    return num.toExponential(5);
  }
  return numStr;
}

function updateDisplay() {
  display.textContent = formatForDisplay(currentValue);
  if (previousValue !== null && operator) {
    exprEl.textContent = `${formatForDisplay(previousValue)} ${operator}`;
  } else {
    exprEl.textContent = '\u00A0';
  }
}

function inputDigit(d) {
  if (overflow) resetAll();
  if (justEvaluated) {
    currentValue = d;
    justEvaluated = false;
  } else if (currentValue === '0') {
    currentValue = d;
  } else {
    if (currentValue.replace('-', '').replace('.', '').length >= 14) return;
    currentValue += d;
  }
  updateDisplay();
}

function inputDecimal() {
  if (overflow) resetAll();
  if (justEvaluated) {
    currentValue = '0.';
    justEvaluated = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (overflow) return;

  if (operator && previousValue !== null && !justEvaluated) {
    // chain: evaluate what's pending first
    const result = compute(previousValue, currentValue, operator);
    if (result === null) { showError(); return; }
    previousValue = result.toString();
    currentValue = previousValue;
  } else {
    previousValue = currentValue;
  }

  operator = op;
  justEvaluated = false;
  currentValue = previousValue; // show the carried value until next digit typed
  // Reset so the next digit press starts a fresh number, not appends
  startFresh = true;
  updateDisplay();
}

// helper flag: next digit typed should start a new number
let startFresh = false;

function compute(aStr, bStr, op) {
  const a = parseFloat(aStr);
  const b = parseFloat(bStr);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;

  let result;
  switch (op) {
    case '+': result = a + b; break;
    case '−': result = a - b; break;
    case '×': result = a * b; break;
    case '÷':
      if (b === 0) return null; // divide by zero -> error
      result = a / b;
      break;
    default: return null;
  }

  if (!Number.isFinite(result)) return null;

  // round off floating point noise
  result = Math.round(result * 1e10) / 1e10;
  return result;
}

function equals() {
  if (overflow) return;
  if (operator === null || previousValue === null) return;

  const result = compute(previousValue, currentValue, operator);
  if (result === null) { showError(); return; }

  exprEl.textContent = `${formatForDisplay(previousValue)} ${operator} ${formatForDisplay(currentValue)} =`;
  currentValue = result.toString();
  previousValue = null;
  operator = null;
  justEvaluated = true;
  display.textContent = formatForDisplay(currentValue);
}

function showError() {
  display.textContent = 'Error';
  exprEl.textContent = '\u00A0';
  overflow = true;
}

function resetAll() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  justEvaluated = false;
  overflow = false;
  startFresh = false;
  updateDisplay();
}

function backspace() {
  if (overflow) { resetAll(); return; }
  if (justEvaluated) { resetAll(); return; }
  if (currentValue.length <= 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
    currentValue = '0';
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

function percent() {
  if (overflow) return;
  const num = parseFloat(currentValue);
  if (Number.isNaN(num)) return;
  currentValue = (num / 100).toString();
  updateDisplay();
}

// Override inputDigit/inputDecimal to respect "startFresh" after an operator
const _inputDigit = inputDigit;
inputDigit = function (d) {
  if (startFresh) {
    currentValue = '0';
    startFresh = false;
  }
  _inputDigit(d);
};

const _inputDecimal = inputDecimal;
inputDecimal = function () {
  if (startFresh) {
    currentValue = '0';
    startFresh = false;
  }
  _inputDecimal();
};

// ===== Button wiring =====
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('.key');
  if (!btn) return;
  handleAction(btn);
  flashPress(btn);
});

function handleAction(btn) {
  const action = btn.dataset.action;
  switch (action) {
    case 'number': inputDigit(btn.dataset.num); break;
    case 'decimal': inputDecimal(); break;
    case 'operator': chooseOperator(btn.dataset.op); break;
    case 'equals': equals(); break;
    case 'clear': resetAll(); break;
    case 'backspace': backspace(); break;
    case 'percent': percent(); break;
  }
}

function flashPress(btn) {
  btn.classList.add('is-pressed');
  setTimeout(() => btn.classList.remove('is-pressed'), 110);
}

// ===== Keyboard support =====
const keyMap = {
  '+': () => chooseOperator('+'),
  '-': () => chooseOperator('−'),
  '*': () => chooseOperator('×'),
  '/': () => chooseOperator('÷'),
  'Enter': () => equals(),
  '=': () => equals(),
  'Backspace': () => backspace(),
  'Escape': () => resetAll(),
  '.': () => inputDecimal(),
  '%': () => percent(),
};

window.addEventListener('keydown', (e) => {
  if (/^[0-9]$/.test(e.key)) {
    inputDigit(e.key);
    highlightKey(`[data-num="${e.key}"]`);
    return;
  }
  if (keyMap[e.key]) {
    e.preventDefault();
    keyMap[e.key]();
    if (e.key === '+' ) highlightKey('[data-op="+"]');
    if (e.key === '-') highlightKey('[data-op="−"]');
    if (e.key === '*') highlightKey('[data-op="×"]');
    if (e.key === '/') highlightKey('[data-op="÷"]');
    if (e.key === 'Enter' || e.key === '=') highlightKey('[data-action="equals"]');
    if (e.key === 'Backspace') highlightKey('[data-action="backspace"]');
    if (e.key === 'Escape') highlightKey('[data-action="clear"]');
    if (e.key === '.') highlightKey('[data-action="decimal"]');
  }
});

function highlightKey(selector) {
  const btn = keys.querySelector(selector);
  if (btn) flashPress(btn);
}

// init
updateDisplay();
