import { Link } from 'react-router-dom';

import { API_URL } from '../../Utils/constants';

import TagsList from './TagList';

export default function PostContent({ post }) {
    return (
        <>
            <h1>{post.title}</h1>
            <div className="d-flex align-items-center justify-content-between my-2">
                <div>
                    <span>Chủ đề:</span>
                    <Link to={`/blog/category/${post.category.urlSlug}`} className="ms-2 text-decoration-none">
                        {post.category.name}
                    </Link>
                </div>
                <div>
                    <TagsList tags={post.tags} />
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex gap-1">
                    <span>Đăng ngày:</span>
                    <span>{new Date(post.postedDate).toLocaleDateString('vi-VN')}</span>
                    <span>bởi:</span>
                    <Link to={`/blog/author/${post.author.urlSlug}`} className="text-decoration-none">
                        {post.author.fullName}
                    </Link>
                </div>
                <div>
                    <span className="me-1">{post.viewCount}</span>
                    <span>lượt xem</span>
                </div>
            </div>
            <div className="mt-3">
                {post.imageUrl && (
                    <img src={`${API_URL}/${post.imageUrl}`} className="w-100 rounded shadow" alt="thumbnail" />
                )}
                <p className="mt-3">{post.description}</p>
            </div>
        </>
    );
}
