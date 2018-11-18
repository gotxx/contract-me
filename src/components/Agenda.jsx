import React from 'react';
import { Link } from 'react-router-dom';

const availableDates = [{
    date: '10:00',
    available: true
},{
    date: '11:00',
    available: true
},{
    date: '12:00',
    available: true
},{
    date: '13:00',
    available: true
},{
    date: '14:00',
    available: true
},{
    date: '15:00',
    available: true
},{
    date: '16:00',
    available: true
},{
    date: '17:00',
    available: true
}];

class Agenda extends React.Component {
    // console.log(props.match.params.date);
    state = {
        id: parseInt(this.props.match.params.date.replace(/-/gi,''), 10),
        currentDate: this.props.match.params.date,
        dates: availableDates,
        selectedDate: '',
        isSelected: false
    };

    renderHeader(){
        return (
            <header className="agenda__header">
                Agenda na dzień: {this.state.currentDate}
            </header>
        )
    }

    onDateClick(data){
        // console.log(data.time);
        this.setState({
            isSelected: true,
            selectedDate: data.time
        })
    }

    renderBtns(){
        return(
            <div className="btn__wrapper">
                <div className="btn__title">Czy chcesz wybrać ten termin?</div>
                <button onClick={() => this.selectBtn(true)} className="btn btn_large btn_yes">
                    <span className="icon">check</span> Potwiedź
                </button>
                <button onClick={() => this.selectBtn(false)} className="btn btn_large btn_no">
                    <span className="icon">cancel</span> Anuluj
                </button>
            </div>
        )
    }

    selectBtn(confirm) {
        let newState = confirm ? { isSelected: false } : { isSelected: false, selectedDate: '' };
        this.setState(newState);
    }

    renderAvailableDates(){
        const dates = [];

        for(let i=0,len=availableDates.length; i<len; i++) {
            // console.log(availableDates[i].date === this.state.selectedDate);
            dates.push(
                <div className={`agenda__element ${availableDates[i].available ? 'available':''}${availableDates[i].date === this.state.selectedDate ? ' selected':''}`} key={availableDates[i].date}
                    onClick={() => this.onDateClick({
                        date: this.state.currentDate,
                        time: availableDates[i].date
                    }) }
                >
                    {availableDates[i].date}
                </div>
            )
        }

        return (
            <div className="agenda__dates">
                {dates}
            </div>
        )
    }

    render() {
        return (
            <div className="agenda">
                <Link to='/' className="btn btn_large">
                    <span className="icon">arrow_back</span>
                    Back
                </Link>
                {this.renderHeader()}
                {this.renderAvailableDates()}
                {this.state.isSelected && this.renderBtns()}
            </div>
        );
    }

}

export default Agenda;