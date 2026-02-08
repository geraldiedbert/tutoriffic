
import React from 'react';
import { User, NavigateFunction } from '../../types';
import { mockCourses, mockProgress, allMockStudents } from '../../data';
import DashboardLayout from '../DashboardLayout';
import Avatar from '../Avatar';

interface TutorMyStudentsViewProps {
  user: User;
  navigate: NavigateFunction;
}

const TutorMyStudentsView: React.FC<TutorMyStudentsViewProps> = ({ user, navigate }) => {
  const tutorCourseIds = mockCourses
    .filter(c => c.tutor.id === user.id)
    .map(c => c.id);

  const studentEnrollments = mockProgress
    .filter(p => tutorCourseIds.includes(p.courseId))
    .reduce((acc, p) => {
      if (!acc[p.userId]) {
        acc[p.userId] = { student: null, courseIds: new Set() };
      }
      acc[p.userId].courseIds.add(p.courseId);
      return acc;
    }, {} as Record<string, { student: User | null; courseIds: Set<string> }>);

  const students = Object.keys(studentEnrollments).map(studentId => {
    const student = allMockStudents.find(s => s.id === studentId);
    if (student) {
        studentEnrollments[studentId].student = student;
    }
    return studentEnrollments[studentId];
  }).filter(s => s.student);

  return (
    <DashboardLayout user={user} navigate={navigate}>
        <h1 className="text-3xl font-bold text-sunset-heading mb-1">My Students</h1>
        <p className="text-md text-sunset-subtle-text mb-8">A list of all students currently enrolled in your courses.</p>
      
        <div className="bg-sunset-card p-4 rounded-xl border border-sunset-border">
            {students.length > 0 ? (
                 <ul className="divide-y divide-sunset-border">
                    {students.map(({student, courseIds}) => student && (
                        <li key={student.id} className="flex items-center justify-between p-4">
                           <div className="flex items-center">
                               <Avatar user={student}/>
                                <div className="ml-4">
                                    <p className="font-semibold text-sunset-heading">{student.name}</p>
                                    <p className="text-sm text-sunset-subtle-text">Enrolled in {courseIds.size} {courseIds.size === 1 ? 'course' : 'courses'}</p>
                                </div>
                           </div>
                           <button className="px-4 py-2 text-sm font-medium text-sunset-purple border-2 border-sunset-border rounded-lg hover:border-sunset-purple transition-colors">
                                View Progress
                           </button>
                        </li>
                    ))}
                 </ul>
            ) : (
                <p className="text-sunset-subtle-text p-8 text-center">You don't have any students yet.</p>
            )}
        </div>
    </DashboardLayout>
  );
};

export default TutorMyStudentsView;
