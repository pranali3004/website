document.addEventListener('DOMContentLoaded', () => {
    const stateFilter = document.getElementById('state-filter');
    const categoryFilter = document.getElementById('category-filter');
    const schemesContainer = document.getElementById('schemes-container');

    // Function to fetch and display schemes
    async function fetchAndDisplaySchemes() {
        const state = stateFilter.value;
        const category = categoryFilter.value;

        // Build the API URL with query parameters
        const apiUrl = /api/schemes?state=${state}&category=${category};

        try {
            const response = await fetch(apiUrl);
            const schemes = await response.json();
            displaySchemes(schemes);
        } catch (error) {
            console.error('Failed to fetch schemes:', error);
            schemesContainer.innerHTML = '<p>Error loading schemes. Please try again later.</p>';
        }
    }

    // Function to render schemes on the page
    function displaySchemes(schemes) {
        schemesContainer.innerHTML = ''; // Clear previous results

        if (schemes.length === 0) {
            schemesContainer.innerHTML = '<p>No schemes found for the selected filters.</p>';
            return;
        }

        schemes.forEach(scheme => {
            const card = document.createElement('div');
            card.className = 'scheme-card';

            card.innerHTML = `
                <h2>${scheme.name}</h2>
                <div class="tags">
                    <span class="tag">${scheme.state}</span>
                    <span class="tag">${scheme.category}</span>
                </div>
                <h3>Benefit</h3>
                <p>${scheme.benefit}</p>
                <h3>Eligibility</h3>
                <p>${scheme.eligibility}</p>
                <h3>Documents Required</h3>
                <p>${scheme.documents}</p>
            `;
            schemesContainer.appendChild(card);
        });
    }

    // Add event listeners to filters
    stateFilter.addEventListener('change', fetchAndDisplaySchemes);
    categoryFilter.addEventListener('change', fetchAndDisplaySchemes);

    // Initial fetch when the page loads
    fetchAndDisplaySchemes();
});