import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Navigate, useParams } from 'react-router-dom';
import { addOrUpdatePost, getFilter, getPostByid } from '../../../Services/posts';
import { isEmptyOrSpaces, isInteger } from '../../../Utils/utils';
import { Button, FormControl, FormLabel, FormSelect } from 'react-bootstrap';

export default function Edit() {
    const [validated, setValidated] = useState(false);
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
            tags: [],
            selectedTags: '',
            published: false,
        },
        [post, setPost] = useState(initialState),
        [filter, setFilter] = useState({
            authorList: [],
            categoryList: [],
        });

    let { id } = useParams();
    id = id ?? 0;

    useEffect(() => {
        document.title = 'Thêm/cập nhật bài viết';

        getPostByid(id).then((data) => {
            if (data)
                setPost({
                    ...data,
                    selectedTags: data.tags.map((tag) => tag?.name).join('\r\n'),
                });
            else setPost(initialState);
        });

        getFilter().then((data) => {
            if (data)
                setFilter({
                    authorList: data.authorList,
                    categoryList: data.categoryList,
                });
            else
                setFilter({
                    authorList: [],
                    categoryList: [],
                });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            let form = new FormData(e.target);
            addOrUpdatePost(form).then((data) => {
                if (data) alert('Lưu thành công');
                else alert('Đã xảy ra lỗi ~~!');
            });
        }
    };
    if (id && !isInteger(id)) return <Navigate to={`/400?redirectTo=/admin/posts`} />;
    return (
        <>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit} noValidate validated={validated}>
                <FormControl type="hidden" name="id" value={post.id} />
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Tiêu đề</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            type="text"
                            name="title"
                            title="Title"
                            required
                            value={post.title || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    title: e.target.value,
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Slug</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            type="text"
                            name="urlSlug"
                            title="Url slug"
                            required
                            value={post.urlSlug || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    urlSlug: e.target.value,
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Giới thiệu</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            as="textarea"
                            type="text"
                            name="shortDescription"
                            title="Short Description"
                            required
                            value={post.shortDescription || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    shortDescription: e.target.value,
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Nội dung</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            as="textarea"
                            rows={10}
                            type="text"
                            name="description"
                            title="Description"
                            required
                            value={post.description || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    description: e.target.value,
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Metadata</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            type="text"
                            name="meta"
                            title="meta"
                            required
                            value={post.meta || ''}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    meta: e.target.value,
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Tác giả</FormLabel>
                    <div className="col-sm-10">
                        <FormSelect
                            name="authorId"
                            title="Author Id"
                            required
                            value={post.author.id}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    author: e.target.value,
                                })
                            }>
                            <option value="">-- Chọn tác giả --</option>
                            {filter.authorList.length > 0 &&
                                filter.authorList.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.text}
                                    </option>
                                ))}
                        </FormSelect>
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Chủ đề</FormLabel>
                    <div className="col-sm-10">
                        <FormSelect
                            name="categoryId"
                            title="Category Id"
                            required
                            value={post.category.id}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    category: e.target.value,
                                })
                            }>
                            <option value="">-- Chọn chủ đề --</option>
                            {filter.categoryList.length > 0 &&
                                filter.categoryList.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.text}
                                    </option>
                                ))}
                        </FormSelect>
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Từ khóa (mỗi từ 1 dòng)</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            as="textarea"
                            rows={5}
                            type="text"
                            name="selectedTag"
                            title="Selected Tag"
                            required
                            value={post.selectedTags}
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    selectedTags: e.target.value,
                                })
                            }></FormControl>
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
                    </div>
                </div>
                {!isEmptyOrSpaces(post.imageUrl) && (
                    <div className="row mb-3">
                        <FormLabel className="col-sm-2 col-form-label">Hình hiện tại</FormLabel>
                        <div className="col-sm-10">
                            <img src={post.imageUrl} alt={post.title} />
                        </div>
                    </div>
                )}
                <div className="row mb-3">
                    <FormLabel className="col-sm-2 col-form-label">Chọn hình ảnh</FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            title="Image file"
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    imageUrl: e.target.files[0],
                                })
                            }
                        />
                        <FormControl.Feedback type="invalid">Không được bỏ trống</FormControl.Feedback>
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
                                onChange={(e) =>
                                    setPost({
                                        ...post,
                                        published: e.target.checked,
                                    })
                                }
                            />
                            <FormLabel className="form-check-label">Đã xuất bản</FormLabel>
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
