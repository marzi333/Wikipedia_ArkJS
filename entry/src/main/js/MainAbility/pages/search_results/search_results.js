import router from '@ohos.router'
export default {
    data: {
        "searchPhrase" : "",
        "array": [
            { "title": "Wik peoples", "description": "Indigenous peoples of Cape York Peninsula, Australia." },
            { "title": "Wik", "description": "Refers to the various Wik peoples and their languages." },
            { "title": "Wik languages", "description": "A group of Pama–Nyungan languages spoken by the Wik peoples." },
        ],
    },

    onInit() {
        this.searchPhrase = router.getParams()["searchPhrase"];
    }
}

