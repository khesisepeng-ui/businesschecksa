const apiUrl =
"https://businesschecksa-api-ebfyg0gvd3h9dyc0.southafricanorth-01.azurewebsites.net/api/GetBusinesses";

let businesses = [];
let filteredBusinesses = [];
let currentPage = 1;
const pageSize = 5;

window.onload = async () => {

    try {

        const response = await fetch(apiUrl);

        businesses = await response.json();

        filteredBusinesses = businesses;

        renderBusinesses();

    } catch (error) {

        console.error(error);

        document.getElementById("results").innerHTML =
        `
        <div class="business-card">
            <h3>Error</h3>
            <p>Unable to load businesses.</p>
        </div>
        `;
    }
};

function renderBusinesses() {

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageData =
        filteredBusinesses.slice(start, end);

    document.getElementById("results").innerHTML =
        pageData.map(b => `

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

            <a href="business.html?id=${b.Id}">
                View Business
            </a>

        </div>

    `).join('');

    renderPagination();
}

function renderPagination() {

    const totalPages =
        Math.ceil(filteredBusinesses.length / pageSize);

    let html = '';

    for(let i = 1; i <= totalPages; i++) {

        html += `
            <button
                class="page-btn"
                onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    document.getElementById("pagination").innerHTML =
        html;
}

function goToPage(page) {

    currentPage = page;

    renderBusinesses();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function searchBusinesses() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    filteredBusinesses =
        businesses.filter(b =>
            b.Name.toLowerCase().includes(search) ||
            b.Category.toLowerCase().includes(search) ||
            b.City.toLowerCase().includes(search)
        );

    currentPage = 1;

    renderBusinesses();
}