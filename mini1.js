document.addEventListener('DOMContentLoaded', function() {
    
    
    const screens = {
        start: document.getElementById('startScreen'),
        quiz: document.getElementById('quizScreen'),
        result: document.getElementById('resultScreen')
    };
    
    const startBtn = document.getElementById('startTest');
    const nextBtn = document.getElementById('nextQuestion');
    const questionText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    const questionCounter = document.getElementById('questionCounter');
    const progressCircle = document.getElementById('progressCircle');
    const liveScore = document.querySelector('#liveScore span');
    const resultBadge = document.getElementById('resultBadge');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const finalScorePercent = document.getElementById('finalScorePercent');
    const correctCount = document.getElementById('correctCount');
    const totalQuestions = document.getElementById('totalQuestions');
    const reviewList = document.getElementById('reviewList');
    const shareBtn = document.getElementById('shareResults');

    const questions = [
        {
            text: "🧠 What do you do when you see a math problem?",
            options: [
                { text: "Try to solve it immediately", emoji: "🧮", value: 1 },
                { text: "Use a calculator", emoji: "📱", value: 1 },
                { text: "Skip and move on", emoji: "⏭️", value: 0 },
                { text: "Ask someone for help", emoji: "🙋", value: 0 }
            ],
            fact: "Humans have been doing math for over 20,000 years!"
        },
        {
            text: "😴 How do you feel after staying up late?",
            options: [
                { text: "Very tired next day", emoji: "😫", value: 1 },
                { text: "A bit groggy", emoji: "😵", value: 1 },
                { text: "Perfectly fine", emoji: "⚡", value: 0 },
                { text: "I don't sleep", emoji: "👻", value: 0 }
            ],
            fact: "Sleep is essential for human brain function and memory."
        },
        {
            text: "🎵 What's your relationship with music?",
            options: [
                { text: "Can't live without it", emoji: "🎶", value: 1 },
                { text: "Enjoy sometimes", emoji: "🎧", value: 1 },
                { text: "Don't care much", emoji: "🔇", value: 0 },
                { text: "Music is confusing", emoji: "🤖", value: 0 }
            ],
            fact: "Music activates every area of the human brain!"
        },
        {
            text: "🤔 When someone tells a joke, you...",
            options: [
                { text: "Laugh naturally", emoji: "😂", value: 1 },
                { text: "Smile politely", emoji: "😊", value: 1 },
                { text: "Don't get it", emoji: "😕", value: 0 },
                { text: "Analyze the logic", emoji: "🤓", value: 0 }
            ],
            fact: "Laughter releases endorphins - the feel-good chemicals!"
        },
        {
            text: "🍕 What's your reaction to your favorite food?",
            options: [
                { text: "Get excited!", emoji: "🎉", value: 1 },
                { text: "Enjoy it calmly", emoji: "😋", value: 1 },
                { text: "Eat without emotion", emoji: "😐", value: 0 },
                { text: "Food is fuel only", emoji: "⚙️", value: 0 }
            ],
            fact: "Humans have about 10,000 taste buds!"
        },
        {
            text: " How do you feel when you see a beautiful sunset?",
            options: [
                { text: "Peaceful and happy", emoji: "😌", value: 1 },
                { text: "Take a photo", emoji: "📸", value: 1 },
                { text: "Don't notice it", emoji: "🙈", value: 0 },
                { text: "Analyze the colors", emoji: "🔬", value: 0 }
            ],
            fact: "Sunsets look colorful because of how human eyes perceive light!"
        },
        {
            text: "🧪 Quick logic: What comes next? 2, 4, 8, ?",
            options: [
                { text: "16 ", value: 1 },
                { text: "10", value: 0 },
                { text: "12" , value: 0 },
                { text: "14", value: 0 }
            ],
            fact: "Pattern recognition is a key human intelligence trait!"
        }
    ];

    
    let currentIndex = 0;
    let score = 0;
    let answers = [];
    let selectedOption = null;

    totalQuestions.textContent = questions.length;

    startBtn.addEventListener('click', function() {
        screens.start.classList.remove('active');
        screens.quiz.classList.add('active');
        loadQuestion(0);
    });

    function loadQuestion(index) {
        const q = questions[index];
        questionText.textContent = q.text;
        questionCounter.textContent = `${index + 1}/${questions.length}`;
        
        const progress = ((index) / questions.length) * 100;
        const circumference = 163.36;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        optionsGrid.innerHTML = '';
        selectedOption = null;
        nextBtn.disabled = true;
        
        q.options.forEach((opt, i) => {
            const card = document.createElement('div');
            card.className = 'option-card';
            card.innerHTML = `
                <span class="option-emoji">${opt.emoji}</span>
                <span class="option-text">${opt.text}</span>
            `;
            
            card.addEventListener('click', () => selectOption(opt, card));
            
            card.style.animation = `fadeIn 0.3s ease ${i * 0.1}s both`;
            optionsGrid.appendChild(card);
        });
    }

   
    function selectOption(option, element) {
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        element.classList.add('selected');
        selectedOption = option;
        nextBtn.disabled = false;
        
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }
    nextBtn.addEventListener('click', function() {
        if (!selectedOption) return;
        score += selectedOption.value;
        liveScore.textContent = score;
        
        answers.push({
            question: questions[currentIndex].text,
            answer: selectedOption.text,
            correct: selectedOption.value === 1,
            fact: questions[currentIndex].fact,
            emoji: selectedOption.emoji
        });
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion(currentIndex);
        } else {
            progressCircle.style.strokeDashoffset = 0;
            showResults();
        }
    });
    function showResults() {
        screens.quiz.classList.remove('active');
        screens.result.classList.add('active');
        const percentage = Math.round((score / questions.length) * 100);
        let result;
        if (percentage >= 70) {
            result = {
                badge: '🧬 PURE HUMAN',
                title: 'You are Human! 🎉',
                desc: 'Congratulations! Your responses show strong human patterns.',
                color: 'linear-gradient(135deg, var(--coral), var(--turquoise))'
            };
        } else if (percentage >= 40) {
            result = {
                badge: '⚡ HYBRID',
                title: 'Half Human, Half Robot',
                desc: 'You have a beautiful mix of human emotions and logical thinking!',
                color: 'linear-gradient(135deg, var(--yellow), var(--coral))'
            };
        } else {
            result = {
                badge: '🤖 ROBOT',
                title: 'Robot Detected!',
                desc: 'Beep boop! Your answers suggest you might be running on code.',
                color: 'linear-gradient(135deg, var(--gray), var(--dark))'
            };
        }
      
        resultBadge.textContent = result.badge;
        resultBadge.style.background = result.color;
        resultTitle.textContent = result.title;
        resultDescription.textContent = result.desc;
        finalScorePercent.textContent = percentage + '%';
        correctCount.textContent = score;
        showReview();
    }

    function showReview() {
        reviewList.innerHTML = '';
        
        answers.forEach((ans, index) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="review-icon ${ans.correct ? 'correct' : 'incorrect'}">
                    <i class="fas ${ans.correct ? 'fa-check' : 'fa-times'}"></i>
                </div>
                <div class="review-content">
                    <div class="review-question">Q${index + 1}: ${ans.emoji} ${ans.question.substring(0, 30)}...</div>
                    <div class="review-answer">Your answer: ${ans.answer}</div>
                </div>
                <div class="review-points ${ans.correct ? 'correct' : 'incorrect'}">
                    ${ans.correct ? '+1' : '0'}
                </div>
            `;
            reviewList.appendChild(item);
        });
        const factDiv = document.createElement('div');
        factDiv.style.background = 'var(--light)';
        factDiv.style.padding = '15px';
        factDiv.style.borderRadius = '15px';
        factDiv.style.marginTop = '15px';
        factDiv.style.borderLeft = '4px solid var(--coral)';
        
        const randomFact = answers[Math.floor(Math.random() * answers.length)].fact;
        factDiv.innerHTML = `
            <i class="fas fa-lightbulb" style="color: var(--yellow); margin-right: 8px;"></i>
            <strong>Fun Fact:</strong> ${randomFact}
        `;
        
        reviewList.appendChild(factDiv);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const percent = finalScorePercent.textContent;
            const type = resultBadge.textContent;
            
            const shareText = `I got ${percent} on the Human Test and I'm ${type}! 🎯 Can you beat my score?`;
            
            if (navigator.share) {
                navigator.share({
                    title: 'My Human Test Result',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('✨ Result copied to clipboard! Share with friends!');
                });
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (screens.quiz.classList.contains('active')) {
            if (e.key === 'Enter' && !nextBtn.disabled) {
                nextBtn.click();
            }
            
            if (e.key >= '1' && e.key <= '4') {
                const index = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.option-card');
                if (options[index]) {
                    options[index].click();
                }
            }
        }
    });

});
