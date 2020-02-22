export interface StateProps {
    lists: ListProps[];
    listItems: ListItemProps[];
    token: string | null;
    [key: string]: any;
    [Symbol.iterator](): IterableIterator<any>;
}

export type ListProps = {
    name: string;
    group: number;
    created_at: string;
    modified_at: string;
};

export type ListItemProps = {
    id: number;
    name: string;
    quantity: number;
    bought: boolean;
    list: number;
};
