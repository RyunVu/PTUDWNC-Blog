import React, { useEffect, useState } from 'react';
import PostItem from '../Components/PostItem';
import Pager from '../Components/Pager';
import { getPosts } from '../Services/blogRepository';
import { useQuery } from '../Utils/utils';

const Index = () => {
    const [postsList, setPostsList] = useState([]);
    const [metadata, setMetadata] = useState({});

    let query = useQuery(),
        k = query.get('k') ?? '',
        p = query.get('p') ?? 1,
        ps = query.get('ps') ?? 10;

    useEffect(() => {
        document.title = 'Trang chủ';

        getPosts(k, ps, p).then((data) => {
            if (data) {
                setPostsList(data.items);
                setMetadata(data.metadata);
                console.log(data.items);
            } else setPostsList([]);
        });
    }, [k, p, ps]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postsList]);
    if (postsList)
        return (
            <div className="p-4">
                {postsList.map((item, index) => {
                    return <PostItem postItem={item} key={index} />;
                })}
                <Pager postQuery={{ keyword: k }} metadata={metadata} />
            </div>
        );
    else return <></>;
};

export default Index;
