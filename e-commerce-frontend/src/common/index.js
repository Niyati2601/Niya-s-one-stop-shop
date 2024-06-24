const backendDomain =  "https://niya-s-one-stop-shop.vercel.app"

const summaryApi = {
    register : {
        url : `${backendDomain}/api/register`,
        method : 'POST'
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : 'POST'
    },
    userDetails : {
        url : `${backendDomain}/api/user-details`,
        method : 'GET'
    },
    logout: {
        url : `${backendDomain}/api/logout`,
        method : 'GET'
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
        method : 'GET'
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : 'POST'
    },
    deleteUser : {
        url : `${backendDomain}/api/delete-user`,
        method : 'DELETE'
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'POST'
    },
    getAllProducts : {
        url : `${backendDomain}/api/get-all-products`,
        method : 'GET'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : 'POST'
    },
    deleteProduct : {
        url : `${backendDomain}/api/delete-product`,
        method : 'DELETE'
    },
    getCategoryProduct : {
        url : `${backendDomain}/api/get-category-product`,
        method : 'GET'
    },
    getCategoryWiseProduct : {
        url : `${backendDomain}/api/get-category-wise-product`,
        method : 'GET'
    },
    getProductDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'POST'
    },
    addTocart : {
        url : `${backendDomain}/api/add-to-cart`,
        method : 'POST'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/product-count`,
        method : 'GET'
    },
    viewCart : {
        url : `${backendDomain}/api/view-cart`,
        method : 'GET'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'POST'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'DELETE'
    },
    searchProduct : {
        url : `${backendDomain}/api/search-product`,
        method : 'GET'
    },
    forgotPassword : {
        url : `${backendDomain}/api/forgot-password`,
        method : 'POST'
    },
    resetPassword: {
        url : `${backendDomain}/api/reset-password`,
        method : 'POST'
    },
    createCheckoutSession: {
        url: `${backendDomain}/api/create-checkout-session`,
        method: 'POST'
    },
    clearCart : {
        url : `${backendDomain}/api/clear-cart`,
        method : 'POST'
    }
}
export default summaryApi

