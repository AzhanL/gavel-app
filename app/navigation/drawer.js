import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon} from 'react-native-elements';



//Screens
import HomeScreen from "../pages/home";
import SearchScreen from "../pages/search";
import MenuScreen from "../pages/menu/menu";
import CasesScreen from "../pages/menu/cases/cases";
import LocationScreen from "../pages/menu/location/location";
import Info from "../pages/menu/location/info"
import Civil from "../pages/menu/cases/civil";
import Criminal from "../pages/menu/cases/criminal";
import Favorites from "../pages/favorites";
import Notifications from "../pages/notifications";

const Drawer = createDrawerNavigator();

function Home(){
  return (
    <Drawer.Navigator 
      initialRouteName='Cases'
      drawerPosition='slide' 
      drawerType='back'
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'black',
        itemStyle: { marginVertical: 10 },
        labelStyle:{fontWeight:'bold', fontSize:15}
      }}
    >
      <Drawer.Screen 
          name="Home" 
          component={HomeScreen}
          options={{drawerTitle:'Home', 
            drawerIcon: () => (
              <Icon name="home" style={{width: 30, height: 30}} />
          )}}  
        />

        <Drawer.Screen 
          name="Menu" 
          component={Menu} 
          options={{drawerTitle:'Menu', 
                    drawerIcon: () => (
                      <Icon name="menu" style={{width: 30, height: 30}} />
                  )}}  
          />
          
          <Drawer.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{drawerTitle:'Search', 
                      drawerIcon: () => (
                        <Icon name="search" style={{width: 30, height: 30}} />
                    )}}  
          />

          <Drawer.Screen 
            name="Favorites" 
            component={Favorites} 
            options={{drawerTitle:'Favorites', 
                      drawerIcon: () => (
                        <Icon name="bookmark" style={{width: 30, height: 30}} />
                    )}}  
          />
          
          <Drawer.Screen 
            name="Notifications" 
            component={Notifications} 
            options={{drawerTitle:'Notifications', 
                      drawerIcon: () => (
                        <Icon name="alarm" style={{width: 30, height: 30}} />
                    )}}  
          />

      </Drawer.Navigator>

  );
}

function Location() {
  return (

    <Drawer.Navigator 
      initialRouteName='Cases'
      drawerPosition='slide' 
      drawerType='back'
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'black',
        itemStyle: { marginVertical: 10 },
        labelStyle:{fontWeight:'bold', fontSize:15}
      }}
    >

      <Drawer.Screen 
        name="Regions" 
        component={LocationScreen}
        options={{headerTitleAlign:'center', 
        headerTintColor: 'black',
        drawerIcon: () => (
          <Icon name="book" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Info" 
        component={Info}
        options={{headerTitleAlign:'center', 
        headerTintColor: 'black',
        drawerIcon: () => (
          <Icon name="people" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Menu" 
        component={Menu} 
        options={{drawerTitle:'Menu', 
          drawerIcon: () => (
            <Icon name="menu" style={{width: 30, height: 30}} />
        )}}  
      />

      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={{drawerTitle:'Home', 
          drawerIcon: () => (
            <Icon name="home" style={{width: 30, height: 30}} />
        )}}  
      />

      <Drawer.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{drawerTitle:'Favorites', 
                  drawerIcon: () => (
                    <Icon name="bookmark" style={{width: 30, height: 30}} />
                )}}  
      />
      
      <Drawer.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{drawerTitle:'Notifications', 
                  drawerIcon: () => (
                    <Icon name="alarm" style={{width: 30, height: 30}} />
                )}}  
      />  

    </Drawer.Navigator>

  );
}

function Cases() {
  return (

    <Drawer.Navigator 
      initialRouteName='Cases'
      drawerPosition='slide' 
      drawerType='back'
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'black',
        itemStyle: { marginVertical: 10 },
        labelStyle:{fontWeight:'bold', fontSize:15}
      }}
    >

      <Drawer.Screen 
        name="Cases" 
        component={CasesScreen}
        options={{headerTitleAlign:'center', 
        headerTintColor: 'black',
        drawerIcon: () => (
          <Icon name="book" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Civil" 
        component={Civil}
        options={{headerTitleAlign:'center', 
        headerTintColor: 'black',
        drawerIcon: () => (
          <Icon name="people" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Criminal" 
        component={Criminal} 
        options={{headerTitleAlign:'center',
        drawerIcon: () => (
          <Icon name="lock" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Menu" 
        component={Menu} 
        options={{drawerTitle:'Menu', 
          drawerIcon: () => (
            <Icon name="menu" style={{width: 30, height: 30}} />
        )}}  
      />

      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={{drawerTitle:'Home', 
          drawerIcon: () => (
            <Icon name="home" style={{width: 30, height: 30}} />
        )}}  
      />

      <Drawer.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{drawerTitle:'Favorites', 
                  drawerIcon: () => (
                    <Icon name="bookmark" style={{width: 30, height: 30}} />
                )}}  
      />
        
      <Drawer.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{drawerTitle:'Notifications', 
                  drawerIcon: () => (
                    <Icon name="alarm" style={{width: 30, height: 30}} />
                )}}  
      />

    </Drawer.Navigator>

  );
}


function Menu() {
  return (
    <Drawer.Navigator  
      initialRouteName='Menu'
      drawerPosition='slide' 
      drawerType='back'
      drawerStyle={{
        backgroundColor: 'white',
        width: 240,
      }}
      drawerContentOptions={{
        activeTintColor: 'black',
        itemStyle: { marginVertical: 10 },
        labelStyle:{fontWeight:'bold', fontSize:15}
      }}
    >

      <Drawer.Screen 
        name="Menu" 
        component={MenuScreen}
        options={{headerTitleAlign:'center', 
        headerTintColor: 'black',
        drawerIcon: () => (
          <Icon name="menu" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Cases" 
        component={Cases} 
        options={{headerTitleAlign:'center',
        drawerIcon: () => (
          <Icon name="book" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Locations" 
        component={Location} 
        options={{headerTitleAlign:'center',
        drawerIcon: () => (
          <Icon name="map" style={{width: 30, height: 30}} />
        )}} 
      />

      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={{drawerTitle:'Home', 
          drawerIcon: () => (
            <Icon name="home" style={{width: 30, height: 30}} />
        )}}  
      />

      <Drawer.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{drawerTitle:'Favorites', 
                  drawerIcon: () => (
                    <Icon name="bookmark" style={{width: 30, height: 30}} />
                )}}  
        />
      
      <Drawer.Screen 
        name="Notifications" 
        component={Notifications} 
        options={{drawerTitle:'Notifications', 
                  drawerIcon: () => (
                    <Icon name="alarm" style={{width: 30, height: 30}} />
                )}}  
      />

    </Drawer.Navigator>
  );
}

export default function SideBar() {
  return (
    <NavigationContainer >
        
        <Drawer.Navigator 
          
            initialRouteName='Home' 
            drawerPosition='slide' 
            drawerType='back'
            drawerStyle={{
              backgroundColor: 'white',
              width: 240,
            }}
            drawerContentOptions={{
              activeTintColor: 'black',
              itemStyle: { marginVertical: 10 },
              labelStyle:{fontWeight:'bold', fontSize:15}
            }}
        >
            
            <Drawer.Screen 
                name="Home" 
                component={Home}

            />

        </Drawer.Navigator>

    </NavigationContainer>
    
  );
}


