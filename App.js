import React, { useState } from 'react';
import Moment from 'react-moment';
import './App.css';

const ReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const addReminder = () => {
    if (text && date) {
      const newReminder = {
        text,
        date
      };
      setReminders([...reminders, newReminder]);
      setText('');
      setDate('');

      scheduleNotification(newReminder);
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
  };

  const scheduleNotification = (reminder) => {
    const notificationTime = new Date(reminder.date).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = notificationTime - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        displayNotification(reminder.text);
      }, timeDifference);
    }
  };

  const displayNotification = (text) => {
    window.alert(text);
  };

  return (
    <div>
      <h1>Reminder</h1>
      <input
        type="text"
        placeholder="Enter reminder text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={addReminder}>Add Reminder</button>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            <span>{reminder.text}</span>
            <Moment format="YYYY-MM-DD HH:mm">{reminder.date}</Moment>
            <button onClick={() => deleteReminder(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderApp;
