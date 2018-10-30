import React from 'react';
import Swipe from 'react-easy-swipe';
import dateFns from 'date-fns';
import pl from 'date-fns/locale/pl';

class Calendar extends React.Component {

    state = {
        currenthMonth: new Date(),
        selectedDate: new Date()
    };

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <Swipe
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currenthMonth, dateFormat, { locale: pl })}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">
                        chevron_right
                    </div>
                </div>
            </Swipe>       
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currenthMonth);

        for(let i=0; i<7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat, { locale: pl })}
                </div>
            )
        }

        return <div className="days row">{days}</div>
    }

    renderCells(){
        const { currenthMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currenthMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while(day <= endDate) {
            for (let i=0; i<7; i++){
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return (
            <Swipe
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                className="body"
            >
                {rows}
            </Swipe>
        ); 
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        })
    }

    nextMonth = () => {
        this.setState({
            currenthMonth: dateFns.addMonths(this.state.currenthMonth, 1)
        });
    };

    onSwipeRight = () => {
        this.nextMonth();
    }


    prevMonth = () => {
        this.setState({
            currenthMonth: dateFns.subMonths(this.state.currenthMonth, 1)
        })
    };

    onSwipeLeft = () => {
        this.prevMonth();
    }

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;