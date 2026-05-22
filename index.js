const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let calculatedValue = '';

// 演算子判定
function isOperator(char) {
    return ['+', '-', '×', '/'].includes(char);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch (value) {
        case 'C':
            // クリア
            calculatedValue = '';
            display.value = '';
            break;

        case '←':
            // バックスペース
            calculatedValue = calculatedValue.slice(0, -1);
            display.value = calculatedValue;
            break;

        case '=':
            // 計算
            try {

                let exp = calculatedValue
                    .replace(/×/g, '*')
                    .replace(/\//g, '/');
                display.value = eval(exp);

                calculatedValue = display.value;

            } catch {

                display.value = 'ERROR';
                calculatedValue = '';

            }
            break;

        default:

            // 演算子の連続入力防止
            const lastChar = calculatedValue.slice(-1);
            if (isOperator(value) && isOperator(lastChar)) {
                return;
            }

            // 先頭にマイナス以外の演算子は入力不可
            if (calculatedValue === '' && isOperator(value) && value !== '-') {
                return;
            }

            // 小数点の連続入力防止
            if (value === '.' && lastChar === '.') {
                return;
            }
            
            calculatedValue += value;
            display.value = calculatedValue;
            break;
        }
    });
});