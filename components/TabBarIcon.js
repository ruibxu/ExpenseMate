import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

export const TabBarIcon = (props) => {
    switch (props.name) {
        case 'Expenses':
            return <Ionicons name="wallet" size={24} color={theme.colors.icons} />
        case 'Reports':
            return <AntDesign name="piechart" size={24} color={theme.colors.icons} />
        case 'Add':
            return <MaterialIcons name="add" size={33} color={theme.colors.icons}/>
        case 'Settings':
            return <Ionicons name="settings-sharp" size={24} color={theme.colors.icons} />
        default:
            return null;
    }
}