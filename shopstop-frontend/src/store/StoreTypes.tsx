export interface StateProps {
    lists: ListProps[];
    listItems: ListItemProps[];
    token: string | null;
    selectedGroup: number | null;
    selectedList: number | null;
    listOverlay: ListOverlayProps;
    [key: string]: any;
    [Symbol.iterator](): IterableIterator<any>;
}

export interface ListOverlayProps {
    visible: boolean;
    type: string;
    id: number | null;
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
