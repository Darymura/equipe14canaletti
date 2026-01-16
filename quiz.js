/**
 * Quiz RSE - Script principal
 * Mutuelle de Corse - Évaluation de maturité RSE basée sur ISO 26000
 */

// Quiz Data - Questions organisées par catégorie ISO 26000
const quizData = {
    categories: [
        {
            id: 'gouvernance',
            name: 'Gouvernance',
            icon: '⚖️',
            color: '#1175A4',
            questions: [
                {
                    id: 1,
                    text: "Votre entreprise dispose-t-elle d'une vision/mission formalisée incluant des engagements responsables ?",
                    options: [
                        { value: 0, label: "Non, nous n'avons pas de vision formalisée" },
                        { value: 1, label: "Nous avons une vision mais sans dimension RSE" },
                        { value: 2, label: "Notre vision inclut quelques engagements responsables" },
                        { value: 3, label: "Notre vision intègre pleinement la RSE et guide nos décisions" }
                    ]
                },
                {
                    id: 2,
                    text: "Comment les décisions stratégiques intègrent-elles les enjeux sociaux et environnementaux ?",
                    options: [
                        { value: 0, label: "Ces enjeux ne sont pas considérés" },
                        { value: 1, label: "Ponctuellement, quand le sujet est soulevé" },
                        { value: 2, label: "Régulièrement, avec une attention croissante" },
                        { value: 3, label: "Systématiquement, via un processus formalisé" }
                    ]
                },
                {
                    id: 3,
                    text: "Existe-t-il une personne ou une équipe en charge des sujets RSE ?",
                    options: [
                        { value: 0, label: "Non, personne n'est désigné" },
                        { value: 1, label: "Le dirigeant s'en occupe occasionnellement" },
                        { value: 2, label: "Un collaborateur a cette mission en plus de ses fonctions" },
                        { value: 3, label: "Une personne/équipe dédiée pilote la démarche RSE" }
                    ]
                }
            ]
        },
        {
            id: 'droits-humains',
            name: 'Droits de l\'Homme',
            icon: '🛡️',
            color: '#E40A7E',
            questions: [
                {
                    id: 4,
                    text: "Vérifiez-vous les pratiques sociales de vos fournisseurs ?",
                    options: [
                        { value: 0, label: "Non, nous ne vérifions pas" },
                        { value: 1, label: "Uniquement pour les fournisseurs principaux" },
                        { value: 2, label: "Nous avons une charte que les fournisseurs signent" },
                        { value: 3, label: "Nous auditons régulièrement nos fournisseurs" }
                    ]
                },
                {
                    id: 5,
                    text: "Avez-vous des dispositifs pour prévenir les discriminations à l'embauche et dans l'entreprise ?",
                    options: [
                        { value: 0, label: "Non, pas de dispositif particulier" },
                        { value: 1, label: "Nous appliquons la loi sans dispositif spécifique" },
                        { value: 2, label: "Nous avons sensibilisé les recruteurs" },
                        { value: 3, label: "Nous avons une politique complète anti-discrimination" }
                    ]
                },
                {
                    id: 6,
                    text: "Existe-t-il un canal pour signaler des situations problématiques (harcèlement, discrimination) ?",
                    options: [
                        { value: 0, label: "Non, aucun canal dédié" },
                        { value: 1, label: "Les salariés peuvent en parler à leur manager" },
                        { value: 2, label: "Un référent est identifié pour ces sujets" },
                        { value: 3, label: "Un dispositif d'alerte anonyme est en place" }
                    ]
                }
            ]
        },
        {
            id: 'conditions-travail',
            name: 'Conditions de travail',
            icon: '👔',
            color: '#f59e0b',
            questions: [
                {
                    id: 7,
                    text: "Comment évaluez-vous le bien-être de vos collaborateurs ?",
                    options: [
                        { value: 0, label: "Nous n'avons pas de démarche particulière" },
                        { value: 1, label: "Via des échanges informels" },
                        { value: 2, label: "Nous réalisons des enquêtes occasionnelles" },
                        { value: 3, label: "Enquêtes régulières avec plans d'action" }
                    ]
                },
                {
                    id: 8,
                    text: "Quelle est votre politique de formation et développement des compétences ?",
                    options: [
                        { value: 0, label: "Formations uniquement obligatoires" },
                        { value: 1, label: "Formations ponctuelles selon les besoins" },
                        { value: 2, label: "Plan de formation annuel pour tous" },
                        { value: 3, label: "Politique ambitieuse avec parcours individualisés" }
                    ]
                },
                {
                    id: 9,
                    text: "Comment gérez-vous la santé et la sécurité au travail ?",
                    options: [
                        { value: 0, label: "Minimum légal uniquement" },
                        { value: 1, label: "Document unique à jour, pas d'actions particulières" },
                        { value: 2, label: "Actions de prévention régulières" },
                        { value: 3, label: "Politique proactive, indicateurs suivis, amélioration continue" }
                    ]
                }
            ]
        },
        {
            id: 'environnement',
            name: 'Environnement',
            icon: '🌿',
            color: '#20B37E',
            questions: [
                {
                    id: 10,
                    text: "Avez-vous mesuré l'empreinte carbone de votre activité ?",
                    options: [
                        { value: 0, label: "Non, jamais" },
                        { value: 1, label: "Nous avons une idée approximative" },
                        { value: 2, label: "Bilan carbone simplifié réalisé" },
                        { value: 3, label: "Bilan carbone complet avec plan de réduction" }
                    ]
                },
                {
                    id: 11,
                    text: "Quelles actions menez-vous pour réduire vos déchets ?",
                    options: [
                        { value: 0, label: "Pas d'action particulière" },
                        { value: 1, label: "Tri sélectif de base" },
                        { value: 2, label: "Tri + actions de réduction à la source" },
                        { value: 3, label: "Démarche zéro déchet avec économie circulaire" }
                    ]
                },
                {
                    id: 12,
                    text: "Comment gérez-vous votre consommation d'énergie ?",
                    options: [
                        { value: 0, label: "Nous ne suivons pas particulièrement" },
                        { value: 1, label: "Suivi des factures sans actions spécifiques" },
                        { value: 2, label: "Actions de sobriété et équipements économes" },
                        { value: 3, label: "Audit énergétique réalisé, énergies renouvelables utilisées" }
                    ]
                }
            ]
        },
        {
            id: 'loyaute-pratiques',
            name: 'Loyauté des pratiques',
            icon: '🏢',
            color: '#1175A4',
            questions: [
                {
                    id: 13,
                    text: "Disposez-vous d'une charte éthique ou d'un code de conduite ?",
                    options: [
                        { value: 0, label: "Non" },
                        { value: 1, label: "Quelques règles informelles" },
                        { value: 2, label: "Charte existante mais peu communiquée" },
                        { value: 3, label: "Charte diffusée à tous, régulièrement mise à jour" }
                    ]
                },
                {
                    id: 14,
                    text: "Comment sélectionnez-vous vos fournisseurs ?",
                    options: [
                        { value: 0, label: "Principalement sur le prix" },
                        { value: 1, label: "Prix et qualité" },
                        { value: 2, label: "Prix, qualité et quelques critères RSE" },
                        { value: 3, label: "Grille multicritères incluant RSE, achats responsables" }
                    ]
                },
                {
                    id: 15,
                    text: "Vos pratiques commerciales incluent-elles des engagements de transparence ?",
                    options: [
                        { value: 0, label: "Pas particulièrement" },
                        { value: 1, label: "Nous respectons la réglementation" },
                        { value: 2, label: "Nous communiquons sur nos produits/services de manière transparente" },
                        { value: 3, label: "Transparence totale : origine, composition, impacts" }
                    ]
                }
            ]
        },
        {
            id: 'consommateurs',
            name: 'Questions consommateurs',
            icon: '🛒',
            color: '#E40A7E',
            questions: [
                {
                    id: 16,
                    text: "Comment informez-vous vos clients sur les caractéristiques de vos produits/services ?",
                    options: [
                        { value: 0, label: "Information minimale légale" },
                        { value: 1, label: "Information standard du secteur" },
                        { value: 2, label: "Information détaillée et accessible" },
                        { value: 3, label: "Information complète incluant impacts environnementaux et sociaux" }
                    ]
                },
                {
                    id: 17,
                    text: "Proposez-vous des alternatives durables à vos clients ?",
                    options: [
                        { value: 0, label: "Non, pas notre priorité" },
                        { value: 1, label: "Quelques produits/services écoresponsables" },
                        { value: 2, label: "Gamme significative d'alternatives durables" },
                        { value: 3, label: "L'ensemble de notre offre intègre des critères durables" }
                    ]
                },
                {
                    id: 18,
                    text: "Comment gérez-vous les réclamations et le service après-vente ?",
                    options: [
                        { value: 0, label: "Minimum légal (garanties)" },
                        { value: 1, label: "Traitement au cas par cas" },
                        { value: 2, label: "Processus structuré de traitement des réclamations" },
                        { value: 3, label: "Politique client avancée : écoute, médiation, amélioration continue" }
                    ]
                }
            ]
        },
        {
            id: 'communautes',
            name: 'Communautés locales',
            icon: '🏘️',
            color: '#20B37E',
            questions: [
                {
                    id: 19,
                    text: "Quelle est la part de vos achats réalisés localement (en Corse) ?",
                    options: [
                        { value: 0, label: "Très faible (< 10%)" },
                        { value: 1, label: "Modérée (10-30%)" },
                        { value: 2, label: "Significative (30-60%)" },
                        { value: 3, label: "Majoritaire (> 60%)" }
                    ]
                },
                {
                    id: 20,
                    text: "Participez-vous à des initiatives locales (associations, événements, mécénat) ?",
                    options: [
                        { value: 0, label: "Non, pas d'engagement" },
                        { value: 1, label: "Ponctuellement, sur sollicitation" },
                        { value: 2, label: "Plusieurs partenariats actifs" },
                        { value: 3, label: "Politique structurée d'engagement territorial" }
                    ]
                },
                {
                    id: 21,
                    text: "Favorisez-vous l'emploi local et l'insertion professionnelle ?",
                    options: [
                        { value: 0, label: "Pas de politique particulière" },
                        { value: 1, label: "Nous recrutons localement quand possible" },
                        { value: 2, label: "Priorité à l'emploi local, accueil de stagiaires" },
                        { value: 3, label: "Politique active : alternance, insertion, partenariats écoles" }
                    ]
                }
            ]
        }
    ]
};

// Recommendations database
const recommendationsDB = {
    gouvernance: {
        low: [
            "Formalisez votre vision d'entreprise en y intégrant des engagements RSE",
            "Désignez un référent RSE, même à temps partiel",
            "Incluez un point RSE dans vos réunions de direction mensuelles"
        ],
        medium: [
            "Définissez des objectifs RSE mesurables et suivez-les régulièrement",
            "Formez votre équipe de direction aux enjeux RSE",
            "Créez un comité de pilotage RSE incluant différentes parties prenantes"
        ],
        high: [
            "Intégrez la RSE dans votre stratégie long terme",
            "Publiez un rapport RSE annuel pour renforcer votre transparence",
            "Visez une labellisation ou évaluation externe de votre démarche"
        ]
    },
    'droits-humains': {
        low: [
            "Sensibilisez vos équipes aux discriminations et au harcèlement",
            "Mettez en place un canal de signalement simple",
            "Formalisez vos critères de recrutement objectifs"
        ],
        medium: [
            "Auditez vos pratiques RH sous l'angle de la non-discrimination",
            "Intégrez des clauses sociales dans vos contrats fournisseurs",
            "Formez vos managers aux biais inconscients"
        ],
        high: [
            "Déployez un dispositif d'alerte éthique complet",
            "Réalisez des audits sociaux de votre chaîne de valeur",
            "Publiez votre politique de vigilance"
        ]
    },
    'conditions-travail': {
        low: [
            "Réalisez une enquête simple sur le bien-être au travail",
            "Mettez à jour votre Document Unique d'Évaluation des Risques",
            "Proposez un entretien annuel à chaque collaborateur"
        ],
        medium: [
            "Développez un plan de formation ambitieux",
            "Améliorez la flexibilité du travail (télétravail, horaires)",
            "Créez des espaces d'expression pour les salariés"
        ],
        high: [
            "Visez un label QVT ou Great Place to Work",
            "Mettez en place un baromètre social régulier",
            "Développez des parcours de carrière personnalisés"
        ]
    },
    environnement: {
        low: [
            "Réalisez un premier bilan carbone simplifié (outils gratuits disponibles)",
            "Mettez en place le tri sélectif et sensibilisez les équipes",
            "Identifiez vos principaux postes de consommation d'énergie"
        ],
        medium: [
            "Définissez un plan de réduction de votre empreinte carbone",
            "Engagez une démarche de réduction des déchets à la source",
            "Étudiez le passage aux énergies renouvelables"
        ],
        high: [
            "Visez la certification ISO 14001 ou équivalent",
            "Développez une stratégie d'économie circulaire",
            "Engagez-vous dans une trajectoire Net Zero"
        ]
    },
    'loyaute-pratiques': {
        low: [
            "Rédigez une charte éthique simple et diffusez-la",
            "Intégrez au moins un critère RSE dans vos appels d'offres",
            "Formez les commerciaux à la vente responsable"
        ],
        medium: [
            "Développez une politique d'achats responsables",
            "Mettez en place un processus de due diligence fournisseurs",
            "Créez une charte fournisseurs incluant des critères RSE"
        ],
        high: [
            "Faites certifier votre démarche achats responsables",
            "Accompagnez vos fournisseurs dans leur transition RSE",
            "Publiez votre politique anti-corruption"
        ]
    },
    consommateurs: {
        low: [
            "Améliorez l'information sur vos produits/services",
            "Créez un processus simple de traitement des réclamations",
            "Identifiez une alternative durable à proposer"
        ],
        medium: [
            "Développez une gamme de produits/services écoresponsables",
            "Mettez en place un suivi de satisfaction client",
            "Communiquez sur les impacts de vos produits"
        ],
        high: [
            "Éco-concevez l'ensemble de votre offre",
            "Proposez des services d'économie de la fonctionnalité",
            "Impliquez vos clients dans votre démarche RSE"
        ]
    },
    communautes: {
        low: [
            "Identifiez les fournisseurs locaux pour vos achats principaux",
            "Participez à au moins un événement local par an",
            "Accueillez des stagiaires d'écoles corses"
        ],
        medium: [
            "Développez une politique d'achats locaux avec objectifs",
            "Créez des partenariats durables avec des associations",
            "Proposez des contrats d'alternance"
        ],
        high: [
            "Devenez acteur du développement territorial",
            "Créez un fonds de dotation ou mécénat structuré",
            "Participez aux instances de dialogue territorial"
        ]
    }
};

// State
let currentQuestion = 0;
let answers = {};
let companyInfo = {};

// DOM Elements
const quizIntro = document.getElementById('quiz-intro');
const quizQuestions = document.getElementById('quiz-questions');
const quizResults = document.getElementById('quiz-results');
const companyForm = document.getElementById('company-form');
const questionContainer = document.getElementById('question-container');
const progressFill = document.getElementById('progress-fill');
const currentQuestionEl = document.getElementById('current-question');
const progressCategory = document.getElementById('progress-category');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnSubmit = document.getElementById('btn-submit');

// Get all questions flattened
function getAllQuestions() {
    return quizData.categories.flatMap(cat => 
        cat.questions.map(q => ({ ...q, category: cat }))
    );
}

const allQuestions = getAllQuestions();

// Initialize
function init() {
    companyForm.addEventListener('submit', handleCompanyFormSubmit);
    btnPrev.addEventListener('click', () => navigateQuestion(-1));
    btnNext.addEventListener('click', () => navigateQuestion(1));
    btnSubmit.addEventListener('click', submitQuiz);
    document.getElementById('btn-restart')?.addEventListener('click', restartQuiz);
    document.getElementById('btn-download-pdf')?.addEventListener('click', downloadPDF);
    document.getElementById('btn-share')?.addEventListener('click', shareResults);
}

// Handle company form submission
function handleCompanyFormSubmit(e) {
    e.preventDefault();
    
    companyInfo = {
        name: document.getElementById('company-name').value,
        sector: document.getElementById('company-sector').value,
        sectorLabel: document.getElementById('company-sector').selectedOptions[0].text,
        size: document.getElementById('company-size').value,
        sizeLabel: document.getElementById('company-size').selectedOptions[0].text,
        location: document.getElementById('company-location').value
    };
    
    quizIntro.hidden = true;
    quizQuestions.hidden = false;
    
    renderQuestion();
}

// Render current question
function renderQuestion() {
    const question = allQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
    
    progressFill.style.width = `${progress}%`;
    currentQuestionEl.textContent = currentQuestion + 1;
    progressCategory.textContent = question.category.name;
    progressCategory.style.setProperty('--category-color', question.category.color);
    
    const selectedValue = answers[question.id];
    
    questionContainer.innerHTML = `
        <div class="question-card-quiz" style="--category-color: ${question.category.color}">
            <div class="question-category-badge">
                <span>${question.category.icon}</span>
                <span>${question.category.name}</span>
            </div>
            <h2 class="question-text">${question.text}</h2>
            <div class="options-list" role="radiogroup" aria-labelledby="question-${question.id}">
                ${question.options.map((opt, idx) => `
                    <label class="option-item ${selectedValue === opt.value ? 'selected' : ''}" tabindex="0">
                        <input type="radio" 
                               name="question-${question.id}" 
                               value="${opt.value}" 
                               ${selectedValue === opt.value ? 'checked' : ''}
                               aria-describedby="opt-${question.id}-${idx}">
                        <span class="option-indicator"></span>
                        <span class="option-text" id="opt-${question.id}-${idx}">${opt.label}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.option-item input').forEach(input => {
        input.addEventListener('change', handleAnswerSelect);
    });
    
    // Keyboard navigation for labels
    document.querySelectorAll('.option-item').forEach(label => {
        label.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                label.querySelector('input').click();
            }
        });
    });
    
    updateNavigation();
}

// Handle answer selection
function handleAnswerSelect(e) {
    const question = allQuestions[currentQuestion];
    answers[question.id] = parseInt(e.target.value);
    
    // Visual feedback
    document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    e.target.closest('.option-item').classList.add('selected');
    
    updateNavigation();
    
    // Auto-advance after short delay
    if (currentQuestion < allQuestions.length - 1) {
        setTimeout(() => navigateQuestion(1), 300);
    }
}

// Navigate between questions
function navigateQuestion(direction) {
    const newIndex = currentQuestion + direction;
    
    if (newIndex >= 0 && newIndex < allQuestions.length) {
        currentQuestion = newIndex;
        renderQuestion();
    }
}

// Update navigation buttons
function updateNavigation() {
    const question = allQuestions[currentQuestion];
    const hasAnswer = answers[question.id] !== undefined;
    const isLast = currentQuestion === allQuestions.length - 1;
    
    btnPrev.disabled = currentQuestion === 0;
    btnNext.disabled = !hasAnswer;
    btnNext.hidden = isLast;
    btnSubmit.hidden = !isLast;
    btnSubmit.disabled = !hasAnswer;
}

// Submit quiz and calculate results
function submitQuiz() {
    const results = calculateResults();
    renderResults(results);
    
    quizQuestions.hidden = true;
    quizResults.hidden = false;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Animate score
    animateScore(results.totalScore);
    
    // Trigger AI chatbot feedback after a short delay
    setTimeout(() => {
        if (window.RSEChatbot && window.RSEChatbot.analyzeQuizResults) {
            window.RSEChatbot.analyzeQuizResults(results, companyInfo, answers);
        }
    }, 1500); // Wait for score animation to start
}

// Calculate results
function calculateResults() {
    const categoryResults = {};
    let totalScore = 0;
    let maxScore = 0;
    
    quizData.categories.forEach(category => {
        let catScore = 0;
        let catMax = 0;
        
        category.questions.forEach(q => {
            const answer = answers[q.id] || 0;
            catScore += answer;
            catMax += 3; // Max is always 3
        });
        
        const percentage = Math.round((catScore / catMax) * 100);
        categoryResults[category.id] = {
            ...category,
            score: catScore,
            maxScore: catMax,
            percentage,
            level: getLevel(percentage)
        };
        
        totalScore += catScore;
        maxScore += catMax;
    });
    
    const totalPercentage = Math.round((totalScore / maxScore) * 100);
    
    return {
        totalScore: totalPercentage,
        categories: categoryResults,
        maturityLevel: getMaturityLevel(totalPercentage),
        recommendations: generateRecommendations(categoryResults)
    };
}

// Get level based on percentage
function getLevel(percentage) {
    if (percentage >= 75) return 'high';
    if (percentage >= 40) return 'medium';
    return 'low';
}

// Get maturity level
function getMaturityLevel(score) {
    if (score >= 80) return { level: 'Exemplaire', emoji: '🏆', color: '#20B37E', description: 'Votre entreprise est un modèle de responsabilité sociétale. Continuez à innover et à partager vos bonnes pratiques.' };
    if (score >= 60) return { level: 'Avancé', emoji: '🌟', color: '#1175A4', description: 'Vous avez une démarche RSE bien structurée. Il reste des axes d\'amélioration pour atteindre l\'excellence.' };
    if (score >= 40) return { level: 'En progression', emoji: '📈', color: '#f59e0b', description: 'Vous avez initié une démarche RSE. Structurez vos actions pour accélérer votre progression.' };
    if (score >= 20) return { level: 'Débutant', emoji: '🌱', color: '#1175A4', description: 'Vous êtes au début de votre parcours RSE. C\'est le moment idéal pour poser les bases d\'une démarche structurée.' };
    return { level: 'À initier', emoji: '🚀', color: '#E40A7E', description: 'Votre démarche RSE reste à construire. C\'est une opportunité de différenciation pour votre entreprise.' };
}

// Generate recommendations
function generateRecommendations(categoryResults) {
    const recommendations = [];
    
    // Sort categories by score (lowest first)
    const sortedCategories = Object.values(categoryResults).sort((a, b) => a.percentage - b.percentage);
    
    // Get top 3 priority areas
    sortedCategories.slice(0, 3).forEach(cat => {
        const level = cat.level;
        const catRecos = recommendationsDB[cat.id][level];
        
        recommendations.push({
            category: cat,
            actions: catRecos.slice(0, 2) // Top 2 recommendations per category
        });
    });
    
    return recommendations;
}

// Render results
function renderResults(results) {
    // Company name
    document.getElementById('company-name-display').textContent = companyInfo.name;
    
    // Maturity badge
    const maturityBadge = document.getElementById('maturity-level');
    maturityBadge.innerHTML = `
        <span class="maturity-emoji">${results.maturityLevel.emoji}</span>
        <span class="maturity-text" style="color: ${results.maturityLevel.color}">
            Niveau ${results.maturityLevel.level}
        </span>
    `;
    
    // Categories chart
    const categoriesChart = document.getElementById('categories-chart');
    categoriesChart.innerHTML = Object.values(results.categories).map(cat => `
        <div class="category-bar-item">
            <div class="category-bar-header">
                <span class="category-bar-icon">${cat.icon}</span>
                <span class="category-bar-name">${cat.name}</span>
                <span class="category-bar-score">${cat.percentage}%</span>
            </div>
            <div class="category-bar-track">
                <div class="category-bar-fill" style="width: ${cat.percentage}%; background-color: ${cat.color}"></div>
            </div>
        </div>
    `).join('');
    
    // Results cards
    const resultsCards = document.getElementById('results-cards');
    resultsCards.innerHTML = Object.values(results.categories).map(cat => `
        <div class="result-detail-card" style="--card-color: ${cat.color}">
            <div class="result-card-header">
                <span class="result-card-icon">${cat.icon}</span>
                <h3>${cat.name}</h3>
                <span class="result-card-badge ${cat.level}">${cat.percentage}%</span>
            </div>
            <p class="result-card-analysis">${getAnalysisText(cat)}</p>
        </div>
    `).join('');
    
    // Recommendations
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = results.recommendations.map(reco => `
        <div class="recommendation-card" style="--reco-color: ${reco.category.color}">
            <div class="recommendation-header">
                <span class="recommendation-icon">${reco.category.icon}</span>
                <h3>${reco.category.name}</h3>
                <span class="recommendation-priority">Priorité</span>
            </div>
            <ul class="recommendation-actions">
                ${reco.actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Get analysis text for category
function getAnalysisText(category) {
    const texts = {
        high: `Excellent ! Vos pratiques en matière de ${category.name.toLowerCase()} sont exemplaires.`,
        medium: `Vous avez de bonnes bases en ${category.name.toLowerCase()}, mais des améliorations sont possibles.`,
        low: `Le domaine "${category.name}" représente un axe d'amélioration prioritaire pour votre entreprise.`
    };
    return texts[category.level];
}

// Animate score
function animateScore(targetScore) {
    const scoreValue = document.getElementById('score-value');
    const circleProgress = document.getElementById('circle-progress');
    
    let current = 0;
    const duration = 1500;
    const start = performance.now();
    
    function animate(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        current = Math.round(targetScore * easeOut);
        scoreValue.textContent = current;
        circleProgress.setAttribute('stroke-dasharray', `${current}, 100`);
        
        // Set color based on score
        let color = '#ef4444';
        if (current >= 80) color = '#10b981';
        else if (current >= 60) color = '#6366f1';
        else if (current >= 40) color = '#f59e0b';
        else if (current >= 20) color = '#06b6d4';
        
        circleProgress.style.stroke = color;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    answers = {};
    companyInfo = {};
    
    quizResults.hidden = true;
    quizIntro.hidden = false;
    
    // Reset form
    companyForm.reset();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download PDF report
function downloadPDF() {
    const results = calculateResults();
    const content = generatePDFContent(results);
    
    // Create a simple HTML-based PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
}

// Generate PDF content
function generatePDFContent(results) {
    const date = new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport RSE - ${companyInfo.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.6; padding: 40px; }
        .header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #1175A4; }
        .header h1 { color: #1175A4; margin-bottom: 10px; }
        .header p { color: #6b7280; }
        .company-info { background: #E5F5F9; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .company-info h2 { color: #374151; margin-bottom: 15px; }
        .company-info dl { display: grid; grid-template-columns: 150px 1fr; gap: 10px; }
        .company-info dt { font-weight: 600; color: #6b7280; }
        .company-info dd { color: #1f2937; }
        .score-section { text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #1175A4 0%, #0b4d6e 100%); color: white; border-radius: 12px; }
        .score-section .score { font-size: 72px; font-weight: 800; }
        .score-section .level { font-size: 24px; margin-top: 10px; }
        .categories { margin: 30px 0; }
        .categories h2 { margin-bottom: 20px; color: #374151; }
        .category-item { display: flex; align-items: center; margin-bottom: 15px; }
        .category-item .icon { font-size: 24px; width: 40px; }
        .category-item .name { flex: 1; font-weight: 500; }
        .category-item .bar { flex: 2; height: 24px; background: #e5e7eb; border-radius: 12px; overflow: hidden; margin: 0 15px; }
        .category-item .bar-fill { height: 100%; border-radius: 12px; }
        .category-item .percentage { font-weight: 700; width: 50px; text-align: right; }
        .recommendations { margin: 30px 0; }
        .recommendations h2 { margin-bottom: 20px; color: #374151; }
        .recommendation-item { background: #E5F5F9; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #E40A7E; }
        .recommendation-item h3 { color: #374151; margin-bottom: 10px; }
        .recommendation-item ul { margin-left: 20px; }
        .recommendation-item li { margin-bottom: 8px; color: #4b5563; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px; }
        @media print { body { padding: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>Mutuelle de Corse</h1>
        <p>Rapport de diagnostic RSE - ${date}</p>
    </div>
    
    <div class="company-info">
        <h2>Informations entreprise</h2>
        <dl>
            <dt>Raison sociale</dt>
            <dd>${companyInfo.name}</dd>
            <dt>Secteur d'activité</dt>
            <dd>${companyInfo.sectorLabel}</dd>
            <dt>Taille</dt>
            <dd>${companyInfo.sizeLabel}</dd>
        </dl>
    </div>
    
    <div class="score-section">
        <div class="score">${results.totalScore}/100</div>
        <div class="level">${results.maturityLevel.emoji} Niveau ${results.maturityLevel.level}</div>
        <p style="margin-top: 15px; opacity: 0.9;">${results.maturityLevel.description}</p>
    </div>
    
    <div class="categories">
        <h2>📊 Résultats par thématique ISO 26000</h2>
        ${Object.values(results.categories).map(cat => `
            <div class="category-item">
                <span class="icon">${cat.icon}</span>
                <span class="name">${cat.name}</span>
                <div class="bar">
                    <div class="bar-fill" style="width: ${cat.percentage}%; background-color: ${cat.color};"></div>
                </div>
                <span class="percentage">${cat.percentage}%</span>
            </div>
        `).join('')}
    </div>
    
    <div class="recommendations">
        <h2>🎯 Recommandations prioritaires</h2>
        ${results.recommendations.map(reco => `
            <div class="recommendation-item" style="border-left-color: ${reco.category.color};">
                <h3>${reco.category.icon} ${reco.category.name}</h3>
                <ul>
                    ${reco.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <p>Rapport généré par Mutuelle de Corse - Accompagnement RSE</p>
        <p>Contact : rse@mutuelle-corse.fr | 04 95 XX XX XX</p>
    </div>
</body>
</html>
    `;
}

// Share results
function shareResults() {
    const results = calculateResults();
    const text = `J'ai évalué la maturité RSE de mon entreprise avec Mutuelle de Corse : ${results.totalScore}/100 - Niveau ${results.maturityLevel.level} ${results.maturityLevel.emoji}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mon diagnostic RSE',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert('Résultat copié dans le presse-papier !');
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
