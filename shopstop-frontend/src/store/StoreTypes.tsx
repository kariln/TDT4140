export interface StateProps {
    lists: ListProps[];
    listItems: ListItemProps[];
    token: string | null;
    [key: string]: any;
    [Symbol.iterator](): IterableIterator<any>;
}

export interface ListProps {
    name: string;
    group: number;
    id: number;
}

export interface ListItemProps {
    id: number;
    name: string;
    quantity: number;
    bought: boolean;
    list: number;
}
