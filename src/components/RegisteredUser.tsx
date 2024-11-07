"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { getParticipants, getEvents } from "@/actions/data";
import {Participant,RegisterEvent } from "@/lib/types"

const ParticipantPage = () => {
  const [events, setEvents] = useState<RegisterEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      const currentDate = new Date(); // Get the current date

      const formattedEvents: RegisterEvent[] = fetchedEvents
        .map((eventData: any) => ({
          id: eventData.id as string,
          title: eventData.title,
          startDate: eventData.startDate.toString(),
          endDate: eventData.endDate?.toString() || "",
          image: eventData.image || "",
          organiser: eventData.organiser,
        }))
        .filter((event) => {
          const eventEndDate = new Date(event.endDate);
          // Include events with an end date >= current date
          return eventEndDate >= currentDate;
        });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const participantsData = await getParticipants();
        const formattedParticipants: Participant[] = participantsData.map(
          (participant: any) => ({
            id: participant.id as string, // Ensure id is treated as a string
            fullname: participant.fullname,
            enrollment: participant.enrollment,
            semester: participant.semester,
            course: participant.course,
            eventId: participant.eventId,
            phone: participant.phone,
            email: participant.email,
            event: participant.event,
          })
        );

        setParticipants(formattedParticipants);
      } catch (err) {
        console.error("Error fetching participants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, []);

  // Toggle the expanded state of an event
  const toggleExpand = (eventId: string) => {
    setExpandedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  return (
    <>
      <span>
        {
          participants.filter((participant) =>
            events.some((event) => event.id === participant.eventId)
          ).length
        }
      </span>
    </>
  );
};

export default ParticipantPage;
