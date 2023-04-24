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

export async function getAuthorById(id = 0) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authors/${id}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function createAuthor(Author) {
    const { data } = await axios.Author(`${process.env.REACT_APP_API_ENDPOINT}/authors`, Author);

    return data;
}

export async function updateAuthor(id, Author) {
    const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/authors/${id}`, Author);

    return data;
}

export async function deleteAuthorById(id) {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/authors/${id}`);

    return data;
}
