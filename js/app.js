/**
 * NATECH TRAINING - SYSTÈME DE GESTION DES PROSPECTS
 * Application principale JavaScript
 */

// ==========================================
// CONFIGURATION & ÉTAT GLOBAL
// ==========================================

const APP_CONFIG = {
    apiBase: 'tables/',
    utilisateurs: ['Nasredine', 'Amel', 'Khouloud'],
    currentUser: 'Nasredine', // Par défaut
    currentPage: 'dashboard',
    itemsPerPage: 10,
    charts: {}
};

// État de l'application
const appState = {
    prospects: [],
    formations: [],
    interactions: [],
    filteredProspects: [],
    currentPage: 1,
    totalPages: 1,
    filters: {
        statut: '',
        categorie: '',
        urgence: '',
        utilisateur: ''
    }
};

// ==========================================
// API FUNCTIONS
// ==========================================

// Fonction générique pour les appels API
async function apiCall(endpoint, options = {}) {
    try {
        showLoading(true);
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur API:', error);
        showToast('error', 'Erreur', error.message);
        throw error;
    } finally {
        showLoading(false);
    }
}

// Charger les prospects
async function loadProspects() {
    try {
        const data = await apiCall(`${APP_CONFIG.apiBase}prospects?limit=1000`);
        appState.prospects = data.data || [];
        appState.filteredProspects = [...appState.prospects];
        updateProspectsDisplay();
        updateDashboardStats();
        return appState.prospects;
    } catch (error) {
        console.error('Erreur chargement prospects:', error);
    }
}

// Charger les formations
async function loadFormations() {
    try {
        const data = await apiCall(`${APP_CONFIG.apiBase}formations?limit=1000`);
        appState.formations = data.data || [];
        populateFormationsSelect();
        displayFormations();
        return appState.formations;
    } catch (error) {
        console.error('Erreur chargement formations:', error);
    }
}

// Charger les interactions
async function loadInteractions() {
    try {
        const data = await apiCall(`${APP_CONFIG.apiBase}interactions?limit=1000`);
        appState.interactions = data.data || [];
        return appState.interactions;
    } catch (error) {
        console.error('Erreur chargement interactions:', error);
    }
}

// Créer un prospect
async function createProspect(prospectData) {
    try {
        const data = await apiCall(`${APP_CONFIG.apiBase}prospects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prospectData)
        });
        showToast('success', 'Succès', 'Prospect créé avec succès');
        await loadProspects();
        return data;
    } catch (error) {
        console.error('Erreur création prospect:', error);
    }
}

// Mettre à jour un prospect
async function updateProspect(prospectId, prospectData) {
    try {
        const data = await apiCall(`${APP_CONFIG.apiBase}prospects/${prospectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prospectData)
        });
        showToast('success', 'Succès', 'Prospect mis à jour');
        await loadProspects();
        return data;
    } catch (error) {
        console.error('Erreur mise à jour prospect:', error);
    }
}

// Supprimer un prospect
async function deleteProspect(prospectId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce prospect ?')) {
        return;
    }
    
    try {
        await apiCall(`${APP_CONFIG.apiBase}prospects/${prospectId}`, {
            method: 'DELETE'
        });
        showToast('success', 'Succès', 'Prospect supprimé');
        await loadProspects();
    } catch (error) {
        console.error('Erreur suppression prospect:', error);
    }
}

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Menu toggle pour mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

function navigateToPage(pageName) {
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');
    
    // Afficher la bonne page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}Page`)?.classList.add('active');
    
    APP_CONFIG.currentPage = pageName;
    
    // Charger le contenu spécifique
    switch(pageName) {
        case 'dashboard':
            updateDashboardStats();
            initDashboardCharts();
            break;
        case 'prospects':
            updateProspectsDisplay();
            break;
        case 'formations':
            displayFormations();
            break;
        case 'statistiques':
            initStatisticsCharts();
            break;
        case 'calendrier':
            displayCalendar();
            break;
    }
}

// ==========================================
// DASHBOARD
// ==========================================

function updateDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Appels aujourd'hui
    const appeulsJour = appState.prospects.filter(p => {
        const dateAppel = new Date(p.date_appel);
        dateAppel.setHours(0, 0, 0, 0);
        return dateAppel.getTime() === today.getTime();
    }).length;
    
    // À rappeler
    const aRappeler = appState.prospects.filter(p => p.statut === 'À rappeler').length;
    
    // Inscrits ce mois
    const thisMonth = new Date();
    const inscrits = appState.prospects.filter(p => {
        if (p.statut !== 'Inscrit') return false;
        const dateAppel = new Date(p.date_appel);
        return dateAppel.getMonth() === thisMonth.getMonth() && 
               dateAppel.getFullYear() === thisMonth.getFullYear();
    }).length;
    
    // Taux de conversion
    const totalProspects = appState.prospects.filter(p => {
        const dateAppel = new Date(p.date_appel);
        return dateAppel.getMonth() === thisMonth.getMonth() && 
               dateAppel.getFullYear() === thisMonth.getFullYear();
    }).length;
    const tauxConversion = totalProspects > 0 ? ((inscrits / totalProspects) * 100).toFixed(1) : 0;
    
    // Mettre à jour l'affichage
    document.getElementById('statsAppeulsJour').textContent = appeulsJour;
    document.getElementById('statsARappeler').textContent = aRappeler;
    document.getElementById('statsInscrits').textContent = inscrits;
    document.getElementById('statsTauxConversion').textContent = `${tauxConversion}%`;
    
    // Badges
    document.getElementById('newProspectsCount').textContent = appState.prospects.filter(p => p.statut === 'Nouveau').length;
    document.getElementById('totalProspectsCount').textContent = appState.prospects.length;
    document.getElementById('rappelsCount').textContent = aRappeler;
    document.getElementById('urgentCount').textContent = appState.prospects.filter(p => p.urgence === 'Critique' || p.urgence === 'Élevée').length;
    
    // Prospects urgents
    displayUrgentProspects();
    
    // Activité récente
    displayRecentActivity();
}

function displayUrgentProspects() {
    const container = document.getElementById('urgentProspectsList');
    const urgentProspects = appState.prospects
        .filter(p => p.urgence === 'Critique' || p.urgence === 'Élevée')
        .sort((a, b) => {
            const urgenceOrder = { 'Critique': 0, 'Élevée': 1 };
            return urgenceOrder[a.urgence] - urgenceOrder[b.urgence];
        })
        .slice(0, 5);
    
    if (urgentProspects.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--color-gray-500);padding:20px;">Aucun prospect urgent</p>';
        return;
    }
    
    container.innerHTML = urgentProspects.map(prospect => `
        <div class="prospect-card" data-id="${prospect.id}">
            <div class="prospect-avatar">${getInitials(prospect.nom_complet)}</div>
            <div class="prospect-info">
                <div class="prospect-name">${prospect.nom_complet}</div>
                <div class="prospect-formation">
                    <i class="fas fa-graduation-cap"></i>
                    ${prospect.formation_demandee}
                </div>
            </div>
            <div class="prospect-meta">
                <span class="prospect-urgence urgence-${prospect.urgence.toLowerCase().replace('é', 'e')}">${prospect.urgence}</span>
            </div>
            <div class="prospect-actions">
                <button class="btn-action btn-call" onclick="callProspect('${prospect.telephone}')" title="Appeler">
                    <i class="fas fa-phone"></i>
                </button>
                <button class="btn-action btn-edit" onclick="editProspect('${prospect.id}')" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function displayRecentActivity() {
    const container = document.getElementById('recentActivityList');
    const recentProspects = [...appState.prospects]
        .sort((a, b) => new Date(b.date_appel) - new Date(a.date_appel))
        .slice(0, 8);
    
    if (recentProspects.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--color-gray-500);padding:20px;">Aucune activité récente</p>';
        return;
    }
    
    container.innerHTML = recentProspects.map(prospect => {
        const iconClass = prospect.statut === 'Inscrit' ? 'icon-success' : 'icon-call';
        const icon = prospect.statut === 'Inscrit' ? 'check-circle' : 'phone';
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${iconClass}">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${prospect.nom_complet}</div>
                    <div class="activity-description">${prospect.formation_demandee} - ${prospect.statut}</div>
                    <div class="activity-time">${formatDate(prospect.date_appel)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function initDashboardCharts() {
    // Chart: Prospects par statut
    initChartStatuts();
    
    // Chart: Top formations
    initChartFormations();
}

function initChartStatuts() {
    const ctx = document.getElementById('chartStatuts');
    if (!ctx) return;
    
    // Détruire le chart existant
    if (APP_CONFIG.charts.statuts) {
        APP_CONFIG.charts.statuts.destroy();
    }
    
    const statutCounts = {
        'Nouveau': 0,
        'À rappeler': 0,
        'En cours': 0,
        'Inscrit': 0,
        'Perdu': 0,
        'Reporté': 0
    };
    
    appState.prospects.forEach(p => {
        if (statutCounts.hasOwnProperty(p.statut)) {
            statutCounts[p.statut]++;
        }
    });
    
    APP_CONFIG.charts.statuts = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(statutCounts),
            datasets: [{
                label: 'Nombre de prospects',
                data: Object.values(statutCounts),
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(149, 165, 166, 0.8)'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function initChartFormations() {
    const ctx = document.getElementById('chartFormations');
    if (!ctx) return;
    
    // Détruire le chart existant
    if (APP_CONFIG.charts.formations) {
        APP_CONFIG.charts.formations.destroy();
    }
    
    // Compter les formations demandées
    const formationCounts = {};
    appState.prospects.forEach(p => {
        const formation = p.formation_demandee;
        formationCounts[formation] = (formationCounts[formation] || 0) + 1;
    });
    
    // Trier et prendre le top 5
    const sorted = Object.entries(formationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    APP_CONFIG.charts.formations = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sorted.map(([name]) => name),
            datasets: [{
                data: sorted.map(([, count]) => count),
                backgroundColor: [
                    '#FF8C00',
                    '#0066CC',
                    '#27ae60',
                    '#9b59b6',
                    '#e67e22'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ==========================================
// GESTION DES PROSPECTS
// ==========================================

function updateProspectsDisplay() {
    applyFilters();
    displayProspectsTable();
    updatePagination();
}

function applyFilters() {
    let filtered = [...appState.prospects];
    
    // Filtre par statut
    if (appState.filters.statut) {
        filtered = filtered.filter(p => p.statut === appState.filters.statut);
    }
    
    // Filtre par catégorie
    if (appState.filters.categorie) {
        filtered = filtered.filter(p => p.categorie_formation === appState.filters.categorie);
    }
    
    // Filtre par urgence
    if (appState.filters.urgence) {
        filtered = filtered.filter(p => p.urgence === appState.filters.urgence);
    }
    
    // Filtre par utilisateur
    if (appState.filters.utilisateur) {
        filtered = filtered.filter(p => p.utilisateur_assigne === appState.filters.utilisateur);
    }
    
    appState.filteredProspects = filtered;
    appState.totalPages = Math.ceil(filtered.length / APP_CONFIG.itemsPerPage);
    appState.currentPage = 1;
}

function displayProspectsTable() {
    const tbody = document.getElementById('prospectsTableBody');
    if (!tbody) return;
    
    const start = (appState.currentPage - 1) * APP_CONFIG.itemsPerPage;
    const end = start + APP_CONFIG.itemsPerPage;
    const pageProspects = appState.filteredProspects.slice(start, end);
    
    if (pageProspects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--color-gray-500);">Aucun prospect trouvé</td></tr>';
        return;
    }
    
    tbody.innerHTML = pageProspects.map(prospect => `
        <tr>
            <td><input type="checkbox" value="${prospect.id}"></td>
            <td>
                <strong>${prospect.nom_complet}</strong><br>
                <small style="color:var(--color-gray-500);">${prospect.email || 'N/A'}</small>
            </td>
            <td>${prospect.telephone}</td>
            <td>${prospect.formation_demandee}</td>
            <td>
                <span class="badge-statut statut-${getStatutClass(prospect.statut)}">
                    ${prospect.statut}
                </span>
            </td>
            <td>
                <span class="prospect-urgence urgence-${prospect.urgence.toLowerCase().replace('é', 'e')}">
                    ${prospect.urgence}
                </span>
            </td>
            <td>${prospect.utilisateur_assigne}</td>
            <td>${formatDate(prospect.date_appel)}</td>
            <td>
                <div style="display:flex;gap:8px;">
                    <button class="btn-action btn-call" onclick="callProspect('${prospect.telephone}')" title="Appeler">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn-action btn-edit" onclick="editProspect('${prospect.id}')" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteProspect('${prospect.id}')" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updatePagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = appState.totalPages;
    const currentPage = appState.currentPage;
    
    let html = '';
    
    // Bouton précédent
    html += `<button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    // Pages
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<span>...</span>`;
        }
    }
    
    // Bouton suivant
    html += `<button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    container.innerHTML = html;
}

function changePage(page) {
    if (page < 1 || page > appState.totalPages) return;
    appState.currentPage = page;
    displayProspectsTable();
    updatePagination();
}

// ==========================================
// MODAL PROSPECT
// ==========================================

function openProspectModal(prospectId = null) {
    const modal = document.getElementById('prospectModal');
    const form = document.getElementById('prospectForm');
    const title = document.getElementById('modalTitle');
    
    if (prospectId) {
        // Mode édition
        const prospect = appState.prospects.find(p => p.id === prospectId);
        if (!prospect) return;
        
        title.innerHTML = '<i class="fas fa-user-edit"></i> Modifier le Prospect';
        
        // Remplir le formulaire
        document.getElementById('prospectId').value = prospect.id;
        document.getElementById('prospectNom').value = prospect.nom_complet;
        document.getElementById('prospectTelephone').value = prospect.telephone;
        document.getElementById('prospectEmail').value = prospect.email || '';
        document.getElementById('prospectEntreprise').value = prospect.entreprise_organisme || '';
        document.getElementById('prospectFormation').value = prospect.formation_demandee;
        document.getElementById('prospectStatutPro').value = prospect.statut_professionnel;
        document.getElementById('prospectNiveau').value = prospect.niveau_experience || '';
        document.getElementById('prospectUrgence').value = prospect.urgence;
        document.getElementById('prospectStatut').value = prospect.statut;
        document.getElementById('prospectAssigne').value = prospect.utilisateur_assigne;
        document.getElementById('prospectLangue').value = prospect.langue_contact || 'Français';
        document.getElementById('prospectNotes').value = prospect.notes || '';
        
        if (prospect.date_rappel) {
            const date = new Date(prospect.date_rappel);
            const formatted = date.toISOString().slice(0, 16);
            document.getElementById('prospectRappel').value = formatted;
        }
    } else {
        // Mode création
        title.innerHTML = '<i class="fas fa-user-plus"></i> Nouveau Prospect';
        form.reset();
        document.getElementById('prospectId').value = '';
        document.getElementById('prospectAssigne').value = APP_CONFIG.currentUser;
    }
    
    modal.classList.add('active');
}

function closeProspectModal() {
    const modal = document.getElementById('prospectModal');
    modal.classList.remove('active');
}

function handleProspectFormSubmit(e) {
    e.preventDefault();
    
    const prospectId = document.getElementById('prospectId').value;
    
    const prospectData = {
        nom_complet: document.getElementById('prospectNom').value,
        telephone: document.getElementById('prospectTelephone').value,
        email: document.getElementById('prospectEmail').value,
        entreprise_organisme: document.getElementById('prospectEntreprise').value,
        formation_demandee: document.getElementById('prospectFormation').value,
        statut_professionnel: document.getElementById('prospectStatutPro').value,
        niveau_experience: document.getElementById('prospectNiveau').value,
        urgence: document.getElementById('prospectUrgence').value,
        statut: document.getElementById('prospectStatut').value,
        utilisateur_assigne: document.getElementById('prospectAssigne').value,
        langue_contact: document.getElementById('prospectLangue').value,
        notes: document.getElementById('prospectNotes').value,
        date_rappel: document.getElementById('prospectRappel').value || null,
        date_appel: prospectId ? undefined : new Date().toISOString(),
        source: prospectId ? undefined : 'Manuel',
        score_qualification: prospectId ? undefined : 50
    };
    
    // Trouver la catégorie de formation
    const formation = appState.formations.find(f => f.nom === prospectData.formation_demandee);
    if (formation) {
        prospectData.categorie_formation = formation.categorie;
    }
    
    if (prospectId) {
        // Garder l'ID existant pour la mise à jour
        prospectData.id = prospectId;
        updateProspect(prospectId, prospectData);
    } else {
        createProspect(prospectData);
    }
    
    closeProspectModal();
}

// ==========================================
// FORMATIONS
// ==========================================

function displayFormations() {
    const container = document.getElementById('formationsGrid');
    if (!container) return;
    
    if (appState.formations.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--color-gray-500);padding:40px;">Aucune formation disponible</p>';
        return;
    }
    
    container.innerHTML = appState.formations
        .sort((a, b) => (b.popularite || 0) - (a.popularite || 0))
        .map(formation => `
            <div class="formation-card">
                <div class="formation-header">
                    <div>
                        <div class="formation-title">${formation.nom}</div>
                        <div class="formation-category">${formation.categorie}</div>
                    </div>
                </div>
                <div class="formation-info">
                    <div class="formation-info-item">
                        <i class="fas fa-clock"></i>
                        <span>${formation.duree}</span>
                    </div>
                    <div class="formation-info-item">
                        <i class="fas fa-user-friends"></i>
                        <span>${formation.public_cible}</span>
                    </div>
                    <div class="formation-info-item">
                        <i class="fas fa-tag"></i>
                        <span>Réf: ${formation.reference}</span>
                    </div>
                </div>
                <div class="formation-popularity">
                    <i class="fas fa-fire"></i>
                    <span><strong>${formation.popularite || 0}</strong> demandes</span>
                </div>
            </div>
        `).join('');
}

function populateFormationsSelect() {
    const select = document.getElementById('prospectFormation');
    if (!select) return;
    
    // Grouper par catégorie
    const grouped = {};
    appState.formations.forEach(formation => {
        if (!grouped[formation.categorie]) {
            grouped[formation.categorie] = [];
        }
        grouped[formation.categorie].push(formation);
    });
    
    let html = '<option value="">Sélectionner une formation...</option>';
    
    Object.keys(grouped).sort().forEach(categorie => {
        html += `<optgroup label="${categorie}">`;
        grouped[categorie].forEach(formation => {
            html += `<option value="${formation.nom}">${formation.nom}</option>`;
        });
        html += `</optgroup>`;
    });
    
    select.innerHTML = html;
}

// ==========================================
// STATISTIQUES
// ==========================================

function initStatisticsCharts() {
    initChartEvolution();
    initChartCategories();
    initChartPerformance();
}

function initChartEvolution() {
    const ctx = document.getElementById('chartEvolution');
    if (!ctx) return;
    
    if (APP_CONFIG.charts.evolution) {
        APP_CONFIG.charts.evolution.destroy();
    }
    
    // Simuler des données d'évolution sur 6 mois
    const labels = ['Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre'];
    const nouveaux = [12, 19, 15, 25, 22, appState.prospects.filter(p => p.statut === 'Nouveau').length];
    const inscrits = [5, 8, 6, 12, 10, appState.prospects.filter(p => p.statut === 'Inscrit').length];
    
    APP_CONFIG.charts.evolution = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Nouveaux prospects',
                    data: nouveaux,
                    borderColor: '#FF8C00',
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Inscrits',
                    data: inscrits,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

function initChartCategories() {
    const ctx = document.getElementById('chartCategories');
    if (!ctx) return;
    
    if (APP_CONFIG.charts.categories) {
        APP_CONFIG.charts.categories.destroy();
    }
    
    const categoryCounts = {};
    appState.prospects.forEach(p => {
        const cat = p.categorie_formation;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    APP_CONFIG.charts.categories = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
                data: Object.values(categoryCounts),
                backgroundColor: [
                    '#FF8C00',
                    '#0066CC',
                    '#27ae60',
                    '#9b59b6',
                    '#e67e22',
                    '#3498db',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initChartPerformance() {
    const ctx = document.getElementById('chartPerformance');
    if (!ctx) return;
    
    if (APP_CONFIG.charts.performance) {
        APP_CONFIG.charts.performance.destroy();
    }
    
    const userStats = {};
    APP_CONFIG.utilisateurs.forEach(user => {
        const userProspects = appState.prospects.filter(p => p.utilisateur_assigne === user);
        const inscrits = userProspects.filter(p => p.statut === 'Inscrit').length;
        userStats[user] = inscrits;
    });
    
    APP_CONFIG.charts.performance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(userStats),
            datasets: [{
                label: 'Inscriptions réalisées',
                data: Object.values(userStats),
                backgroundColor: '#0066CC',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// ==========================================
// CALENDRIER
// ==========================================

function displayCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;
    
    const rappels = appState.prospects
        .filter(p => p.date_rappel && p.statut !== 'Inscrit' && p.statut !== 'Perdu')
        .sort((a, b) => new Date(a.date_rappel) - new Date(b.date_rappel));
    
    if (rappels.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--color-gray-500);padding:40px;">Aucun rappel programmé</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="prospects-list">
            ${rappels.map(prospect => `
                <div class="prospect-card" data-id="${prospect.id}">
                    <div class="prospect-avatar">${getInitials(prospect.nom_complet)}</div>
                    <div class="prospect-info">
                        <div class="prospect-name">${prospect.nom_complet}</div>
                        <div class="prospect-formation">
                            <i class="fas fa-graduation-cap"></i>
                            ${prospect.formation_demandee}
                        </div>
                    </div>
                    <div class="prospect-meta">
                        <div style="text-align:right;">
                            <div style="font-size:13px;color:var(--color-gray-600);">
                                <i class="fas fa-calendar-alt"></i>
                                ${formatDate(prospect.date_rappel)}
                            </div>
                            <div style="font-size:12px;color:var(--color-gray-500);margin-top:4px;">
                                Assigné à ${prospect.utilisateur_assigne}
                            </div>
                        </div>
                    </div>
                    <div class="prospect-actions">
                        <button class="btn-action btn-call" onclick="callProspect('${prospect.telephone}')" title="Appeler">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="btn-action btn-edit" onclick="editProspect('${prospect.id}')" title="Modifier">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getStatutClass(statut) {
    const map = {
        'Nouveau': 'nouveau',
        'À rappeler': 'rappeler',
        'En cours': 'encours',
        'Inscrit': 'inscrit',
        'Perdu': 'perdu',
        'Reporté': 'reporte'
    };
    return map[statut] || 'nouveau';
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    
    return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

function callProspect(telephone) {
    window.location.href = `tel:${telephone}`;
}

function editProspect(prospectId) {
    openProspectModal(prospectId);
}

function showToast(type, title, message) {
    const toast = document.getElementById('toast');
    toast.className = `toast ${type}`;
    
    const iconMap = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle'
    };
    
    toast.querySelector('.toast-icon i').className = `fas fa-${iconMap[type] || 'info-circle'}`;
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-message').textContent = message;
    
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 5000);
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

function exportToExcel() {
    showToast('success', 'Export', 'Exportation des données en cours...');
    
    // Créer un CSV simple
    const headers = ['Nom', 'Téléphone', 'Email', 'Formation', 'Statut', 'Urgence', 'Assigné à', 'Date appel'];
    const rows = appState.filteredProspects.map(p => [
        p.nom_complet,
        p.telephone,
        p.email || '',
        p.formation_demandee,
        p.statut,
        p.urgence,
        p.utilisateur_assigne,
        new Date(p.date_appel).toLocaleDateString('fr-FR')
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prospects_natech_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;
    
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
        
        appState.currentPage = 1;
        displayProspectsTable();
        updatePagination();
    });
}

function initFilters() {
    const filterStatut = document.getElementById('filterStatut');
    const filterCategorie = document.getElementById('filterCategorie');
    const filterUrgence = document.getElementById('filterUrgence');
    const filterUtilisateur = document.getElementById('filterUtilisateur');
    const btnResetFilters = document.getElementById('btnResetFilters');
    
    filterStatut?.addEventListener('change', (e) => {
        appState.filters.statut = e.target.value;
        updateProspectsDisplay();
    });
    
    filterCategorie?.addEventListener('change', (e) => {
        appState.filters.categorie = e.target.value;
        updateProspectsDisplay();
    });
    
    filterUrgence?.addEventListener('change', (e) => {
        appState.filters.urgence = e.target.value;
        updateProspectsDisplay();
    });
    
    filterUtilisateur?.addEventListener('change', (e) => {
        appState.filters.utilisateur = e.target.value;
        updateProspectsDisplay();
    });
    
    btnResetFilters?.addEventListener('click', () => {
        appState.filters = { statut: '', categorie: '', urgence: '', utilisateur: '' };
        filterStatut.value = '';
        filterCategorie.value = '';
        filterUrgence.value = '';
        filterUtilisateur.value = '';
        updateProspectsDisplay();
    });
}

// ==========================================
// INITIALISATION
// ==========================================

async function initApp() {
    console.log('🚀 Initialisation de l\'application Natech Training');
    
    // Charger les données
    await Promise.all([
        loadProspects(),
        loadFormations(),
        loadInteractions()
    ]);
    
    // Initialiser la navigation
    initNavigation();
    
    // Initialiser les événements
    initSearch();
    initFilters();
    
    // Boutons modaux
    document.getElementById('btnAddProspect')?.addEventListener('click', () => openProspectModal());
    document.getElementById('btnNewProspect')?.addEventListener('click', () => openProspectModal());
    document.getElementById('closeProspectModal')?.addEventListener('click', closeProspectModal);
    document.getElementById('btnCancelProspect')?.addEventListener('click', closeProspectModal);
    document.getElementById('prospectForm')?.addEventListener('submit', handleProspectFormSubmit);
    
    // Boutons actions
    document.getElementById('btnRefresh')?.addEventListener('click', async () => {
        await loadProspects();
        await loadFormations();
        showToast('success', 'Succès', 'Données actualisées');
    });
    
    document.getElementById('btnExportProspects')?.addEventListener('click', exportToExcel);
    
    // Toast close
    document.querySelector('.toast-close')?.addEventListener('click', () => {
        document.getElementById('toast').classList.remove('active');
    });
    
    // Modal background close
    document.getElementById('prospectModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'prospectModal') {
            closeProspectModal();
        }
    });
    
    // User info
    document.getElementById('userName').textContent = APP_CONFIG.currentUser;
    document.getElementById('userEmail').textContent = `${APP_CONFIG.currentUser.toLowerCase()}@natech-training.com`;
    
    // Charger la page dashboard par défaut
    navigateToPage('dashboard');
    
    console.log('✅ Application initialisée avec succès');
    showToast('success', 'Bienvenue', 'Application chargée avec succès !');
}

// Démarrer l'application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
