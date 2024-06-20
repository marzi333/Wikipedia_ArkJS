// xxx.js
export default {
    data: {
        array: [
            {id: 1, name: 'jack', age: 18},
            {id: 2, name: 'tony', age: 20},
        ],
    },
    changeText: function() {
        if (this.array[1].name === "tony"){
            this.array.splice(1, 1, {id:2, name: 'Isabella', age: 18});
        } else {
            this.array.splice(2, 1, {id:3, name: 'Bary', age: 18});
        }
    },
}