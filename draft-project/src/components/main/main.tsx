import React from 'react';

class Main extends React.Component {
  render() {
    return(
    <div className="main-ui">
      <Header className="main-header" title="공명반 개발 스터디"/>
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
      <p>Since. 2020.04.13</p>
    </header>
  );
}

function StudyInfo(props: Text) {
  return (
    <div className={props.className}>
      <section>
        <h2>스터디 멤버</h2>
        <ul>
          <li>다빈</li>
          <li>민재</li>
          <li>상현</li>
          <li>은성</li>
          <li>진섭</li>
        </ul>
      </section>
      <section>
        <h2>Github</h2>
        <ul>
          <li>https://github.com/gongmyeong-study</li>
        </ul>
      </section>
      <section>
        <h2>Slack</h2>
        <ul>
          <li>https://gongmyeongstudy.slack.com</li>       
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
        <h2>실습 1.</h2>
        <h4>소문자를 입력 받아 대문자 출력하는 프로그램 만들기</h4>
      </article>
    </div>
  );
}

interface Text {
  title?: string;
  text?: string;
  className?: string;
}
