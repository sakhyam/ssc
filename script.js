// Subscription, user and application state
const TRIAL_DAYS = 30;
const MONTHLY_FEE_TAKA = 100;
const SUBSCRIPTION_KEY = 'sscPrepSubscription';
const USERS_KEY = 'sscPrepUsers';
const CURRENT_USER_KEY = 'sscPrepCurrentUser';

let subscriptionState = {
    startDate: null,     // ISO string
    isPaid: false
};

let currentUser = null; // { id, identifier }

let currentState = {
    selectedExam: null,
    selectedTopic: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    startTime: null,
    timerInterval: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initAuth();
    initSubscription();
    loadTopics();
    setupEventListeners();

    // Decide initial screen
    if (currentUser) {
        showScreen('homeScreen');
    } else {
        showScreen('authScreen');
    }
}

// ---------- AUTH (LOGIN / SIGN UP) ----------
function initAuth() {
    // Load current user from storage
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch {
            currentUser = null;
        }
    }
}

function getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
    currentUser = { id: user.id, identifier: user.identifier };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}

function ensureAuthenticated() {
    if (currentUser) return true;
    alert('Please log in or create an account with your Gmail or mobile number first.');
    showScreen('authScreen');
    return false;
}

function initSubscription() {
    const saved = localStorage.getItem(SUBSCRIPTION_KEY);
    if (saved) {
        try {
            subscriptionState = JSON.parse(saved);
        } catch {
            subscriptionState = { startDate: null, isPaid: false };
        }
    }

    // If first visit, start free trial
    if (!subscriptionState.startDate) {
        subscriptionState.startDate = new Date().toISOString();
        subscriptionState.isPaid = false;
        persistSubscription();
    }

    updateSubscriptionUI();
}

function persistSubscription() {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptionState));
}

function getTrialInfo() {
    const start = new Date(subscriptionState.startDate);
    const now = new Date();
    const diffMs = now - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, TRIAL_DAYS - diffDays);
    const isTrialActive = daysLeft > 0;
    const isAccessActive = subscriptionState.isPaid || isTrialActive;

    return { diffDays, daysLeft, isTrialActive, isAccessActive };
}

function updateSubscriptionUI() {
    const statusEl = document.getElementById('subscriptionStatus');
    if (!statusEl) return;

    const { daysLeft, isTrialActive, isAccessActive } = getTrialInfo();

    statusEl.classList.remove('active-trial', 'expired', 'paid');

    if (subscriptionState.isPaid) {
        statusEl.textContent = `Access: Active (Paid subscriber – 100 taka/month).`;
        statusEl.classList.add('paid');
    } else if (isTrialActive) {
        statusEl.textContent = `Free trial active: ${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining.`;
        statusEl.classList.add('active-trial');
    } else {
        statusEl.textContent = `Free trial expired. Please pay 100 taka per month to continue using all tests.`;
        statusEl.classList.add('expired');
    }

    const markPaidBtn = document.getElementById('markPaidBtn');
    if (markPaidBtn) {
        markPaidBtn.disabled = subscriptionState.isPaid;
        if (subscriptionState.isPaid) {
            markPaidBtn.textContent = 'Payment confirmed';
        } else {
            markPaidBtn.textContent = 'I have paid 100 taka';
        }
    }
}

function ensureAccessAllowed() {
    const { isAccessActive, isTrialActive } = getTrialInfo();
    if (isAccessActive) return true;

    let message = 'Your free 1-month trial has ended. Please pay 100 taka per month to continue practicing.';
    alert(message);
    return false;
}

function loadTopics() {
    const topicsGrid = document.getElementById('topicsGrid');
    topicsGrid.innerHTML = '';
    
    const allTopics = Object.keys(questionsData);
    
    allTopics.forEach(topic => {
        const topicCard = document.createElement('button');
        topicCard.className = 'topic-card';
        topicCard.textContent = topic;
        
        // Add category class for styling
        if (topicCategories.reasoning.includes(topic)) {
            topicCard.classList.add('reasoning');
        } else if (topicCategories.gk.includes(topic)) {
            topicCard.classList.add('gk');
        } else if (topicCategories.math.includes(topic)) {
            topicCard.classList.add('math');
        } else if (topicCategories.english.includes(topic)) {
            topicCard.classList.add('english');
        }
        
        topicCard.addEventListener('click', () => selectTopic(topic));
        topicsGrid.appendChild(topicCard);
    });
}

function setupEventListeners() {
    // Auth tabs
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginTab && registerTab && loginForm && registerForm) {
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });

        registerTab.addEventListener('click', function() {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const identifier = document.getElementById('loginIdentifier').value.trim();
            const password = document.getElementById('loginPassword').value;

            const users = getUsers();
            const user = users.find(u => u.identifier.toLowerCase() === identifier.toLowerCase() && u.password === password);

            if (!user) {
                alert('Invalid Gmail/number or password.');
                return;
            }

            setCurrentUser(user);
            alert('Logged in successfully.');
            showScreen('homeScreen');
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const identifier = document.getElementById('registerIdentifier').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerPasswordConfirm').value;

            if (!identifier) {
                alert('Please enter your Gmail address or mobile number.');
                return;
            }

            if (password.length < 4) {
                alert('Password must be at least 4 characters.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            const users = getUsers();
            const exists = users.some(u => u.identifier.toLowerCase() === identifier.toLowerCase());
            if (exists) {
                alert('An account with this Gmail/number already exists. Please log in instead.');
                return;
            }

            const newUser = {
                id: Date.now(),
                identifier,
                password
            };
            users.push(newUser);
            saveUsers(users);
            setCurrentUser(newUser);
            alert('Account created successfully. You are now logged in.');
            showScreen('homeScreen');
        });
    }

    // Exam type buttons
    document.querySelectorAll('.exam-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.exam-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentState.selectedExam = this.dataset.exam;
        });
    });
    
    // Mark as paid (manual confirmation)
    const markPaidBtn = document.getElementById('markPaidBtn');
    if (markPaidBtn) {
        markPaidBtn.addEventListener('click', () => {
            if (subscriptionState.isPaid) return;
            const confirmPaid = confirm('Confirm that you have paid 100 taka for this month?');
            if (confirmPaid) {
                subscriptionState.isPaid = true;
                persistSubscription();
                updateSubscriptionUI();
                alert('Thank you! Your access is now unlocked.');
            }
        });
    }

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', showPreviousQuestion);
    document.getElementById('nextBtn').addEventListener('click', showNextQuestion);
    document.getElementById('submitBtn').addEventListener('click', submitTest);
    document.getElementById('retakeBtn').addEventListener('click', resetToHome);
    document.getElementById('homeBtn').addEventListener('click', resetToHome);
}

function selectTopic(topic) {
    if (!ensureAuthenticated()) {
        return;
    }

    if (!ensureAccessAllowed()) {
        return;
    }

    if (!currentState.selectedExam) {
        alert('Please select an exam type first!');
        return;
    }
    
    currentState.selectedTopic = topic;
    currentState.questions = [...questionsData[topic]];
    
    // Shuffle questions and select 10 random ones
    shuffleArray(currentState.questions);
    currentState.questions = currentState.questions.slice(0, Math.min(10, currentState.questions.length));
    
    // Initialize answers object
    currentState.answers = {};
    currentState.currentQuestionIndex = 0;
    currentState.startTime = Date.now();
    
    // Start timer
    startTimer();
    
    // Show quiz screen
    showScreen('quizScreen');
    displayQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Update header info
    if (screenId === 'quizScreen') {
        document.getElementById('currentTopic').textContent = currentState.selectedTopic;
        document.getElementById('currentExam').textContent = `SSC ${currentState.selectedExam}`;
        document.getElementById('totalQuestions').textContent = currentState.questions.length;
    }
}

function displayQuestion() {
    const question = currentState.questions[currentState.currentQuestionIndex];
    const questionNumber = currentState.currentQuestionIndex + 1;
    const totalQuestions = currentState.questions.length;
    
    // Update question number
    document.getElementById('questionNumber').textContent = questionNumber;
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('button');
        optionDiv.className = 'option';
        optionDiv.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        
        // Check if this option was previously selected
        if (currentState.answers[currentState.currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentState.currentQuestionIndex === 0;
    
    if (currentState.currentQuestionIndex === totalQuestions - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
    
    // Update progress bar
    const progress = ((currentState.currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function selectOption(optionIndex) {
    currentState.answers[currentState.currentQuestionIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === optionIndex) {
            opt.classList.add('selected');
        }
    });
}

function showPreviousQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        displayQuestion();
    }
}

function showNextQuestion() {
    if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
        currentState.currentQuestionIndex++;
        displayQuestion();
    }
}

function startTimer() {
    if (currentState.timerInterval) {
        clearInterval(currentState.timerInterval);
    }
    
    currentState.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentState.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function submitTest() {
    clearInterval(currentState.timerInterval);
    
    // Calculate results
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    currentState.questions.forEach((question, index) => {
        if (currentState.answers[index] === undefined) {
            unanswered++;
        } else if (currentState.answers[index] === question.correct) {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    const totalQuestions = currentState.questions.length;
    const score = Math.round((correct / totalQuestions) * 100);
    const timeTaken = Math.floor((Date.now() - currentState.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    
    // Display results
    document.getElementById('finalScore').textContent = score;
    document.getElementById('totalQ').textContent = totalQuestions;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('unansweredCount').textContent = unanswered;
    document.getElementById('timeTaken').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Display review
    displayReview(correct, incorrect);
    
    // Show results screen
    showScreen('resultsScreen');
}

function displayReview(correct, incorrect) {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    currentState.questions.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        const userAnswer = currentState.answers[index];
        const isCorrect = userAnswer === question.correct;
        
        reviewItem.className = 'review-item';
        if (isCorrect) {
            reviewItem.classList.add('correct-review');
        } else {
            reviewItem.classList.add('incorrect-review');
        }
        
        let reviewHTML = `
            <div class="review-question">Q${index + 1}. ${question.question}</div>
        `;
        
        if (userAnswer === undefined) {
            reviewHTML += `<div class="review-answer"><span class="review-label">Your Answer:</span> Not answered</div>`;
        } else {
            reviewHTML += `<div class="review-answer"><span class="review-label">Your Answer:</span> ${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}</div>`;
        }
        
        reviewHTML += `
            <div class="review-answer"><span class="review-label">Correct Answer:</span> ${String.fromCharCode(65 + question.correct)}. ${question.options[question.correct]}</div>
            <div class="review-answer"><span class="review-label">Explanation:</span> ${question.explanation}</div>
        `;
        
        reviewItem.innerHTML = reviewHTML;
        reviewContainer.appendChild(reviewItem);
    });
}

function resetToHome() {
    // Clear timer
    if (currentState.timerInterval) {
        clearInterval(currentState.timerInterval);
    }
    
    // Reset state
    currentState = {
        selectedExam: null,
        selectedTopic: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: {},
        startTime: null,
        timerInterval: null
    };
    
    // Reset UI
    document.querySelectorAll('.exam-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('submitBtn').style.display = 'none';
    
    // Show home screen
    showScreen('homeScreen');
}
