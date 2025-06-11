export const RemoveToken = () => {
    const loginTime = localStorage.getItem('loginTime');
    const now = new Date().getTime();

    const maxTime = 24 * 60 * 60 * 1000; 

    if (loginTime && now - loginTime > maxTime) {
        localStorage.clear(); 
        window.location.href = '/signin'; 
    }
};
