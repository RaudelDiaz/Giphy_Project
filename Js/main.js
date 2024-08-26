document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    const apiKey = 'JIWQXSEMKXULXYljdPL5oGacQb4inEEi';
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=10`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
});

function displayResults(gifs) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    gifs.forEach(gif => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}">`;
        resultsDiv.appendChild(gifDiv);
    });
}