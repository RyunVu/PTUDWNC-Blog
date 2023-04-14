import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AuthorFilterPane({ setName }) {
    // Component's refs
    const nameRef = useRef();
    // Component's event handlers
    const handleFilterAuthors = (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
    };

    const handleClearFilter = () => {
        setName('');
        nameRef.current.value = '';
    };

    return (
        <Form method="get" onSubmit={handleFilterAuthors} className="row gx-3 gy-2 align-items-center py-2">
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Tên tác giả</Form.Label>
                <Form.Control ref={nameRef} type="text" placeholder="Nhập tên tác giả..." name="keyword" />
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
