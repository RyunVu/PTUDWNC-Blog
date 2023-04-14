/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
    BlogLayout,
    BlogHome,
    About,
    Contact,
    Rss,
    AdminLayout,
    AdminHome,
    Categories,
    Authors,
    Tags,
    Posts,
    Comments,
    NotFound,
    BadRequest,
} from './Pages';
import PostEdit from './Pages/Admin/Post/PostEdit';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogLayout />}>
                    <Route path="/" element={<BlogHome />} />
                    <Route path="blog" element={<BlogHome />} />
                    <Route path="blog/Contact" element={<Contact />} />
                    <Route path="blog/About" element={<About />} />
                    <Route path="blog/Rss" element={<Rss />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminHome />} />
                    <Route path="/admin/authors" element={<Authors />} />
                    <Route path="/admin/categories" element={<Categories />} />
                    <Route path="/admin/comments" element={<Comments />} />
                    <Route path="/admin/posts" element={<Posts />} />
                    <Route path="/admin/posts/edit" element={<PostEdit />} />
                    <Route path="/admin/posts/edit/:id" element={<PostEdit />} />
                    <Route path="/admin/tags" element={<Tags />} />
                </Route>

                <Route path="/400" element={<BadRequest />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
