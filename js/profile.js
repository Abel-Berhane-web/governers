document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('profileContainer');
    const loader = document.getElementById('loader');

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');
    const datasetType = urlParams.get('dataset'); // 'us' or 'ethiopia'

    if (!targetName || !datasetType) {
        loader.style.display = 'none';
        profileContainer.innerHTML = '<div class="no-results"><h3>Profile Not Found</h3><p>Missing profile identifier.</p><a href="index.html" class="profile-btn" style="width:auto; margin-top:1rem;">Return Home</a></div>';
        return;
    }

    // Dynamically load the dataset script from the js folder
    const scriptSrc = '../js/ethiopia_data.js';
    const backUrl = 'ethiopia.html';

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.onload = () => {
        loader.style.display = 'none';

        // windowGovernorsData is now available globally
        if (typeof windowGovernorsData === 'undefined') {
            profileContainer.innerHTML = `<div class="no-results"><h3>Error</h3><p>Could not load dataset.</p><a href="${backUrl}" class="profile-btn" style="width:auto; margin-top:1rem;">Return Back</a></div>`;
            return;
        }

        renderProfile(windowGovernorsData, targetName, backUrl);
    };
    script.onerror = () => {
        loader.style.display = 'none';
        profileContainer.innerHTML = `<div class="no-results"><h3>Error</h3><p>Failed to load data script.</p><a href="${backUrl}" class="profile-btn" style="width:auto; margin-top:1rem;">Return Back</a></div>`;
    };

    document.head.appendChild(script);

    function renderProfile(dataSource, name, backUrl) {
        const iconMap = {
            'website': { icon: 'fa-solid fa-globe', class: 'icon-website' },
            'facebook': { icon: 'fa-brands fa-facebook-f', class: 'icon-facebook' },
            'twitter': { icon: 'fa-brands fa-twitter', class: 'icon-twitter' },
            'instagram': { icon: 'fa-brands fa-instagram', class: 'icon-instagram' },
            'youtube': { icon: 'fa-brands fa-youtube', class: 'icon-youtube' },
            'linkedin': { icon: 'fa-brands fa-linkedin-in', class: 'icon-linkedin' },
            'flickr': { icon: 'fa-brands fa-flickr', class: 'icon-flickr' },
            'bluesky': { icon: 'fa-solid fa-cloud', class: 'icon-bluesky' },
            'threads': { icon: 'fa-brands fa-threads', class: 'icon-threads' },
            'medium': { icon: 'fa-brands fa-medium', class: 'icon-medium' }
        };

        function getInitials(n) {
            return n
                .split(' ')
                .map(part => part[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();
        }

        // Find matching profile
        const profile = dataSource.find(p => p.name === name);

        if (!profile) {
            profileContainer.innerHTML = `<div class="no-results"><h3>Profile Not Found</h3><p>Could not find matching leader data.</p><a href="${backUrl}" class="profile-btn" style="width:auto; margin-top:1rem;">Return Back</a></div>`;
            return;
        }

        // Avatar
        let imageContent = '';
        if (profile.image) {
            imageContent = `<img src="${profile.image}" alt="${profile.name}" class="profile-img">`;
        } else {
            imageContent = `<div class="avatar-placeholder">${getInitials(profile.name)}</div>`;
        }

        // Social Links
        let linksHTML = '';
        const linksSource = profile.real_links || [];
        linksSource.forEach(linkData => {
            const platform = linkData.platform;
            const url = linkData.url;
            const lp = platform.toLowerCase().trim();
            if (iconMap[lp]) {
                linksHTML += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link ${iconMap[lp].class}" title="${platform}"><i class="${iconMap[lp].icon}"></i></a>`;
            } else {
                linksHTML += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${platform}"><i class="fa-solid fa-link"></i></a>`;
            }
        });

        const bioText = profile.deep_bio || profile.summary || "Further extended biographical information is not available at this time.";

        // Render HTML
        profileContainer.innerHTML = `
            <div class="profile-detail-container">
                <a href="${backUrl}" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to Directory</a>
                
                <div class="profile-detail-header">
                    <div class="image-wrapper">
                        ${imageContent}
                    </div>
                    <h1 class="gov-name">${profile.name}</h1>
                    <div class="state-badge">${profile.state}</div>
                </div>

                <div class="profile-bio-section">
                    <h3>Executive Biography Overview</h3>
                    <div class="profile-bio-content">
                        <p>${bioText.replace(/\n/g, '<br><br>')}</p>
                    </div>
                </div>

                <div class="profile-bio-section" style="text-align:center;">
                    <h3>Official Communication Channels</h3>
                    ${linksHTML ? `<div class="profile-social-large">${linksHTML}</div>` : '<p style="color:var(--text-muted); margin-top:1rem;">No official social media channels available currently.</p>'}
                </div>
            </div>
        `;
    }
});
