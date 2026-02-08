
import React, { useState } from 'react';
import { User, NavigateFunction, UserRole } from '../../types';
import DashboardLayout from '../DashboardLayout';
import Avatar from '../Avatar';

interface ScheduleViewProps {
  tutor: User;
  user: User;
  navigate: NavigateFunction;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const ScheduleView: React.FC<ScheduleViewProps> = ({ tutor, user, navigate }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const handleBooking = () => {
        if(selectedSlot) {
            alert(`Booking confirmed with ${tutor.name} for ${selectedDate.toDateString()} at ${selectedSlot}!`);
            setSelectedSlot(null);
        } else {
            alert('Please select a time slot.');
        }
    }

  return (
    <DashboardLayout user={user} navigate={navigate}>
      <div className="bg-sunset-card p-8 rounded-xl border border-sunset-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-sunset-border">
            <div>
                <h1 className="text-3xl font-bold text-sunset-heading mb-1">
                    {user.role === UserRole.TUTOR ? "My Schedule" : `Schedule with ${tutor.name}`}
                </h1>
                <p className="text-md text-sunset-subtle-text">Select a date and time that works for you.</p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
                <Avatar user={tutor} />
                <p className="ml-3 font-semibold text-sunset-heading">{tutor.name}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))} className="p-2 rounded-full hover:bg-sunset-hover">&lt;</button>
                    <h2 className="text-xl font-semibold text-sunset-heading">{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))} className="p-2 rounded-full hover:bg-sunset-hover">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500">
                    {days.map(day => <div key={day} className="font-semibold text-sunset-subtle-text py-2">{day}</div>)}
                    {Array.from({length: 35}).map((_, i) => {
                        const day = i - new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() + 1;
                        const isCurrentMonth = day > 0 && day <= new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                        const isToday = new Date().toDateString() === new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day).toDateString();
                        
                        return (
                            <div key={i} className={`p-2 h-10 w-10 flex items-center justify-center mx-auto rounded-full cursor-pointer ${isToday ? 'bg-sunset-orange text-white' : isCurrentMonth ? 'hover:bg-sunset-hover' : ''} ${!isCurrentMonth ? 'text-gray-300' : 'text-sunset-heading'}`}>
                                {isCurrentMonth ? day : ''}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 text-sunset-heading text-center md:text-left">Available Times</h3>
                <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map(slot => (
                        <button 
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-lg text-sm font-medium border-2 transition-colors ${selectedSlot === slot ? 'bg-sunset-purple text-white border-sunset-purple' : 'border-sunset-border hover:border-sunset-purple'}`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={handleBooking}
                    disabled={!selectedSlot}
                    className="w-full mt-6 py-3 text-white font-semibold bg-sunset-purple rounded-lg shadow-subtle hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirm Booking
                </button>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleView;
