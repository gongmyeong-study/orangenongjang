import React from 'react';
import { ArticleProps } from '../Article/Article';

function Articles(props: ArticleProps) {
    return (
      <div className={props.className}>
        <article>
          {/* <h2>프로그래밍 기본 익히기</h2>
          <div className="exercise">
            <h2 className="soft-orange">실습 1.</h2>
            <p>소문자를 입력 받아 대문자 출력하는 프로그램 만들기</p>
            <h2 className="soft-orange">실습 2.</h2>
            <p>골드바흐의 추측을 검증하는 프로그램 만들기(N은 200000 이하)</p>
          </div> */}
        </article>
      </div>
    );
}

export default Articles;
