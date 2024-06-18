import router from '@ohos.router'
export default {
    data: {
        searchPhrase:"",
    },
    onInit() {
        this.searchPhrase = "initial";
    },

    onSearchInputChange(e)
    {
        this.searchPhrase = e.value;
    },

    goToSearchResults()
    {
        router.push({
            url: 'pages/search_results/search_results',
            params: {
                searchPhrase: this.searchPhrase

            }
        });
    }
}



