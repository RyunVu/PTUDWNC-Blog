import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { isEmptyOrSpaces, isInteger, decode } from '../../../Utils/utils';

import { createPost, getPostById, updatePost } from '../../../Services/posts';
import { getAuthors } from '../../../Services/authors';
import { getCategories } from '../../../Services/widgets';

export default function PostEdit() {
    const navigate = useNavigate();

    const initialState = {
        id: 0,
        title: '',
        shortDescription: '',
        description: '',
        urlSlug: '',
        meta: '',
        imageUrl: '',
        category: {},
        author: {},
        categoryId: 0,
        authorId: 0,
        tags: [],
        selectedTags: '',
        published: false,
    };

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState(initialState);
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
                const postData = {
                    id,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    description: post.description,
                    meta: post.meta,
                    urlSlug: post.urlSlug,
                    published: post.published,
                    categoryId: post.category.id,
                    authorId: post.author.id,
                    selectedTags: post.selectedTags.split('\r\n'),
                };
                const data = await updatePost(id, postData);
                if (!data.isSuccess) isSuccess = false;
            } else {
                console.log(post);
                const postData = {
                    id: 0,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    description: post.description,
                    meta: post.meta,
                    urlSlug: post.urlSlug,
                    published: post.published,
                    categoryId: post.categoryId,
                    authorId: post.authorId,
                    selectedTags: post.selectedTags.split('\n'),
                };
                const data = await createPost(postData);
                if (!data.isSuccess) isSuccess = false;
            }
            if (isSuccess) alert('Đã lưu thành công!');
            else alert('Đã xảy ra lỗi!');
            navigate('/admin/posts');
        }
    };

    useEffect(() => {
        document.title = 'Thêm/cập nhật bài viết';

        fetchAuthors();
        fetchCategories();
        fetchPost();

        async function fetchAuthors() {
            const data = await getAuthors();
            if (data) setAuthors(data.items);
            else setAuthors([]);
        }
        async function fetchCategories() {
            const data = await getCategories();
            if (data) setCategories(data.items);
            else setCategories([]);
        }
        async function fetchPost() {
            const data = await getPostById(id);
            if (data)
                setPost({
                    ...data,
                    selectedTags: data.tags.map((tag) => tag?.name).join('\r\n'),
                });
            else setPost(initialState);
        }
        // eslint-disable-next-line
    }, [id]);

    if (id && !isInteger(id)) return <Navigate to="/400?redirectTo=/admin/posts" />;

    return (
        <>
            <h1 className="px-4 py-3 text-danger">Thêm/cập nhật bài viết</h1>
            <Form className="mb-5 px-4" onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Control type="hidden" name="id" value={post.id} />
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Tiêu đề</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="title"
                            required
                            value={post.title || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    title: e.target.value,
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
                            value={post.urlSlug || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    urlSlug: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Giới thiệu</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            as="textarea"
                            type="text"
                            required
                            name="shortDescription"
                            title="Short description"
                            value={decode(post.shortDescription || '')}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    shortDescription: e.target.value,
                                })
                            }
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Nội dung</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            as="textarea"
                            rows={10}
                            type="text"
                            required
                            name="Description"
                            title="Description"
                            value={decode(post.description || '')}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    description: e.target.value,
                                })
                            }
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Metadata</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            type="text"
                            name="meta"
                            title="meta"
                            value={decode(post.meta || '')}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    meta: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Tác giả</Form.Label>
                    <div className="col-sm-10">
                        <Form.Select
                            name="authorId"
                            title="Author Id"
                            value={post.author.id}
                            required
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    authorId: e.target.value,
                                })
                            }>
                            <option value="">-- Chọn tác giả --</option>
                            {authors.length > 0 &&
                                authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.fullName}
                                    </option>
                                ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Chủ đề</Form.Label>
                    <div className="col-sm-10">
                        <Form.Select
                            name="categoryId"
                            title="Category Id"
                            value={post.category.id}
                            required
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    categoryId: e.target.value,
                                })
                            }>
                            <option value="">-- Chọn chủ đề --</option>
                            {categories.length > 0 &&
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <Form.Label className="col-sm-2 col-form-label">Từ khóa (mỗi từ 1 dòng)</Form.Label>
                    <div className="col-sm-10">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            type="text"
                            required
                            name="selectedTags"
                            title="Selected Tags"
                            value={post.selectedTags}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    selectedTags: e.target.value,
                                })
                            }
                        />
                        <Form.Control.Feedback type="invalid">Không được bỏ trống</Form.Control.Feedback>
                    </div>
                </div>
                {!isEmptyOrSpaces(post.imageUrl) && (
                    <div className="row mb-3">
                        <Form.Label className="col-sm-2 col-form-label">Hình hiện tại</Form.Label>
                        <div className="col-sm-10">
                            <img src={process.env.REACT_APP_API_ROOT_URL + post.imageUrl} alt={post.title} />
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
                                console.log(e.target.files[0]);
                                setPost({
                                    ...post,
                                    imageFile: e.target.files[0],
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="published"
                                checked={post.published}
                                title="Published"
                                onChange={(e) => {
                                    setPost({
                                        ...post,
                                        published: e.target.checked,
                                    });
                                }}
                            />
                            <Form.Label className="form-check-label">Đã xuất bản</Form.Label>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="primary" type="submit">
                        Lưu các thay đổi
                    </Button>
                    <Link to="/admin/posts" className="btn btn-danger ms-2">
                        Hủy và quay lại
                    </Link>
                </div>
            </Form>
        </>
    );
}
