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

// API endpoint - CORS proxy disabled for now, using local analysis
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Flag to use local analysis instead of API (set to true for GitHub Pages)
const USE_LOCAL_ANALYSIS = true;

// State pour l'upload de fichiers
let uploadedFile = null;
let uploadedFileBase64 = null;

// Prompt système pour l'analyse d'appels d'offre RSE
const APPEL_OFFRE_ANALYSIS_PROMPT = `Tu es un expert en analyse d'appels d'offre et en critères RSE (ISO 26000). 
L'utilisateur t'a envoyé un document d'appel d'offre. Analyse-le et identifie :

## TA MISSION
1. **Critères RSE déjà mentionnés** dans l'appel d'offre (ce que le candidat doit déjà avoir)
2. **Critères RSE potentiels** où l'entreprise pourrait se démarquer
3. **Recommandations concrètes** pour maximiser les chances de succès

## FORMAT DE RÉPONSE OBLIGATOIRE

### 📋 **CRITÈRES RSE DÉTECTÉS DANS L'APPEL D'OFFRE**
Liste les critères RSE explicitement demandés avec leur pondération si mentionnée.

### ✅ **CE QUE VOUS POUVEZ DÉJÀ COCHER**
Pour chaque critère RSE trouvé, indique :
- Le critère
- Ce que l'entreprise corse moyenne peut probablement déjà justifier
- Document/preuve type à fournir

### 🎯 **AXES D'AMÉLIORATION POUR SE DÉMARQUER**
Pour chaque axe :
- L'action concrète à mettre en place
- Le délai réaliste (avant de répondre à l'AO)
- Le coût estimé (gratuit / ~XX€)
- L'impact sur la notation

### 📄 **DOCUMENTS À PRÉPARER**
Liste des pièces justificatives RSE à inclure dans la réponse.

### 💡 **CONSEIL STRATÉGIQUE**
Un conseil clé pour maximiser les points RSE dans cet appel d'offre.

## RÈGLES
- Sois TRÈS CONCRET et ACTIONNABLE
- Adapte au contexte des TPE/PME corses
- Si tu ne peux pas lire certaines parties, indique-le clairement
- Propose des solutions réalisables dans le temps imparti d'un appel d'offre`;

// Contexte RSE et ISO 26000 pour l'IA
const RSE_SYSTEM_PROMPT = `Tu t'appelles **Stella**, l'assistante RSE de la Mutuelle de Corse. Tu es experte en Responsabilité Sociétale des Entreprises et en norme ISO 26000. Tu accompagnes les entreprises corses dans leur démarche RSE.

## TON IDENTITÉ
- Tu t'appelles Stella
- Tu es l'assistante IA de la Mutuelle de Corse
- Tu es bienveillante, professionnelle et concrète
- Tu parles toujours en français

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

## ANALYSE D'APPELS D'OFFRE
Quand un utilisateur te donne le texte d'un appel d'offre ou des critères RSE d'un marché public, analyse-le ainsi :

### 📋 **CRITÈRES RSE DÉTECTÉS**
Liste les critères RSE demandés avec leur pondération si mentionnée.

### ✅ **CE QUE L'ENTREPRISE PEUT DÉJÀ COCHER**
Pour chaque critère, indique ce qu'une TPE/PME corse peut probablement déjà justifier et les preuves à fournir.

### 🎯 **AXES D'AMÉLIORATION RAPIDES**
Actions concrètes réalisables avant la date limite de réponse, avec délai et coût.

### 📄 **DOCUMENTS À PRÉPARER**
Liste des pièces justificatives RSE à inclure.

## CONTACTS MUTUELLE DE CORSE
- Email : rse@mutuelle-corse.fr
- Téléphone : 04 95 XX XX XX
- Accompagnement personnalisé disponible`;

// State
let chatbotInitialized = false;
let conversationHistory = [];

// DOM Elements
let chatbotWidget, chatbotToggle, chatbotPanel, chatbotMessages, chatbotForm, chatbotInput;
let chatbotFileInput, chatbotUploadBtn, chatbotFilePreview, filePreviewName, filePreviewRemove;

// Initialize chatbot
function initChatbot() {
    chatbotWidget = document.getElementById('chatbot-widget');
    chatbotToggle = document.getElementById('chatbot-toggle');
    chatbotPanel = document.getElementById('chatbot-panel');
    chatbotMessages = document.getElementById('chatbot-messages');
    chatbotForm = document.getElementById('chatbot-form');
    chatbotInput = document.getElementById('chatbot-input');
    
    // File upload elements
    chatbotFileInput = document.getElementById('chatbot-file-input');
    chatbotUploadBtn = document.getElementById('chatbot-upload-btn');
    chatbotFilePreview = document.getElementById('chatbot-file-preview');
    filePreviewName = document.getElementById('file-preview-name');
    filePreviewRemove = document.getElementById('file-preview-remove');
    
    if (!chatbotWidget) return;
    
    // Event listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotForm.addEventListener('submit', handleSubmit);
    
    // File upload event listeners
    if (chatbotUploadBtn && chatbotFileInput) {
        console.log('File upload button initialized');
        chatbotUploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Upload button clicked');
            chatbotFileInput.click();
        });
        chatbotFileInput.addEventListener('change', handleFileSelect);
        if (filePreviewRemove) {
            filePreviewRemove.addEventListener('click', clearUploadedFile);
        }
    } else {
        console.warn('File upload elements not found:', { chatbotUploadBtn, chatbotFileInput });
    }
    
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

// Handle file selection
async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        addMessage("⚠️ Le fichier est trop volumineux. Taille maximale : 10 Mo.", 'bot');
        chatbotFileInput.value = '';
        return;
    }
    
    // Check file type - only text-based formats
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword', // .doc
        'text/plain', // .txt
        'text/rtf', // .rtf
        'application/rtf'
    ];
    
    // Check by extension
    const fileName = file.name.toLowerCase();
    const isDocx = fileName.endsWith('.docx') || fileName.endsWith('.doc');
    const isTxt = fileName.endsWith('.txt');
    const isRtf = fileName.endsWith('.rtf');
    const isValidExtension = isDocx || isTxt || isRtf;
    
    if (!validTypes.includes(file.type) && !isValidExtension) {
        addMessage("⚠️ Format non supporté. Utilisez un fichier **Word (.docx)** ou **texte (.txt)**.", 'bot');
        chatbotFileInput.value = '';
        return;
    }
    
    uploadedFile = file;
    
    // Show preview
    if (chatbotFilePreview && filePreviewName) {
        let icon = '📝';
        if (isTxt) icon = '📄';
        filePreviewName.textContent = `${icon} ${file.name}`;
        chatbotFilePreview.hidden = false;
    }
    
    // Handle DOCX files - extract text
    if (isDocx || file.type.includes('word') || file.type.includes('openxmlformats')) {
        await handleDocxFile(file);
        return;
    }
    
    // Handle plain text files (.txt, .rtf)
    if (isTxt || isRtf || file.type.startsWith('text/')) {
        await handleTextFile(file);
        return;
    }
    
    // Fallback - shouldn't reach here
    addMessage("⚠️ Format non reconnu. Veuillez utiliser un fichier Word (.docx) ou texte (.txt).", 'bot');
    clearUploadedFile();
}

// Handle plain text file
async function handleTextFile(file) {
    addMessage(`📄 Analyse du document "${file.name}" en cours...`, 'bot');
    showTyping();
    
    try {
        const text = await file.text();
        
        if (!text || text.trim().length < 50) {
            hideTyping();
            addMessage("⚠️ Le document semble vide ou contient très peu de texte. Veuillez vérifier le fichier.", 'bot');
            clearUploadedFile();
            return;
        }
        
        // Analyze the extracted text with AI
        await analyzeDocumentText(text, file.name);
        
    } catch (error) {
        hideTyping();
        console.error('Error processing text file:', error);
        addMessage("⚠️ Erreur lors de la lecture du fichier. Veuillez réessayer.", 'bot');
    }
    
    clearUploadedFile();
}

// Convert file to base64 (kept for potential future use)
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Handle DOCX file - extract text and analyze
async function handleDocxFile(file) {
    addMessage(`📝 Analyse du document "${file.name}" en cours...`, 'bot');
    showTyping();
    
    try {
        const text = await extractTextFromDocx(file);
        
        if (!text || text.trim().length < 50) {
            hideTyping();
            addMessage("⚠️ Le document semble vide ou contient très peu de texte. Veuillez vérifier le fichier.", 'bot');
            clearUploadedFile();
            return;
        }
        
        // Analyze the extracted text with AI
        await analyzeDocumentText(text, file.name);
        
    } catch (error) {
        hideTyping();
        console.error('Error processing DOCX:', error);
        addMessage("⚠️ Erreur lors de la lecture du document Word. Veuillez réessayer ou copier-coller le texte directement.", 'bot');
    }
    
    clearUploadedFile();
}

// Extract text from DOCX file (DOCX is a ZIP containing XML)
async function extractTextFromDocx(file) {
    const JSZip = window.JSZip;
    
    if (!JSZip) {
        // Load JSZip dynamically if not available
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    
    // DOCX stores main content in word/document.xml
    const documentXml = await zip.file('word/document.xml')?.async('string');
    
    if (!documentXml) {
        throw new Error('Could not find document.xml in DOCX');
    }
    
    // Parse XML and extract text
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(documentXml, 'application/xml');
    
    // Get all text elements (w:t tags contain the text)
    const textElements = xmlDoc.getElementsByTagName('w:t');
    let fullText = '';
    
    for (let i = 0; i < textElements.length; i++) {
        fullText += textElements[i].textContent;
        // Add space between elements, newline after certain patterns
        if (i < textElements.length - 1) {
            fullText += ' ';
        }
    }
    
    // Clean up the text
    fullText = fullText.replace(/\s+/g, ' ').trim();
    
    return fullText;
}

// Load external script dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Analyze document text with AI
async function analyzeDocumentText(text, filename) {
    try {
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
            hideTyping();
            addMessage("⚠️ Le chatbot IA n'est pas configuré. Configurez la clé API Groq pour analyser les documents.", 'bot');
            return;
        }
        
        // Truncate text if too long (keep first 8000 chars)
        const truncatedText = text.length > 8000 ? text.substring(0, 8000) + '...[document tronqué]' : text;
        
        const analysisPrompt = `Analyse ce document d'appel d'offre et identifie tous les éléments RSE.

## DOCUMENT : ${filename}
${truncatedText}

## TA MISSION
Analyse ce texte et fournis :

### 📋 **CRITÈRES RSE DÉTECTÉS**
Liste tous les critères RSE/développement durable mentionnés avec leur pondération si indiquée.

### ✅ **CE QUE L'ENTREPRISE PEUT PROBABLEMENT DÉJÀ COCHER**
Pour chaque critère trouvé, indique ce qu'une TPE/PME corse peut généralement déjà justifier.

### 🎯 **AXES D'AMÉLIORATION RAPIDES**
Actions concrètes réalisables avant la date limite, avec délai et coût estimé.

### 📄 **DOCUMENTS À PRÉPARER**
Liste des pièces justificatives RSE à inclure dans la réponse.

### 💡 **CONSEIL STRATÉGIQUE**
Un conseil clé pour maximiser les points RSE.

Si le document ne semble pas être un appel d'offre ou ne contient pas de critères RSE, indique-le clairement et propose ton aide autrement.`;

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
                    { role: 'user', content: analysisPrompt }
                ],
                temperature: 0.3,
                max_tokens: 2048
            })
        });
        
        hideTyping();
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const analysis = data.choices[0].message.content;
        
        addMessage(analysis, 'bot');
        
        // Add to conversation history
        conversationHistory.push(
            { role: 'user', content: `Analyse ce document d'appel d'offre: ${filename}` },
            { role: 'assistant', content: analysis }
        );
        
    } catch (error) {
        hideTyping();
        console.error('Document analysis error:', error);
        addMessage("⚠️ Erreur lors de l'analyse. Veuillez réessayer.", 'bot');
    }
}

// Add analysis suggestion button
function addAnalysisSuggestion() {
    const suggestionEl = document.createElement('div');
    suggestionEl.className = 'chat-message bot';
    suggestionEl.innerHTML = `
        <button type="button" class="analysis-suggestion-btn" onclick="window.RSEChatbot.analyzeUploadedDocument()">
            🔍 Analyser cet appel d'offre RSE
        </button>
    `;
    chatbotMessages.appendChild(suggestionEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Clear uploaded file
function clearUploadedFile() {
    uploadedFile = null;
    uploadedFileBase64 = null;
    if (chatbotFileInput) chatbotFileInput.value = '';
    if (chatbotFilePreview) chatbotFilePreview.hidden = true;
}

// Toggle chatbot panel
function toggleChatbot() {
    const isExpanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
    
    chatbotToggle.setAttribute('aria-expanded', !isExpanded);
    chatbotPanel.hidden = isExpanded;
    
    if (!isExpanded && !chatbotInitialized) {
        // First open: show greeting
        addMessage("Bonjour ! 👋 Je suis **Stella**, votre assistante RSE. Je peux vous aider à :\n\n• Comprendre la RSE et la norme ISO 26000\n• Vous accompagner dans votre démarche responsable\n• **Analyser vos appels d'offre** : importez votre fichier Word (.docx) via 📎 ou copiez-collez le texte, et je vous dirai quels critères RSE vous pouvez déjà cocher !\n\nQue souhaitez-vous savoir ?", 'bot');
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
    
    const response = await fetch(GROQ_API_URL, {
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
    
    // Analyze individual answers to find specific criteria met (score 2-3)
    const criteriaMapping = {
        1: { name: "Vision/mission RSE formalisée", category: "Gouvernance" },
        2: { name: "Intégration des enjeux sociaux/environnementaux dans les décisions", category: "Gouvernance" },
        3: { name: "Référent RSE désigné", category: "Gouvernance" },
        4: { name: "Vérification des pratiques sociales des fournisseurs", category: "Droits de l'Homme" },
        5: { name: "Dispositifs anti-discrimination", category: "Droits de l'Homme" },
        6: { name: "Canal de signalement éthique", category: "Droits de l'Homme" },
        7: { name: "Évaluation du bien-être collaborateurs", category: "Conditions de travail" },
        8: { name: "Politique de formation développée", category: "Conditions de travail" },
        9: { name: "Gestion proactive santé/sécurité", category: "Conditions de travail" },
        10: { name: "Bilan carbone réalisé", category: "Environnement" },
        11: { name: "Démarche réduction des déchets", category: "Environnement" },
        12: { name: "Gestion active de l'énergie", category: "Environnement" },
        13: { name: "Charte éthique / code de conduite", category: "Loyauté des pratiques" },
        14: { name: "Achats responsables avec critères RSE", category: "Loyauté des pratiques" },
        15: { name: "Transparence des pratiques commerciales", category: "Loyauté des pratiques" },
        16: { name: "Information client complète", category: "Questions consommateurs" },
        17: { name: "Offre de produits/services durables", category: "Questions consommateurs" },
        18: { name: "Service client structuré", category: "Questions consommateurs" },
        19: { name: "Achats locaux significatifs (Corse)", category: "Communautés locales" },
        20: { name: "Engagement associatif / mécénat local", category: "Communautés locales" },
        21: { name: "Emploi local et insertion professionnelle", category: "Communautés locales" }
    };
    
    // Identify criteria already met (score >= 2) - can be communicated/valued
    const criteriaMet = [];
    const criteriaExcellent = [];
    const criteriaToImprove = [];
    
    Object.entries(answers).forEach(([questionId, score]) => {
        const qId = parseInt(questionId);
        const criteria = criteriaMapping[qId];
        if (criteria) {
            if (score >= 3) {
                criteriaExcellent.push(criteria);
            } else if (score >= 2) {
                criteriaMet.push(criteria);
            } else if (score <= 1) {
                criteriaToImprove.push(criteria);
            }
        }
    });
    
    // Build criteria strings for prompt
    const excellentCriteriaStr = criteriaExcellent.length > 0 
        ? criteriaExcellent.map(c => `✅ **${c.name}** (${c.category})`).join('\n')
        : 'Aucun critère au niveau excellent';
    
    const metCriteriaStr = criteriaMet.length > 0
        ? criteriaMet.map(c => `🟢 ${c.name} (${c.category})`).join('\n')
        : 'Aucun critère au niveau intermédiaire';
        
    const improveCriteriaStr = criteriaToImprove.slice(0, 5).map(c => `🔴 ${c.name}`).join('\n');

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

## CRITÈRES RSE DÉJÀ EXCELLENTS (score 3/3) - À VALORISER EN COMMUNICATION
${excellentCriteriaStr}

## CRITÈRES RSE BIEN ENGAGÉS (score 2/3) - PEUVENT ÊTRE MIS EN AVANT
${metCriteriaStr}

## CRITÈRES À AMÉLIORER EN PRIORITÉ (score 0-1/3)
${improveCriteriaStr}

## ANALYSE GLOBALE
- **Points forts (catégories ≥60%)** : ${strongAreas.length > 0 ? strongAreas.join(', ') : 'Aucun'}
- **Axes prioritaires (catégories <50%)** : ${weakAreas.length > 0 ? weakAreas.join(', ') : 'Aucun'}
- **Nombre de critères excellents** : ${criteriaExcellent.length}/21
- **Nombre de critères engagés** : ${criteriaMet.length}/21

## TA MISSION - STRUCTURE OBLIGATOIRE

### 1. 🌟 **VOS ATOUTS RSE À VALORISER IMMÉDIATEMENT**
Liste les 3-5 critères excellents ou bien engagés de l'utilisateur. Pour chacun, explique :
- Comment le mettre en avant dans un appel d'offre (quelle case cocher)
- Comment le communiquer (site web, plaquette, réseaux sociaux)
- Quel label ou certification pourrait le valoriser

### 2. 📢 **CONSEILS DE COMMUNICATION RSE**
Donne 3 actions concrètes pour mieux communiquer sur les engagements RSE déjà en place :
- Où communiquer (LinkedIn, site, presse locale)
- Comment formuler (exemples de phrases)
- À qui s'adresser (clients, donneurs d'ordre, collectivités)

### 3. 🎯 **PLAN D'AMÉLIORATION PRIORITAIRE**
Pour les 2 critères les plus faibles, donne :
- ✅ **Action rapide** (cette semaine)
- ✅ **Action moyen terme** (ce mois)
- 💰 **Coût estimé** et ⏱️ **Temps**

### 4. 💡 **POUR LES APPELS D'OFFRE**
Explique comment utiliser ces atouts RSE :
- Quelles cases le candidat peut déjà cocher
- Comment justifier chaque critère avec des preuves
- Quels points peuvent rapporter des points bonus

## RÈGLES STRICTES
- Sois SPÉCIFIQUE aux critères identifiés ci-dessus
- Mentionne les critères EXCELLENTS comme des ATOUTS à communiquer
- Adapte au secteur d'activité (${companyInfo.sector || 'non précisé'})
- Utilise des émojis pour structurer
- Maximum 400 mots`;

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
        
        // Use local analysis for GitHub Pages (no CORS issues)
        if (USE_LOCAL_ANALYSIS) {
            hideTyping();
            generateLocalQuizAnalysis(results, companyInfo, criteriaExcellent, criteriaMet, criteriaToImprove, strongAreas, weakAreas);
            return;
        }
        
        // Check if API key is configured
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
            hideTyping();
            // Provide a basic analysis without AI
            let basicFeedback = `🎉 **Félicitations pour avoir complété le quiz !**\n\n`;
            basicFeedback += `📊 **Votre score** : **${results.totalScore}%** - Niveau **${results.maturityLevel.level}**\n\n`;
            
            if (criteriaExcellent.length > 0) {
                basicFeedback += `🌟 **Vos atouts RSE à valoriser :**\n`;
                criteriaExcellent.forEach(c => {
                    basicFeedback += `• ${c.name}\n`;
                });
                basicFeedback += `\n💡 *Mettez ces points en avant dans vos appels d'offre et votre communication !*\n\n`;
            }
            
            if (criteriaMet.length > 0) {
                basicFeedback += `🟢 **Critères bien engagés :**\n`;
                criteriaMet.slice(0, 3).forEach(c => {
                    basicFeedback += `• ${c.name}\n`;
                });
                basicFeedback += `\n`;
            }
            
            basicFeedback += `⚠️ Pour des conseils personnalisés par l'IA Stella, configurez la clé API Groq.`;
            addMessage(basicFeedback, 'bot');
            return;
        }
        
        // Call API for personalized feedback
        const response = await fetch(GROQ_API_URL, {
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
                max_tokens: 800
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
            { role: 'user', content: `J'ai terminé le quiz RSE avec un score de ${results.totalScore}%. Critères excellents: ${criteriaExcellent.map(c => c.name).join(', ')}` },
            { role: 'assistant', content: feedback }
        );
        
        addMessage(feedback, 'bot');
        
        // Add appel d'offre suggestion after a short delay
        setTimeout(() => {
            addMessage("📝 **Astuce** : Vous avez un appel d'offre à venir ? Envoyez-moi le document (.docx) ou copiez-collez les critères RSE et je vous dirai lesquels vous pouvez déjà cocher grâce à vos atouts identifiés ! 📎", 'bot');
        }, 1500);
        
    } catch (error) {
        hideTyping();
        console.error('Feedback generation error:', error);
        
        // Provide comprehensive local analysis when API fails (e.g., CORS on GitHub Pages)
        generateLocalQuizAnalysis(results, companyInfo, criteriaExcellent, criteriaMet, criteriaToImprove, strongAreas, weakAreas);
    }
}

// Generate comprehensive local analysis without API (for CORS issues or API unavailable)
function generateLocalQuizAnalysis(results, companyInfo, criteriaExcellent, criteriaMet, criteriaToImprove, strongAreas, weakAreas) {
    const sector = companyInfo.sector || 'général';
    
    // Build comprehensive feedback message
    let msg = `🎉 **Félicitations pour avoir complété le quiz RSE !**\n\n`;
    msg += `📊 **Votre score** : **${results.totalScore}%** - Niveau **${results.maturityLevel.level}** ${results.maturityLevel.emoji}\n\n`;
    
    // Section 1: Strong points to communicate
    if (criteriaExcellent.length > 0) {
        msg += `---\n\n### 🌟 VOS ATOUTS RSE À VALORISER IMMÉDIATEMENT\n\n`;
        msg += `Vous excellez dans **${criteriaExcellent.length} critère(s)** que vous pouvez mettre en avant :\n\n`;
        
        criteriaExcellent.forEach(c => {
            msg += `✅ **${c.name}**\n`;
            msg += `   📢 *${getCommunicationTip(c.name, sector)}*\n\n`;
        });
    }
    
    // Section 2: Well-engaged criteria
    if (criteriaMet.length > 0) {
        msg += `### 🟢 CRITÈRES BIEN ENGAGÉS\n\n`;
        msg += `Ces ${criteriaMet.length} point(s) peuvent aussi être valorisés :\n\n`;
        
        criteriaMet.slice(0, 4).forEach(c => {
            msg += `• ${c.name}\n`;
        });
        msg += `\n`;
    }
    
    // Section 3: Priority improvements
    if (criteriaToImprove.length > 0) {
        msg += `---\n\n### 🎯 PLAN D'ACTION PRIORITAIRE\n\n`;
        
        const topPriorities = criteriaToImprove.slice(0, 3);
        topPriorities.forEach(c => {
            const actions = getImprovementActions(c.name, sector);
            msg += `**${c.name}**\n`;
            msg += `   ✅ Action rapide : ${actions.quick}\n`;
            msg += `   ✅ Cette semaine : ${actions.week}\n\n`;
        });
    }
    
    // Section 4: Tips for tenders (appels d'offre)
    msg += `---\n\n### 📋 POUR VOS APPELS D'OFFRE\n\n`;
    
    if (criteriaExcellent.length > 0 || criteriaMet.length > 0) {
        msg += `**Cases que vous pouvez déjà cocher :**\n`;
        
        const allStrong = [...criteriaExcellent, ...criteriaMet].slice(0, 5);
        allStrong.forEach(c => {
            const tenderTip = getTenderCheckbox(c.name);
            if (tenderTip) {
                msg += `☑️ ${tenderTip}\n`;
            }
        });
        msg += `\n`;
    }
    
    msg += `**💡 Conseil** : Dans vos réponses aux appels d'offre, détaillez vos actions avec des chiffres concrets (% d'achats locaux, nombre de formations, tonnes de déchets recyclés...).\n\n`;
    
    // Section 5: Communication tips
    msg += `---\n\n### 📢 COMMUNIQUEZ SUR VOS ENGAGEMENTS\n\n`;
    msg += `• **LinkedIn** : Partagez une action RSE par mois\n`;
    msg += `• **Site web** : Créez une page "Nos engagements"\n`;
    msg += `• **Presse locale** : Contactez Corse-Matin pour un article\n`;
    msg += `• **Appels d'offre** : Joignez un mémo RSE à vos candidatures\n`;
    
    addMessage(msg, 'bot');
    
    // Follow-up message
    setTimeout(() => {
        addMessage(`📝 **Envoyez-moi un appel d'offre** (.docx) ou décrivez les critères RSE demandés, et je vous dirai lesquels vous pouvez déjà cocher ! 📎`, 'bot');
    }, 1500);
}

// Helper: Get communication tip based on criteria
function getCommunicationTip(criteriaName, sector) {
    const tips = {
        "Vision/mission RSE formalisée": "Publiez votre charte RSE sur votre site et LinkedIn",
        "Intégration des enjeux sociaux/environnementaux dans les décisions": "Mentionnez-le dans vos réponses aux appels d'offre",
        "Référent RSE désigné": "Indiquez le nom et rôle de votre référent dans vos documents",
        "Vérification des pratiques sociales des fournisseurs": "Créez une charte fournisseurs que vous pouvez partager",
        "Dispositifs anti-discrimination": "Valorisez votre politique RH inclusive",
        "Canal de signalement éthique": "Mentionnez ce dispositif dans votre rapport RSE",
        "Évaluation du bien-être collaborateurs": "Partagez vos résultats d'enquête (anonymisés)",
        "Politique de formation développée": "Communiquez le nombre d'heures de formation par salarié",
        "Gestion proactive santé/sécurité": "Affichez vos indicateurs : jours sans accident, formations...",
        "Bilan carbone réalisé": "Publiez votre bilan et vos objectifs de réduction",
        "Démarche réduction des déchets": "Quantifiez : tonnes recyclées, % de réduction",
        "Gestion active de l'énergie": "Communiquez vos économies d'énergie en %",
        "Charte éthique / code de conduite": "Rendez-la publique sur votre site",
        "Achats responsables avec critères RSE": "Mentionnez le % de fournisseurs locaux/certifiés",
        "Transparence des pratiques commerciales": "Mettez en avant votre politique de prix clairs",
        "Information client complète": "Créez des fiches produits détaillées",
        "Offre de produits/services durables": "Labellez ou certifiez vos produits durables",
        "Service client structuré": "Affichez votre taux de satisfaction client",
        "Achats locaux significatifs (Corse)": "Indiquez le % d'achats en Corse sur vos supports",
        "Engagement associatif / mécénat local": "Partagez vos partenariats sur les réseaux sociaux",
        "Emploi local et insertion professionnelle": "Communiquez le nombre d'emplois créés localement"
    };
    return tips[criteriaName] || "Documentez cette action et partagez-la";
}

// Helper: Get improvement actions based on criteria
function getImprovementActions(criteriaName, sector) {
    const actions = {
        "Vision/mission RSE formalisée": {
            quick: "Rédigez 3 phrases sur vos valeurs RSE",
            week: "Formalisez une charte d'1 page avec vos engagements"
        },
        "Référent RSE désigné": {
            quick: "Désignez un collaborateur volontaire",
            week: "Définissez ses missions et communiquez en interne"
        },
        "Bilan carbone réalisé": {
            quick: "Testez l'outil gratuit Nos Gestes Climat (entreprise)",
            week: "Réalisez un bilan simplifié avec l'ADEME"
        },
        "Démarche réduction des déchets": {
            quick: "Installez le tri sélectif avec signalétique",
            week: "Contactez un prestataire de recyclage local"
        },
        "Gestion active de l'énergie": {
            quick: "Relevez vos consommations des 12 derniers mois",
            week: "Identifiez 3 actions d'économie (LED, programmation chauffage...)"
        },
        "Charte éthique / code de conduite": {
            quick: "Listez 5-10 principes éthiques clés",
            week: "Rédigez et diffusez une charte d'1-2 pages"
        },
        "Achats locaux significatifs (Corse)": {
            quick: "Listez vos fournisseurs actuels et leur localisation",
            week: "Identifiez 2-3 alternatives locales pour vos achats principaux"
        },
        "Engagement associatif / mécénat local": {
            quick: "Identifiez 2-3 associations locales à soutenir",
            week: "Proposez un premier partenariat (temps, matériel ou don)"
        },
        "Évaluation du bien-être collaborateurs": {
            quick: "Créez un questionnaire de 5-10 questions",
            week: "Diffusez l'enquête et analysez les résultats"
        },
        "Politique de formation développée": {
            quick: "Recensez les besoins de formation de chaque collaborateur",
            week: "Établissez un plan de formation annuel"
        }
    };
    
    return actions[criteriaName] || {
        quick: "Documentez vos pratiques actuelles",
        week: "Définissez un objectif mesurable d'amélioration"
    };
}

// Helper: Get tender checkbox text
function getTenderCheckbox(criteriaName) {
    const checkboxes = {
        "Vision/mission RSE formalisée": "Politique RSE formalisée",
        "Référent RSE désigné": "Référent développement durable identifié",
        "Bilan carbone réalisé": "Bilan GES / Bilan carbone réalisé",
        "Démarche réduction des déchets": "Plan de gestion des déchets",
        "Gestion active de l'énergie": "Démarche d'efficacité énergétique",
        "Charte éthique / code de conduite": "Charte éthique / Code de conduite",
        "Achats responsables avec critères RSE": "Politique d'achats responsables",
        "Achats locaux significatifs (Corse)": "Recours aux circuits courts / fournisseurs locaux",
        "Emploi local et insertion professionnelle": "Clause d'insertion / Emploi local",
        "Politique de formation développée": "Plan de formation des collaborateurs",
        "Gestion proactive santé/sécurité": "Politique santé-sécurité au travail",
        "Engagement associatif / mécénat local": "Actions de mécénat / Engagement territorial",
        "Dispositifs anti-discrimination": "Politique de diversité et inclusion",
        "Canal de signalement éthique": "Dispositif d'alerte éthique",
        "Offre de produits/services durables": "Offre éco-responsable / Labels environnementaux"
    };
    return checkboxes[criteriaName] || null;
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
    analyzeQuizResults: generateQuizFeedback,
    // New function for document analysis
    analyzeUploadedDocument: analyzeUploadedDocument
};

// Analyze uploaded document (PDF or image)
async function analyzeUploadedDocument() {
    if (!uploadedFile || !uploadedFileBase64) {
        addMessage("⚠️ Veuillez d'abord importer un document (PDF ou image) en cliquant sur 📎", 'bot');
        return;
    }
    
    addMessage(`🔍 Analyse de "${uploadedFile.name}" en cours...`, 'user');
    showTyping();
    
    try {
        // Check API key
        if (GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
            hideTyping();
            addMessage("⚠️ Le chatbot IA n'est pas configuré. Configurez la clé API Groq pour analyser les documents.", 'bot');
            return;
        }
        
        let response;
        
        if (uploadedFile.type === 'application/pdf') {
            // For PDFs, we'll use a text-based approach with instructions
            response = await analyzePDFDocument();
        } else {
            // For images, use vision API
            response = await analyzeImageDocument();
        }
        
        hideTyping();
        addMessage(response, 'bot');
        
        // Clear the file after analysis
        clearUploadedFile();
        
    } catch (error) {
        hideTyping();
        console.error('Document analysis error:', error);
        addMessage(`⚠️ **Erreur lors de l'analyse du document.**

Cela peut être dû à :
- Un fichier corrompu ou mal formaté
- Une surcharge temporaire du service

### Alternatives :
1. **Réessayez** avec un autre fichier Word (.docx)
2. **Copiez-collez** le texte directement dans le chat
3. **Décrivez-moi** le contenu de votre appel d'offre

Je reste disponible pour vous aider ! 💬`, 'bot');
        clearUploadedFile();
    }
}
