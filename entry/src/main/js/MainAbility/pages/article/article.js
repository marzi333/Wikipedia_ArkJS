import router from '@ohos.router';
import http from '@ohos.net.http';
import prompt from '@system.prompt';

export default {
    data: {
        title: "",
        description: "",
        content: "",
    },

    onInit() {
        this.title = router.getParams()['title'] || 'hangzhou';
        this.fetchArticleContent(this.title);
    },

    fetchArticleContent(title) {
        let httpRequest = http.createHttp();

        httpRequest.on('headersReceive', (header) => {
            console.info('Headers received: ' + JSON.stringify(header));
        });

        httpRequest.request(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
            {
                method: http.RequestMethod.GET,
                header: {
                    'Content-Type': 'application/json'
                },
                expectDataType: http.HttpDataType.OBJECT,
                connectTimeout: 60000,
                readTimeout: 60000,
            },
            (err, data) => {
                if (!err) {
                    let response = data.result;//Object
                    this.title = response.title;
                    this.description = response.description || response.extract;
                    this.content = response.extract;
                    // Print title, description, and content
                    console.log('Title:', this.title);
                    console.log('Description:', this.description);
                    console.log('Content:', this.content);
                } else {
                    console.error('Error fetching article content:', err);
                }
                httpRequest.off('headersReceive');
                httpRequest.destroy();
            }
        );
    },

    onMenuSelected(e) {
        prompt.showToast({
            message: e.value
        })
    },
    onClick() {
        this.$element("apiMenu").show({x:20,y:170});
    },

    closePage() {
        router.back({url:'pages/index/index'});
    }
}