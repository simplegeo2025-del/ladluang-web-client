import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { meService } from '../services/auth.service'

const useUserStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: 'user-storage',
    }
  )
)

export default useUserStore