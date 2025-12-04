// =======================================================
// 🚨 ÉTAPE 1 : REMPLACER CES VALEURS PAR VOTRE CONFIG FIREBASE
// (Assurez-vous qu'elles sont les mêmes que pour la connexion)
// =======================================================
  const firebaseConfig = {
    apiKey: "AIzaSyD_5knDURmlPBeT5pAKKGybokRQsr2_mbE",
    authDomain: "mon-site-d662c.firebaseapp.com",
    projectId: "mon-site-d662c",
    storageBucket: "mon-site-d662c.firebasestorage.app",
    messagingSenderId: "62959702182",
    appId: "1:62959702182:web:a353be2dee91684a8da467",
    measurementId: "G-6XSZ9WWD9G"
  };
// Initialisation de Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =======================================================
// ÉTAPE 2 : GESTION DES FORMULAIRES
// =======================================================

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form'); // Peut être null si on est sur register.html
const messageElement = document.getElementById('message');

// ... (Les fonctions displayMessage et handleAuthError restent les mêmes) ...

// Fonction utilitaire pour afficher les messages
function displayMessage(text, isError = false) {
    if (!messageElement) return; // Sécurité si l'élément n'est pas trouvé
    messageElement.textContent = text;
    if (isError) {
        messageElement.style.backgroundColor = '#f8d7da'; 
        messageElement.style.color = '#721c24';          
    } else {
        messageElement.style.backgroundColor = '#d4edda'; 
        messageElement.style.color = '#155724';          
    }
}

// Fonction pour gérer les erreurs d'authentification
// Fonction pour gérer les erreurs d'authentification
function handleAuthError(error) {
 let errorMessage = "Erreur.";
 
 switch (error.code) {
 // 🚨 AJOUTER LE NOUVEAU CODE D'ERREUR DE CONNEXION ICI
    case 'auth/invalid-login-credentials': // <--- AJOUTER CETTE LIGNE
 case 'auth/user-not-found':
 case 'auth/wrong-password':
 errorMessage = "Email ou mot de passe incorrect."; // Message simple et sécurisé
 break;

 case 'auth/invalid-email':
 errorMessage = "Format d'e-mail invalide.";
 break;
 case 'auth/weak-password':
 errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
 break;
 case 'auth/email-already-in-use':
 errorMessage = "Cette adresse e-mail est déjà utilisée.";
 break;

default:
 console.error(error.message);
 // Message d'erreur technique générique (pour tout autre cas)
 errorMessage = "Une erreur technique inattendue est survenue. Veuillez réessayer plus tard.";
 break;
 }
 displayMessage(errorMessage, true);
}


// --- GESTION DE L'INSCRIPTION (Register) ---
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        displayMessage("Inscription en cours...");

        // Appel de la méthode de création d'utilisateur de Firebase
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Inscription et connexion réussies
                displayMessage(`Bienvenue ${userCredential.user.email} ! Votre compte est créé. Redirection...`, false);
                
                // OPTIONNEL : Redirection après 2 secondes
                // setTimeout(() => {
                //     window.location.href = "/dashboard.html"; 
                // }, 2000);
            })
            .catch(handleAuthError);
    });
}


// --- GESTION DE LA CONNEXION (Login) ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        displayMessage("Connexion en cours...");

        // Appel de la méthode de connexion de Firebase
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                displayMessage(`Connexion réussie pour ${userCredential.user.email} ! Redirection...`, false);
                
                // OPTIONNEL : Redirection après 2 secondes
                 setTimeout(() => {
                     window.location.href = "/dashboard.html"; 
                }, 2000);
            })
            .catch(handleAuthError);
    });
}