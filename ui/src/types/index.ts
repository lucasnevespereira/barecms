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
    siteId: string;
    fields: Field[];
    entries: Entry[];
}

export interface Field {
    name: string;
    type: string;
}

export interface Entry {
    id: string;
    collectionId: string;
    data: Record<string, any>;
}

