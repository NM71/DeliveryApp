// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// import HomeScreen from '../screens/HomeScreen';
// import BrowseScreen from '../screens/BrowseScreen';
// import CartScreen from '../screens/CartScreen';

// const Tab = createBottomTabNavigator();

// const TabNavigator: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName: any;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Browse') {
//               iconName = focused ? 'grid' : 'grid-outline';
//             } else if (route.name === 'Cart') {
//               iconName = focused ? 'basket' : 'basket-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#4CAF50',
//           tabBarInactiveTintColor: '#999',
//           tabBarStyle: {
//             paddingTop: 5,
//             height: 60,
//           },
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Browse" component={BrowseScreen} options={{ headerShown: false }} />
//         <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
//         {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default TabNavigator;
