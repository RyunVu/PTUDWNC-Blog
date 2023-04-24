import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function AuthorFilterPane({ setName, setYear, setMonth }) {
    const nameRef = useRef();
    const yearRef = useRef();
    const monthRef = useRef();

    const handleFilterAuthors = (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
        setYear(yearRef.current.value);
        setMonth(monthRef.current.value);
    };

    const handleClearFilter = () => {
        setName('');
        setYear('');
        setMonth('');
        nameRef.current.value = '';
        yearRef.current.value = '';
        monthRef.current.value = '';
    };

    return (
        <Form method="get" onSubmit={handleFilterAuthors} className="row gx-3 gy-2 align-items-center py-2">
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Tên tác giả</Form.Label>
                <Form.Control ref={nameRef} type="text" placeholder="Nhập tên tác giả..." name="name" />
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
                            Tháng {month}
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
