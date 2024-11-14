export interface Image {
    _id: string;
    filename: string;
    url: string;
    createdAt: string;
  }
  export interface EventFormData {
    title: string;
    members: number;
    location: string;
    category: string;
    startDate: Date;
    endDate: Date;
    time: string;
    organizerName: string;
    sponsors: string[];
    image: File | null;
    tags: string[];
    description: string;
  }
  // export interface EventFormDataMain {
  //   title: string;
  //   members: number;
  //   location: string;
  //   category: string;
  //   startDate: Date;
  //   endDate: Date;
  //   time: string;
  //   organizerName: string;
  //   sponsors: string[];
  //   image: File | null;
  //   tags: string[];
  //   description: string;
  // }
  export interface Event {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    organiser: string;
    description: string;
    time?:string;
    image?: string;
    category?:string;
    sponsors?:string[];
    members:number;
    tags?:string[]
  }

 export interface MainEvent {
    id: string;
    title: string;
    members: number;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    organiser: string;
    sponsors: string;
    category: string;
  }
  export interface InputState {
    fullname: string;
    enrollment: string;
    semester: string;
    course: string;
    email: string;
    phone: string;
    image: string;
    eventId: string;
    userId:string
  }
export interface Participant {
  id: string;
  fullname: string;
  enrollment: string;
  semester: string;
  course: string;
  eventId: string;
  phone: string;
  email: string;
  event: string | { name: string };
  image?: string; // Add image as an optional property
}
export interface RegisterEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  organiser: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  course?:string;
  enrollment?:string;
  semester?:string;
  phone?:string;
}