import React from 'react';
import SearchForm from './SearchForm';

import {
    CategoriesWidget,
    FeaturedPostsWidget,
    RandomPostsWidget,
    TagCloudWidget,
    TopAuthorsWidget,
    ArchivesWidget,
} from './widgets';

const Sidebar = () => {
    return (
        <div className="mb-4 pt-4 ps-2">
            <SearchForm />
            <CategoriesWidget />
            <FeaturedPostsWidget />
            <RandomPostsWidget />
            <TagCloudWidget />
            <TopAuthorsWidget />
            <ArchivesWidget />
        </div>
    );
};

export default Sidebar;
