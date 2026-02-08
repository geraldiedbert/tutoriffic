
import React from 'react';
import { User, NavigateFunction } from '../../types';
import { mockCourses, mockBookings } from '../../data';
import CourseCard from '../CourseCard';
import DashboardLayout from '../DashboardLayout';

interface TutorDashboardProps {
  user: User;
  navigate: NavigateFunction;
}

const StatCard: React.FC<{label: string, value: string | number}> = ({label, value}) => (
    <div className="bg-sunset-card p-6 rounded-xl border border-sunset-border text-center">
        <p className="text-3xl font-bold text-sunset-orange">{value}</p>
        <p className="text-sm text-sunset-subtle-text mt-1">{label}</p>
    </div>
);

const TutorDashboard: React.FC<TutorDashboardProps> = ({ user, navigate }) => {
  const tutorCourses = mockCourses.filter(c => c.tutor.id === user.id);

  return (
    <DashboardLayout user={user} navigate={navigate}>
      <h1 className="text-3xl font-bold text-sunset-heading mb-1">Welcome back, {user.name.split(' ')[0]}!</h1>
      <p className="text-md text-sunset-subtle-text mb-8">Here's what's happening today.</p>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Students" value="128" />
        <StatCard label="Courses" value={tutorCourses.length} />
        <StatCard label="Upcoming Sessions" value={mockBookings.length} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-sunset-heading">My Courses</h2>
          <button className="px-5 py-2 text-sm font-medium text-white bg-sunset-purple rounded-lg hover:bg-opacity-90 shadow-subtle">
            + Add New Course
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorCourses.map(course => (
            <CourseCard key={course.id} course={course} navigate={navigate} />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default TutorDashboard;
