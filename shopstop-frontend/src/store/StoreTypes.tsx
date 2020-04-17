export interface StateProps {
    lists: ListProps[];
    listItems: ListItemProps[];
    groups: GroupProps[];
    invitedGroups: GroupProps[];
    authentication: AuthenticationProps;
    selectedGroup: number | null;
    selectedList: number | null;
    username: string | null;
    overlay: OverlayProps;
    [key: string]: any;
    [Symbol.iterator](): IterableIterator<any>; // This is here so we can iterate through the state, typescript wanted this here.
}

export interface GroupProps {
    name: string;
    id: number;
}

export interface AuthenticationProps {
    isLoading: boolean;
    isSignout: boolean;
    token: null | string;
}

export interface OverlayProps {
    visible: boolean;
    type: string;
    id?: number | null;
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

export interface ListItemTutorialProps {
    deleteMode: boolean;
    viewBoughtMode: boolean;
    editMode: boolean;
    toggleBought: boolean;
}

export interface RemoveListProps {
    id: number;
}
