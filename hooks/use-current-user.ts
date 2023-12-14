// import getSession from '@/actions/get-session';
// import db from '@/lib/db';
// import { create } from 'zustand';

// interface Assistant {
//     id: string;
//     name: string;
//     // Add other properties as needed
//   }
  
//   interface User {
//     id: string;
//     name: string;
//     image: string | null;
//     email: string;
//     assistants: Assistant[];
//     // Add other properties as needed
//   }

// interface UserStore {
//     currentUser: User | null;
//     loading: boolean;
//     error: string | null;
//     getCurrentUser: () => Promise<any>;
//   }
  
//   const useUserStore = create<UserStore>((set) => ({
//     currentUser: null,
//     loading: false,
//     error: null,
  
//     getCurrentUser: async () => {
//       try {
//         set({ loading: true, error: null });

//         const session = await getSession()

//         if(!session?.user?.email) {
//             return null
//         }
  
        
//         const userData =  await db.user.findUnique({
//             where: {
//             email: session.user.email as string
//             },
//             select: {
//                 id: true,
//                 image: true,
//                 name: true,
//                 email: true,
//                 assistants: {
//                     select: {
//                         id: true,
//                         name: true
//                     }
//                 }
//             },
//         })
  
//         set({ currentUser: userData, loading: false });
//       } catch (error) {
//         set({ loading: false, error: 'Error fetching user dashboard' });
//       } 
//     },
//   }));
  
//   export default useUserStore;