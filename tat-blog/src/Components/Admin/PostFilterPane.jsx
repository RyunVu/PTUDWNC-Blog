import { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAuthors } from '../../Services/authors';
import { getCategories } from '../../Services/categories';
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function PostFilterPane({ setKeyword, setAuthorId, setCategoryId, setYear, setMonth }) {
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);

    // Component's refs
    const keywordRef = useRef();
    const authorRef = useRef();
    const categoryRef = useRef();
    const yearRef = useRef();
    const monthRef = useRef();

    // Component's event handlers
    const handleFilterPosts = (e) => {
        e.preventDefault();
        setKeyword(keywordRef.current.value);
        setAuthorId(authorRef.current.value);
        setCategoryId(categoryRef.current.value);
        setYear(yearRef.current.value);
        setMonth(monthRef.current.value);
    };

    const handleClearFilter = () => {
        setKeyword('');
        setAuthorId('');
        setCategoryId('');
        setYear('');
        setMonth('');
        keywordRef.current.value = '';
        authorRef.current.value = '';
        categoryRef.current.value = '';
        yearRef.current.value = '';
        monthRef.current.value = '';
    };

    useEffect(() => {
        fetchData();

        async function fetchData() {
            const authors = await getAuthors();
            if (authors) setAuthors(authors.items);
            const categories = await getCategories();
            if (categories) setCategories(categories.items);
        }
    }, []);

    return (
        <Form method="get" onSubmit={handleFilterPosts} className="row gx-3 gy-2 align-items-center py-2">
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Từ khóa</Form.Label>
                <Form.Control ref={keywordRef} type="text" placeholder="Nhập từ khóa..." name="keyword" />
            </Form.Group>
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Tác giả</Form.Label>
                <Form.Select ref={authorRef} title="Tác giả" name="authorId">
                    <option value="">-- Chọn tác giả --</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.fullName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Chủ đề</Form.Label>
                <Form.Select ref={categoryRef} title="Chủ đề" name="categoryId">
                    <option value="">-- Chọn chủ đề --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Nhập năm</Form.Label>
                <Form.Control ref={yearRef} type="text" placeholder="Nhập năm..." name="year" />
            </Form.Group>
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Tháng</Form.Label>
                <Form.Select ref={monthRef} title="Tháng" name="month">
                    <option value="">-- Chọn tháng --</option>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            <span>Tháng </span>
                            <span>{month}</span>
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-auto">
                <Button variant="primary" type="submit">
                    Tìm/Lọc
                </Button>
                <Button variant="warning mx-2" onClick={handleClearFilter}>
                    Bỏ lọc
                </Button>
                <Link to="/admin/posts/edit" className="btn btn-success">
                    Thêm mới
                </Link>
            </Form.Group>
        </Form>
    );
}
