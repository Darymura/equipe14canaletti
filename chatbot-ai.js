/**
 * Chatbot RSE avec IA - Groq API (Gratuit)
 * Mutuelle de Corse - Accompagnement RSE
 * 
 * INSTRUCTIONS:
 * 1. Créez un compte gratuit sur https://console.groq.com
 * 2. Générez une API key
 * 3. Remplacez 'YOUR_GROQ_API_KEY' ci-dessous
 * 
 * NOTE: Pour la production, la clé API devrait être sur un backend sécurisé.
 * Cette implémentation est pour un POC/démonstration uniquement.
 */

// ⚠️ REMPLACEZ PAR VOTRE CLÉ API GROQ (gratuite sur console.groq.com)
const GROQ_API_KEY = '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';

// Contexte RSE et ISO 26000 pour l'IA
const RSE_SYSTEM_PROMPT = `Tu es l'assistant RSE de la Mutuelle de Corse, expert en Responsabilité Sociétale des Entreprises et en norme ISO 26000. Tu accompagnes les entreprises corses dans leur démarche RSE.

## TON RÔLE
- Expliquer la RSE de façon simple et accessible
- Présenter la norme ISO 26000 et ses 7 questions centrales
- Donner des conseils TRÈS CONCRETS et IMMÉDIATEMENT ACTIONNABLES adaptés aux TPE/PME corses
- Fournir des exemples précis, des outils, des templates, des étapes chiffrées

## STYLE DE RÉPONSE OBLIGATOIRE
- Toujours donner des ACTIONS CONCRÈTES avec des étapes numérotées
- Mentionner des OUTILS GRATUITS spécifiques (noms d'outils, sites web)
- Donner des DÉLAIS réalistes ("en 2 heures", "cette semaine", "en 1 mois")
- Proposer des TEMPLATES ou EXEMPLES de documents
- Indiquer des COÛTS estimatifs quand pertinent (gratuit, ~500€, etc.)
- Citer des INDICATEURS MESURABLES

## CONNAISSANCES RSE

### Définition de la RSE
La RSE (Responsabilité Sociétale des Entreprises) est une démarche volontaire par laquelle les entreprises intègrent les préoccupations sociales, environnementales et économiques dans leurs activités.

### Les 3 piliers de la RSE
1. **Environnement** : Réduction empreinte carbone, gestion déchets, économies d'énergie, biodiversité
2. **Social** : Bien-être au travail, formation, égalité, diversité, santé et sécurité
3. **Gouvernance** : Éthique des affaires, transparence, achats responsables, ancrage territorial

## ACTIONS CONCRÈTES PAR DOMAINE

### GOUVERNANCE - Actions immédiates
1. **Rédiger une charte RSE** (2h de travail)
   - Template : Mission + 5 engagements + signature direction
   - Afficher dans les locaux et sur le site web
2. **Désigner un référent RSE** 
   - Même à temps partiel (2h/semaine suffisent pour une PME)
   - Fiche de poste type disponible sur ademe.fr
3. **Créer un comité RSE trimestriel**
   - 1h tous les 3 mois avec direction + représentants salariés
   - Ordre du jour type : bilan actions, nouveaux projets, indicateurs

### DROITS DE L'HOMME - Actions concrètes
1. **Questionnaire fournisseurs RSE** (gratuit)
   - 10 questions sur conditions de travail, sous-traitance
   - Template sur ecovadis.com ou globalcompact-france.org
2. **Procédure anti-discrimination**
   - Guide gratuit : Défenseur des droits - recrutement non discriminatoire
   - Formation managers : 1/2 journée, ~200€/personne
3. **Canal de signalement**
   - Email dédié : alerte@entreprise.fr
   - Ou outil gratuit : signalement.social-sante.gouv.fr

### CONDITIONS DE TRAVAIL - Actions concrètes
1. **Enquête bien-être** (cette semaine)
   - Outils gratuits : Google Forms, Typeform (gratuit jusqu'à 100 réponses)
   - 10 questions anonymes sur satisfaction, stress, suggestions
2. **Entretiens professionnels**
   - Obligatoires tous les 2 ans (Code du travail)
   - Template sur travail-emploi.gouv.fr
3. **Plan de formation**
   - Budget : OPCO finance jusqu'à 100% pour TPE
   - Catalogue : moncompteformation.gouv.fr
4. **Document Unique d'Évaluation des Risques (DUERP)**
   - Obligatoire pour toutes les entreprises
   - Outil gratuit : oiraproject.eu/fr

### ENVIRONNEMENT - Actions immédiates
1. **Bilan carbone simplifié** (2-3h)
   - Outil gratuit : nosgestesclimat.fr/organisations
   - Ou Bilan Carbone® : ~2000€ pour une PME
2. **Réduire consommation énergie** (-15% facile)
   - LED partout : amortissement < 2 ans
   - Programmateurs chauffage/clim : ~50€/unité
   - Audit énergétique gratuit : contactez votre fournisseur
3. **Tri et recyclage**
   - 5 flux obligatoires depuis 2016 (papier, métal, plastique, verre, bois)
   - Contact : SYVADEC en Corse pour accompagnement gratuit
4. **Mobilité durable**
   - Forfait mobilités durables : jusqu'à 700€/an/salarié défiscalisé
   - Vélos entreprise : aide ADEME jusqu'à 40%
5. **Numérique responsable**
   - Allonger durée de vie équipements (+2 ans = -40% impact)
   - Reconditionnés : backmarket.fr, ~60% moins cher

### LOYAUTÉ DES PRATIQUES - Actions concrètes  
1. **Code de conduite fournisseurs**
   - Template sur pfrse.gouv.fr
   - Intégrer dans conditions d'achat
2. **Charte éthique**
   - Anti-corruption, conflits d'intérêts, cadeaux
   - Template : transparency-france.org
3. **Achats responsables**
   - Critères RSE = 20% de la note dans appels d'offres
   - Labels à rechercher : Commerce équitable, Bio, Écolabel

### CONSOMMATEURS - Actions concrètes
1. **Page RSE sur site web** (1 jour)
   - Engagements + actions + résultats chiffrés
   - Rubrique "Questions fréquentes"
2. **Affichage environnemental**
   - Origine des produits, impacts, conseils d'usage
   - Obligatoire bientôt (loi climat et résilience)
3. **Traitement réclamations**
   - Procédure écrite : accusé réception 48h, réponse 15 jours
   - Médiateur : gratuit via mediateur-des-entreprises.fr

### COMMUNAUTÉS LOCALES - Actions pour la Corse
1. **Achats locaux** (objectif : +10%/an)
   - Annuaire fournisseurs corses : CCI de Corse
   - Label "Produitu in Corsica"
2. **Mécénat de compétences**
   - 1 jour/an par salarié pour une association
   - Déductible fiscalement à 60%
3. **Partenariats écoles**
   - Stages, alternances, interventions
   - Contact : CFA de Corse, Université de Corse
4. **Soutien associations locales**
   - Budget suggéré : 0,5% du CA
   - Domaines : environnement, insertion, culture corse

## OUTILS ET RESSOURCES GRATUITS
- **ADEME** : ademe.fr - guides, aides financières, bilans carbone
- **BPI France** : bpifrance.fr/RSE - diagnostic gratuit
- **Plateforme RSE** : strategie.gouv.fr/plateforme-rse
- **Global Compact France** : globalcompact-france.org - ODD
- **LUCIE** : labellucie.com - référentiel ISO 26000
- **EcoVadis** : ecovadis.com - évaluation fournisseurs
- **SYVADEC** : syvadec.fr - tri et recyclage en Corse
- **CCI Corse** : corse.cci.fr - accompagnement entreprises

## AIDES FINANCIÈRES EN CORSE
- **ADEME Corse** : subventions transition écologique (jusqu'à 70%)
- **Région Corse** : aides aux TPE/PME
- **OPCO** : formation 100% financée pour TPE
- **Crédit impôt** : 25% pour certaines dépenses RSE
- **Prêts verts** : taux préférentiels si démarche RSE

## LABELS ET CERTIFICATIONS
- **Label LUCIE** : basé ISO 26000, ~5000€ pour PME, 3 ans
- **B Corp** : certification internationale, ~2000€/an
- **Engagé RSE AFNOR** : ~3000-8000€ selon taille
- **ISO 14001** : environnement, ~5000-15000€
- **EcoVadis** : notation gratuite version basique

## CONTEXTE CORSE
- Tissu économique : 95% TPE/PME
- Secteurs clés : Tourisme, BTP, Commerce, Agriculture
- Enjeux : Préservation environnement insulaire, économie locale, emploi
- Atouts : Circuits courts, solidarité locale, qualité de vie

## STYLE DE COMMUNICATION
- Sois TRÈS CONCRET et PRATIQUE
- Donne toujours des ACTIONS avec des ÉTAPES NUMÉROTÉES
- Mentionne des OUTILS SPÉCIFIQUES et des COÛTS
- Indique des DÉLAIS réalistes
- Adapte au contexte corse (TPE/PME, insulaire)
- Sois encourageant mais pragmatique
- Utilise des emojis avec modération
- Réponds en français

## CONTACTS MUTUELLE DE CORSE
- Email : rse@mutuelle-corse.fr
- Téléphone : 04 95 XX XX XX
- Accompagnement personnalisé disponible`;

// State
let chatbotInitialized = false;
let conversationHistory = [];

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
        addMessage("Bonjour ! 👋 Je suis votre assistant RSE. Je peux vous aider à comprendre la RSE, la norme ISO 26000, et vous accompagner dans votre démarche responsable. Que souhaitez-vous savoir ?", 'bot');
        chatbotInitialized = true;
    }
    
    if (!isExpanded) {
        setTimeout(() => chatbotInput.focus(), 100);
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';
    chatbotInput.disabled = true;
    
    // Show typing indicator
    showTyping();
    
    try {
        // Check if API key is configured
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
            hideTyping();
            addMessage("⚠️ Le chatbot IA n'est pas encore configuré. Pour l'activer :\n\n1. Créez un compte gratuit sur console.groq.com\n2. Générez une clé API\n3. Remplacez 'YOUR_GROQ_API_KEY' dans chatbot-ai.js\n\nEn attendant, consultez nos pages pour en savoir plus sur la RSE et l'ISO 26000 !", 'bot');
            chatbotInput.disabled = false;
            return;
        }
        
        const response = await callGroqAPI(message);
        hideTyping();
        addMessage(response, 'bot');
    } catch (error) {
        hideTyping();
        console.error('Chatbot error:', error);
        addMessage("Désolé, une erreur s'est produite. Veuillez réessayer ou consulter nos pages d'information sur la RSE.", 'bot');
    }
    
    chatbotInput.disabled = false;
    chatbotInput.focus();
}

// Call Groq API
async function callGroqAPI(userMessage) {
    // Add user message to history
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });
    
    // Keep only last 10 messages to manage context size
    if (conversationHistory.length > 10) {
        conversationHistory = conversationHistory.slice(-10);
    }
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile', // Gratuit et très performant
            messages: [
                {
                    role: 'system',
                    content: RSE_SYSTEM_PROMPT
                },
                ...conversationHistory
            ],
            temperature: 0.7,
            max_tokens: 1024
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
    }
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    // Add assistant response to history
    conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
    });
    
    return assistantMessage;
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

// Format message (convert markdown-like formatting)
function formatMessage(text) {
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initChatbot);

// Generate personalized feedback based on quiz results
async function generateQuizFeedback(results, companyInfo, answers) {
    // Build a detailed prompt with all quiz results
    const categoryDetails = Object.values(results.categories).map(cat => {
        return `- **${cat.name}** : ${cat.percentage}% (${cat.level === 'high' ? 'Bon' : cat.level === 'medium' ? 'Moyen' : 'À améliorer'})`;
    }).join('\n');
    
    // Get specific weak areas
    const weakAreas = Object.values(results.categories)
        .filter(cat => cat.percentage < 50)
        .map(cat => cat.name);
    
    // Get strong areas  
    const strongAreas = Object.values(results.categories)
        .filter(cat => cat.percentage >= 60)
        .map(cat => cat.name);
    
    const feedbackPrompt = `L'utilisateur vient de terminer le quiz d'auto-évaluation RSE. Analyse ses résultats et donne des conseils TRÈS CONCRETS et ACTIONNABLES.

## PROFIL DE L'ENTREPRISE
- **Nom** : ${companyInfo.name || 'Non précisé'}
- **Secteur** : ${companyInfo.sector || 'Non précisé'}
- **Taille** : ${companyInfo.size || 'Non précisé'}

## RÉSULTATS DU QUIZ
- **Score global** : ${results.totalScore}%
- **Niveau de maturité** : ${results.maturityLevel.level} ${results.maturityLevel.emoji}

## SCORES DÉTAILLÉS PAR CATÉGORIE ISO 26000
${categoryDetails}

## ANALYSE
- **Points forts (≥60%)** : ${strongAreas.length > 0 ? strongAreas.join(', ') : 'Aucun'}
- **Axes prioritaires (<50%)** : ${weakAreas.length > 0 ? weakAreas.join(', ') : 'Aucun'}

## TA MISSION
Génère un feedback de 250-350 mots MAXIMUM structuré ainsi :

1. **Félicitations personnalisées** (2-3 phrases)
   - Mentionne le score et les points forts spécifiques
   - Adapte au secteur d'activité

2. **Plan d'action prioritaire** (le plus important)
   Pour les 2 domaines les plus faibles, donne pour CHACUN :
   - 🎯 **Objectif** : ce qu'ils doivent atteindre
   - ✅ **Action 1** : action CONCRÈTE faisable cette semaine (avec outil gratuit si possible)
   - ✅ **Action 2** : action à faire ce mois-ci
   - ⏱️ **Temps estimé** : X heures ou X jours
   - 💰 **Coût** : gratuit / ~XX€ / budget à prévoir

3. **Ressource clé** (1 seule)
   - Un lien ou outil spécifique et gratuit pour démarrer immédiatement

4. **Prochaine étape** (1 phrase)
   - Propose de poser des questions sur un domaine spécifique
   - OU mentionne l'accompagnement Mutuelle de Corse

## RÈGLES STRICTES
- Sois ULTRA CONCRET : noms d'outils, délais précis, coûts estimés
- Adapte au SECTEUR (tourisme ≠ BTP ≠ commerce)
- Adapte à la TAILLE (TPE < 10 salariés = solutions simples et gratuites)
- Pas de blabla théorique, que de l'ACTIONNABLE
- Utilise des émojis pour structurer (🎯 ✅ ⏱️ 💰 📌)
- Si secteur = Tourisme/Hôtellerie : mentionne écolabels, économies d'eau/énergie
- Si secteur = BTP : mentionne gestion déchets chantier, sécurité
- Si secteur = Commerce : mentionne achats responsables, relation client`;

    try {
        // Open chatbot if not already open
        if (chatbotToggle && chatbotToggle.getAttribute('aria-expanded') !== 'true') {
            toggleChatbot();
        }
        
        // Initialize if needed
        if (!chatbotInitialized) {
            chatbotInitialized = true;
        }
        
        // Show typing indicator
        showTyping();
        
        // Check if API key is configured
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
            hideTyping();
            addMessage(`🎉 **Félicitations pour avoir complété le quiz !**\n\nVotre score : **${results.totalScore}%** - Niveau **${results.maturityLevel.level}**\n\n${results.maturityLevel.description}\n\n⚠️ Pour des conseils personnalisés par l'IA, configurez la clé API Groq dans chatbot-ai.js`, 'bot');
            return;
        }
        
        // Call API for personalized feedback
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: RSE_SYSTEM_PROMPT },
                    { role: 'user', content: feedbackPrompt }
                ],
                temperature: 0.7,
                max_tokens: 600
            })
        });
        
        hideTyping();
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const feedback = data.choices[0].message.content;
        
        // Add to conversation history
        conversationHistory.push(
            { role: 'user', content: `J'ai terminé le quiz RSE avec un score de ${results.totalScore}%` },
            { role: 'assistant', content: feedback }
        );
        
        addMessage(feedback, 'bot');
        
    } catch (error) {
        hideTyping();
        console.error('Feedback generation error:', error);
        // Fallback message
        addMessage(`🎉 **Félicitations pour avoir complété le quiz !**\n\nVotre score : **${results.totalScore}%** - Niveau **${results.maturityLevel.level}**\n\n${results.maturityLevel.description}\n\nN'hésitez pas à me poser des questions sur vos résultats ou sur comment améliorer votre démarche RSE !`, 'bot');
    }
}

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
    sendMessage: async (message) => {
        if (chatbotInput) {
            chatbotInput.value = message;
            await handleSubmit(new Event('submit'));
        }
    },
    clearHistory: () => {
        conversationHistory = [];
        chatbotMessages.innerHTML = '';
        chatbotInitialized = false;
    },
    // New function for quiz feedback
    analyzeQuizResults: generateQuizFeedback
};
