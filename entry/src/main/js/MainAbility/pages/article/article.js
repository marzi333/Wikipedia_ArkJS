import prompt from '@system.prompt';
import router from '@ohos.router'

export default {
    data: {
        title: "",
        description: "",
        content: "",
    },

    async onInit() {
        this.title = router.getParams()['title']
        await this.fetchArticleContent(this.title);
    },

    async fetchArticleContent(title) {
        try {
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
            const data = await response.json();
            console.log('API Response:', data); // Log the full API response
            this.title = data.title;
            this.description = data.description;
            this.content = data.extract;
        } catch (error) {
            console.error('Error fetching article content:', error);
        }
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