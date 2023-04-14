import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAuthorsByQueries } from '../../../Services/authors';

import Pager from '../../../Components/blog/Pager';
import Loading from '../../../Components/blog/Loading';
import AuthorFilterPane from '../../../Components/Admin/AuthorFilterPane';

export default function Authors() {
    // Component's states
    const [pageNumber, setPageNumber] = useState(1);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState({});
    const [name, setName] = useState('');
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
                PageNumber: pageNumber || 1,
                PageSize: 10,
            });
            name && queries.append('name', name);
            year && queries.append('Year', year);
            month && queries.append('Month', month);

            const data = await getAuthorsByQueries(queries);
            if (data) {
                setAuthors(data.items);
                setMetadata(data.metadata);
            } else {
                setAuthors([]);
                setMetadata({});
            }
            setIsLoading(false);
        }
    }, [pageNumber, name, year, month]);

    return (
        <div className="mb-5">
            <h1>Danh sách tác giả</h1>
            <AuthorFilterPane setName={setName} setYear={setYear} setMonth={setMonth} />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Table striped responsive bordered>
                        <thead>
                            <tr>
                                <th>Thông tin chi tiết</th>
                                <th>Tổng số bài viết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.length > 0 ? (
                                authors.map((author) => (
                                    <tr key={author.id}>
                                        <td>
                                            <Link to={`/admin/authors/edit/${author.id}`} className="text-bold">
                                                {author.fullName}
                                            </Link>
                                            <p className="text-muted">
                                                {new Date(author.joinedDate).toLocaleDateString('vi-VN')}
                                            </p>
                                        </td>
                                        <td>{author.postCount}</td>
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
