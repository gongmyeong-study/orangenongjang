import React, { ReactElement } from 'react';
import { ArticleProps } from '../Article/Article';

function Articles(props: ArticleProps): ReactElement {
  return (
    <div className={props.className}>
      <article />
    </div>
  );
}

export default Articles;
