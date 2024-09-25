import { create } from 'zustand'

interface CounterState {
    counter: number
    increase: (add: number) => void,
    setCounter: (val: number) => void
}

const useCounterStore = create<CounterState>()((set) => ({
    counter: 0,
    increase: (add) => set((state) => ({ counter: state.counter + add })),
    setCounter: (val) => {
        set(() => {
            return {
                counter: val
            };
        });
    }
}))

export default useCounterStore