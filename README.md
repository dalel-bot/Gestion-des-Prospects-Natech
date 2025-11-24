# 📊 Système de Gestion des Prospects - Natech Training

![Natech Training](https://www.natech-training.com/wp-content/uploads/2017/01/Logo-site-Natech.png)

> **Application web professionnelle** de gestion des prospects pour Natech Training, centre de formation professionnelle spécialisé en construction métallique, soudage, sécurité et bâtiment en Tunisie.

---

## 🎯 Objectif du Projet

Cette application a été développée pour résoudre le défi majeur de Natech Training : **gérer efficacement des centaines d'appels téléphoniques quotidiens** et garantir qu'aucune demande de formation ne soit perdue.

### Problématique initiale
- Centaines d'appels par jour
- Difficultés à retenir toutes les informations (nom, téléphone, formation demandée)
- Risque de perte de prospects qualifiés
- Absence de suivi structuré

### Solution apportée
Application web complète permettant de :
- ✅ Enregistrer rapidement tous les prospects
- ✅ Suivre l'état de chaque demande
- ✅ Programmer des rappels automatiques
- ✅ Analyser les performances avec statistiques en temps réel
- ✅ Collaborer à 3 utilisateurs simultanément

---

## ✨ Fonctionnalités Principales

### 📈 Dashboard Interactif
- **Statistiques en temps réel** : Appels du jour, prospects à rappeler, inscrits, taux de conversion
- **Graphiques dynamiques** : Répartition par statut, top 5 formations demandées
- **Prospects urgents** : Vue prioritaire des demandes critiques
- **Activité récente** : Historique des dernières interactions

### 👥 Gestion des Prospects
- **Liste complète** avec pagination
- **Filtres avancés** : Par statut, catégorie, urgence, utilisateur assigné
- **Recherche globale** : Recherche instantanée par nom, téléphone, email, formation
- **Système de statuts** :
  - 🔵 Nouveau
  - 🟡 À rappeler
  - 🟣 En cours
  - 🟢 Inscrit
  - 🔴 Perdu
  - ⚪ Reporté

### 📝 Fiche Prospect Complète
Chaque prospect contient :
- **Informations personnelles** : Nom, téléphone, email
- **Détails formation** : Formation demandée, catégorie, niveau d'expérience
- **Contexte professionnel** : Entreprise/organisme, statut (Entreprise/Salarié/Demandeur d'emploi)
- **Gestion** : Urgence, statut, utilisateur assigné, date de rappel
- **Communication** : Langue de contact (Français/Arabe/Anglais), notes détaillées
- **Historique** : Date d'appel, source du contact, score de qualification

### 🎓 Catalogue des Formations
**50+ formations disponibles** réparties en 7 catégories :

1. **Construction Métallique & Soudage**
   - Technique de soudage TIG, MIG-MAG, Électrode enrobée
   - Soudage tuyauterie et pipe (Pipeline)
   - Soudage aluminium et inox
   - Tourneur-Fraiseur
   - Contrôle destructif et non destructif

2. **Industrie & Maintenance**
   - Systèmes hydrauliques industriels
   - Systèmes pneumatiques
   - GMAO (Gestion Maintenance Assistée)
   - TPM (Maintenance Productive Totale)
   - Pont roulant & chariot élévateur

3. **Logiciels CAO/DAO**
   - AutoCAD 2D/3D
   - SolidWorks
   - Catia
   - 3DS Max
   - ArchiCAD
   - COVADIS

4. **Sécurité Électronique & Domotique**
   - Systèmes d'alarme et caméras
   - Contrôle d'accès et pointage
   - Domotique (KNX, YOKIS, DELTA DORE)
   - Détection d'incendie avancée

5. **Santé & Sécurité au Travail (SST)**
   - Responsable QHSE (ISO 9001, ISO 14001, OHSAS 18001)
   - Premiers secours & Secourisme
   - Prévention risques électriques
   - Prévention incendie & manipulation RIA
   - Travail en hauteur & EPI
   - Ergonomie et manutention
   - Superviseur HSE
   - Conduite défensive

6. **Sécurité & Sûreté Physique**
   - Agent de prévention et de sécurité
   - Responsable sécurité et sûreté
   - Contrôleur des agents de sécurité
   - Agent de sécurité transport d'argent
   - Convoyeur de fonds

7. **Construction Bâtiments**
   - Courant faible/fort
   - Génie civil
   - Design & conception

### 📊 Statistiques Avancées
- **Graphique d'évolution** : Suivi mensuel des nouveaux prospects et inscriptions
- **Répartition par catégorie** : Visualisation des formations les plus demandées
- **Performance par utilisateur** : Nombre d'inscriptions par collaborateur
- **Export Excel/CSV** : Téléchargement des données pour analyse externe

### 📅 Rappels Programmés
- Vue calendrier des rappels à venir
- Tri par date et priorité
- Notification visuelle des rappels urgents
- Accès rapide aux fiches prospects

### 🔔 Système de Notifications
- Notifications en temps réel
- Badges de comptage (nouveaux prospects, rappels, urgents)
- Toast notifications pour les actions
- Alertes visuelles

---

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Design moderne et responsive
- **JavaScript (ES6+)** : Logique applicative
- **Chart.js** : Graphiques interactifs
- **Font Awesome** : Iconographie professionnelle
- **Google Fonts (Inter)** : Typographie optimisée

### Backend & Base de données
- **RESTful Table API** : API REST intégrée pour CRUD
- **Tables gérées** :
  - `prospects` : Données des prospects (20 champs)
  - `formations` : Catalogue des formations (9 champs)
  - `interactions` : Historique des échanges (7 champs)

### Charte Graphique
- **Couleur primaire orange** : #FF8C00 (identité Natech)
- **Couleur secondaire bleue** : #0066CC (confiance, professionnalisme)
- **Design moderne** : Cards, gradients, ombres douces
- **Responsive** : Adapté mobile, tablette, desktop

---

## 📁 Structure du Projet

```
natech-prospects/
├── index.html              # Page principale de l'application
├── css/
│   └── style.css          # Styles complets (29KB)
├── js/
│   └── app.js             # Logique applicative (40KB)
└── README.md              # Documentation (ce fichier)
```

---

## 🚀 Démarrage Rapide

### Accès à l'Application

1. **Ouvrir le fichier `index.html`** dans votre navigateur
2. L'application se charge automatiquement avec **données de démonstration**

### Données de Démonstration

L'application est **pré-remplie** avec :
- ✅ **10 prospects** dans différents statuts
- ✅ **15 formations** populaires
- ✅ **10 interactions** récentes

Cela vous permet de **tester immédiatement** toutes les fonctionnalités sans configuration !

### Utilisateurs Prédéfinis

**3 utilisateurs** configurés :
1. **Nasredine Trabelsi** - nasredine.trabelsi@natech-training.com
2. **Amel Bouzaien** - amel.bouzaien@natech-training.com
3. **Khouloud** - khouloud@natech-training.com

**Contact administrateur** : chaheddalel@gmail.com

---

## 📱 Utilisation de l'Application

### 1️⃣ Dashboard
**Vue d'ensemble complète**
- Consultez les statistiques du jour
- Identifiez les prospects urgents
- Suivez votre activité récente

### 2️⃣ Ajouter un Nouveau Prospect
1. Cliquez sur **"+ Nouveau Prospect"** (bouton orange)
2. Remplissez le formulaire :
   - **Obligatoire** : Nom, téléphone, formation demandée
   - **Optionnel** : Email, entreprise, notes, etc.
3. Cliquez sur **"Enregistrer"**
4. ✅ Le prospect apparaît instantanément dans la liste !

### 3️⃣ Gérer les Prospects
- **Filtrer** : Utilisez les filtres (statut, catégorie, urgence, utilisateur)
- **Rechercher** : Tapez dans la barre de recherche globale
- **Modifier** : Cliquez sur l'icône ✏️ pour éditer
- **Appeler** : Cliquez sur l'icône 📞 pour lancer l'appel
- **Supprimer** : Cliquez sur l'icône 🗑️ (avec confirmation)

### 4️⃣ Suivre les Rappels
1. Allez dans **"Rappels"**
2. Consultez la liste des prospects à recontacter
3. Programmez de nouveaux rappels lors de l'édition d'un prospect

### 5️⃣ Analyser les Statistiques
1. Allez dans **"Statistiques"**
2. Consultez les graphiques d'évolution
3. Identifiez les formations les plus demandées
4. Comparez les performances de l'équipe

### 6️⃣ Exporter les Données
1. Dans la page **"Prospects"**
2. Cliquez sur **"Exporter Excel"**
3. Un fichier CSV est téléchargé automatiquement

---

## 🎨 Interface Utilisateur

### Navigation Sidebar
- **Dashboard** 📈 : Vue d'ensemble
- **Prospects** 👥 : Liste complète
- **Formations** 🎓 : Catalogue
- **Statistiques** 📊 : Analyses
- **Rappels** 📅 : Calendrier

### Topbar
- **Recherche globale** : Trouvez instantanément un prospect
- **Notifications** 🔔 : Alertes en temps réel
- **Ajouter** ➕ : Nouveau prospect rapide
- **Actualiser** 🔄 : Recharger les données

### Système de Badges
- 🟠 **Orange** : Nouveaux prospects
- 🔵 **Bleu** : Total prospects
- 🔴 **Rouge** : Rappels urgents

---

## 📊 API REST Disponible

L'application utilise l'API REST intégrée pour toutes les opérations :

### Endpoints Prospects

```javascript
// Liste des prospects (avec pagination)
GET /tables/prospects?page=1&limit=100

// Récupérer un prospect
GET /tables/prospects/{id}

// Créer un prospect
POST /tables/prospects
Body: { nom_complet, telephone, formation_demandee, ... }

// Mettre à jour un prospect
PUT /tables/prospects/{id}
Body: { champs à modifier }

// Supprimer un prospect
DELETE /tables/prospects/{id}
```

### Endpoints Formations

```javascript
// Liste des formations
GET /tables/formations?limit=1000

// Détails d'une formation
GET /tables/formations/{id}
```

### Endpoints Interactions

```javascript
// Historique des interactions
GET /tables/interactions?limit=1000

// Ajouter une interaction
POST /tables/interactions
Body: { prospect_id, type_interaction, description, ... }
```

---

## 🎯 Cas d'Usage Typiques

### Scénario 1 : Appel Entrant
1. Vous recevez un appel d'un prospect
2. Cliquez sur **"+ Nouveau Prospect"**
3. Notez rapidement : nom, téléphone, formation demandée
4. Ajoutez des notes sur la conversation
5. Définissez une date de rappel si besoin
6. **Enregistrez** → Le prospect est sauvegardé !

### Scénario 2 : Suivi d'un Prospect
1. Allez dans **"Prospects"** ou **"Rappels"**
2. Identifiez le prospect à recontacter
3. Cliquez sur **📞 Appeler** (lance l'appel direct)
4. Après l'appel, cliquez sur **✏️ Modifier**
5. Mettez à jour le statut (ex: "En cours" → "Inscrit")
6. Ajoutez des notes sur l'échange
7. **Enregistrez** la mise à jour

### Scénario 3 : Analyse Mensuelle
1. Allez dans **"Statistiques"**
2. Consultez le graphique d'évolution
3. Identifiez les formations populaires
4. Comparez les performances de l'équipe
5. Allez dans **"Prospects"** → **"Exporter Excel"**
6. Analysez les données dans Excel pour rapport

### Scénario 4 : Gestion d'Équipe
1. Utilisez les filtres **"Assigné à"**
2. Visualisez les prospects par collaborateur
3. Rééquilibrez la charge de travail si nécessaire
4. Suivez les taux de conversion par utilisateur

---

## 🔧 Configuration Avancée

### Modifier les Utilisateurs

Dans `js/app.js`, ligne 11 :
```javascript
const APP_CONFIG = {
    utilisateurs: ['Nasredine', 'Amel', 'Khouloud'],
    currentUser: 'Nasredine', // Utilisateur par défaut
    ...
};
```

### Personnaliser les Couleurs

Dans `css/style.css`, ligne 7-12 :
```css
:root {
    --color-primary-orange: #FF8C00;
    --color-primary-blue: #0066CC;
    /* Modifier selon votre charte graphique */
}
```

### Ajouter une Formation

Utilisez l'API REST :
```javascript
await apiCall('tables/formations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nom: 'Nouvelle Formation',
        categorie: 'Construction Métallique & Soudage',
        duree: '40 heures',
        reference: 'CS20',
        public_cible: 'Techniciens',
        popularite: 0
    })
});
```

---

## 📈 Statistiques & Métriques

### Données Actuelles (Démo)

| Métrique | Valeur |
|----------|--------|
| **Total prospects** | 10 |
| **Nouveaux** | 1 |
| **À rappeler** | 4 |
| **En cours** | 2 |
| **Inscrits** | 1 |
| **Perdus** | 1 |
| **Reportés** | 1 |
| **Formations disponibles** | 15 |
| **Catégories** | 7 |

### Formations les Plus Demandées (Démo)

1. 🥇 **Agent de prévention et de sécurité** (178 demandes/an)
2. 🥈 **Premiers secours & Secourisme** (156 demandes/an)
3. 🥉 **Technique de soudage TIG** (145 demandes/an)
4. **Responsable QHSE** (132 demandes/an)
5. **AutoCAD 2D/3D** (121 demandes/an)

---

## 🔐 Sécurité & Confidentialité

### Données Stockées Localement
- Les données sont stockées dans la base de données intégrée
- Backup automatique géré par le système
- Accès sécurisé via authentification

### Bonnes Pratiques
- ✅ Ne partagez pas les identifiants
- ✅ Déconnectez-vous après utilisation
- ✅ Exportez régulièrement les données (backup)
- ✅ Vérifiez les informations avant suppression

---

## 📱 Responsive Design

L'application est **100% responsive** et fonctionne sur :

- 💻 **Desktop** : Expérience complète
- 📱 **Smartphone** : Interface optimisée
- 📲 **Tablette** : Mise en page adaptée

**Breakpoints** :
- Desktop : > 1024px
- Tablette : 768px - 1024px
- Mobile : < 768px

---

## 🆘 Support & Assistance

### Problème Technique ?

1. **Rechargez la page** (Ctrl+R ou Cmd+R)
2. **Videz le cache** du navigateur
3. **Vérifiez votre connexion** internet
4. **Contactez le support** si le problème persiste

### Contact Support

- 📧 Email : chaheddalel@gmail.com
- 📞 Téléphone : +216 51 729 371
- 🌐 Site web : https://www.natech-training.com

### Équipe Natech Training

- **Nasredine Trabelsi** - nasredine.trabelsi@natech-training.com
- **Amel Bouzaien** - amel.bouzaien@natech-training.com
- **Khouloud** - khouloud@natech-training.com

---

## 🎓 Formation & Prise en Main

### Temps de Formation Estimé
- **Débutant** : 30 minutes
- **Utilisateur confirmé** : 10 minutes
- **Expert** : 5 minutes

### Tutoriels Vidéo (À venir)
- 🎥 Introduction à l'interface
- 🎥 Ajouter et gérer un prospect
- 🎥 Utiliser les filtres et la recherche
- 🎥 Interpréter les statistiques
- 🎥 Exporter les données

---

## 🚀 Prochaines Fonctionnalités

### En Cours de Développement

- 🤖 **Agent IA Téléphonique** : Réponse automatique aux appels 24/7
- 📧 **Envoi automatique d'emails** : Confirmations, rappels
- 📱 **Application mobile native** : iOS et Android
- 💬 **Intégration WhatsApp** : Communication directe
- 📊 **Rapports avancés** : PDF automatiques
- 🔔 **Rappels automatiques** : Notifications push
- 🌐 **Multi-langues** : Interface en français, arabe, anglais
- 🔗 **Intégration calendrier** : Google Calendar, Outlook
- 📞 **Enregistrement d'appels** : Archivage automatique
- 🎯 **Scoring intelligent** : Qualification automatique des prospects

---

## 📝 Notes Importantes

### Données de Démonstration
⚠️ Les données actuelles sont des **exemples fictifs** pour la démonstration.  
Pour utiliser en production, vous devrez :
1. Supprimer les données de démo
2. Configurer vos propres utilisateurs
3. Importer votre catalogue de formations
4. Commencer à enregistrer vos vrais prospects

### Performance
- L'application est optimisée pour gérer **plusieurs milliers de prospects**
- Temps de chargement : < 2 secondes
- Recherche instantanée avec indexation
- Graphiques générés en temps réel

### Compatibilité Navigateurs
- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer (non supporté)

---

## 📞 Informations Natech Training

**NATECH TRAINING**  
Centre de formation professionnelle continue agréé N°11-1442-16

### Coordonnées
- 📍 **Adresse** : 36 Avenue Abderrahmen Azzam, 1073 Montplaisir, Tunis
- 📞 **Téléphone** : +216 71 90 37 92 / +216 71 90 37 93
- 📱 **Mobile** : +216 28 85 73 46 / +216 98 10 90 55-59
- 📧 **Email** : contact@natech-training.com
- 🌐 **Site web** : https://www.natech-training.com

### Réseaux Sociaux
- Facebook : Natech Training
- LinkedIn : Natech Training
- Instagram : Natech.Training

---

## 📄 Licence & Copyright

© 2025 **Natech Training**. Tous droits réservés.

Cette application a été développée spécifiquement pour Natech Training.  
Toute reproduction, distribution ou modification non autorisée est interdite.

---

## 🎉 Remerciements

Merci à toute l'équipe Natech Training pour leur confiance et leur collaboration dans le développement de cette solution !

**Développé avec ❤️ pour optimiser la gestion des prospects chez Natech Training.**

---

## 📚 Documentation Technique

### Architecture
```
┌─────────────────────────────────────────┐
│         Interface Utilisateur           │
│  (HTML5 + CSS3 + JavaScript ES6+)      │
└─────────────────┬───────────────────────┘
                  │
                  │ API Calls (Fetch)
                  │
┌─────────────────▼───────────────────────┐
│          RESTful Table API              │
│  (CRUD Operations + Pagination)         │
└─────────────────┬───────────────────────┘
                  │
                  │ Data Storage
                  │
┌─────────────────▼───────────────────────┐
│         Base de Données                 │
│  (prospects, formations, interactions)  │
└─────────────────────────────────────────┘
```

### Flux de Données
1. **Chargement initial** : Récupération de toutes les données via API
2. **État local** : Données stockées dans `appState` (JavaScript)
3. **Modifications** : Envoi via API REST (POST/PUT/DELETE)
4. **Synchronisation** : Rechargement automatique après modification
5. **Affichage** : Mise à jour dynamique du DOM

---

**Version** : 1.0.0  
**Date de création** : Novembre 2025  
**Dernière mise à jour** : 24 novembre 2025

---

🚀 **Prêt à transformer votre gestion des prospects ?**  
👉 Ouvrez `index.html` et commencez dès maintenant !
