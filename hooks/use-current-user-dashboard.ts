import {create} from 'zustand';
import { getSession } from 'next-auth/react';
import db from '@/lib/db';

const useUserDashboardStore = create((set) => ({
  currentUserDashboard: null,
  error: null,
  loading: false, // Added loading flag

  getCurrentUserDashboard: async () => {
    try {
      set({ loading: true }); // Set loading to true before starting the fetch

      const session = await getSession();

      if (!session?.user?.email) {
        set({ error: 'User not authenticated', loading: false }); // Set loading to false in case of an error
        return;
      }

      const currentUserDashboard = await db.user.findUnique({
        where: {
          email: session?.user.email,
        },
        select: {
          id: true,
          image: true,
          email: true,
          assistants: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!currentUserDashboard) {
        set({ error: 'User dashboard not found', loading: false }); // Set loading to false in case of an error
        return;
      }

      set({ currentUserDashboard, error: null, loading: false }); // Set loading to false after successful fetch
    } catch (error) {
      set({ error: 'Error fetching user dashboard', loading: false }); // Set loading to false in case of an error
    }
  },
}));

export default useUserDashboardStore;