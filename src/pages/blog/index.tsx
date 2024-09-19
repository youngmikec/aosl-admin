import React, { FC } from 'react';

import UserLayout from '../../shared/layouts/user-layout';
import BlogComp from '../../components/blog-comp';
// style link end 

const BlogPage: FC = () => {

    return (

        <UserLayout>
            <BlogComp />
        </UserLayout>
    )
}

export default BlogPage;


