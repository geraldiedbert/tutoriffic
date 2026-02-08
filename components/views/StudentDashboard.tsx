
import React from 'react';
import { User, NavigateFunction } from '../../types';
import { mockCourses, mockProgress, mockBookings } from '../../data';
import CourseCard from '../CourseCard';
import DashboardLayout from '../DashboardLayout';

interface StudentDashboardProps {
  user: User;
  navigate: NavigateFunction;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, navigate }) => {
  const userProgress = mockProgress.filter(p => p.userId === user.id);

  return (
    <DashboardLayout user={user} navigate={navigate}>
      <h1 className="text-3xl font-bold text-sunset-heading mb-1">Hello, {user.name.split(' ')[0]}!</h1>
      <p className="text-md text-sunset-subtle-text mb-8">Ready to learn something new today?</p>
      
      <section>
        <h2 className="text-2xl font-semibold text-sunset-heading mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.slice(0, 2).map(course => {
            const progress = userProgress.find(p => p.courseId === course.id);
            return <CourseCard key={course.id} course={course} progress={progress} navigate={navigate} />;
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-sunset-heading mb-4">Upcoming Sessions</h2>
        <div className="bg-sunset-card p-4 rounded-xl border border-sunset-border">
            {mockBookings.length > 0 ? (
                 <ul className="space-y-2">
                    {mockBookings.map(booking => (
                        <li key={booking.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-sunset-hover">
                           <div className="flex items-center">
                                <img src={booking.tutor.avatarUrl} alt={booking.tutor.name} className="h-10 w-10 rounded-full mr-4"/>
                                <div>
                                    <p className="font-semibold text-sunset-heading">Session with {booking.tutor.name}</p>
                                    <p className="text-sm text-sunset-subtle-text">{booking.startTime.toLocaleString()}</p>
                                </div>
                           </div>
                           <button className="px-4 py-2 text-sm font-medium text-white bg-sunset-orange rounded-lg hover:opacity-90 shadow-subtle">
                                Join Call
                           </button>
                        </li>
                    ))}
                 </ul>
            ) : (
                <p className="text-sunset-subtle-text p-4 text-center">You have no upcoming sessions.</p>
            )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default StudentDashboard;
