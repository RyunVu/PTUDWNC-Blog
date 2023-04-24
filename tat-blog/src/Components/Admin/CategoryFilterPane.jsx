import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CategoryFilterPane({ setName, setShowOnMenu }) {
    const nameRef = useRef();
    const showOnMenuRef = useRef();

    const handleFilterCategories = (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
        setShowOnMenu(showOnMenuRef.current.checked);
    };

    const handleClearFilter = () => {
        setName('');
        setShowOnMenu(false);
        nameRef.current.value = '';
        showOnMenuRef.current.checked = false;
    };

    return (
        <Form method="get" onSubmit={handleFilterCategories} className="row gx-3 gy-2 align-items-center py-2">
            <Form.Group className="col-auto">
                <Form.Label className="visually-hidden">Tên chủ đề</Form.Label>
                <Form.Control ref={nameRef} type="text" placeholder="Nhập tên chủ đề..." name="name" />
            </Form.Group>
            <Form.Group className="col-auto">
                <input id="show-on-menu" type="checkbox" ref={showOnMenuRef} />
                <label htmlFor="show-on-menu" className="ms-1">
                    Hiển thị trên menu
                </label>
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
