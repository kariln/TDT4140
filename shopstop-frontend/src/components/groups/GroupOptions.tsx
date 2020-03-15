import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

const GroupOptions: React.FC = () => {
    const navigation = useNavigation();

    const goToInviteUser = () => {
        navigation.navigate('invite');
    };

    return (
        <TouchableOpacity>
            <Menu>
                <MenuTrigger>
                    <Icon name="more-vert" type="material" />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ marginTop: 30 }}>
                    <MenuOption
                        onSelect={goToInviteUser}
                        text="Invite User"
                        customStyles={{ optionWrapper: { padding: 20 } }}
                    />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
};

export default GroupOptions;
