import router from '@ohos.router'
export default {
    data: {
        // "searchPhrase" : "",
        "searchPhrase" : router.getParams()["searchPhrase"],
        "array": [
            // { "title": "Wik peoples", "description": "Indigenous peoples of Cape York Peninsula, Australia." },
            // { "title": "Wik", "description": "Refers to the various Wik peoples and their languages." },
            // { "title": "Wik languages", "description": "A group of Pama–Nyungan languages spoken by the Wik peoples." },
        ],
    },

    async onInit() {
        // this.searchPhrase = router.getParams()["searchPhrase"];
        await this.fetchSearchResults(this.searchPhrase);
    },

    async fetchSearchResults(query) {
        try {
            //Requests search results
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
            const data = await response.json();
            console.log('API Response:', data); // Log the full API data
            //A list of suggested search results
            const searchResults = data.query.search;

            // Fetch summary for each search result
            const summaryPromises = searchResults.map(async (item) => {
                const summaryResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`);
                const summaryData = await summaryResponse.json();
                return {
                    title: summaryData.title,
                    description: summaryData.description || summaryData.extract // Fallback to extract if description is not available
                };
            });

            this.array = await Promise.all(summaryPromises);
            console.log('Mapped Results:', this.array); // Log the mapped results to verify correctness
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    },

    //Title of the selected item will be passed as an argument
    goToArticle(title) {
        router.push({
            url: 'pages/article/article',
            params: {
                title: title
            }
        });
    }

}

