let businesses = [];

const apiUrl =
"https://businesschecksa-api-ebfyg0gvd3h9dyc0.southafricanorth-01.azurewebsites.net/api/GetBusinesses";

window.onload = async () => {

    try {

        const response = await fetch(apiUrl);

        businesses = await response.json();

        renderFeaturedBusinesses();

    } catch (error) {

        console.error(error);

    }
};

function renderFeaturedBusinesses() {

    const container =
        document.getElementById("featuredBusinesses");

    if (!container) return;

    const featured =
        businesses.slice(0, 5);

    container.innerHTML =
        featured.map(b => `

            <div class="business-card">

                <h3>${b.Name}</h3>

                <p>
                    <strong>Category:</strong>
                    ${b.Category}
                </p>

                <p>
                    <strong>City:</strong>
                    ${b.City}
                </p>

                <p>
                    ${b.Description}
                </p>

                <a href="business.html?id=${b.Id}">
                    View Business
                </a>

            </div>

        `).join('');
}

function renderBusinesses(data) {

    const container =
        document.getElementById("results");

    if (!container) return;

    container.innerHTML =
        data.map(b => `

            <div class="business-card">

                <h3>${b.Name}</h3>

                <p>
                    <strong>Category:</strong>
                    ${b.Category}
                </p>

                <p>
                    <strong>City:</strong>
                    ${b.City}
                </p>

                <p>
                    ${b.Description}
                </p>

                <a href="${b.Website}" target="_blank">
                    Visit Website
                </a>

            </div>

        `).join('');
}

function searchBusinesses() {

    const searchInput =
        document.getElementById("searchInput");

    const results =
        document.getElementById("searchResults");

    if (!searchInput || !results) return;

    const search =
        searchInput.value.toLowerCase();

    if (search.length < 2) {

        results.style.display = "none";

        return;
    }

    const matches =
        businesses.filter(b =>
            b.Name.toLowerCase().includes(search)
        );

    results.innerHTML =
        matches.map(b => `

            <div
                class="search-item"
                onclick="selectBusiness(${b.Id})">

                ${b.Name}

            </div>

        `).join('');

    results.style.display =
        matches.length ? "block" : "none";
}

function selectBusiness(id) {

    window.location.href =
        `business.html?id=${id}`;
}