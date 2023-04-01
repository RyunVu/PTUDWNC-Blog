import React, { useEffect, useState } from 'react';
import PostItem from '../Components/PostItem';

const Index = () => {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    if (postsList.length > 0)
        return (
            <div className="p-4">
                {postsList.map((item) => {
                    return <PostItem postItem={item} />;
                })}
            </div>
        );
    else return <></>;
};

export default Index;
