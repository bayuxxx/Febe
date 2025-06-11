const currentUser = {
    id: localStorage.getItem('id'),
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
};

export default currentUser;