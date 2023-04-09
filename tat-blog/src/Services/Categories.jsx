import { API_URL } from '../Utils/constants';
import { get_api } from './method';

export function getCategoriesBySlug(slug = '') {
    return get_api(`${API_URL}/categories?slug=${slug}`);
}
