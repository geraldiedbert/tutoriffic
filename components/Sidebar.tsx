
import React from 'react';
import { User, UserRole, NavigateFunction } from '../types';
import { ICONS } from '../constants';
import { mockTutor } from '../data';

interface SidebarProps {
  user: User;
  navigate: NavigateFunction;
}

const Sidebar: React.FC<SidebarProps> = ({ user, navigate }) => {
  
    const studentNav = [
        { name: 'Dashboard', icon: ICONS.dashboard, view: { name: 'student_dashboard' } },
        { name: 'My Courses', icon: ICONS.courses, view: { name: 'student_my_courses' } },
        { name: 'Schedule', icon: ICONS.schedule, view: { name: 'schedule', tutor: mockTutor } }, // Assuming one tutor for simplicity
    ];

    const tutorNav = [
        { name: 'Dashboard', icon: ICONS.dashboard, view: { name: 'tutor_dashboard' } },
        { name: 'My Courses', icon: ICONS.courses, view: { name: 'tutor_my_courses' } },
        { name: 'My Students', icon: ICONS.students, view: { name: 'tutor_my_students' } },
        { name: 'Schedule', icon: ICONS.schedule, view: { name: 'schedule', tutor: user } },
    ];
    
    const navItems = user.role === UserRole.STUDENT ? studentNav : tutorNav;

    return (
        <div className="h-full">
            <h2 className="text-sm font-semibold text-sunset-subtle-text px-3 mb-2">Menu</h2>
            <nav>
                <ul className="space-y-1">
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); navigate(item.view as any); }}
                                className="flex items-center space-x-3 text-sunset-subtle-text hover:text-sunset-heading hover:bg-sunset-hover rounded-lg p-3 transition-colors font-medium"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
