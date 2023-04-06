import React from 'react';
import SearchForm from './SearchForm';
import CategoriesWidget from './widgets/CategoriesWidget';
import FeaturedPostsWidget from './widgets/FeaturedPostsWidget';
import RandomPostsWidget from './widgets/RandomPostsWidget';

const Sidebar = () => {
    return (
        <div className="mb-4 pt-4 ps-2">
            <SearchForm />
            <CategoriesWidget />
            <FeaturedPostsWidget />
            <RandomPostsWidget />
        </div>
    );
};

export default Sidebar;
