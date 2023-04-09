/* eslint-disable react/jsx-pascal-case */
import './App.css';
import Layout from './Pages/Layout';
import Index from './Pages/Index';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Rss from './Pages/Rss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLayout from './Components/Admin/Layout';
import * as AdminIndex from './Pages/Admin/Index';
import Authors from './Pages/Admin/Authors';
import Categories from './Pages/Admin/Categories';
import Comments from './Pages/Admin/Comments';
import Posts from './Pages/Admin/Posts';
import Tags from './Pages/Admin/Tags';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="blog" element={<Index />} />
                    <Route path="blog/Contact" element={<Contact />} />
                    <Route path="blog/About" element={<About />} />
                    <Route path="blog/Rss" element={<Rss />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminIndex.default />} />
                    <Route path="/admin/authors" element={<Authors />} />
                    <Route path="/admin/categories" element={<Categories />} />
                    <Route path="/admin/comments" element={<Comments />} />
                    <Route path="/admin/posts" element={<Posts />} />
                    <Route path="/admin/tags" element={<Tags />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
