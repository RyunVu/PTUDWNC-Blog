import axios from 'axios';

export async function getCategories() {
    try {
        const response = await axios.get(`https://localhost:7298/api/categories?PageSize=100&PageNumber=1`);
        const data = response.data;

        if (data.isSuccess) {
            return data.result;
        } else return null;
    } catch (error) {
        console.log('Error', error.message);
        return null;
    }
}

export async function getFeaturedPosts(limit) {
    try {
        const respone = await axios.get(`https://localhost:7298/api/posts/featured/${limit}`);
        const data = respone.data;

        if (data.isSuccess) return data.result;
        else return null;
    } catch (error) {
        console.log('Error', error.message);
        return null;
    }
}

export async function getRandomPosts(limit) {
    try {
        const respone = await axios.get(`https://localhost:7298/api/posts/random/${limit}`);
        const data = respone.data;

        if (data.isSuccess) return data.result;
        else return null;
    } catch (error) {
        console.log('Error', error.message);
        return null;
    }
}
