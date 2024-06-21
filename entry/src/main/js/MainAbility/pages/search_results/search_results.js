import router from '@ohos.router'
import http from '@ohos.net.http';

export default {
    data: {
        searchPhrase: "",
        array: [],
    },

    onInit() {
        this.searchPhrase = router.getParams()["searchPhrase"];
        console.log('Received search phrase:', this.searchPhrase); // Log the received search phrase
        this.fetchSearchResults(this.searchPhrase);
    },


    fetchSearchResults(query) {
        let httpRequest = http.createHttp();

        httpRequest.on('headersReceive', (header) => {
            console.info('Headers received: ' + JSON.stringify(header));
        });

        httpRequest.request(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`,
            {
                method: http.RequestMethod.GET,
                header: {
                    'Content-Type': 'application/json'
                },
                expectDataType: http.HttpDataType.OBJECT,
                connectTimeout: 60000,
                readTimeout: 60000,
            },
        //     (err, data) => {
        //         if (!err) {
        //             const response = data.result; //get response as Object
        //             const searchResults = response.query.search.slice(0, 3); // Limit to 3 results
        //             //searchResults as String
        //             const resultsStr=JSON.stringify(searchResults)
        //
        //
        //             console.log("Search Results:",resultsStr);}
        //             else {
        //         console.error('Error fetching article content:', err);
        //     }
        //     httpRequest.off('headersReceive');
        //     httpRequest.destroy();
        // }
            (err, data) => {
                if (!err) {
                    const response = data.result; // Get response as Object
                    console.log('API Response:', response); // Log the full API response

                    // Check if 'query' property exists
                    if (response.query && response.query.search) {
                        const searchResults = response.query.search.slice(0, 3); // Limit to 3 results
                        this.array = searchResults.map(item => ({
                            title: item.title,
                            description: item.snippet.replace(/<\/?[^>]+(>|$)/g, "") // Clean HTML tags if any
                        }));
                        console.log('Mapped Results:', this.array); // Log the mapped results to verify correctness
                    } else {
                        console.error('Query property not found in response:', response);
                    }
                } else {
                    console.error('Error fetching search results:', err);
                }
                httpRequest.off('headersReceive');
                httpRequest.destroy();
            }
        );
    },



    //                 // Fetch summary for each search result
    //                 const summaryPromises = searchResults.map(item => {
    //                     return new Promise((resolve, reject) => {
    //                         let summaryRequest = http.createHttp();
    //                         summaryRequest.request(
    //                             `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`,
    //                             {
    //                                 method: http.RequestMethod.GET,
    //                                 header: {
    //                                     'Content-Type': 'application/json'
    //                                 },
    //                                 responseType: http.HttpDataType.JSON,
    //                                 connectTimeout: 60000,
    //                                 readTimeout: 60000,
    //                             },
    //                             (err, summaryData) => {
    //                                 if (!err) {
    //                                     const summaryResponse = summaryData.result;
    //                                     console.log(`Summary for ${item.title}:`, summaryResponse); // Log the summary data
    //                                     resolve({
    //                                         title: summaryResponse.title,
    //                                         description: summaryResponse.description || summaryResponse.extract // Fallback to extract if description is not available
    //                                     });
    //                                 } else {
    //                                     reject(err);
    //                                 }
    //                                 summaryRequest.destroy();
    //                             }
    //                         );
    //                     });
    //                 });
    //
    //                 Promise.all(summaryPromises)
    //                     .then(results => {
    //                         this.array = results;
    //                         console.log('Mapped Results:', this.array); // Log the mapped results to verify correctness
    //                     })
    //                     .catch(error => {
    //                         console.error('Error fetching summaries:', error);
    //                     });
    //             } else {
    //                 console.error('Error fetching search results:', err);
    //             }
    //             httpRequest.off('headersReceive');
    //             httpRequest.destroy();
    //         }
    //     );
    // },


    //Title of the selected item will be passed as an argument
    goToArticle(title) {
        router.pushUrl({
            url: 'pages/article/article',
            params: {
                title: title
            }
        });
    }

}

