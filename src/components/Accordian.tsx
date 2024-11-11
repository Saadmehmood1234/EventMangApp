import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function FAQAccordin() {
    return (
      <div className="w-full max-w-7xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">How can I find out about upcoming college events?</AccordionTrigger>
            <AccordionContent>
              You can find all the details about upcoming events right here on the website, including event dates, times, and locations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">Do I need to register for college events in advance?</AccordionTrigger>
            <AccordionContent>
              Yes, you can easily register for any event directly through this website. Just visit the event page and follow the registration steps.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">Are college events free for all students?</AccordionTrigger>
            <AccordionContent>
              Most events are free for students, and you can confirm the event's cost and other details right here on the website.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">Can I volunteer to help organize college events?</AccordionTrigger>
            <AccordionContent>
              Yes, you can sign up to volunteer for events through this website. Simply check the volunteer opportunities section and submit your details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">What types of events are held on campus?</AccordionTrigger>
            <AccordionContent>
              All types of events, from cultural festivals to academic workshops, are listed on the website. Explore event categories to find what's happening on campus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">Can non-students attend college events?</AccordionTrigger>
            <AccordionContent>
              Some events are open to the public, and you can check the event details here on the website to confirm if it’s open for non-students to attend.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7" className="border-b border-indigo-500">
            <AccordionTrigger className="hover:text-indigo-500">How do I stay informed about event changes or cancellations?</AccordionTrigger>
            <AccordionContent>
              All event updates, including changes or cancellations, will be posted on the website. You can also sign up for email or app notifications for real-time updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  