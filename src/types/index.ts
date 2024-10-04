// /src/types/index.ts

// Define a type alias for user roles
export type UserRole = 'admin' | 'faculty' | 'student';

// Define an interface for authentication payloads
export interface AuthPayload {
  email: string;
  password: string;
}

// Define an interface for a user
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define an interface for an event
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string; // User ID or reference
  attendees: string[]; // Array of User IDs or references
}

// Define other types and interfaces as needed
