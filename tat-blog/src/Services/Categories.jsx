import axios from 'axios';

export async function getCategoryBySlug(slug) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/categories/${slug}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getCategories() {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/categories?PageSize=1000&PageNumber=1`);

    if (data.isSuccess) return data.result;
    else return null;
}
