
import React from 'react';
import { User, NavigateFunction } from '../../types';
import { mockCourses, mockProgress } from '../../data';
import CourseCard from '../CourseCard';
import DashboardLayout from '../DashboardLayout';

interface StudentMyCoursesViewProps {
  user: User;
  navigate: NavigateFunction;
}

const StudentMyCoursesView: React.FC<StudentMyCoursesViewProps> = ({ user, navigate }) => {
  const userProgress = mockProgress.filter(p => p.userId === user.id);
  const enrolledCourseIds = userProgress.map(p => p.courseId);
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));

  return (
    <DashboardLayout user={user} navigate={navigate}>
      <h1 className="text-3xl font-bold text-sunset-heading mb-1">My Courses</h1>
      <p className="text-md text-sunset-subtle-text mb-8">All your enrolled courses in one place. Keep up the great work!</p>
      
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => {
            const progress = userProgress.find(p => p.courseId === course.id);
            return <CourseCard key={course.id} course={course} progress={progress} navigate={navigate} />;
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-sunset-card rounded-xl border border-sunset-border">
            <h2 className="text-xl font-semibold text-sunset-heading">No courses yet!</h2>
            <p className="text-sunset-subtle-text mt-2">Explore the dashboard to enroll in your first course.</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentMyCoursesView;
