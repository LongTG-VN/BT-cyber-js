class productManagement {
    constructor() {
        this.arr = [];
    }

    Add(product) {
        this.arr.push(product);
    }
    getList() {
        return this.arr;
    }


    delete(id) {
        const index = this.FindIndex(id);
        this.arr.splice(index, 1);
    }

    FindIndex(id) {
        for (let i = 0; i < this.arr.length; i++) {
            const element = this.arr[i];
            if (id === element.id) {
                return i;
            }

        }
        return -1;
    }

    clear() {
        this.arr = [];
    }

}

export default productManagement