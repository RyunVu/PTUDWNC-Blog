import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { createCategory, getCategoryById, updateCategory } from '../../../Services/categories';
import { isInteger, decode } from '../../../Utils/utils';

export default function CategoryEdit() {
    const navigate = useNavigate();

    const initialState = {
        id: 0,
        name: '',
        urlSlug: '',
        description: '',
        showOnMenu: false,
    };

    const [category, setCategory] = useState(initialState);
    const [validated, setValidated] = useState(false);

    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let isSuccess = true;
            if (id > 0) {
                const data = await updateCategory(id, category);
                if (!data.isSuccess) isSuccess = false;
            } else {
                const data = await createCategory(category);
                if (!data.isSuccess) isSuccess = false;
            }
            if (isSuccess) alert('Đã lưu thành công!');
            else alert('Đã xảy ra lỗi!');
            navigate('/admin/categories');
        }
    };

    useEffect(() => {
        document.title = 'Thêm/cập nhật chủ đề';

        fetchCategory();

        async function fetchCategory() {
            const data = await getCategoryById(id);
            if (data) setCategory(data);
            else setCategory(initialState);
        }
        // eslint-disable-next-line
    }, [id]);

    if (id && !isInteger(id)) return <Navigate to="/400?redirectTo=/admin/categories" />;

    return (
        <>
            <h1 className="px-4 py-3 text-danger">Thêm/cập nhật chủ đề</h1>
            <Form className="mb-5 px-4" onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Control type="hidden" name="id" value={category.id} />
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Tên</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            value={category.name || ''}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Slug</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="urlSlug"
                            title="Url slug"
                            value={category.urlSlug || ''}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    urlSlug: e.target.value,
                                })
                            }
                            required
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Giới thiệu</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="description"
                            title="description"
                            value={decode(category.description || '')}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="showOnMenu"
                                checked={category.showOnMenu}
                                title="showOnMenu"
                                onChange={(e) => {
                                    setCategory({
                                        ...category,
                                        showOnMenu: e.target.checked,
                                    });
                                }}
                            />
                            <Form.Label className="form-check-label">Hiển thị trên menu</Form.Label>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Lưu các thay đổi
                    </Button>
                    <Link to="/admin/categories" className="btn btn-danger ms-2">
                        Hủy và quay lại
                    </Link>
                </div>
            </Form>
        </>
    );
}
