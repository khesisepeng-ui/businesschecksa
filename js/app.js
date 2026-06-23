let businesses = [];

const apiUrl =
"https://businesschecksa-api-ebfyg0gvd3h9dyc0.southafricanorth-01.azurewebsites.net/api/GetBusinesses";

window.onload = async () => {

    const response = await fetch(apiUrl);

    businesses = await response.json();

    renderBusinesses(businesses);
};

function renderBusinesses(data){

    document.getElementById("results").innerHTML =
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

            <br>

            <a href="${b.Website}" target="_blank">
                Visit Website
            </a>

        </div>

    `).join('');
}

function searchBusinesses(){

    const search =
    document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results =
    document.getElementById("searchResults");

    if(search.length < 2){

        results.style.display = "none";

        renderBusinesses(businesses);

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

function selectBusiness(id){

    const business =
    businesses.find(b => b.Id === id);

    renderBusinesses([business]);

    document.getElementById("searchResults").style.display = "none";

    document.getElementById("searchInput").value = business.Name;
}
function renderFeaturedBusinesses() {

    const featured = businesses.slice(0, 5);

    document.getElementById("featuredBusinesses").innerHTML =
        featured.map(b => `

            <div class="featured-card">

                <h3>${b.Name}</h3>

                <p>${b.Category}</p>

                <p>${b.City}</p>

                <a href="business.html?id=${b.Id}">
                    View Business
                </a>

            </div>

        `).join('');
}