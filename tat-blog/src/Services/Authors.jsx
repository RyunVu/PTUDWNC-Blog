import axios from 'axios';

export async function getAuthorBySlug(slug) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authors/${slug}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getAuthors() {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authors?PageSize=1000&PageNumber=1`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getAuthorsByQueries(queries) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authors?${queries}`);

    if (data.isSuccess) return data.result;
    else return null;
}
