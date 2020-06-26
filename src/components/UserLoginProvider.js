import React, { useMemo, useEffect, useState} from 'react';

import { UserProfileContext, UserLoginContext } from '../context';

const UserLoginProvider = ({children}) => {

    const [loginPhoto, setLoginPhoto] = useState({ photo: ''});

    console.log("Nav Image:"+loginPhoto);

     const value = useMemo(() => ({
        loginPhoto, setLoginPhoto
    }), [loginPhoto]);

    return (
       <UserLoginContext.Provider value={value}>
           {children}
       </UserLoginContext.Provider>
    )   
}
export default UserLoginProvider;