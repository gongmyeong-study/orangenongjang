import React from 'react';
import './main.css';

class Main extends React.Component {
  render() {
    return(
      <div className="main-ui">
        <Header className="main-header" title="오렌지 농장"/>
        <main>
          <StudyInfo className="left-info" />
          <Articles className="right-articles" />  
        </main>     
      </div>
    );
  }
}

export default Main;

// each HTML component
function Header(props: Text) {
  return (
    <header className={props.className}>
      <h1>{props.title}</h1>
      {/* 소개글 넣기 */}
      <p>Since. 2020.04.12</p>
    </header>
  );
}

function StudyInfo(props: Text) {
  return (
    <div className={props.className}>
      <section>
        <h2 className="deep-orange">스터디 멤버</h2>
        <ul>
          <li>다빈</li>
          <li>민재</li>
          <li>상현</li>
          <li>은성</li>
          <li>진섭</li>
        </ul>
      </section>
      <section>
        <h2 className="deep-orange">Github</h2>
        <ul>
          <li><a href="https://github.com/gongmyeong-study">깃헙 방문하기</a></li>
        </ul>
      </section>
      <section>
        <h2 className="deep-orange">Slack</h2>
        <ul>
          <li><a href="https://gongmyeongstudy.slack.com">슬랙 방문하기</a></li>       
        </ul>
      </section>  
    </div>
  );
}

function Articles(props: Text) {
  return (
    <div className={props.className}>
      <article>
        <h2>프로그래밍 기본 익히기</h2>
        <div className="exercise">
          <h2 className="soft-orange">실습 1.</h2>
          <p>소문자를 입력 받아 대문자 출력하는 프로그램 만들기</p>
          <h2 className="soft-orange">실습 2.</h2>
          <p>골드바흐의 추측을 검증하는 프로그램 만들기(N은 200000 이하)</p>
        </div>
      </article>
      <article>
        <h2>깃헙 사용하기</h2>
      </article>
    </div>
  );
}

interface Text {
  title?: string;
  className?: string;
}
