import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import PostsFilter from '../../Components/blog/PostFilter';

export default function Home() {
    const queryStrings = new URLSearchParams(useLocation().search);
    const keyword = queryStrings.get('keyword');

    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    return (
        <div className="p-4">
            {keyword && <h1 className="mb-4">Kết quả tìm kiếm cho từ khóa: "{keyword}"</h1>}
            <PostsFilter postQuery={{ keyword }} />
        </div>
    );
}
