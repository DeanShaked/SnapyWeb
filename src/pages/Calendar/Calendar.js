import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

{/* Require Session  */}
{/* Pass in User Data */}

function Calendar() {
    const [date, setDate] = useState()
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <p>
                    Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
                </p>
                <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} />
                <hr/>
                <h3>Add New Event</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" placeholder="Add Title" />
                </div>
                <div className="form-group">
                    <label>When</label>
                    <input type="text" className="form-control" placeholder="Add Time" />
                </div>
                    
            </div>
        </div>
    )
}

export default Calendar
