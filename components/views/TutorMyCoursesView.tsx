
import React from 'react';
import { User, NavigateFunction } from '../../types';
import { mockCourses, mockProgress } from '../../data';
import CourseCard from '../CourseCard';
import DashboardLayout from '../DashboardLayout';

interface TutorMyCoursesViewProps {
  user: User;
  navigate: NavigateFunction;
}

const TutorMyCoursesView: React.FC<TutorMyCoursesViewProps> = ({ user, navigate }) => {
  const tutorCourses = mockCourses.filter(c => c.tutor.id === user.id);

  const getStudentCount = (courseId: string) => {
    return mockProgress.filter(p => p.courseId === courseId).length;
  };

  return (
    <DashboardLayout user={user} navigate={navigate}>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-sunset-heading mb-1">My Courses</h1>
            <p className="text-md text-sunset-subtle-text">Manage your courses and view student enrollment.</p>
        </div>
        <button className="px-5 py-2 text-sm font-medium text-white bg-sunset-purple rounded-lg hover:bg-opacity-90 shadow-subtle">
            + Add New Course
        </button>
      </div>
      
      {tutorCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorCourses.map(course => (
            <CourseCard 
                key={course.id} 
                course={course} 
                navigate={navigate} 
                studentCount={getStudentCount(course.id)}
            />
          ))}
        </div>
       ) : (
        <div className="text-center py-16 bg-sunset-card rounded-xl border border-sunset-border">
            <h2 className="text-xl font-semibold text-sunset-heading">You haven't created any courses yet.</h2>
            <p className="text-sunset-subtle-text mt-2">Click "Add New Course" to get started.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TutorMyCoursesView;
