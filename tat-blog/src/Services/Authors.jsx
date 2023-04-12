import { API_URL } from '../Utils/constants';
import { get_api } from './method';

export async function getAuthorsBySlug(slug = '') {
    return get_api(`${API_URL}/authors?slug=${slug}`);
}

export function getAuthors() {
    return get_api(`${API_URL}/authors?PageSize=1000&PageNumber=1`);
}
