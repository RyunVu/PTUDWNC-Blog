import axios from 'axios';
export async function getPostsByQueries(queries) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts?${queries}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getPostBySlug(slug) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/byslug/${slug}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getPostById(id = 0) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function getPostComments(id) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}/comments`);

    if (data.isSuccess) return data.result;
    else return null;
}

export async function createPost(post) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts`, post);

    return data;
}

export async function updatePost(id, post) {
    const { data } = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}`, post);

    return data;
}

export async function updatePostThumbnail(id, imageFile) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}/thumbnail`, imageFile, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });

    return data;
}

export async function togglePostPublishedStatus(id) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}/published`);

    return data;
}

export async function deletePostById(id) {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/posts/${id}`);

    return data;
}
