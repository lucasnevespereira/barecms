

export interface Project {
    id: number;
    name: string;
    description: string;
    url: string;
    image: string;
}

export interface Site {
    id: string;
    name: string;
    slug: string
}

export interface Article {
    id: string;
    title: string;
    content: string;
}