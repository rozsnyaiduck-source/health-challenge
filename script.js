const questions = [
    { q: "How many servings of vegetables do you eat daily?", options: ["0", "1-2", "3+"], points: [0, 10, 20] },
    { q: "How often do you consume added sugar?", options: ["Every meal", "Once a day", "Rarely"], points: [0, 8, 15] },
    { q: "Rate your sleep quality (1-10):", options: ["1-4 (Poor)", "5-7 (Average)", "8-10 (Elite)"], points: [0, 10, 20] },
    { q: "How many hours do you exercise per week?", options: ["0", "1-3", "4+"], points: [0, 10, 15] },
    { q: "Caffeine intake per day:", options: ["4+ cups", "1-2 cups", "None"], points: [5, 15, 10] },
    { q: "Processed food frequency:", options: ["Daily", "Weekly", "Rarely"], points: [0, 8, 15] }
];

let currentStep = 0;
let totalScore = 0;

function startQuiz() {
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentStep];
    document.getElementById('question-text').innerText = q.q;
    const optionsDiv = document.getElementById('answer-options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn-main';
        btn.style.width = '100%';
        btn.style.marginTop = '10px';
        btn.onclick = () => nextQuestion(q.points[index]);
        optionsDiv.appendChild(btn);
    });

    const progress = ((currentStep) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function nextQuestion(pts) {
    totalScore += pts;
    currentStep++;
    if (currentStep < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resCon = document.getElementById('result-container');
    resCon.classList.remove('hidden');
    
    // Scale score to 100
    const finalScore = Math.min(totalScore, 100);
    document.getElementById('score-num').innerText = finalScore;

    let msg = "";
    if (finalScore >= 80) msg = "Your body is functioning well, but small changes could improve long-term health.";
    else if (finalScore >= 50) msg = "Some systems may be under stress.";
    else msg = "Your body may need better nutrition and lifestyle habits.";
    
    document.getElementById('result-msg').innerText = msg;
}