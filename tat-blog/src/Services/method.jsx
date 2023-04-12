import axios from 'axios';

export async function get_api(API_URL) {
    try {
        const response = await axios.get(API_URL);
        const data = response.data;
        if (data.isSuccess) return data.result;
        else return null;
    } catch (error) {
        console.log('Error', error.message);
    }
}

export async function post_api(API_URL, formData) {
    try {
        const response = await axios.post(API_URL, formData);
        const data = response.data;
        if (data.isSuccess) return data.result;
        else return null;
    } catch (error) {
        console.log('Error', error.message);
        return null;
    }
}
