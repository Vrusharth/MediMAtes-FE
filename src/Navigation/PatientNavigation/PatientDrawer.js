import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorTheme, common_styles } from '../../constant';
import Home from '../../screens/Patient/Home/Home';
import BigButton from '../../components/Buttons/BigButton';
import Status from '../../components/Status';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Chat from '../../screens/Patient/Chat/Chat';
import { removeItem } from '../../utils/asyncstorage';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


const PatientDrawer = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerView {...props} styles={styles} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                drawerIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline'; // Example icon for BottomNavigator
                    }
                    else if (route.name === 'Chat') {
                        iconName = 'chat-outline'; // Example icon for BottomNavigator
                    }
                    return (
                        <View style={{ paddingInline: 8, paddingBlock: 5, backgroundColor: colorTheme.iconWithBlueBackGround, borderRadius: 10 }}>
                            <MaterialCommunityIcons name={iconName} color={colorTheme.primaryColor} size={size} />
                        </View>
                    );
                },
                drawerStyle: styles.drawerStyle,
                drawerActiveBackgroundColor: "transparent",
                drawerInactiveBackgroundColor: 'transparent',
                // drawerLabelStyle: [common_styles.large_text_normal_weight]
            })}
            initialRouteName="Home"
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Home"} />
                }}
            />
            <Drawer.Screen
                name="Chat"
                component={Chat}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Chat"} />
                }}
            />
        </Drawer.Navigator>
    );
};

function CustomDrawerScreenLabel({ title }) {
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        }}>
            <Text style={common_styles.large_text_normal_weight}>
                {title}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colorTheme.primaryColor} />
        </View>
    )
}

function DrawerView(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerInsideComponent styles={props.styles} />
            <DrawerItemList {...props} />
            <DrawerBottomComponent />
        </DrawerContentScrollView>
    );
}

function DrawerBottomComponent() {
    const navigation = useNavigation()
    function logout(params) {
        removeItem('user');
        removeItem('role');
        navigation.reset({
            index: 0,
            routes: [{ name: 'GetStarted' }],
        });
    }
    return (
        <View style={{ marginBlock: 20, }}>
            <BigButton onPress={() => { logout() }} label={'Logout'} style={{ elevation: 2 }} />
        </View>
    )
}

function DrawerInsideComponent({ styles }) {
    return (<>
        <Status />
        <View style={{}}>
            <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25 }]}>Menu</Text>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBlock: 15 }}>
                <Image source={require('../../assets/img/try.jpg')} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 50 }} />
                <View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-end' }}>
                        <Text style={[common_styles.large_text_normal_weight]}>Sharvesh Singh</Text>
                        <MaterialIcons color={colorTheme} size={20} name={'verified'} />
                    </View>
                </View>
            </View>
        </View>
    </>
    );
}
const styles = StyleSheet.create({
    drawerStyle: {
        backgroundColor: colorTheme.lightappBackGroundColor,
    }
})

export default PatientDrawer;