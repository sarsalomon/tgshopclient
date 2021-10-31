import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { NOTFOUNDED_ROUTER } from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context)
    let accessRouter;
    if (user.isAuth) {
        accessRouter = authRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
                
        )
    }else{
        accessRouter = publicRoutes.map(({path,Component})=>
        <Route key={path} path={path} component={Component} exact/>
        )
    }
    return (
        <Switch>
            {accessRouter}
            <Redirect to={NOTFOUNDED_ROUTER}/>
        </Switch>
    );
};

export default AppRouter;