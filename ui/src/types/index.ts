export interface Site {
    id: string;
    name: string;
    slug: string;
    collections: Collection[];
}

export interface Collection {
    id: string;
    name: string;
    slug: string;
    fields: Field[];
}

export interface Field {
    name: string;
    type: string;
}

