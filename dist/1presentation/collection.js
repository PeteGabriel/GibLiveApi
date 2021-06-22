"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.Item = exports.Link = exports.Collection = void 0;
class Collection {
    constructor(version, href) {
        this.links = [];
        this.items = [];
        this.version = version;
        this.href = href;
    }
    addLink(link) {
        this.links.push(link);
    }
    addItem(item) {
        this.items.push(item);
    }
}
exports.Collection = Collection;
class Link {
    constructor(href, rel, render) {
        this.href = href;
        this.rel = rel;
        this.render = render;
    }
}
exports.Link = Link;
class Item {
    constructor(...items) {
        this.data = items;
    }
}
exports.Item = Item;
class Data {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
exports.Data = Data;
//# sourceMappingURL=collection.js.map