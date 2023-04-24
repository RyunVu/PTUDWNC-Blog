import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { isEmptyOrSpaces, isInteger, decode } from '../../../Utils/utils';

import { createAuthor, getAuthorById, updateAuthor } from '../../../Services/authors';

export default function AuthorEdit() {
    const navigate = useNavigate();

    const initialState = {
        id: 0,
        fullName: '',
        urlSlug: '',
        imageUrl: '',
        email: '',
        notes: '',
    };

    const [author, setAuthor] = useState([]);
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
                const data = await updateAuthor(id, author);
                if (!data.isSuccess) isSuccess = false;
            } else {
                const date = new Date();
                const data = await createAuthor({
                    ...author,
                    joinedDate: date.toJSON(),
                });
                if (!data.isSuccess) isSuccess = false;
            }
            if (isSuccess) alert('Đã lưu thành công!');
            else alert('Đã xảy ra lỗi!');
            navigate('/admin/authors');
        }
    };

    useEffect(() => {
        document.title = 'Thêm/cập nhật tác giả';

        fetchAuthor();

        async function fetchAuthor() {
            const data = await getAuthorById(id);
            if (data) setAuthor(data);
            else setAuthor(initialState);
        }
        // eslint-disable-next-line
    }, [id]);

    if (id && !isInteger(id)) return <Navigate to="/400?redirectTo=/admin/authors" />;

    return (
        <>
            <h1 className="px-4 py-3 text-danger">Thêm/cập nhật tác giả</h1>
            <Form className="mb-5 px-4" onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Control type="hidden" name="id" value={author.id} />
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Tên</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="fullName"
                            required
                            value={author.fullName || ''}
                            onChange={(e) =>
                                setAuthor({
                                    ...author,
                                    fullName: e.target.value,
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
                            value={author.urlSlug || ''}
                            onChange={(e) =>
                                setAuthor({
                                    ...author,
                                    urlSlug: e.target.value,
                                })
                            }
                            required
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Email</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="email"
                            title="email"
                            value={author.email || ''}
                            onChange={(e) =>
                                setAuthor({
                                    ...author,
                                    email: e.target.value,
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
                            name="notes"
                            title="notes"
                            value={decode(author.notes || '')}
                            onChange={(e) =>
                                setAuthor({
                                    ...author,
                                    notes: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                {!isEmptyOrSpaces(author.imageUrl) && (
                    <div className="row mb-3">
                        <Form.Label className="col-sm-2 col-form-label">Hình hiện tại</Form.Label>
                        <div className="col-sm-10">
                            <img src={process.env.REACT_APP_API_ROOT_URL + author.imageUrl} alt={author.fullName} />
                        </div>
                    </div>
                )}
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Chọn hình ảnh</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            title="Image file"
                            onChange={(e) => {
                                setAuthor({
                                    ...author,
                                    imageFile: e.target.files[0],
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Lưu các thay đổi
                    </Button>
                    <Link to="/admin/authors" className="btn btn-danger ms-2">
                        Hủy và quay lại
                    </Link>
                </div>
            </Form>
        </>
    );
}
