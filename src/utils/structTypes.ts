//TS doesn't iterate over objects, these give errors.

export interface Item {
    CreationDate: number;
    Link: string;
} 

export interface Response {
    Items: Item[]
}