import React from 'react';
import { ArticleProps } from '../Article/Article';
import Login from '../Login/Login';

function Articles(props: ArticleProps) {
    return (
      <div className={props.className}>
        <article>
          <Login />
        </article>
      </div>
    );
}

export default Articles;
