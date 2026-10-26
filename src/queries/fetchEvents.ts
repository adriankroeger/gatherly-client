import type { EventSummary } from "../types/event";

export default async function fetchEvents(): Promise<EventSummary[]> {
  const res = await fetch("/api/events");

  if(res?.ok) {
    return await res.json();
  } else {
    throw new Error(`The server answered with HTTP ${res?.status}`);
  }
}