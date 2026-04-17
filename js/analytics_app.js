document.addEventListener('DOMContentLoaded', () => {

    // 1. Tally Counters Animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const leadersCount = windowGovernorsData.length;
    const partiesCount = partiesData.length;

    animateValue(document.getElementById('totalLeaders'), 0, leadersCount, 1500);
    animateValue(document.getElementById('totalParties'), 30, partiesCount, 1500);

    // Default Chart.js settings for dark theme
    Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.font.family = "'Outfit', sans-serif";

    // 2. Party Distribution Doughnut Chart
    const typesCount = { 'Country-wide': 0, 'Regional': 0, 'Front': 0, 'Coalition': 0 };
    partiesData.forEach(party => {
        if (typesCount[party.type] !== undefined) {
            typesCount[party.type]++;
        } else {
            typesCount[party.type] = 1;
        }
    });

    const partyCtx = document.getElementById('partyDistributionChart').getContext('2d');
    new Chart(partyCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(typesCount),
            datasets: [{
                data: Object.values(typesCount),
                backgroundColor: [
                    'rgba(88, 101, 242, 0.8)',   // Primary
                    'rgba(235, 69, 158, 0.8)',   // Secondary
                    'rgba(46, 204, 113, 0.8)',   // Green
                    'rgba(241, 196, 15, 0.8)'    // Yellow
                ],
                borderColor: 'rgba(30, 33, 40, 1)',
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 20, usePointStyle: true }
                }
            },
            cutout: '70%'
        }
    });

    // 3. Social Media Footprint Bar Chart
    const socialCounts = { 'Facebook': 0, 'Twitter': 0, 'LinkedIn': 0, 'YouTube': 0 };

    windowGovernorsData.forEach(gov => {
        const links = gov.real_links || [];
        links.forEach(link => {
            const platform = link.platform.toLowerCase();
            if (platform === 'facebook') socialCounts['Facebook']++;
            else if (platform === 'twitter' || platform === 'x') socialCounts['Twitter']++;
            else if (platform === 'linkedin') socialCounts['LinkedIn']++;
            else if (platform === 'youtube') socialCounts['YouTube']++;
        });
    });

    const socialCtx = document.getElementById('socialMediaChart').getContext('2d');
    new Chart(socialCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(socialCounts),
            datasets: [{
                label: 'Verified Accounts Profiled',
                data: Object.values(socialCounts),
                backgroundColor: [
                    'rgba(24, 119, 242, 0.7)',  // FB
                    'rgba(0, 0, 0, 0.7)',       // X/Twitter
                    'rgba(10, 102, 194, 0.7)',  // LinkedIn
                    'rgba(255, 0, 0, 0.7)'      // YouTube
                ],
                borderColor: [
                    'rgba(24, 119, 242, 1)',
                    'rgba(255, 255, 255, 0.5)', // white border for dark background
                    'rgba(10, 102, 194, 1)',
                    'rgba(255, 0, 0, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

});
