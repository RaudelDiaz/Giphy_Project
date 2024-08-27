const apiKey = 'JIWQXSEMKXULXYljdPL5oGacQb4inEEi';
const itemsPerPage = 10;
let currentPage = 1;
let totalPages = 0;
let gifs = [];

document.getElementById('searchButton').addEventListener('click', () => {
    currentPage = 1; 
    fetchGifs();
});

async function fetchGifs() {
    const query = document.getElementById('searchInput').value;
    const offset = (currentPage - 1) * itemsPerPage;
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${itemsPerPage}&offset=${offset}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        gifs = data.data;
        const totalResults = data.pagination.total_count;
        totalPages = Math.min(Math.ceil(totalResults / itemsPerPage), 10);
        displayResults();
        updatePagination();
    } catch (error) {
        console.error('Error fetching GIFs:', error);
    }
}

function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    gifs.forEach(gif => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-3');
        gifDiv.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="img-fluid">`;
        resultsDiv.appendChild(gifDiv);
    });
}

function updatePagination() {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    if (currentPage === 1) {
        prevPageItem.classList.add('disabled');
    }
    prevPageItem.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
    prevPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            fetchGifs();
        }
    });
    paginationControls.appendChild(prevPageItem);

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, startPage + 9);

    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            fetchGifs();
        });
        paginationControls.appendChild(pageItem);
    }

    const nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextPageItem.classList.add('disabled');
    }
    nextPageItem.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
    nextPageItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            fetchGifs();
        }
    });
    paginationControls.appendChild(nextPageItem);
}


