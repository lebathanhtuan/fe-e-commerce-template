export const ROUTES = {
  USER: {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/products/:id',
    CART: '/cart',
    CHECKOUT: '/checkout',
    // my-profile
    MY_PROFILE: {
      USER_INFO: '/my-profile/user-info',
      ORDER_HISTORY: '/my-profile/order-history',
      FAVORITE_PRODUCTS: '/my-profile/favorite-products',
      CHANGE_PASSWORD: '/my-profile/change-password',
    },
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    CREATE_PRODUCT: '/admin/products/create',
    UPDATE_PRODUCT: '/admin/products/:id/update',
    CHAT_BOX: '/admin/chatbox',
  },
  LOGIN: '/login',
  REGISTER: '/register',
}
