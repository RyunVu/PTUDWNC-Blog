import { useState, useEffect } from 'react';

import { getPostsByQueries } from '../../Services/posts';

import PostItem from './PostItem';
import Pager from './Pager';

export default function PostsFilter({ postQuery }) {
    // Component's props
    const { keyword, year, month, tagSlug, authorSlug, categorySlug } = postQuery;

    // Component's states
    const [pageNumber, setPageNumber] = useState(1);
    const [posts, setPosts] = useState([]);
    const [metadata, setMetadata] = useState({});

    // Component's event handlers
    const handleChangePage = (value) => {
        setPageNumber((current) => current + value);
    };

    useEffect(() => {
        fetchPosts();

        async function fetchPosts() {
            const queries = new URLSearchParams({
                Published: true,
                NonPublished: false,
                PageNumber: pageNumber || 1,
                PageSize: 10,
            });
            categorySlug && queries.append('CategorySlug', categorySlug);
            authorSlug && queries.append('AuthorSlug', authorSlug);
            tagSlug && queries.append('TagSlug', tagSlug);
            year && queries.append('PostedYear', year);
            month && queries.append('PostedMonth', month);
            keyword && queries.append('Keyword', keyword);

            const data = await getPostsByQueries(queries);
            if (data) {
                setPosts(data.items);
                setMetadata(data.metadata);
            } else {
                setPosts([]);
                setMetadata({});
            }
        }
    }, [keyword, year, month, tagSlug, authorSlug, categorySlug, pageNumber]);

    return (
        <div>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
            <Pager metadata={metadata} onPageChange={handleChangePage} />
        </div>
    );
}
