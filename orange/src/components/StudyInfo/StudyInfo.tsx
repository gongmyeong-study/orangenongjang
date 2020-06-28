import React from 'react';

import { ArticleProps } from '../Article/Article';
import './StudyInfo.css';

function StudyInfo(props: ArticleProps) {
    return (
      <div className={props.className}>
        <section>
          <h2 className="deep-orange">스터디 멤버</h2>
          <ul>
            <strong>웹 개발 참여</strong>
            <li>다빈</li>
            <li>상현</li>
            <li>영현</li>
            <li>진섭</li>
            <br />
            <strong>세미나 참여</strong>
            <li>민재</li>
            <li>은성</li>
            <li>재연</li>
          </ul>
        </section>
        <section>
          <h2 className="deep-orange">GitHub</h2>
          <ul>
            <li>
              <a
                className="VisitLink"
                onClick={() => window.open("https://github.com/gongmyeong-study")}
              >
                GitHub 방문하기
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="deep-orange">Slack</h2>
          <ul>
            <li>
              <a
                className="VisitLink"
                onClick={() => window.open("https://gongmyeongstudy.slack.com")}
              >
                Slack 방문하기
              </a>
            </li>       
          </ul>
        </section>  
      </div>
    );
}

export default StudyInfo;
