document.addEventListener('DOMContentLoaded', () => {
    
    const regionTitle = document.getElementById('regionTitle');
    const selectedRegionSpan = document.getElementById('selectedRegion');
    const grid = document.getElementById('mapResultsGrid');
    const noResults = document.getElementById('noResults');

    const iconMap = {
        'website': { icon: 'fa-solid fa-globe', class: 'icon-website' },
        'facebook': { icon: 'fa-brands fa-facebook-f', class: 'icon-facebook' },
        'twitter': { icon: 'fa-brands fa-twitter', class: 'icon-twitter' },
        'instagram': { icon: 'fa-brands fa-instagram', class: 'icon-instagram' },
        'youtube': { icon: 'fa-brands fa-youtube', class: 'icon-youtube' },
        'linkedin': { icon: 'fa-brands fa-linkedin-in', class: 'icon-linkedin' }
    };

    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    function initializeMap() {
        try {
            Highcharts.mapChart('map-container', {
                chart: {
                    map: 'countries/et/et-all',
                    backgroundColor: 'transparent'
                },
                title: { text: null },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, 'rgba(88, 101, 242, 0.1)'],
                        [1, 'rgba(88, 101, 242, 0.4)']
                    ]
                },
                series: [{
                    data: [
                        ['et-be', 1], ['et-ha', 1], ['et-sn', 1], ['et-ga', 1],
                        ['et-so', 1], ['et-dd', 1], ['et-ti', 1], ['et-af', 1],
                        ['et-am', 1], ['et-or', 1], ['et-aa', 1]
                    ],
                    name: 'Regions',
                    states: {
                        hover: { color: '#eb459e' },
                        select: { color: '#5865F2' }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        style: {
                            color: '#fff',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    },
                    allowPointSelect: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(e) {
                                filterByRegion(this.name);
                            }
                        }
                    }
                }]
            });
        } catch (error) {
            console.error('Error loading Highcharts Map topology:', error);
            document.getElementById('map-container').innerHTML = `<p style="color:#eb459e; text-align:center; padding: 2rem; font-weight:bold;">Error rendering map data: ${error.message || error}</p>`;
        }
    }

    function filterByRegion(regionName) {
        regionTitle.style.display = 'block';
        selectedRegionSpan.textContent = regionName;
        grid.innerHTML = '';
        
        let term = regionName.toLowerCase();
        
        // Handle specific naming matches (e.g. SNNPR, Benishangul)
        if (term.includes('southern')) term = 'south';
        if (term.includes('benshangul') || term.includes('benishangul')) term = 'ben';

        // 1. Filter Politicians
        const matchingLeaders = ethData.filter(gov => {
            const stateMatch = gov.state && gov.state.toLowerCase().includes(term);
            const bioMatch = gov.deep_bio && gov.deep_bio.toLowerCase().includes(term);
            return stateMatch || bioMatch;
        });

        // 2. Filter Parties
        const matchingParties = partiesData.filter(party => {
            const nameMatch = party.name.toLowerCase().includes(term);
            const descMatch = party.description && party.description.toLowerCase().includes(term);
            return nameMatch || descMatch;
        });

        const totalResults = matchingLeaders.length + matchingParties.length;

        if (totalResults === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');

            // Render Leaders
            matchingLeaders.forEach(gov => {
                const card = document.createElement('div');
                card.className = 'card';
                
                let imageContent = '';
                if (gov.image) {
                    imageContent = `<img src="${gov.image}" alt="${gov.name}" class="profile-img" loading="lazy">`;
                } else {
                    imageContent = `<div class="avatar-placeholder">${getInitials(gov.name)}</div>`;
                }

                let linksHTML = '';
                (gov.real_links || []).forEach(linkData => {
                    const lp = linkData.platform.toLowerCase().trim();
                    if (iconMap[lp]) {
                        linksHTML += `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer" class="social-link ${iconMap[lp].class}" title="${linkData.platform}"><i class="${iconMap[lp].icon}"></i></a>`;
                    } else {
                        linksHTML += `<a href="${linkData.url}" target="_blank" rel="noopener noreferrer" class="social-link"><i class="fa-solid fa-link"></i></a>`;
                    }
                });

                let summaryText = gov.summary || "";

                card.innerHTML = `
                    <div class="image-wrapper">
                        ${imageContent}
                        <div class="state-badge">${gov.state}</div>
                    </div>
                    <h2 class="gov-name">${gov.name}</h2>
                    <p class="gov-summary">${summaryText}</p>
                    <div class="social-links">${linksHTML}</div>
                    <div class="card-footer">
                        <a href="profile.html?name=${encodeURIComponent(gov.name)}&dataset=ethiopia" class="profile-btn">Deep Profile</a>
                    </div>
                `;
                grid.appendChild(card);
            });

            // Render Parties
            matchingParties.forEach(party => {
                const card = document.createElement('div');
                card.className = 'party-card';
                card.innerHTML = `
                    <div class="type-badge" style="background:var(--primary-color)">${party.type} Party</div>
                    <div class="party-icon-wrapper" style="margin-top:1rem;">
                        <i class="fa-solid fa-map-location-dot"></i>
                    </div>
                    <h2 class="party-name">${party.name}</h2>
                    <h3 class="party-amharic" style="font-size:1rem;color:var(--text-secondary)">${party.amharic}</h3>
                    <p class="party-desc">${party.description}</p>
                `;
                grid.appendChild(card);
            });
        }
    }

    // Load Highcharts on boot
    initializeMap();
});
