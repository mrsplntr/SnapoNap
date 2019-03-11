const speed = {
    ten: 10,
    five: 5,
    three: 3
}
let chosenTime = speed.five;
let time = chosenTime;

let version = 'Noob';

let timerInterval;

let score = 0;

let insertedArr = [];

let numOfWords = 1;
let extraTime = 0;

alertWrittenWords.style.display = 'none';
settingsRules.style.display = 'none';

onStart.addEventListener('click', startGame);

onNoob.addEventListener('click', () => {
    version = 'Noob';
});
onPro.addEventListener('click', () => {
    version = 'Pro';
});

onThree.addEventListener('click', () => {
    chosenTime = speed.three;
});
onFive.addEventListener('click', () => {
    chosenTime = speed.five;
});
onTen.addEventListener('click', () => {
    chosenTime = speed.ten;
});

// startGame();

function startGame() {
    resetGame();
    showRandomWords(wordsData, numOfWords);
    insertedWord.addEventListener('input', correctCheck);
    timerInterval = setInterval(timer, 1000);
}

function correctCheck() {
    displayResults.style.display = 'none';
    if (isEqual()) {
        score += 2;
        keepGame();
    } else if (isPalindromeEqual()) {
        score += 3;
        keepGame();
    } else if (isAnagramEqual()) {
        score++;
        keepGame();
    }
}

function timer() {
    time--;
    displayTimeLeft.innerHTML = time;
    if (time === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function showRandomWords(wordsData, num) {
    let words = '';
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * wordsData.length);
        words += `${wordsData[randomIndex]} `;
    }
    displayWord.innerHTML = words.trim();
}

function keepGame() {
    displayResults.innerHTML = 'Correct!';
    displayResults.style.display = 'block';
    displayScore.innerHTML = score;
    insertedWord.value = '';
    if (version === 'Pro') {
        numOfWords++;
        extraTime += 3;
    }
    showRandomWords(wordsData, numOfWords);
    resetTime();
}

function isEqual() {
    if (insertedWord.value.trim().toLowerCase() === displayWord.innerHTML) {
        insertedArr.push(displayWord.innerHTML);
        return true;
    }
    return false;
}

function isPalindromeEqual() {
    const reversedWord = insertedWord.value.trim().toLowerCase().split('').reverse().join('');
    if (reversedWord === displayWord.innerHTML) {
        insertedArr.push(displayWord.innerHTML);
        return true;
    }
    return false;
}

function isAnagramEqual() {
    const arr1 = insertedWord.value.trim().toLowerCase();
    const arr2 = displayWord.innerHTML;
    if (arr1.length !== arr2.length) {
        return false;
    }
    const charsObj1 = {};
    const charsObj2 = {};
    for (let char of arr1) {
        charsObj1[char] = (charsObj1[char] || 0) + 1;
    }
    for (let char of arr2) {
        charsObj2[char] = (charsObj2[char] || 0) + 1;
    }

    for (let key in charsObj1) {
        if (!(charsObj2[key] && charsObj1[key] === charsObj2[key])) {
            return false;
        }
    }
    insertedArr.push(displayWord.innerHTML);
    return true;
}