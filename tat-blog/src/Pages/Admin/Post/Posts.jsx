import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getPostsByQueries, deletePostById, togglePostPublishedStatus } from '../../../Services/posts';

import Pager from '../../../Components/blog/Pager';
import Loading from '../../../Components/blog/Loading';
import PostFilterPane from '../../../Components/Admin/PostFilterPane';

export default function Posts() {
    const [pageNumber, setPageNumber] = useState(1);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState({});
    const [keyword, setKeyword] = useState('');
    const [authorId, setAuthorId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [nonPublished, setNonPublished] = useState(false);
    const [isChangeStatus, setIsChangeStatus] = useState(false);

    const handleChangePage = (value) => {
        setPageNumber((current) => current + value);
        window.scroll(0, 0);
    };

    const handleTogglePublishedStatus = async (e, id) => {
        await togglePostPublishedStatus(id);
        setIsChangeStatus(!isChangeStatus);
    };

    const handleDeletePost = async (e, id) => {
        if (window.confirm('Bạn có chắc muốn xóa bài viết?')) {
            const data = await deletePostById(id);
            if (data.isSuccess) alert(data.result);
            else alert(data.errors[0]);
            setIsChangeStatus(!isChangeStatus);
        }
    };

    useEffect(() => {
        document.title = 'Danh sách bài viết';
        fetchPosts();

        async function fetchPosts() {
            const queries = new URLSearchParams({
                Published: true,
                NonPublished: false,
                PageNumber: pageNumber || 1,
                PageSize: 10,
            });
            keyword && queries.append('Keyword', keyword);
            authorId && queries.append('AuthorId', authorId);
            categoryId && queries.append('CategoryId', categoryId);
            year && queries.append('Year', year);
            month && queries.append('Month', month);

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
    }, [pageNumber, keyword, authorId, categoryId, year, month, nonPublished, isChangeStatus]);

    return (
        <div className="mb-5">
            <h1>Danh sách bài viết</h1>
            <PostFilterPane
                setKeyword={setKeyword}
                setAuthorId={setAuthorId}
                setCategoryId={setCategoryId}
                setYear={setYear}
                setMonth={setMonth}
                setNonPublished={setNonPublished}
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
                                        <td>
                                            {post.published ? (
                                                <Button
                                                    variant="primary"
                                                    onClick={(e) => handleTogglePublishedStatus(e, post.id)}>
                                                    Có
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="secondary"
                                                    onClick={(e) => handleTogglePublishedStatus(e, post.id)}>
                                                    Không
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleDeletePost(e, post.id)}>Xóa</button>
                                        </td>
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
