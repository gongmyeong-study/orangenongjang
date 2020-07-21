import React from 'react';
import { ArticleProps } from '../Article/Article';

function Articles(props: ArticleProps) {
    return (
      <div className={props.className}>
        <article>
        </article>
      </div>
    );
}

export default Articles;
