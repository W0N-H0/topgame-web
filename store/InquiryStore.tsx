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
  loading: boolean; // 로딩 상태 추가
  fetchData: () => Promise<void>;
}

const initialState: InquiryState = {
  data: [],
  error: null,
  loading: false, // 초기 로딩 상태는 false
  fetchData: async () => {},
};

export const useInquiryStore = create<InquiryState>(
  (set: SetState<InquiryState>) => ({
    ...initialState,
    // 데이터를 가져오는 비동기 액션을 정의
    fetchData: async () => {
      set((state) => ({ ...state, loading: true })); // 비동기 작업 시작 전에 로딩 상태를 true로 설정
      try {
        const response = await fetch("/api/inquiry?limit=21");
        const data = (await response.json()) as InquiryData[];
        set((state) => ({ ...state, data, error: null, loading: false })); // 작업이 성공적으로 끝났을 때 로딩 상태를 false로 설정
      } catch (error) {
        set((state) => ({ ...state, error, loading: false })); // 에러가 발생했을 때도 로딩 상태를 false로 설정
      }
    },
  })
);
