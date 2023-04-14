import axios from 'axios';

export async function getCategories() {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/categories?PageSize=10&PageNumber=1`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getFeaturedPosts(limit) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/featured/${limit}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getRandomPosts(limit) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/random/${limit}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getTagCloud() {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/tags?PageSize=100&PageNumber=1`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getTopAuthors(limit) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/authors/best/${limit}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getArchives(limit) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/archives/${limit}`);

    if (data.isSuccess) return data.result;
    else return null;
}
