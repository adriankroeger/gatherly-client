import type { EventDetail } from "../types/event";
import { HttpError } from "../types/http-error";

export default async function fetchEventById(eventId: string): Promise<EventDetail> {
  const res = await fetch(`/api/events/${eventId}`);

  if(res?.ok) {
    return await res.json();
  } else {
    throw new HttpError(res?.status);
  }
}
