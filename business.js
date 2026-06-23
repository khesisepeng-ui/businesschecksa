const apiUrl =
"https://businesschecksa-api-ebfyg0gvd3h9dyc0.southafricanorth-01.azurewebsites.net/api/GetBusinesses";

window.onload = async () => {

    try {

        const params =
            new URLSearchParams(window.location.search);

        const businessId =
            parseInt(params.get("id"));

        const response =
            await fetch(apiUrl);

        const businesses =
            await response.json();

        const business =
            businesses.find(
                b => b.Id === businessId
            );

        if(!business){

            document.getElementById("businessContainer").innerHTML =
            `
            <h2>Business not found</h2>
            `;

            return;
        }

        document.getElementById("businessContainer").innerHTML =
        `
        <div class="business-profile">

            <h1>${business.Name}</h1>

            <p>
                <strong>Category:</strong>
                ${business.Category}
            </p>

            <p>
                <strong>City:</strong>
                ${business.City}
            </p>

            <p>
                ${business.Description}
            </p>

            <br>

            <a
                href="${business.Website}"
                target="_blank">

                Visit Website

            </a>

        </div>
        `;

    } catch(error) {

        console.error(error);

        document.getElementById("businessContainer").innerHTML =
        `
        <h2>Error loading business</h2>
        `;
    }
};