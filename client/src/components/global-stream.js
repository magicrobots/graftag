import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getPostsQuery = gql`
{
    posts{
        id
        title
        content
        photos{
            id
            title
            imageUrl
        }
    }
}
`;

function displayList(props) {
    const data = props.data;

    if (data.loading) {
        return(
        <li><span className="loading-span">Loading...</span></li>
        );
    }

    return data.posts.map(currPost => {
        return(
            <li key={currPost.id}>
                <div className="post-title">{currPost.title}</div>
                <div className="post-content">{currPost.content}</div>
                <div className="post-photos">{
                    currPost.photos.map(currPostPhoto => {
                        return(
                            <div className="post-photo" key={currPostPhoto.id}>
                                <img src={currPostPhoto.imageUrl} alt={currPostPhoto.title} />
                                <div className="post-photo-title">{currPostPhoto.title}</div>
                            </div>
                        )
                    })
                }
                </div>
            </li>
        );
    });
}

function GlobalStream(props) {

    return (
        <section id="global-stream">
            <h1>Global Stream</h1>
            <ul id="post-list">
                {displayList(props)}
            </ul>
        </section>
    );
}

export default graphql(getPostsQuery)(GlobalStream);
