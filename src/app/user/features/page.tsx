// pages/upcoming-features.tsx
import { FC } from 'react'

interface Feature {
  title: string
  description: string
  date: string
}

const features: Feature[] = [
  {
    title: 'Volunteer Registration',
    description: 'Students can easily sign up to volunteer for events directly on the platform, making it simpler to manage volunteer participation.',
    date: 'December 2024'
  },
  {
    title: 'Event Feedback',
    description: 'Attendees can submit feedback for each event they participate in, helping organizers improve future events based on participant input.',
    date: 'January 2025'
  },
  {
    title: 'Multiple Photo Uploads',
    description: 'Event organizers and participants can upload multiple photos for each event, allowing for a richer and more detailed event experience.',
    date: 'February 2025'
  },
  {
    title: 'Rating System for Events',
    description: 'Users can give ratings and write detailed feedback for the events they attended, helping others make informed decisions.',
    date: 'january 2025'
  },
  {
    title: 'Admin Event Management',
    description: 'Admins will have the ability to edit event details, ensuring that all information stays up-to-date and relevant.',
    date: 'january 2025'
  },
  {
    title: 'Event Reminders & Notifications',
    description: 'Participants will receive timely reminders and updates about the events they are registered for, including any schedule changes.',
    date: 'february 2025'
  },
  {
    title: 'Event Registration History',
    description: 'Students will have access to a history of all the events they’ve registered for, including their feedback and ratings on those events.',
    date: 'january 2025'
  },
  {
    title: 'Custom Event Categories',
    description: 'Event organizers can create custom event categories to organize events more effectively and allow participants to filter them by interest.',
    date: 'february 2025'
  },
]

const UpcomingFeatures: FC = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-200 bg-gray-200 text-gray-900">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center dark:text-gray-300 text-gray-800 mb-8">Upcoming Features</h1>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="dark:bg-gray-700 dark:text-gray-200 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold dark:text-gray-100 text-gray-800 mb-2">{feature.title}</h2>
              <p className="text-lg dark:text-gray-300 text-gray-600 mb-4">{feature.description}</p>
              <p className="text-sm dark:text-gray-200 text-gray-500">Expected Launch: <span className="font-medium">{feature.date}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UpcomingFeatures
