import { get_api } from './method';
import { API_URL } from '../Utils/constants';

export function getPostsQuery(keyword = '', pageSize = 10, pageNumber = 1, sortColumn = '', sortOrder = '') {
    return get_api(
        `${API_URL}/posts?Keyword=${keyword}&PageSize=${pageSize}&PageNumber=${pageNumber}&SortColumn=${sortColumn}&SortOrder=${sortOrder}`,
    );
}
