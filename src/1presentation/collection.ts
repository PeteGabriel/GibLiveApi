
export class Collection {

    version: string
    href: string
    links: Link[]
    items: Item[]

    constructor(version: string, href: string){
        this.links = [] as Link[]
        this.items = [] as Item[]
        this.version = version
        this.href = href
    }

    addLink(link: Link){
        this.links.push(link)
    }

    addItem(item: Item){
        this.items.push(item)
    }
}


export class Link {
    href: string
    rel: string
    render: string

    constructor(href: string, rel: string, render: string){
        this.href = href
        this.rel = rel
        this.render = render
    }
}

export class Item {
    data: Data[]

    constructor(...items: Data[]){
        this.data = items
    }
}


export class Data{
    name: string
    value: object

    constructor(name: string, value: object){
        this.name = name
        this.value = value
    }
}