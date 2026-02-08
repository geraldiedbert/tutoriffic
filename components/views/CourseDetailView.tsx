
import React, { useState } from 'react';
import { Course, User, UserRole, NavigateFunction } from '../../types';
import { mockProgress } from '../../data';
import Avatar from '../Avatar';
import { ICONS } from '../../constants';

interface CourseDetailViewProps {
  course: Course;
  user: User;
  navigate: NavigateFunction;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, user, navigate }) => {
    const [activeVideo, setActiveVideo] = useState(course.videos[0] || null);
    
    const studentProgress = user.role === UserRole.STUDENT 
        ? mockProgress.find(p => p.courseId === course.id && p.userId === user.id) 
        : null;
    
    const [completedIds, setCompletedIds] = useState<Set<string>>(new Set(studentProgress?.completedVideoIds || []));

    const handleToggleComplete = (videoId: string) => {
        if (user.role !== UserRole.STUDENT) return;
        const newCompletedIds = new Set(completedIds);
        if (newCompletedIds.has(videoId)) {
            newCompletedIds.delete(videoId);
        } else {
            newCompletedIds.add(videoId);
        }
        setCompletedIds(newCompletedIds);
    };

    const progressPercentage = course.videos.length > 0 ? (completedIds.size / course.videos.length) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn">
        <button 
            onClick={() => navigate({ name: user.role === UserRole.STUDENT ? 'student_dashboard' : 'tutor_dashboard' })}
            className="flex items-center space-x-2 text-sunset-purple font-semibold mb-6 hover:underline"
        >
            {ICONS.back}
            <span>Back to Dashboard</span>
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="bg-black rounded-xl aspect-video w-full flex items-center justify-center mb-4 shadow-subtle">
                <img src={course.thumbnailUrl} alt="Video placeholder" className="object-cover w-full h-full rounded-xl"/>
            </div>
            <h1 className="text-3xl font-bold text-sunset-heading mb-2">{activeVideo?.title || course.title}</h1>
            <p className="text-sunset-subtle-text mb-6">{activeVideo?.description || course.description}</p>
            
            <div className="bg-sunset-card p-6 rounded-xl border border-sunset-border flex items-center justify-between">
                <div className="flex items-center">
                    <Avatar user={course.tutor} size="lg"/>
                    <div className="ml-4">
                        <p className="font-bold text-lg text-sunset-heading">{course.tutor.name}</p>
                        <p className="text-sm text-sunset-subtle-text">{course.tutor.headline}</p>
                    </div>
                </div>
                 <button onClick={() => navigate({ name: 'schedule', tutor: course.tutor })} className="px-5 py-3 text-sm font-medium text-white bg-sunset-purple rounded-lg hover:bg-opacity-90 shadow-subtle">
                    Schedule Session
                 </button>
            </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-sunset-card p-4 rounded-xl border border-sunset-border h-full">
            <h2 className="text-xl font-bold text-sunset-heading p-2 mb-2">Course Content</h2>
            {user.role === UserRole.STUDENT && (
                 <div className="w-full bg-sunset-hover rounded-full h-2.5 mb-4 mx-2">
                    <div className="bg-gradient-to-r from-sunset-pink to-sunset-orange h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                </div>
            )}
            <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
              {course.videos.map((video, index) => (
                <li 
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${activeVideo?.id === video.id ? 'bg-sunset-hover' : 'hover:bg-sunset-hover'}`}
                >
                    <div className="flex items-center">
                        <span className="text-sunset-subtle-text font-semibold text-base w-8 text-center mr-2">{String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <p className="font-semibold text-sunset-heading">{video.title}</p>
                            <p className="text-xs text-sunset-subtle-text">{video.duration} mins</p>
                        </div>
                    </div>
                    {user.role === UserRole.STUDENT && (
                        <button className="p-1" onClick={(e) => { e.stopPropagation(); handleToggleComplete(video.id); }}>
                            {completedIds.has(video.id) ? ICONS.checkmark : <div className="h-5 w-5 rounded-full border-2 border-gray-300 hover:border-sunset-purple transition-colors"></div>}
                        </button>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
