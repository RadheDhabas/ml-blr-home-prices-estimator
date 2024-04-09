document.addEventListener("DOMContentLoaded", function() {
    // Fetch locations for select input
    fetch('https://ml-blr-house-prices.vercel.app/get_location_names')
    .then(response => response.json())
    .then(data => {
        const locationSelect = document.getElementById('location');
        data.locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching locations:', error));

    // Form submit event listener
    document.getElementById('homePriceForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(this);
        const requestBody = {};
        formData.forEach((value, key) => {
            requestBody[key] = value;
        });

        // Make POST request to get estimated home price
        fetch('https://ml-blr-house-prices.vercel.app/predict_home_price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            const responseBox = document.getElementById('responseBox');
            responseBox.textContent = `Estimated Price: ${data.estimated_price} Lac`;
            responseBox.style.display = 'block';
        })
        .catch(error => console.error('Error fetching estimated price:', error));
    });
});
