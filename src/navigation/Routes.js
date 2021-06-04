import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useState } from 'react';

import AuthStack from './AuthStack';
import HomePatientsStack from './HomePatientsStack';
import HomeDoctorsStack from './HomeDoctorsStack';
import { AuthContext } from './AuthProvider';

export default function Routes(){
    const { user } = useContext(AuthContext);
    return(
        <NavigationContainer>
            {
                user ? user.indexOf('Dr.') !== -1 ? 
                <HomeDoctorsStack /> : 
                <HomePatientsStack /> : 
                <AuthStack />
            }
            
        </NavigationContainer>
    )
}

