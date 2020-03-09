export interface StateProps {
    lists: ListProps[];
    listItems: ListItemProps[];
    authentication: AuthenticationProps;
    selectedGroup: number | null;
    selectedList: number | null;
    username: string | null;
    listOverlay: ListOverlayProps;
    [key: string]: any;
    [Symbol.iterator](): IterableIterator<any>;
}

export interface AuthenticationProps {
    isLoading: boolean;
    isSignout: boolean;
    token: null | string;
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
