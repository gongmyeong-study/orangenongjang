import React from 'react';

import { ArticleProps } from '../Article/Article';
import './Header.css';

// each HTML component
function Header(props: ArticleProps) {
    return (
      <header className={props.className}>
        <h1>{props.title}</h1>
        {/* 소개글 넣기 */}
        <p>Until. 2021.05.28.</p>
      </header>
    );
}

export default Header;
