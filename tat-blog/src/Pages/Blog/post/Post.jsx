import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPostBySlug } from '../../../Services/posts';

import NotFound from '../../NotFound';
import PostContent from '../../../Components/blog/PostContent';

export default function Post() {
    // Component's variables
    const params = useParams();

    // Component's states
    const [post, setPost] = useState({});

    useEffect(() => {
        fetchPost();

        async function fetchPost() {
            const data = await getPostBySlug(params.slug);
            if (data) {
                setPost(data);
            } else setPost({});
        }
    }, [params]);

    return (
        <>
            {post.id ? (
                <div className="p-4">
                    <PostContent post={post} />
                    <hr />
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
}
