/**
 * Chatbot RSE - Assistant contextuel
 * Mutuelle de Corse - Accompagnement RSE
 */

// Knowledge base for RSE questions
const knowledgeBase = {
    rse: {
        keywords: ['rse', 'responsabilité', 'sociétale', 'entreprise', 'définition', 'c\'est quoi'],
        responses: [
            "La RSE (Responsabilité Sociétale des Entreprises) est une démarche volontaire par laquelle les entreprises intègrent les préoccupations sociales, environnementales et économiques dans leurs activités et leurs interactions avec leurs parties prenantes. 🌱",
            "C'est l'engagement de votre entreprise à agir de manière responsable envers la société et l'environnement, tout en restant économiquement viable.",
            "La RSE repose sur 3 piliers principaux : l'environnement 🌍, le social 👥 et la gouvernance économique 💶."
        ]
    },
    iso26000: {
        keywords: ['iso', '26000', 'norme', 'standard', 'certification'],
        responses: [
            "L'ISO 26000 est une norme internationale publiée en 2010 qui fournit des lignes directrices pour la responsabilité sociétale. Elle n'est pas certifiable mais constitue un cadre de référence reconnu mondialement. 📋",
            "Cette norme s'articule autour de 7 questions centrales : gouvernance, droits de l'Homme, conditions de travail, environnement, loyauté des pratiques, consommateurs et communautés locales.",
            "Consultez notre page dédiée à l'ISO 26000 pour une explication détaillée de chaque question centrale ! 👉"
        ]
    },
    obligations: {
        keywords: ['obligation', 'obligatoire', 'loi', 'réglementation', 'csrd', 'devoir'],
        responses: [
            "Les obligations RSE évoluent rapidement ! La directive CSRD (Corporate Sustainability Reporting Directive) impose progressivement aux entreprises européennes de publier des informations sur leur performance extra-financière. ⚠️",
            "À partir de 2025, les grandes entreprises sont concernées, puis progressivement les PME cotées. Même si vous n'êtes pas directement concerné, vos donneurs d'ordre peuvent vous demander ces informations.",
            "Anticiper ces obligations est un avantage compétitif ! Notre quiz vous aide à évaluer votre maturité. 🎯"
        ]
    },
    commencer: {
        keywords: ['commencer', 'débuter', 'démarrer', 'premier', 'étape', 'comment faire'],
        responses: [
            "Pour démarrer votre démarche RSE, voici 5 étapes clés :\n\n1️⃣ Identifiez vos parties prenantes\n2️⃣ Analysez vos impacts positifs et négatifs\n3️⃣ Définissez des priorités\n4️⃣ Fixez des objectifs mesurables\n5️⃣ Communiquez sur vos actions",
            "Le plus simple est de commencer par notre quiz ! En 5 minutes, vous aurez un diagnostic personnalisé avec des recommandations adaptées à votre secteur. 📊",
            "Pas besoin de tout faire d'un coup ! Commencez par 2-3 actions simples et montez en puissance progressivement. L'important est de s'engager dans une démarche d'amélioration continue. 🚀"
        ]
    },
    quiz: {
        keywords: ['quiz', 'test', 'évaluation', 'diagnostic', 'évaluer', 'score'],
        responses: [
            "Notre quiz RSE est basé sur les 7 questions centrales de l'ISO 26000. Il comprend 21 questions et ne prend que 5 minutes ! À la fin, vous recevez un score global, une analyse par thématique et des recommandations personnalisées. 📋",
            "Le quiz génère un rapport PDF que vous pouvez télécharger et partager avec vos équipes ou vos partenaires. C'est un excellent point de départ pour structurer votre démarche ! 📥",
            "N'hésitez pas à refaire le quiz dans quelques mois pour mesurer vos progrès. Rendez-vous sur la page 'Évaluer mon entreprise' ! 🎯"
        ]
    },
    avantages: {
        keywords: ['avantage', 'bénéfice', 'intérêt', 'pourquoi', 'utilité', 'gain'],
        responses: [
            "Les avantages de la RSE sont nombreux :\n\n✅ Avantage compétitif (appels d'offres)\n✅ Réduction des coûts (énergie, déchets)\n✅ Attractivité RH et fidélisation\n✅ Accès aux financements\n✅ Image de marque renforcée",
            "Les études montrent que les entreprises engagées en RSE sont en moyenne 13% plus performantes que les autres. C'est un investissement rentable ! 📈",
            "En Corse, la RSE prend un sens particulier : protection de notre environnement unique, renforcement du tissu économique local, solidarité insulaire... 🏝️"
        ]
    },
    environnement: {
        keywords: ['environnement', 'écologie', 'carbone', 'énergie', 'déchet', 'climat', 'vert'],
        responses: [
            "Le volet environnemental de la RSE comprend :\n\n🌡️ Réduction de l'empreinte carbone\n♻️ Gestion des déchets\n⚡ Économies d'énergie\n🌊 Protection de la biodiversité\n🚗 Mobilité durable",
            "Pour commencer, réalisez un bilan carbone simplifié. Des outils gratuits existent ! Ensuite, identifiez vos 3 principaux postes d'émission et fixez des objectifs de réduction.",
            "En Corse, les enjeux environnementaux sont cruciaux : préservation du littoral, gestion de l'eau, protection du maquis... Votre engagement compte ! 🏔️"
        ]
    },
    social: {
        keywords: ['social', 'salarié', 'employé', 'travail', 'bien-être', 'qvt', 'formation'],
        responses: [
            "Le volet social de la RSE concerne vos collaborateurs :\n\n👥 Bien-être au travail (QVT)\n📚 Formation et développement\n⚖️ Égalité et diversité\n🏥 Santé et sécurité\n💬 Dialogue social",
            "78% des candidats considèrent l'engagement RSE d'une entreprise dans leur choix d'employeur. C'est un levier clé pour attirer et fidéliser les talents ! 👨‍💼",
            "Commencez par mesurer le bien-être de vos équipes via une enquête simple. Les résultats vous guideront vers les actions prioritaires."
        ]
    },
    corse: {
        keywords: ['corse', 'local', 'territoire', 'insulaire', 'ajaccio', 'bastia'],
        responses: [
            "La Mutuelle de Corse accompagne les entreprises corses dans leur démarche RSE avec une approche adaptée à notre contexte insulaire. 🏝️",
            "En Corse, la RSE prend une dimension particulière :\n\n🌊 Protection de notre environnement unique\n🏘️ Renforcement du tissu économique local\n🤝 Solidarité et cohésion sociale\n🏆 Tourisme responsable",
            "Nous favorisons les circuits courts, l'emploi local et les partenariats avec les acteurs du territoire. Contactez-nous pour un accompagnement personnalisé ! 📞"
        ]
    },
    contact: {
        keywords: ['contact', 'aide', 'accompagnement', 'conseiller', 'rendez-vous', 'téléphone'],
        responses: [
            "Vous souhaitez être accompagné dans votre démarche RSE ? \n\n📧 rse@mutuelle-corse.fr\n📞 04 95 XX XX XX\n📍 Ajaccio, Corse",
            "Nos conseillers RSE peuvent vous aider à :\n\n✅ Interpréter vos résultats de quiz\n✅ Définir votre feuille de route\n✅ Identifier les aides disponibles\n✅ Vous mettre en relation avec des experts",
            "Prenez rendez-vous pour un premier échange gratuit ! Nous sommes là pour vous accompagner. 🤝"
        ]
    },
    default: {
        responses: [
            "Je suis votre assistant RSE ! Je peux vous aider sur :\n\n• La définition de la RSE\n• La norme ISO 26000\n• Les obligations légales\n• Comment démarrer votre démarche\n• Le fonctionnement du quiz\n\nQue souhaitez-vous savoir ?",
            "Je n'ai pas bien compris votre question. Pouvez-vous la reformuler ? Vous pouvez aussi utiliser les suggestions ci-dessous ou consulter nos pages dédiées.",
            "Hmm, je ne suis pas sûr de pouvoir répondre à cette question. N'hésitez pas à contacter nos conseillers RSE pour un accompagnement personnalisé : rse@mutuelle-corse.fr 📧"
        ]
    }
};

// Greeting messages
const greetings = [
    "Bonjour ! 👋 Je suis votre assistant RSE. Comment puis-je vous aider aujourd'hui ?",
    "Bienvenue ! 🌱 Je suis là pour répondre à vos questions sur la RSE et l'ISO 26000. Que souhaitez-vous savoir ?",
    "Salut ! 👋 Prêt à découvrir la RSE ? Posez-moi vos questions !"
];

// State
let chatbotInitialized = false;

// DOM Elements
let chatbotWidget, chatbotToggle, chatbotPanel, chatbotMessages, chatbotForm, chatbotInput;

// Initialize chatbot
function initChatbot() {
    chatbotWidget = document.getElementById('chatbot-widget');
    chatbotToggle = document.getElementById('chatbot-toggle');
    chatbotPanel = document.getElementById('chatbot-panel');
    chatbotMessages = document.getElementById('chatbot-messages');
    chatbotForm = document.getElementById('chatbot-form');
    chatbotInput = document.getElementById('chatbot-input');
    
    if (!chatbotWidget) return;
    
    // Event listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotForm.addEventListener('submit', handleSubmit);
    
    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const question = chip.dataset.question;
            if (question) {
                chatbotInput.value = question;
                handleSubmit(new Event('submit'));
            }
        });
    });
    
    // Keyboard shortcut (Ctrl + /)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            toggleChatbot();
        }
    });
}

// Toggle chatbot panel
function toggleChatbot() {
    const isExpanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
    
    chatbotToggle.setAttribute('aria-expanded', !isExpanded);
    chatbotPanel.hidden = isExpanded;
    
    if (!isExpanded && !chatbotInitialized) {
        // First open: show greeting
        const greeting = greetings[Math.floor(Math.random() * greetings.length)];
        addMessage(greeting, 'bot');
        chatbotInitialized = true;
    }
    
    if (!isExpanded) {
        // Focus input when opening
        setTimeout(() => chatbotInput.focus(), 100);
    }
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Generate response with delay
    setTimeout(() => {
        hideTyping();
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 800 + Math.random() * 700);
}

// Add message to chat
function addMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;
    messageEl.innerHTML = formatMessage(text);
    chatbotMessages.appendChild(messageEl);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Format message (convert newlines, links, etc.)
function formatMessage(text) {
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    
    // Convert URLs to links
    text = text.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener">$1</a>'
    );
    
    return text;
}

// Show typing indicator
function showTyping() {
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-message bot typing';
    typingEl.id = 'typing-indicator';
    typingEl.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatbotMessages.appendChild(typingEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTyping() {
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) {
        typingEl.remove();
    }
}

// Generate response based on user input
function generateResponse(input) {
    const normalizedInput = input.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remove accents
    
    // Check each category for keyword matches
    let bestMatch = null;
    let maxMatches = 0;
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
        if (category === 'default') continue;
        
        const matches = data.keywords.filter(keyword => 
            normalizedInput.includes(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        ).length;
        
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = data;
        }
    }
    
    // Get response from best match or default
    const responsePool = bestMatch && maxMatches > 0 
        ? bestMatch.responses 
        : knowledgeBase.default.responses;
    
    // Return random response from pool
    return responsePool[Math.floor(Math.random() * responsePool.length)];
}

// Context-aware responses based on current page
function getContextualGreeting() {
    const path = window.location.pathname;
    
    if (path.includes('quiz')) {
        return "Bienvenue sur le quiz RSE ! 📊 Je peux vous aider à comprendre les questions ou interpréter vos résultats.";
    } else if (path.includes('iso26000')) {
        return "Vous consultez notre page ISO 26000. N'hésitez pas à me poser des questions sur la norme ! 📋";
    } else {
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
}

// Enhanced response for specific contexts
function enhanceResponseForContext(response, input) {
    const path = window.location.pathname;
    
    // If on quiz page and asking about quiz
    if (path.includes('quiz') && input.toLowerCase().includes('quiz')) {
        return response + "\n\nVous êtes au bon endroit ! Remplissez le formulaire pour commencer. ✅";
    }
    
    // If on ISO page and asking about ISO
    if (path.includes('iso26000') && input.toLowerCase().includes('iso')) {
        return response + "\n\nTous les détails sont sur cette page. Faites défiler pour découvrir les 7 questions centrales ! 👇";
    }
    
    return response;
}

// Quick action handlers
const quickActions = {
    quiz: () => window.location.href = 'quiz.html',
    iso: () => window.location.href = 'iso26000.html',
    home: () => window.location.href = 'index.html',
    contact: () => window.location.href = 'mailto:rse@mutuelle-corse.fr'
};

// Check for quick actions in input
function checkQuickAction(input) {
    const normalizedInput = input.toLowerCase();
    
    if (normalizedInput.includes('faire le quiz') || normalizedInput.includes('commencer le quiz')) {
        return 'quiz';
    }
    if (normalizedInput.includes('voir iso') || normalizedInput.includes('page iso')) {
        return 'iso';
    }
    if (normalizedInput.includes('contacter') || normalizedInput.includes('email')) {
        return 'contact';
    }
    
    return null;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initChatbot);

// Export for potential external use
window.RSEChatbot = {
    open: () => {
        if (chatbotToggle && chatbotToggle.getAttribute('aria-expanded') !== 'true') {
            toggleChatbot();
        }
    },
    close: () => {
        if (chatbotToggle && chatbotToggle.getAttribute('aria-expanded') === 'true') {
            toggleChatbot();
        }
    },
    sendMessage: (message) => {
        if (chatbotInput) {
            chatbotInput.value = message;
            handleSubmit(new Event('submit'));
        }
    }
};
