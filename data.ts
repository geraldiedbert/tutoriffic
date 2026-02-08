
import { User, Course, Video, Progress, Booking, UserRole } from './types';

export const mockTutor: User = {
  id: 'tutor-1',
  name: 'Dr. Evelyn Reed',
  avatarUrl: 'https://picsum.photos/seed/tutor1/200',
  role: UserRole.TUTOR,
  headline: 'PhD in Astrophysics | 10+ Years of Teaching Experience'
};

export const mockStudent: User = {
  id: 'student-1',
  name: 'Alex Johnson',
  avatarUrl: 'https://picsum.photos/seed/student1/200',
  role: UserRole.STUDENT,
};

export const mockStudent2: User = {
  id: 'student-2',
  name: 'Ben Carter',
  avatarUrl: 'https://picsum.photos/seed/student2/200',
  role: UserRole.STUDENT,
};

export const mockStudent3: User = {
  id: 'student-3',
  name: 'Chloe Davis',
  avatarUrl: 'https://picsum.photos/seed/student3/200',
  role: UserRole.STUDENT,
};

export const allMockStudents = [mockStudent, mockStudent2, mockStudent3];

const course1Videos: Video[] = [
  { id: 'v1-1', title: 'Introduction to the Cosmos', duration: 12, videoUrl: '', description: 'An overview of what we will cover in this course.' },
  { id: 'v1-2', title: 'The Birth of Stars', duration: 25, videoUrl: '', description: 'Exploring nebulae and star formation.' },
  { id: 'v1-3', title: 'Galaxies and Beyond', duration: 30, videoUrl: '', description: 'Understanding different types of galaxies.' },
  { id: 'v1-4', title: 'Black Holes Explained', duration: 22, videoUrl: '', description: 'The mysteries of black holes made simple.' },
];

const course2Videos: Video[] = [
  { id: 'v2-1', title: 'Fundamentals of Javascript', duration: 15, videoUrl: '', description: 'Variables, data types, and operators.' },
  { id: 'v2-2', title: 'Control Flow', duration: 28, videoUrl: '', description: 'If statements, loops, and switches.' },
  { id: 'v2-3', title: 'Functions and Scope', duration: 35, videoUrl: '', description: 'Deep dive into Javascript functions.' },
];

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Astrophysics for Beginners',
    description: 'A journey through the stars, from our solar system to distant galaxies.',
    tutor: mockTutor,
    thumbnailUrl: 'https://picsum.photos/seed/astro/400/225',
    videos: course1Videos,
  },
  {
    id: 'course-2',
    title: 'Modern Javascript from Scratch',
    description: 'Learn the latest features of Javascript including ES6+ and functional programming concepts.',
    tutor: mockTutor,
    thumbnailUrl: 'https://picsum.photos/seed/js/400/225',
    videos: course2Videos,
  },
  {
    id: 'course-3',
    title: 'The World of Quantum Physics',
    description: 'An accessible introduction to the weird and wonderful world of quantum mechanics.',
    tutor: mockTutor,
    thumbnailUrl: 'https://picsum.photos/seed/quantum/400/225',
    videos: [],
  }
];

export const mockProgress: Progress[] = [
  {
    userId: 'student-1',
    courseId: 'course-1',
    completedVideoIds: ['v1-1', 'v1-2'],
  },
  {
    userId: 'student-1',
    courseId: 'course-2',
    completedVideoIds: ['v2-1'],
  },
  {
    userId: 'student-2',
    courseId: 'course-1',
    completedVideoIds: ['v1-1', 'v1-2', 'v1-3'],
  },
   {
    userId: 'student-3',
    courseId: 'course-1',
    completedVideoIds: ['v1-1'],
  },
  {
    userId: 'student-3',
    courseId: 'course-2',
    completedVideoIds: ['v2-1', 'v2-2'],
  },
];

export const mockBookings: Booking[] = [
    {
        id: 'booking-1',
        student: mockStudent,
        tutor: mockTutor,
        startTime: new Date(new Date().setDate(new Date().getDate() + 2)),
        endTime: new Date(new Date().setDate(new Date().getDate() + 2) + 3600000),
        status: 'confirmed',
    },
    {
        id: 'booking-2',
        student: mockStudent,
        tutor: mockTutor,
        startTime: new Date(new Date().setDate(new Date().getDate() + 5)),
        endTime: new Date(new Date().setDate(new Date().getDate() + 5) + 3600000),
        status: 'confirmed',
    }
]
