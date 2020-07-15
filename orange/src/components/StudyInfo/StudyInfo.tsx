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
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/davin111")}
              > 다빈
              </a>
            </li>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/palpitate2015")}
              > 상현
              </a>
            </li>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/YeonghyeonKO")}
              > 영현
              </a>
            </li>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/JSKeum")}
              > 진섭
              </a>
            </li>
            <br />
            <strong>세미나 참여</strong>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/anneKwon")}
              > 민재
              </a>
            </li>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/Eunsung-k")}
              > 은성
              </a>
            </li>
            <li>
              <a 
                className="VisitLink"
                onClick={() => window.open("https://github.com/jadeyyun")}
              > 재연
              </a>
            </li>          
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
