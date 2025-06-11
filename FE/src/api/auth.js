import axios from 'axios';
import { baseUrl } from './config';
import Swal from "sweetalert2";

// Register a new user
export const register = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Login user
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, credentials);
        
        const { id, token, role, name, email } = response.data.data; 
        const now = new Date().getTime(); 

        localStorage.setItem('id', id);  
        localStorage.setItem('token', token);  
        localStorage.setItem('role', role);  
        localStorage.setItem('name', name);  
        localStorage.setItem('email', email);  
        localStorage.setItem('loginTime', now); 

        await Swal.fire({
            title: 'Login Berhasil!',
            text: 'Anda akan diarahkan ke halaman utama.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        window.location.href = '/';  
    } catch (error) {
        console.error('Error during login:', error);

        await Swal.fire({
            title: 'Login Gagal!',
            text: 'Periksa kembali kredensial Anda.',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        throw error;
    }
};


// Get current user information
export const getCurrentUser = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/api/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user information:', error);
        throw error;
    }
};

// Change doctor validation status (Admin only)
export const changeDoctorStatus = async (token, doctorStatusData) => {
    try {
        const response = await axios.patch(`${baseUrl}/api/auth/doctors/status`, doctorStatusData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error changing doctor status:', error);
        throw error;
    }
};