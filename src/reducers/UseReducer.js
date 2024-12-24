export const initialState = {

    user: null,

    sidebarActive: false, // New state variable
    isFooterActive: true,
    theme: localStorage.getItem('theme') || 'light',
};
export const reducer = (state, action) => {

    switch (action.type) {

        case "USER":

            return { ...state, user: action.payload }; // Update user

        case "TOGGLE_SIDEBAR": // Toggle sidebar

            return { ...state, sidebarActive: !state.sidebarActive };

        case "CLOSE_SIDEBAR": // New action type to close sidebar

            return { ...state, sidebarActive: false };

        case "TOGGLE_FOOTER": // Toggle footer visibility

            return { ...state, isFooterActive: !state.isFooterActive };

        case "SET_FOOTER": // Set footer active or inactive

            return { ...state, isFooterActive: action.payload };

        case "TOGGLE_THEME": // New action type for toggling theme

            return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };

        default:

            return state;

    }

};