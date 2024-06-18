import prompt from '@system.prompt';
export default {
    onMenuSelected(e) {
        prompt.showToast({
            message: e.value
        })
    },
    onClick() {
        this.$element("apiMenu").show({x:20,y:170});
    }
}