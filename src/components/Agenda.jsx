import React from 'react';
import { Link } from 'react-router-dom';

const Agenda = (props) =>  {
    // console.log(props.match.params.date);
    const  date = parseInt(props.match.params.date, 10);

    return (
        <div>
            <h1>Agenda na dzień: {date}</h1>
            <Link to='/'>Back</Link>
        </div>
    );

}

export default Agenda;