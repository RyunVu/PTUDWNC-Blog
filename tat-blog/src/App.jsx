import './App.css';
import Layout from './Pages/Layout';
import Index from './Pages/Index';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Rss from './Pages/Rss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLayout from './Components/Admin/Layout';
import * as AdminIndex from './Pages/Admin/Index';

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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
