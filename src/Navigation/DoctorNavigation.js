import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from '../screens/Doctor/Home/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colorTheme, common_styles } from '../constant';
import { StyleSheet, View, Text, Image } from 'react-native';
import Status from '../components/Status';
import AccountSetting from '../screens/Doctor/Profile/AccountSetting';
import ChangePassword from '../screens/Doctor/Profile/ChangePassword';
import Wallet from '../screens/Doctor/Wallet/Wallet';
import Chat from '../screens/Doctor/Chat/Chat';
import BigButton from '../components/Buttons/BigButton';
import Appointment from '../screens/Doctor/Appointments/Appointment';

const Drawer = createDrawerNavigator();

const DoctorNavigator = () => {
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
                    else if (route.name === 'AccountSetting') {
                        iconName = 'account-cog-outline';
                    }
                    else if (route.name === 'ChangePassword') {
                        iconName = 'account-lock-outline';
                    }
                    else if (route.name === 'Wallet') {
                        iconName = 'credit-card-outline';
                    }
                    else if (route.name === 'Chat') {
                        iconName = 'chat-outline';
                    }
                    else if (route.name === 'Appointment') {
                        iconName = 'calendar-month-outline';
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
                name="Appointment"
                component={Appointment}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Appointment"} />
                }}
            />
            <Drawer.Screen
                name="Wallet"
                component={Wallet}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Wallet"} />
                }}
            />
            <Drawer.Screen
                name="Chat"
                component={Chat}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Chat Messages"} />
                }}
            />
            <Drawer.Screen
                name="AccountSetting"
                component={AccountSetting}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Account Settings"} />
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    drawerLabel: () => <CustomDrawerScreenLabel title={"Change Password"} />
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
    return (
        <View style={{marginBlock:20,}}>
            <BigButton label={'Logout'} style={{ elevation: 2 }} />
        </View>
    )
}

function DrawerInsideComponent({ styles }) {
    return (<>
        <Status />
        <View style={{}}>
            <Text style={[common_styles.extra_large_text_large_weight, { fontSize: 25 }]}>Menu</Text>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBlock: 15 }}>
                <Image source={require('../assets/img/try.jpg')} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 50 }} />
                <View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-end' }}>
                        <Text style={[common_styles.large_text_normal_weight]}>Dr.Sharvesh Singh</Text>
                        <MaterialIcons color={colorTheme} size={20} name={'verified'} />
                    </View>
                    <Text style={[common_styles.small_text_normal_weight]}>Surgeon</Text>
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

export default DoctorNavigator;