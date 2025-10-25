import { create } from 'zustand'
import { meService } from '../services/auth.service'

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const data = await meService()
      set({ user: data.data })
      return data
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  },
  clearUser: () => set({ user: null })
}))

export default useUserStore