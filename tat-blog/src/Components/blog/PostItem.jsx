import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { API_URL } from '../../Utils/constants';
import { isEmptyOrSpaces } from '../../Utils/utils';

import TagList from './TagList';

export default function PostItem({ post }) {
    // Variables
    const imageUrl = isEmptyOrSpaces(post.imageUrl)
        ? process.env.PUBLIC_URL + '/assets/images/image_1.jpg'
        : `${API_URL}/${post.imageUrl}`;

    return (
        <article className="blog-entry mb-4">
            <Card>
                <div className="row g-0">
                    <div className="col-md-4">
                        <Link to={`/blog/post/${post.urlSlug}`}>
                            <Card.Img variant="top" src={imageUrl} alt={post.title} />
                        </Link>
                    </div>
                    <div className="col-md-8">
                        <Card.Body className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <Card.Title>
                                    <Link to={`/blog/post/${post.urlSlug}`} className="text-decoration-none">
                                        {post.title}
                                    </Link>
                                </Card.Title>
                                <Card.Text>
                                    <small className="text-muted">Tác giả:</small>
                                    <Link
                                        to={`/blog/author/${post.author.urlSlug}`}
                                        className="text-primary text-decoration-none m-1">
                                        {post.author.fullName}
                                    </Link>
                                    <small className="text-muted">Chủ đề:</small>
                                    <Link
                                        to={`/blog/category/${post.category.urlSlug}`}
                                        className="text-primary text-decoration-none m-1">
                                        {post.category.name}
                                    </Link>
                                </Card.Text>
                                <Card.Text>{post.shortDescription}</Card.Text>
                                <div className="tag-list">
                                    <TagList tags={post.tags} />
                                </div>
                            </div>
                            <div className="text-end">
                                <Link to={`/blog/post/${post.urlSlug}`} title={post.title} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </article>
    );
}
