/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { StudyInfo } from '../../components';
import './InfoPage.css';

class InfoPage extends Component {
  render() {
    const profiles = [
      <div className="user-profile">
        <a
          className="VisitLink"
          onClick={() => window.open('https://github.com/davin111')}
        >
          <h2>다빈</h2>
        </a>
        <span>
          안녕하세요, 주로 서버 개발을 하고 있는 다빈입니다. 저도 개발 경력이
          아직 짧지만, 2020년에는 개발을 처음 해보는 사람들의 시작을 함께할
          기회가 많았던 것 같아요. ‘오렌지농장’은 개발을 처음하는 친구들과 함께
          공부와 실습을 목적으로 시작했던 프로젝트입니다. 경험이 제각각인
          사람들이 함께 한다는 것이 여러모로 힘들기도 했지만, 그 과정에서 저
          역시 얻은 것도 분명 있었던 것 같네요. 여전히 부족한 점이 있으나
          진행해오던 프로젝트를 한 단계 일단락해두게 되어 뿌듯합니다.
        </span>
        <br />
        <br />
        <img
          className="user-profile-photo"
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/Intro_Davin_turtle.png"
          alt="davin_profile"
        />
      </div>,
      <div className="user-profile">
        <a
          className="VisitLink"
          onClick={() => window.open('https://github.com/palpitate2015')}
        >
          <h2>상현</h2>
        </a>
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
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/Intro_Sanghyeon_shark.jpg"
          alt="sanghyeon_profile"
          height="300"
          width="300"
        />
      </div>,
      <div className="user-profile">
        <a
          className="VisitLink"
          onClick={() => window.open('https://github.com/YeonghyeonKO')}
        >
          <h2>영현</h2>
        </a>
        <span>
          안녕하세요. 오렌지농장 개발자 고영현입니다. 처음에는 Server 개발을
          공부해보겠다고 시작했지만 정신차려보니 Frontend, UX/UI 지식도 익힐 수
          있었네요. 아래 사진은 제가 가장 좋아하는 동물인 고래입니다. 개발
          공부를 하다보니 Docker라는, 이미지로부터 컨테이너를 구축하여 다수의
          프로세스들을 가상 머신으로 구동될 수 있게 해주는, 아주 중요한 오픈
          소스프로젝트를 알게 되었어요. Docker의 대표 이미지가 고래여서 저를
          소개하는 이미지로 함께 첨부해보았습니다.
        </span>
        <br />
        <br />
        <img
          className="user-profile-photo"
          src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/Intro_Yeonghyeon_Docker.png"
          alt="yeonghyeon_profile"
          height="300"
          width="300"
        />
      </div>,
      <div className="user-profile">
        <a
          className="VisitLink"
          onClick={() => window.open('https://github.com/JSKeum')}
        >
          <h2>진섭</h2>
        </a>
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
        <div className="orangenongjang-introduction-box">
          <h2 style={{ margin: '0 0 0 0', padding: '24px 0 0 0' }}>
            <img
              className="orangenongjang_logo_3"
              src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_3.png"
              alt="yeonghyeon_profile"
              height="30"
              width="30"
            />
            오렌지농장
            <img
              className="orangenongjang_logo_3"
              src="https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_3.png"
              alt="yeonghyeon_profile"
              height="30"
              width="30"
            />
          </h2>
          <br />
          <br />
          <strong>오렌지농장</strong>
          은
          {' '}
          <strong>공명반</strong>
          {' '}
          웹/앱 개발
          공부모임에서 본격적으로 개발한 웹서비스입니다. 동거인 사이에서 생길 수
          있는 가사노동 문제를 해결하고자 생필품을 관리하고, 가사노동을
          효율적으로 분담해보자는 취지에서 탄생하게 되었어요. 그렇다면
          오렌지농장이 어떤 서비스인지, 무엇을 할 수 있는지 알아볼까요?
          <br />
          <br />
          <ul className="orangenongjang-introduction-details">
            <li>
              • 사용자들은 지인들과 함께
              {' '}
              <strong>집</strong>
              이라는 공동 공간에서
              {' '}
              <strong>생필품 관리</strong>
              를 편리하게 할 수
              있어요. 집을 생성한 사용자가
              {' '}
              <strong>리더</strong>
              가 되고,
              '리더'는 오렌지농장에 가입한 사용자에 한해 이메일로
              {' '}
              <strong>집 초대장</strong>
              을 보낼 수 있어요. 어서 사용하고 싶은
              마음은 충분히 이해하지만, '집'에 초대받고 싶다면 먼저
              오렌지농장에 가입해야 한답니다.
            </li>
            <br />
            <li>
              • '집'에 여러 가지
              {' '}
              <strong>공간</strong>
              을 생성할 수 있어요.
              냉장고, 안방, 부엌, 책상 등 사용자가 관리하고 싶은 '공간'을 자유롭게
              생성해보세요. 단, '공간'
              {' '}
              <strong>삭제</strong>
              는 '리더'만 가능하다는 점 유의해주세요.
            </li>
            <br />
            <li>
              • 혹시 '집' 이름/소개글을 수정하고 싶거나
              '리더'를 다른 멤버에게 양도하고 싶다면
              {' '}
              <strong>관리</strong>
              {' '}
              버튼을 통해 '리더'가 손쉽게 관리할 수 있어요. '공간'의 이름을 변경하는 것은 일반 멤버도 가능하답니다!
            </li>
            <br />
            <li>
              • 각 '공간'에
              {' '}
              <strong>생필품</strong>
              을 추가할 수 있어요. 휴지나
              지우개, 연필은 물론 신선한 야채와 과일도 각 '공간' 안에 만들어 가격과
              수량을 편리하게 관리할 수 있어요. 이렇게 '집'에 함께 거주하는 누군가가 생필품을 추가하거나 수량을
              변경하고, 삭제하면
              {' '}
              <strong>타임라인</strong>
              {' '}
              탭에서 그 기록을 확인할 수도 있어요.
            </li>
            <br />
            <li>
              • 현재
              {' '}
              <strong>가사노동</strong>
              {' '}
              탭과
              {' '}
              <strong>통계</strong>
              {' '}
              탭은
              개발 단계에 있답니다. 지금까지 구상한 기능 외에도 새로운 아이디어,
              사용 중 겪는 문제점 등 여러분의 피드백을 언제든지 기다리고 있으니
              아래 이메일로 언제든지 연락주세요!
              <br />
              (
              {' '}
              <strong>
                <a href="mailto:orangenongjang@gmail.com">
                  orangenongjang@gmail.com
                </a>
              </strong>
              {' '}
              )
            </li>
            <br />
          </ul>
        </div>

        <div className="info-box">
          <StudyInfo />
          <div className="user-profiles">{introduction}</div>
        </div>
      </div>
    );
  }
}

export default InfoPage;
