
import { type View } from './App';

export enum UserRole {
  STUDENT = 'student',
  TUTOR = 'tutor',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role: UserRole;
  headline?: string;
}

export interface Video {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tutor: User;
  thumbnailUrl: string;
  videos: Video[];
}

export interface Booking {
  id: string;
  student: User;
  tutor: User;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Progress {
  userId: string;
  courseId: string;
  completedVideoIds: string[];
}

export type NavigateFunction = (view: View) => void;
