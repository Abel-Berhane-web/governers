document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('governorsGrid');
    const loader = document.getElementById('loader');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    let governorsData = [];

    // Map platform names to FontAwesome icons and specific classes
    const iconMap = {
        'website': { icon: 'fa-solid fa-globe', class: 'icon-website' },
        'facebook': { icon: 'fa-brands fa-facebook-f', class: 'icon-facebook' },
        'twitter': { icon: 'fa-brands fa-twitter', class: 'icon-twitter' },
        'instagram': { icon: 'fa-brands fa-instagram', class: 'icon-instagram' },
        'youtube': { icon: 'fa-brands fa-youtube', class: 'icon-youtube' },
        'linkedin': { icon: 'fa-brands fa-linkedin-in', class: 'icon-linkedin' },
        'flickr': { icon: 'fa-brands fa-flickr', class: 'icon-flickr' },
        'bluesky': { icon: 'fa-solid fa-cloud', class: 'icon-bluesky' }, // FA doesn't have official bluesky yet, use cloud
        'threads': { icon: 'fa-brands fa-threads', class: 'icon-threads' },
        'medium': { icon: 'fa-brands fa-medium', class: 'icon-medium' }
    };

    // Use the auto-generated global variable
    if (typeof windowGovernorsData !== 'undefined') {
        governorsData = windowGovernorsData;
        renderGovernors(governorsData);
    } else {
        loader.innerHTML = '<p style="color: #ef4444;">Failed to load data. Please ensure ethiopia_data.js is loaded.</p>';
    }

    function getInitials(name) {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    }

    function renderGovernors(data) {
        loader.style.display = 'none';
        grid.innerHTML = '';
        
        if (data.length === 0) {
            noResults.classList.remove('hidden');
            return;
        } else {
            noResults.classList.add('hidden');
        }

        data.forEach(gov => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Image or Avatar fallback
            let imageContent = '';
            if (gov.image) {
                imageContent = `<img src="${gov.image}" alt="${gov.name}" class="profile-img" loading="lazy">`;
            } else {
                imageContent = `<div class="avatar-placeholder">${getInitials(gov.name)}</div>`;
            }

            // Social links
            let linksHTML = '';
            const linksSource = gov.real_links || [];
            
            linksSource.forEach(linkData => {
                const platform = linkData.platform;
                const url = linkData.url;
                const lp = platform.toLowerCase().trim();
                
                if (iconMap[lp]) {
                    linksHTML += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link ${iconMap[lp].class}" title="${platform}" aria-label="${platform}"><i class="${iconMap[lp].icon}"></i></a>`;
                } else {
                    // Fallback link icon
                    linksHTML += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${platform}" aria-label="${platform}"><i class="fa-solid fa-link"></i></a>`;
                }
            });

            // Summary text (limit length or fallback)
            let summaryText = gov.summary || "Leader of the state, working towards bipartisan solutions and improving the lives of residents.";

            // Dataset identifier
            const datasetType = 'ethiopia';

            let profileBtnHTML = `<a href="profile.html?name=${encodeURIComponent(gov.name)}&dataset=ethiopia" class="profile-btn">Deep Profile</a>`;

            card.innerHTML = `
                <div class="image-wrapper">
                    ${imageContent}
                    <div class="state-badge">${gov.state}</div>
                </div>
                <h2 class="gov-name">${gov.name}</h2>
                <p class="gov-summary">${summaryText}</p>
                <div class="social-links">
                    ${linksHTML}
                </div>
                <div class="card-footer">
                    ${profileBtnHTML}
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        const filtered = governorsData.filter(gov => {
            return gov.name.toLowerCase().includes(term) || 
                   gov.state.toLowerCase().includes(term);
        });
        
        renderGovernors(filtered);
    });
});
