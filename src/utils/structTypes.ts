export interface Owner {
    DisplayName: string;
}

export interface Item {
    Owner: Owner,
    CreationDate: number,
    Link: string,
} 

export interface Response {
    Items: Item[];
}