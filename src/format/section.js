export class Section {

    constructor(parent, item) {
        this.parent = parent;
        this.weight = item.value;
        this.items = [];
    }

    branch(item) {
        let section = new Section(this, item);
        this.items.push(section);
        return section;
    }

    add(item) {

        if (item.value && item.value < this.weight) return this.parent.add(item);

        if (item.value) return this.branch(item);

        this.items.push(item);
        return this;
    }

    root() {
        return this.parent.root();
    }
}