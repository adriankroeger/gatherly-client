// Replaced by the generated OpenAPI types once the events endpoints exist
export type EventSummary = {
  id: string;
  title: string;
  category: string;
  startsAt: string; // ISO 8601
  capacity: number;
};

export type EventDetail = EventSummary & {
  description: string;
};
