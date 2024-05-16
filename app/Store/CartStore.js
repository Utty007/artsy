import { create } from "zustand";
import { updateUserData } from "../Cart/Components/CartItem";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  userId: null,
  setUserId: (userId) => {
    set({ userId: userId });
  },
  addItemsToCart: (cartItem) => {
    const existingItemIndex = get().cartItems.findIndex(
      (item) => item.product.id === cartItem.product.id
    );
    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      set((state) => {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity++;
        return { cartItems: updatedCartItems };
      });
    } else {
      // If the item is not in the cart, add it
      set((state) => ({ cartItems: [...state.cartItems, cartItem] }));
    }

    let tPrice = 0;
    get().cartItems.forEach((item) => {
      tPrice += item.product.price * item.quantity;
    });
    set({ totalPrice: tPrice });

    updateUserData(get().userId, get().cartItems);
  },
  reduceFromCart: (cartItem) => {
    set(() => {
      const updatedCartItems = get().cartItems.map((item) => {
        if (item.product.id === cartItem.product.id && item.quantity > 1) {
          item.quantity--;
          set({ totalPrice: get().totalPrice - item.product.price });
        }
        return item;
      });
      return { cartItems: updatedCartItems };
    });

    // Call updateUserData after reducing item from cart
    updateUserData(get().userId, get().cartItems);
  },
  deleteFromCart: (cartItem) => {
    // Calculate the price of the item to be deleted
    const itemToDelete = get().cartItems.find(
      (item) => item.product.id === cartItem.product.id
    );

    // Ensure that the item to delete exists
    if (itemToDelete) {
      const itemToDeletePrice =
        itemToDelete.product.price * itemToDelete.quantity;

      // Update totalPrice by subtracting the price of the item to be deleted
      set((state) => ({
        totalPrice: state.totalPrice - itemToDeletePrice,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== cartItem.product.id
        ),
      }));
    }

    // Call updateUserData after deleting item from cart
    updateUserData(get().userId, get().cartItems);
  },
  userData: null,
  setUserData: (userInfo) => {
    set({ userData: userInfo });
  },
  setCartItems: (cartItems) => {
    set({ cartItems: cartItems });
  },
  cartIsLoading: true,
  setCartIsLoading: (bool) => {
    set({ cartIsLoading: bool });
  },
}));

// TO TRY
//Fetch User Id when need
//Edit the names to tally with what they are, user info should represent user information, and everything about the cart should represent the cart.
//
