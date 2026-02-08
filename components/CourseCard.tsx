
import React from 'react';
import { Course, Progress, NavigateFunction } from '../types';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  course: Course;
  progress?: Progress;
  navigate: NavigateFunction;
  studentCount?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress, navigate, studentCount }) => {
  return (
    <div 
        className="bg-sunset-card rounded-xl shadow-card overflow-hidden border border-transparent hover:border-sunset-purple transition-all duration-300 flex flex-col cursor-pointer"
        onClick={() => navigate({ name: 'course_detail', course })}
    >
      <img className="h-48 w-full object-cover" src={course.thumbnailUrl} alt={course.title} />
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-sunset-heading mb-2">{course.title}</h3>
        <p className="text-sm text-sunset-subtle-text mb-4 flex-grow">{course.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-sunset-border">
          <div className="flex items-center">
            <img className="h-8 w-8 rounded-full object-cover mr-3" src={course.tutor.avatarUrl} alt={course.tutor.name} />
            <span className="text-sm font-medium text-sunset-heading">{course.tutor.name}</span>
          </div>
          {studentCount !== undefined && (
             <span className="text-sm font-medium text-sunset-subtle-text">{studentCount} {studentCount === 1 ? 'Student' : 'Students'}</span>
          )}
        </div>
        {progress && (
            <div className="mt-4">
                <ProgressBar current={progress.completedVideoIds.length} total={course.videos.length} />
            </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
