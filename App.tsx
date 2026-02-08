
import React, { useState, useCallback } from 'react';
import { User, Course, UserRole } from './types';
import { mockStudent, mockTutor } from './data';
import Header from './components/Header';
import StudentDashboard from './components/views/StudentDashboard';
import TutorDashboard from './components/views/TutorDashboard';
import CourseDetailView from './components/views/CourseDetailView';
import ScheduleView from './components/views/ScheduleView';
import StudentMyCoursesView from './components/views/StudentMyCoursesView';
import TutorMyCoursesView from './components/views/TutorMyCoursesView';
import TutorMyStudentsView from './components/views/TutorMyStudentsView';
import { Logo } from './constants';

export type View = 
  | { name: 'student_dashboard' }
  | { name: 'tutor_dashboard' }
  | { name: 'course_detail', course: Course }
  | { name: 'schedule', tutor: User }
  | { name: 'student_my_courses' }
  | { name: 'tutor_my_courses' }
  | { name: 'tutor_my_students' };

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View | null>(null);

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.STUDENT) {
      setCurrentUser(mockStudent);
      setActiveView({ name: 'student_dashboard' });
    } else {
      setCurrentUser(mockTutor);
      setActiveView({ name: 'tutor_dashboard' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView(null);
  };

  const navigate = useCallback((view: View) => {
    setActiveView(view);
  }, []);

  const renderContent = () => {
    if (!currentUser || !activeView) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-sunset-bg text-center p-4 animate-fadeIn">
            <div className="w-20 h-20 mb-6 text-sunset-orange">
                <Logo />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-sunset-heading mb-4">Welcome to Tutorio</h1>
            <p className="text-lg text-sunset-subtle-text max-w-xl mb-10">
                A personalized tutoring marketplace. Connect with amazing tutors and schedule sessions with zero friction.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    onClick={() => handleLogin(UserRole.STUDENT)}
                    className="px-8 py-3 bg-sunset-purple text-white font-semibold rounded-lg shadow-subtle hover:bg-opacity-90 transition-transform transform hover:scale-105"
                >
                    Login as Student
                </button>
                <button
                    onClick={() => handleLogin(UserRole.TUTOR)}
                    className="px-8 py-3 bg-sunset-card border-2 border-sunset-border text-sunset-heading font-semibold rounded-lg hover:border-sunset-purple transition-colors"
                >
                    Login as Tutor
                </button>
            </div>
        </div>
      );
    }
    
    switch (activeView.name) {
      case 'student_dashboard':
        return <StudentDashboard user={currentUser} navigate={navigate} />;
      case 'tutor_dashboard':
        return <TutorDashboard user={currentUser} navigate={navigate} />;
      case 'course_detail':
        return <CourseDetailView course={activeView.course} user={currentUser} navigate={navigate} />;
      case 'schedule':
        return <ScheduleView tutor={activeView.tutor} user={currentUser} navigate={navigate} />;
      case 'student_my_courses':
        return <StudentMyCoursesView user={currentUser} navigate={navigate} />;
      case 'tutor_my_courses':
        return <TutorMyCoursesView user={currentUser} navigate={navigate} />;
      case 'tutor_my_students':
        return <TutorMyStudentsView user={currentUser} navigate={navigate} />;
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-sunset-bg font-sans text-sunset-text">
       {currentUser && <Header user={currentUser} onLogout={handleLogout} />}
       <main className={currentUser ? "p-4 sm:p-6 lg:p-8" : ""}>
         {renderContent()}
       </main>
    </div>
  );
};

export default App;
