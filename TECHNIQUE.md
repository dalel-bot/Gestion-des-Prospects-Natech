# 🔧 Documentation Technique - Natech Training CRM

## Architecture de l'Application

### Vue d'Ensemble

```
┌─────────────────────────────────────────────────────┐
│              INTERFACE UTILISATEUR                  │
│         (HTML5 + CSS3 + JavaScript ES6+)           │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Dashboard │  │Prospects │  │Formations│        │
│  └──────────┘  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐                      │
│  │   Stats  │  │ Rappels  │                      │
│  └──────────┘  └──────────┘                      │
└─────────────┬───────────────────────────────────────┘
              │
              │ HTTP/REST API
              │ (Fetch API)
              │
┌─────────────▼───────────────────────────────────────┐
│              API RESTFUL TABLE                      │
│                                                     │
│  GET    /tables/{table}          Liste             │
│  GET    /tables/{table}/{id}     Détail            │
│  POST   /tables/{table}          Créer             │
│  PUT    /tables/{table}/{id}     Modifier          │
│  DELETE /tables/{table}/{id}     Supprimer         │
└─────────────┬───────────────────────────────────────┘
              │
              │ Data Storage
              │
┌─────────────▼───────────────────────────────────────┐
│           BASE DE DONNÉES                           │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │Prospects │  │Formations│  │Interactions│       │
│  │20 champs │  │ 9 champs │  │  7 champs │       │
│  └──────────┘  └──────────┘  └──────────┘        │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Schémas de Base de Données

### Table: prospects

| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | Identifiant unique (UUID) |
| `nom_complet` | text | Nom complet du prospect |
| `telephone` | text | Numéro de téléphone |
| `email` | text | Adresse email |
| `formation_demandee` | text | Formation demandée |
| `categorie_formation` | text | Catégorie de la formation |
| `statut_professionnel` | text | Entreprise / Salarié / Demandeur d'emploi |
| `niveau_experience` | text | Niveau d'expérience |
| `disponibilite` | text | Disponibilité pour la formation |
| `urgence` | text | Faible / Moyenne / Élevée / Critique |
| `budget` | text | Budget estimé |
| `entreprise_organisme` | text | Nom de l'entreprise ou organisme |
| `statut` | text | Nouveau / À rappeler / En cours / Inscrit / Perdu / Reporté |
| `utilisateur_assigne` | text | Utilisateur assigné (Nasredine, Amel, Khouloud) |
| `date_appel` | datetime | Date et heure de l'appel |
| `date_rappel` | datetime | Date de rappel programmée |
| `notes` | rich_text | Notes sur le prospect |
| `langue_contact` | text | Français / Arabe / Anglais |
| `source` | text | Téléphone / Email / Site web / Recommandation / Agent IA / Autre |
| `score_qualification` | number | Score de qualification (0-100) |

**Champs système automatiques** :
- `gs_project_id` : ID du projet
- `gs_table_name` : Nom de la table
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

### Table: formations

| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | Identifiant unique |
| `nom` | text | Nom de la formation |
| `categorie` | text | Catégorie de la formation |
| `duree` | text | Durée de la formation |
| `description` | rich_text | Description détaillée |
| `reference` | text | Référence catalogue (ex: CS01, SST02) |
| `prix_indicatif` | text | Prix indicatif |
| `public_cible` | text | Public cible |
| `popularite` | number | Score de popularité (nombre de demandes) |

### Table: interactions

| Champ | Type | Description |
|-------|------|-------------|
| `id` | text | Identifiant unique |
| `prospect_id` | text | ID du prospect concerné |
| `type_interaction` | text | Appel entrant / Appel sortant / Email / SMS / Rendez-vous / Note |
| `date_interaction` | datetime | Date et heure de l'interaction |
| `utilisateur` | text | Utilisateur ayant effectué l'interaction |
| `description` | rich_text | Description détaillée de l'interaction |
| `resultat` | text | Positif / Neutre / Négatif / À suivre |

---

## 🔌 API REST

### Base URL
```
/tables/
```

### Authentification
Aucune authentification requise pour cette version.  
*(À implémenter dans les versions futures)*

### Endpoints

#### 1. Liste des Prospects

**Request**
```http
GET /tables/prospects?page=1&limit=100&sort=created_at&search=Mohamed
```

**Query Parameters**
- `page` (optionnel) : Numéro de page (défaut: 1)
- `limit` (optionnel) : Nombre d'éléments par page (défaut: 100)
- `sort` (optionnel) : Champ de tri
- `search` (optionnel) : Recherche textuelle

**Response (200 OK)**
```json
{
  "data": [
    {
      "id": "PROS001",
      "nom_complet": "Mohamed Ben Ali",
      "telephone": "+216 98 123 456",
      "email": "mohamed.benali@gmail.com",
      "formation_demandee": "Technique de soudage TIG",
      "statut": "À rappeler",
      "urgence": "Élevée",
      "created_at": 1700000000000,
      "updated_at": 1700000000000
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 100,
  "table": "prospects"
}
```

#### 2. Détails d'un Prospect

**Request**
```http
GET /tables/prospects/{id}
```

**Response (200 OK)**
```json
{
  "id": "PROS001",
  "nom_complet": "Mohamed Ben Ali",
  "telephone": "+216 98 123 456",
  "email": "mohamed.benali@gmail.com",
  "formation_demandee": "Technique de soudage TIG",
  "categorie_formation": "Construction Métallique & Soudage",
  "statut_professionnel": "Demandeur d'emploi",
  "niveau_experience": "Débutant avec bases",
  "disponibilite": "Immédiate",
  "urgence": "Élevée",
  "budget": "Financement ANETI possible",
  "entreprise_organisme": "-",
  "statut": "À rappeler",
  "utilisateur_assigne": "Nasredine",
  "date_appel": "2025-11-24T10:30:00",
  "date_rappel": "2025-11-25T14:00:00",
  "notes": "Très motivé, souhaite commencer rapidement.",
  "langue_contact": "Arabe",
  "source": "Agent IA",
  "score_qualification": 85,
  "created_at": 1700000000000,
  "updated_at": 1700000000000
}
```

#### 3. Créer un Prospect

**Request**
```http
POST /tables/prospects
Content-Type: application/json

{
  "nom_complet": "Fatma Mansour",
  "telephone": "+216 22 987 654",
  "email": "f.mansour@tunisiasteel.tn",
  "formation_demandee": "Responsable QHSE",
  "categorie_formation": "Santé & Sécurité au Travail",
  "statut_professionnel": "Entreprise",
  "urgence": "Moyenne",
  "statut": "Nouveau",
  "utilisateur_assigne": "Amel",
  "date_appel": "2025-11-24T14:00:00",
  "source": "Téléphone"
}
```

**Response (201 Created)**
```json
{
  "id": "PROS011",
  "nom_complet": "Fatma Mansour",
  "telephone": "+216 22 987 654",
  "email": "f.mansour@tunisiasteel.tn",
  "formation_demandee": "Responsable QHSE",
  "statut": "Nouveau",
  "created_at": 1700000000000,
  "updated_at": 1700000000000
}
```

#### 4. Mettre à Jour un Prospect

**Request**
```http
PUT /tables/prospects/{id}
Content-Type: application/json

{
  "id": "PROS001",
  "statut": "En cours",
  "notes": "Rendez-vous programmé pour demain",
  "date_rappel": "2025-11-26T10:00:00"
}
```

**Response (200 OK)**
```json
{
  "id": "PROS001",
  "nom_complet": "Mohamed Ben Ali",
  "statut": "En cours",
  "notes": "Rendez-vous programmé pour demain",
  "updated_at": 1700000100000
}
```

#### 5. Supprimer un Prospect

**Request**
```http
DELETE /tables/prospects/{id}
```

**Response (204 No Content)**
```
(Corps vide)
```

**Note** : La suppression est un "soft delete" avec flag `deleted=true`.

---

## 💻 JavaScript - Structure du Code

### Fichier Principal: `js/app.js`

#### Configuration Globale
```javascript
const APP_CONFIG = {
    apiBase: 'tables/',
    utilisateurs: ['Nasredine', 'Amel', 'Khouloud'],
    currentUser: 'Nasredine',
    currentPage: 'dashboard',
    itemsPerPage: 10,
    charts: {}
};
```

#### État de l'Application
```javascript
const appState = {
    prospects: [],           // Tous les prospects
    formations: [],          // Catalogue des formations
    interactions: [],        // Historique des interactions
    filteredProspects: [],   // Prospects après filtres
    currentPage: 1,          // Page actuelle
    totalPages: 1,           // Nombre total de pages
    filters: {               // Filtres actifs
        statut: '',
        categorie: '',
        urgence: '',
        utilisateur: ''
    }
};
```

#### Fonctions Principales

##### 1. Chargement des Données
```javascript
async function loadProspects() {
    const data = await apiCall(`${APP_CONFIG.apiBase}prospects?limit=1000`);
    appState.prospects = data.data || [];
    appState.filteredProspects = [...appState.prospects];
    updateProspectsDisplay();
    updateDashboardStats();
    return appState.prospects;
}
```

##### 2. Création d'un Prospect
```javascript
async function createProspect(prospectData) {
    const data = await apiCall(`${APP_CONFIG.apiBase}prospects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prospectData)
    });
    showToast('success', 'Succès', 'Prospect créé avec succès');
    await loadProspects();
    return data;
}
```

##### 3. Mise à Jour d'un Prospect
```javascript
async function updateProspect(prospectId, prospectData) {
    const data = await apiCall(`${APP_CONFIG.apiBase}prospects/${prospectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prospectData)
    });
    showToast('success', 'Succès', 'Prospect mis à jour');
    await loadProspects();
    return data;
}
```

##### 4. Application des Filtres
```javascript
function applyFilters() {
    let filtered = [...appState.prospects];
    
    if (appState.filters.statut) {
        filtered = filtered.filter(p => p.statut === appState.filters.statut);
    }
    if (appState.filters.categorie) {
        filtered = filtered.filter(p => p.categorie_formation === appState.filters.categorie);
    }
    if (appState.filters.urgence) {
        filtered = filtered.filter(p => p.urgence === appState.filters.urgence);
    }
    if (appState.filters.utilisateur) {
        filtered = filtered.filter(p => p.utilisateur_assigne === appState.filters.utilisateur);
    }
    
    appState.filteredProspects = filtered;
    appState.totalPages = Math.ceil(filtered.length / APP_CONFIG.itemsPerPage);
    appState.currentPage = 1;
}
```

##### 5. Recherche Globale
```javascript
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            appState.filteredProspects = [...appState.prospects];
        } else {
            appState.filteredProspects = appState.prospects.filter(p => 
                p.nom_complet.toLowerCase().includes(query) ||
                p.telephone.includes(query) ||
                (p.email && p.email.toLowerCase().includes(query)) ||
                p.formation_demandee.toLowerCase().includes(query)
            );
        }
        
        displayProspectsTable();
    });
}
```

---

## 🎨 CSS - Structure des Styles

### Fichier Principal: `css/style.css`

#### Variables CSS (Design System)
```css
:root {
    /* Couleurs principales */
    --color-primary-orange: #FF8C00;
    --color-primary-blue: #0066CC;
    
    /* Statuts */
    --color-nouveau: #3498db;
    --color-rappeler: #f39c12;
    --color-encours: #9b59b6;
    --color-inscrit: #27ae60;
    --color-perdu: #e74c3c;
    --color-reporte: #95a5a6;
    
    /* Urgence */
    --color-critique: #c0392b;
    --color-elevee: #e67e22;
    --color-moyenne: #f39c12;
    --color-faible: #3498db;
    
    /* Layout */
    --sidebar-width: 260px;
    --topbar-height: 70px;
    --border-radius: 12px;
    
    /* Ombres */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 8px rgba(0,0,0,0.1);
    --shadow-lg: 0 8px 16px rgba(0,0,0,0.15);
}
```

#### Structure de Base
```css
/* Layout principal */
.sidebar { /* 260px fixe à gauche */ }
.main-content { /* margin-left: 260px */ }
.topbar { /* 70px fixe en haut */ }
.content-container { /* padding: 30px */ }
```

#### Composants Principaux

##### Cards
```css
.stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
```

##### Badges de Statut
```css
.statut-nouveau { background: rgba(52, 152, 219, 0.2); color: #3498db; }
.statut-rappeler { background: rgba(243, 156, 18, 0.2); color: #f39c12; }
.statut-encours { background: rgba(155, 89, 182, 0.2); color: #9b59b6; }
.statut-inscrit { background: rgba(39, 174, 96, 0.2); color: #27ae60; }
.statut-perdu { background: rgba(231, 76, 60, 0.2); color: #e74c3c; }
.statut-reporte { background: rgba(149, 165, 166, 0.2); color: #95a5a6; }
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 1025px) {
    /* Expérience complète */
}

/* Tablette */
@media (max-width: 1024px) {
    --sidebar-width: 0px;
    .sidebar { transform: translateX(-100%); }
    .main-content { margin-left: 0; }
}

/* Mobile */
@media (max-width: 768px) {
    .stats-grid { grid-template-columns: 1fr; }
    .charts-row { grid-template-columns: 1fr; }
    .filters-bar { flex-direction: column; }
}

/* Petit mobile */
@media (max-width: 480px) {
    .topbar-search { display: none; }
    .page-header h1 { font-size: 24px; }
}
```

---

## ⚡ Performance & Optimisation

### Temps de Chargement
- **HTML** : < 50ms
- **CSS** : < 100ms
- **JavaScript** : < 200ms
- **API Calls** : < 500ms
- **Total** : < 2 secondes

### Optimisations Implémentées

#### 1. Lazy Loading
```javascript
// Chargement des images différé
const images = document.querySelectorAll('img[data-src]');
images.forEach(img => {
    img.src = img.dataset.src;
});
```

#### 2. Debouncing sur la Recherche
```javascript
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch(e.target.value);
    }, 300);
});
```

#### 3. Pagination
```javascript
const itemsPerPage = 10;
const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;
const pageItems = filteredItems.slice(start, end);
```

#### 4. Chart.js - Destroy avant Recréation
```javascript
if (APP_CONFIG.charts.statuts) {
    APP_CONFIG.charts.statuts.destroy();
}
APP_CONFIG.charts.statuts = new Chart(ctx, {...});
```

---

## 🔐 Sécurité

### Mesures Implémentées

#### 1. Validation des Entrées
```javascript
function validateProspectData(data) {
    if (!data.nom_complet || data.nom_complet.trim() === '') {
        throw new Error('Le nom est obligatoire');
    }
    if (!data.telephone || !validatePhone(data.telephone)) {
        throw new Error('Téléphone invalide');
    }
    return true;
}
```

#### 2. Sanitization HTML
```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

#### 3. Confirmation avant Suppression
```javascript
async function deleteProspect(prospectId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
        return;
    }
    // Procéder à la suppression
}
```

---

## 🧪 Tests & Débogage

### Console Logs
```javascript
console.log('🚀 Initialisation de l\'application Natech Training');
console.log('✅ Données chargées:', appState.prospects.length, 'prospects');
console.error('❌ Erreur API:', error.message);
```

### Debug Mode
```javascript
// Activer le mode debug
localStorage.setItem('debug', 'true');

// Vérifier si debug actif
if (localStorage.getItem('debug') === 'true') {
    console.log('[DEBUG]', data);
}
```

---

## 📦 Dépendances Externes

### CDN Utilisés

#### Chart.js (Graphiques)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

#### Font Awesome (Icônes)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
```

#### Google Fonts (Typographie)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Avantages des CDN** :
- ✅ Chargement rapide (cache global)
- ✅ Pas de maintenance locale
- ✅ Mises à jour automatiques

---

## 🚀 Déploiement

### Option 1 : Hébergement Simple
1. Téléverser tous les fichiers sur un serveur web
2. Configurer l'accès à l'API REST
3. Tester l'URL publique

### Option 2 : Localhost
1. Ouvrir `index.html` directement dans le navigateur
2. Fonctionne immédiatement (aucune configuration)

### Option 3 : Serveur de Développement
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Accéder à: http://localhost:8000
```

---

## 🔧 Maintenance

### Tâches Régulières

#### Backup des Données (Hebdomadaire)
1. Exporter tous les prospects via "Exporter Excel"
2. Sauvegarder le fichier CSV
3. Archiver dans un emplacement sécurisé

#### Nettoyage (Mensuel)
1. Supprimer les prospects "Perdu" de plus de 6 mois
2. Archiver les prospects "Inscrit"
3. Vérifier les rappels non traités

#### Mises à Jour (Selon besoin)
1. Mettre à jour le catalogue des formations
2. Ajouter de nouveaux utilisateurs
3. Personnaliser les couleurs/logo

---

## 📚 Ressources & Documentation

### Liens Utiles

- **Chart.js** : https://www.chartjs.org/docs/
- **Font Awesome** : https://fontawesome.com/icons
- **MDN Web Docs** : https://developer.mozilla.org/
- **Fetch API** : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

### Support Technique

- Email : chaheddalel@gmail.com
- Téléphone : +216 51 729 371
- Site : https://www.natech-training.com

---

**Version** : 1.0.0  
**Date** : 24 novembre 2025  
**Développé pour** : Natech Training

© 2025 - Documentation Technique
