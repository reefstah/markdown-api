import {Section} from "./section";

export class Root {

    constructor() {
        this.items = [];
    }

    branch(item) {
        let section = new Section(this, item);
        this.items.push(section);
        return section;
    }

    add(item) {

        if (item.value) return this.branch(item);

        this.items.push(item);
        return this;
    }

    root() {
        return this;
    }
}