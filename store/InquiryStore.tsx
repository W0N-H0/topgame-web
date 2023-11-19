import { create, SetState } from "zustand";

export interface InquiryData {
  _id: string;
  name: string;
  contact: string;
  company: string;
  item: string;
  address: string;
  addressDetail: string;
  agreedToTerms: boolean;
  isDone: boolean;
  date: string;
  __v: number;
}

// 초기 상태를 정의
interface InquiryState {
  data: InquiryData[];
  error: unknown;
  fetchData: () => Promise<void>;
}

const initialState: InquiryState = {
  data: [],
  error: null,
  fetchData: async () => {},
};

export const useInquiryStore = create<InquiryState>(
  (set: SetState<InquiryState>) => ({
    ...initialState,
    // 데이터를 가져오는 비동기 액션을 정의
    fetchData: async () => {
      try {
        const response = await fetch("/api/inquiry");
        const data = (await response.json()) as InquiryData[];
        set((state) => ({ ...state, data, error: null }));
      } catch (error) {
        set((state) => ({ ...state, error }));
      }
    },
  })
);
