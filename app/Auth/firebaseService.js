// firebaseService.js

import { getDatabase, ref, get } from "firebase/database";
import { useCartStore } from "../Store/CartStore";

export const FetchUserData = async (userId) => {
  const [setCartItems] = useCartStore((state) => [state.setCartItems]);
  try {
    const db = getDatabase();
    const userCartRef = ref(db, `user-cart/${userId}`);

    // Fetch the data at the user-cart reference
    const dataSnapshot = await get(userCartRef);

    // Check if the data exists
    if (dataSnapshot.exists()) {
      // Data exists, retrieve the data
      const userData = dataSnapshot.val();
      setCartItems(userData.cartItems);
      return userData;
    } else {
      // Data doesn't exist
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
