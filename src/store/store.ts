import type { Costume } from '@/types/costume'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

interface Store {
  selectedCostume: Costume
  setSelectedCostume: (selectedCostume: Costume) => void
}

const costumeStore = createStore<Store>()(set => ({
  selectedCostume: {} as Costume,
  setSelectedCostume: (selectedCostume: Costume) => set({ selectedCostume })
}))

const { getState, getInitialState, subscribe, setState } = costumeStore
export { getState, getInitialState, subscribe, setState }

export function useCostumeStore(): Store
export function useCostumeStore<T>(selector: (state: Store) => T): T
export function useCostumeStore<T>(selector?: (state: Store) => T) {
  return useStore(costumeStore, selector!)
}