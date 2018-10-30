import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Calendar from './Calendar';
import Agenda from './Agenda';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Calendar} />
            <Route exact path='/agenda/:date' component={Agenda} />
        </Switch>
    </main>
);
export default Main;