import axios, { AxiosError } from "axios";
import { showToast } from "../../../utils/alertHelper";
import backendConnection from "../../../api/backendApi";

interface ApiErrorResponse {
  message?: string;
}

interface Event {
  eventId?: string;
  eventName: string;
  eventImage?: string[];
  eventDate: string | Date;
  eventDescription?: string;
  attendanceType?: string;
  sessionConfig?: Record<string, unknown>;
  createdBy?: string;
  attendees?: Attendee[];
  status?: string;
  limit?: unknown[];
  sales_data?: unknown[];
  totalUnitsSold?: number;
  totalRevenueAll?: number;
  [key: string]: unknown;
}

interface Attendee {
  id_number: string;
  name: string;
  campus: string;
  course: string;
  year: number;
  attendance?: Record<string, unknown>; 
  confirmedBy?: string;
  shirtSize?: string;
  shirtPrice?: number;
  raffleIsRemoved?: boolean;
  raffleIsWinner?: boolean;
  transactBy?: string;
  transactDate?: string | Date | null;
  isPresent?: boolean;
  [key: string]: unknown;
}

interface MerchData {
  _id?: string;
  name?: string;
  price?: number;
  stocks?: number;
  [key: string]: unknown;
}

interface AttendeesResponse {
  data: Event & { attendees: Attendee[] };
  attendees: Attendee[];
  merch: MerchData;
}

interface EventCheckData {
  limit: number;
  currentCount: number;
  [key: string]: unknown;
}

interface RaffleResponse {
  data: Attendee[];
  message: string;
}

interface StatisticsData {
  totalAttendees: number;
  presentCount: number;
  [key: string]: unknown;
}

interface CreateEventData {
  name: string;
  date: string;
  [key: string]: unknown;
}

interface CreateEventResponse {
  message: string;
  eventId?: string;
  [key: string]: unknown;
}

interface AddAttendeeFormData {
  eventId: string;
  attendeeId: string; 
  [key: string]: unknown;
}

interface RemoveAttendeeFormData {
  eventId: string;
  attendeeId: string;
  [key: string]: unknown;
}

interface UpdateSettingsFormData {
  [key: string]: unknown;
}

interface RaffleWinnerResponse {
  message: string;
  winner?: Attendee;
  [key: string]: unknown;
}

interface RemoveRaffleResponse {
  message: string;
  [key: string]: unknown;
}

const getAuthToken = (): string | null => {
  return sessionStorage.getItem("Token");
};

// Helper function to handle API errors
const handleApiError = (error: unknown, shouldReload: boolean = false): false => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response?.data) {
      if (shouldReload) {
        //uncomment the line if its not error
        // window.location.reload();
      }
      console.error("Error:", axiosError.response.data.message || "An error occurred");
    } else {
      console.error("Error:", "An error occurred");
    }
  } else {
    console.error("Error:", error);
  }
  return false;
};

export const getEvents = async (): Promise<Event[] | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.get<Event[]>(
      `${backendConnection()}/api/events/get-all-event`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleApiError(error, true);
  }
};

export const createEvent = async (data: CreateEventData): Promise<CreateEventResponse | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.post<CreateEventResponse>(
      `${backendConnection()}/api/events/create-event`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleApiError(error, true);
  }
};

export const updateEvent = async (eventId: string, data: Partial<Event>): Promise<boolean> => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${backendConnection()}/api/events/update-event/${eventId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      showToast("success", "Event updated successfully!");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating event:", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Failed to update event"
      : "Failed to update event";
    showToast("error", errorMessage);
    return false;
  }
};

export const getAttendees = async (id: string): Promise<AttendeesResponse | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${backendConnection()}/api/events/attendees/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      data: response.data.data[0],
      attendees: response.data.data[0].attendees,
      merch: response.data.merch_data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const markAsPresent = async (
  eventId: string,
  attendeeId: string,
  campus: string,
  course: string,
  year: string,
  attendeeName: string,
  navigate?: unknown
): Promise<boolean | undefined> => {
  try {
    const token = getAuthToken();
    const url = `${backendConnection()}/api/events/attendance/${eventId}/${attendeeId}`;

    const response = await axios.put(
      url,
      {
        campus,
        attendeeName,
        course,
        year,
        currentDate: new Date(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      showToast("success", "Attendance successfully recorded!");
      return true;
    }
  } catch (error) {
    console.error("Error marking attendance:", error);

    if (axios.isAxiosError(error) && error.response) {
      showToast("error", error.response.data.message || "An error occurred");
    } else {
      showToast("error", "An error occurred while recording attendance.");
    }
  }
};

export const getEventCheck = async (eventId: string): Promise<EventCheckData | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.get<{ data: EventCheckData }>(
      `${backendConnection()}/api/events/check-limit/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateEventSettings = async (
  formData: UpdateSettingsFormData,
  eventId: string
): Promise<boolean> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${backendConnection()}/api/events/update-settings/${eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getEligibleRaffleAttendees = async (
  eventId: string
): Promise<RaffleResponse | AxiosError> => {
  try {
    const token = getAuthToken();
    const response = await axios.get<RaffleResponse>(
      `${backendConnection()}/api/events/raffle/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching eligible attendees:", error);
    return error as AxiosError;
  }
};

export const raffleWinner = async (
  eventId: string,
  attendeeId: string,
  attendeeName: string
): Promise<RaffleWinnerResponse | AxiosError> => {
  try {
    const token = getAuthToken();
    const response = await axios.post<RaffleWinnerResponse>(
      `${backendConnection()}/api/events/raffle/winner/${eventId}/${attendeeId}`,
      { attendeeName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking attendee as raffle winner:", error);
    return error as AxiosError;
  }
};

export const removeRaffleAttendee = async (
  eventId: string,
  attendeeId: string,
  attendeeName: string
): Promise<RemoveRaffleResponse | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.put<RemoveRaffleResponse>(
      `${backendConnection()}/api/events/raffle/remove/${eventId}/${attendeeId}`,
      { attendeeName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing attendee from raffle:", error);
    return false;
  }
};

export const addAttendee = async (formData: AddAttendeeFormData): Promise<boolean> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${backendConnection()}/api/events/add-attendee`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showToast(
      response.status === 200 ? "success" : "error",
      response.data.message
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error adding attendee:", error);
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || "Something went wrong"
      : "Something went wrong";
    showToast("error", errorMessage);
    return false;
  }
};

export const getStatistic = async (
  eventId: string
): Promise<StatisticsData | [] | false> => {
  try {
    const token = getAuthToken();
    const response = await axios.get<StatisticsData>(
      `${backendConnection()}/api/events/get-statistics/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status === 200 ? response.data : [];
  } catch (error) {
    return handleApiError(error);
  }
};


export const removeAttendee = async (
  formData: RemoveAttendeeFormData
): Promise<boolean | AxiosError> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${backendConnection()}/api/events/remove-attendance`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showToast(
      response.status === 200 ? "success" : "error",
      response.data.message
    );
    return response.status === 200;
  } catch (error) {
    return error as AxiosError;
  }
};


export const removeEvent = async (eventId: string): Promise<boolean | AxiosError> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${backendConnection()}/api/events/remove-event`,
      { eventId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showToast(
      response.status === 200 ? "success" : "error",
      response.data.message
    );
    return response.status === 200;
  } catch (error) {
    return error as AxiosError;
  }
};