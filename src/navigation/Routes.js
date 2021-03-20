import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';

import AuthStack from './AuthStack';
import HomePatientsStack from './HomePatientsStack';
import HomeDoctorsStack from './HomeDoctorsStack';
import { AuthContext } from './AuthProvider';

export default function Routes(){
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
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
