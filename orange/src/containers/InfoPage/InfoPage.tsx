/* eslint-disable max-len */
import React, { Component } from 'react';

import { StudyInfo } from '../../components';
import './InfoPage.css';

class InfoPage extends Component {
  render() {
    const profiles = [
      <div className="user-profile">
        <h2>다빈</h2>
        <span>
          안녕하세요, 주로 서버 개발을 하고 있는 다빈입니다. 저도 개발 경력이
          아직 짧지만, 2020년에는 개발을 처음 해보는 사람들의 시작을 함께할
          기회가 많았던 것 같아요. ‘오렌지농장’은 개발을 처음하는 친구들과 함께
          공부와 실습을 목적으로 시작했던 프로젝트입니다. 경험이 제각각인
          사람들이 함께 한다는 것이 여러 모로 힘들기도 했지만, 그 과정에서 저
          역시 얻은 것도 분명 있었던 것 같네요. 여전히 부족한 점이 있으나
          진행해오던 프로젝트를 한 단계 일단락해두게 되어 뿌듯합니다.
        </span>
        <br />
        <br />
        <img
          className="user-profile-photo"
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/%EB%B3%80%EB%8B%A4%EB%B9%88_%EC%86%8C%EA%B0%9C_%EA%B1%B0%EB%B6%81%EC%9D%B4.png"
          alt="davin_profile"
          height="300"
          width="300"
        />
      </div>,
      <div className="user-profile">
        <h2>상현</h2>
        <span>
          안녕하세요 병아리 기획자(?) 박상현입니다... 사실 초기 기획 단계에만
          참여했고 그 이후엔 별로 기여한 게 없는 터라 부끄럽긴 한데요 ㅎㅎ
          서비스의 목적과 형태, 전반적 디자인에 대한 아이디어를 제출하는 일이
          되게 재밌었던 기억이 납니다. 그 이후 몇 개월 동안의 슬랙과 깃허브
          알림이 끊이지 않더니... 결국 저희가 상상한 그것이 눈앞에 실현된 것을
          마주하니 감회가 새롭네요 ㅎㅎ 다들 고생하셨고, 나중에 기회가 되면 초기
          기획 뿐 아니라 서비스 개발 전반에 참여하고 싶습니다! 오렌지농장 풍년
          들어라!
        </span>
        <br />
        <br />
        <img
          className="user-profile-photo"
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/%EB%B0%95%EC%83%81%ED%98%84_%EC%86%8C%EA%B0%9C_%EC%83%81%EC%96%B4.jpg"
          alt="sanghyeon_profile"
          height="300"
          width="300"
        />
      </div>,
      <div className="user-profile">
        <h2>영현</h2>
        <span>
          안녕하세요. 오렌지농장 개발자 고영현입니다. 처음에는 Backend 개발을
          공부해보겠다고 시작했지만 정신차려보니 Server, Frontend 지식도 익힐 수
          있었네요. 아래 사진은 제가 가장 좋아하는 동물인 고래인데요, 개발
          공부를 하다보니 Docker라는, 이미지로부터 컨테이너를 구축하여 다수의
          프로세스들을 가상 머신으로 구동될 수 있게 해주는, 아주 중요한 오픈
          소스프로젝트를 알게 되었어요. Docker의 대표 이미지가 고래여서 저를
          소개하는 이미지로 함께 첨부해보았습니다.
        </span>
        <br />
        <br />
        <img
          className="user-profile-photo"
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/%EA%B3%A0%EC%98%81%ED%98%84_%EC%86%8C%EA%B0%9C_Docker+%EC%9D%B4%EB%AF%B8%EC%A7%80.png"
          alt="yeonghyeon_profile"
          height="300"
          width="300"
        />
      </div>,
      <div className="user-profile">
        <h2>진섭</h2>
        <span>
          소프트웨어 개발과 UX/UI 디자인에 관심이 많습니다.
          <br />
          서양사학 / 정보문화학 전공
          <br />
          @와플스튜디오
          <br />
          @Decipher
        </span>
      </div>,
    ];

    profiles.sort(() => 0.5 - Math.random());

    const introduction = profiles.map((profile) => (
      <>
        <br />
        <div className="user-profile-box">{profile}</div>
      </>
    ));

    return (
      <div className="info-ui">
        <main className="info-box">
          <StudyInfo />
          <div className="user-profiles">{introduction}</div>
        </main>
      </div>
    );
  }
}

export default InfoPage;
