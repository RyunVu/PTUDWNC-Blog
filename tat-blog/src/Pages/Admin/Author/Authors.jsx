import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAuthorsByQueries, deleteAuthorById } from '../../../Services/authors';

import Pager from '../../../Components/blog/Pager';
import Loading from '../../../Components/blog/Loading';
import AuthorFilterPane from '../../../Components/Admin/AuthorFilterPane';

export default function Authors() {
    const [pageNumber, setPageNumber] = useState(1);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [metadata, setMetadata] = useState({});
    const [name, setName] = useState('');
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [isChangeStatus, setIsChangeStatus] = useState(false);

    const handleChangePage = (value) => {
        setPageNumber((current) => current + value);
        window.scroll(0, 0);
    };

    const handleDeleteAuthor = async (e, id) => {
        if (window.confirm('Bạn có chắc muốn xóa tác giả?')) {
            const data = await deleteAuthorById(id);
            if (data.isSuccess) alert(data.result);
            else alert(data.errors[0]);
            setIsChangeStatus(!isChangeStatus);
        }
    };

    useEffect(() => {
        document.title = 'Danh sách tác giả';
        fetchAuthors();

        async function fetchAuthors() {
            const queries = new URLSearchParams({
                PageNumber: pageNumber || 1,
                PageSize: 10,
            });
            name && queries.append('name', name);
            year && queries.append('JoinedYear', year);
            month && queries.append('JoinedMonth', month);

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
    }, [pageNumber, name, year, month, isChangeStatus]);

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
                                <th>Tên</th>
                                <th>Ngày tham gia</th>
                                <th>Email</th>
                                <th>Notes</th>
                                <th>Xóa</th>
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
                                        </td>
                                        <td>{new Date(author.joinedDate).toLocaleDateString('vi-VN')}</td>
                                        <td>{author.email}</td>
                                        <td>{author.notes}</td>
                                        <td>
                                            <button onClick={(e) => handleDeleteAuthor(e, author.id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <h4 className="text-center text-danger">Không tìm thấy tác giả</h4>
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
