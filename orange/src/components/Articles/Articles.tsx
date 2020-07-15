import React from 'react';
import { ArticleProps } from '../Article/Article';

function Articles(props: ArticleProps) {
    return (
      <div className={props.className}>
        <article>
          <p>여기에 하고 싶은 말을 쓰는 거구나</p>
          <p>타입스크립트라 한참 헤맸네</p>
          <p>그나저나 soft-orange는 어디간 거야?</p>
          
        </article>
        
      </div>
    );
}


export default Articles;
