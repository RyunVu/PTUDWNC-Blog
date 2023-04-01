import React, { useEffect, useState } from 'react';
import PostItem from '../Components/PostItem';
import { getPosts } from '../Services/BlogRepository';

const Index = () => {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        document.title = 'Trang chủ';

        getPosts().then((data) => {
            if (data) {
                setPostsList(data.items);
            } else setPostsList([]);
        });
    }, []);
    console.log(postsList);
    if (postsList)
        return (
            <div className="p-4">
                {postsList.map((item, index) => {
                    return <PostItem postItem={item} key={index} />;
                })}
            </div>
        );
    else return <></>;
};

export default Index;
