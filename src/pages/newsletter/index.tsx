import React from 'react';
import UserLayout from '../../shared/layouts/user-layout';
import NewsletterComp from '../../components/newsletter-comp';

const NewsletterPage = () => {
    return (
        <>
            <UserLayout>
                <NewsletterComp />
            </UserLayout>
        </>
    )
}

export default NewsletterPage;