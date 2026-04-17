document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('partiesGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'All';
    let currentSearch = '';

    function getIconForType(type) {
        if (type === 'Country-wide') return 'fa-solid fa-flag';
        if (type === 'Regional') return 'fa-solid fa-map-location-dot';
        if (type === 'Front') return 'fa-solid fa-people-group';
        if (type === 'Coalition') return 'fa-solid fa-handshake';
        return 'fa-solid fa-landmark';
    }

    function renderParties() {
        grid.innerHTML = '';
        
        const filtered = partiesData.filter(party => {
            const matchesFilter = currentFilter === 'All' || party.type === currentFilter;
            const matchesSearch = party.name.toLowerCase().includes(currentSearch) || 
                                  party.amharic.includes(currentSearch) ||
                                  party.description.toLowerCase().includes(currentSearch);
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
            
            filtered.forEach(party => {
                const card = document.createElement('div');
                card.className = 'party-card';
                
                card.innerHTML = `
                    <div class="type-badge">${party.type}</div>
                    <div class="party-icon-wrapper">
                        <i class="${getIconForType(party.type)}"></i>
                    </div>
                    <h2 class="party-name">${party.name}</h2>
                    <h3 class="party-amharic">${party.amharic}</h3>
                    <p class="party-desc">${party.description}</p>
                `;
                
                grid.appendChild(card);
            });
        }
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderParties();
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.getAttribute('data-filter');
            renderParties();
        });
    });

    // Initial render
    renderParties();
});
