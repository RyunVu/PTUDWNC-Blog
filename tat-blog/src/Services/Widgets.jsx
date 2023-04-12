import { API_URL } from '../Utils/constants';
import { get_api } from './method';

export function getCategories() {
    return get_api(`${API_URL}/categories?PageSize=1000&PageNumber=1`);
}

export function getFeaturedPosts(limit) {
    return get_api(`${API_URL}/posts/featured/${limit}`);
}

export function getRandomPosts(limit) {
    return get_api(`${API_URL}/posts/random/${limit}`);
}

export function getTagCloud() {
    return get_api(`${API_URL}/tags?PageSize=100&PageNumber=1`);
}

export async function getPopularAuthors(limit) {
    return get_api(`${API_URL}/authors/best/${limit}`);
}

export function getArchives(month) {
    return get_api(`${API_URL}/posts/archives/${month}`);
}
