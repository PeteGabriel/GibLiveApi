export declare class Collection {
    version: string;
    href: string;
    links: Link[];
    items: Item[];
    constructor(version: string, href: string);
    addLink(link: Link): void;
    addItem(item: Item): void;
}
export declare class Link {
    href: string;
    rel: string;
    render: string;
    constructor(href: string, rel: string, render: string);
}
export declare class Item {
    data: Data[];
    constructor(...items: Data[]);
}
export declare class Data {
    name: string;
    value: object;
    constructor(name: string, value: object);
}
