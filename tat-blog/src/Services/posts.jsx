import { get_api, post_api } from './method';
import { API_URL } from '../Utils/constants';

export function getPostsQuery(keyword = '', pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    return get_api(
        `${API_URL}/posts?&Keyword=${keyword}&PageSize=${pageSize}&PageNumber=${pageNumber}&SortColumn=${sortColumn}&SortOrder=${sortOrder}`,
    );
}

export function getPostBySlug(slug) {
    return get_api(`${API_URL}/posts/byslug/${slug}`);
}

export function getFilter() {
    return get_api(`${API_URL}/posts/get-filter`);
}

export async function getPostsByQueries(queries) {
    return get_api(`${API_URL}/posts?${queries}`);
}

export function getPostByid(id = 0) {
    if (id > 0) return get_api(`${API_URL}/posts/${id}`);
    return null;
}

export function addOrUpdatePost(formData) {
    return post_api(`${API_URL}/posts`, formData);
}
