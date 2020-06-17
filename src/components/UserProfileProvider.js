import React, { useMemo, useEffect, useState} from 'react';
import UserProfileContext from '../context';

const UserProfileProvider = ({children}) => {

    const [picture, setPicture] = useState({ photo: ''});
    
     const value = useMemo(() => ({
        picture, setPicture
    }), [picture]);


    return (
       <UserProfileContext.Provider value={value}>
           {children}
       </UserProfileContext.Provider>
    )   
}
export default UserProfileProvider;