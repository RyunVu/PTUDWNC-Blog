import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getPostsByQueries } from '../../../Services/posts';

import Pager from '../../../Components/blog/Pager';
import Loading from '../../../Components/blog/Loading';
import PostFilterPane from '../../../Components/Admin/PostFilterPane';

export default function Posts() {
    // Component's states
    const [pageNumber, setPageNumber] = useState(1);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState({});
    const [keyword, setKeyword] = useState('');
    const [authorId, setAuthorId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [year, setYear] = useState();
    const [month, setMonth] = useState();

    // Component's event handlers
    const handleChangePage = (value) => {
        setPageNumber((current) => current + value);
        window.scroll(0, 0);
    };

    useEffect(() => {
        document.title = 'Danh sách bài viết';
        fetchPosts();

        async function fetchPosts() {
            const queries = new URLSearchParams({
                Published: true,
                Unpublished: false,
                PageNumber: pageNumber || 1,
                PageSize: 10,
            });
            keyword && queries.append('Keyword', keyword);
            authorId && queries.append('AuthorId', authorId);
            categoryId && queries.append('CategoryId', categoryId);
            year && queries.append('PostedYear', year);
            month && queries.append('PostedMonth', month);

            const data = await getPostsByQueries(queries);
            if (data) {
                setPosts(data.items);
                setMetadata(data.metadata);
            } else {
                setPosts([]);
                setMetadata({});
            }
            setIsLoading(false);
        }
    }, [pageNumber, keyword, authorId, categoryId, year, month]);

    return (
        <div className="mb-5">
            <h1>Danh sách bài viết</h1>
            <PostFilterPane
                setKeyword={setKeyword}
                setAuthorId={setAuthorId}
                setCategoryId={setCategoryId}
                setYear={setYear}
                setMonth={setMonth}
            />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Table striped responsive bordered>
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Tác giả</th>
                                <th>Chủ đề</th>
                                <th>Xuất bản</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>
                                            <Link to={`/admin/posts/edit/${post.id}`} className="text-bold">
                                                {post.title}
                                            </Link>
                                            <p className="text-muted">{post.shortDescription}</p>
                                        </td>
                                        <td>{post.author.fullName}</td>
                                        <td>{post.category.name}</td>
                                        <td>{post.published ? 'Có' : 'Không'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        <h4 className="text-center text-danger">Không tìm thấy bài viết</h4>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pager metadata={metadata} onPageChange={handleChangePage} />
                </>
            )}
        </div>
    );
}
