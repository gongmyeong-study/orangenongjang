def user_invite_subject(self):
    return "오렌지농장 가입인증 메일입니다."


def user_invite_message(domain, uidb64, token, user):
    link = f"{domain}api/v1/user/{uidb64}/activate/{token}/"

    return f"<h2> To. {user}</h2> <br>" \
           f"<span style='font-size: 14px'> 아래 <a href='{link}'>링크</a>로 접속하면 회원 인증이 완료됩니다. <br>" \
           f"링크 : {link} <br><br> </span>" \
           f"오렌지농장에 오신 것을 환영합니다 :)</span> <br><br><br>" \
           f"<h2> From. 오렌지농장(orangenongjang)</h2>" \
           f"<img src='https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_2.png'" \
           f"alt='Orangenongjang_logo' width='550' height='500'> <br><br>" \
           f" <span style='font-size: 12px'> <strong>오렌지농장</strong> 은 다음과 같이 귀하의 개인정보를 수집, 이용합니다. <br><br>" \
           f" □ 개인정보의 수집 및 이용 목적  <br>" \
           f" 오렌지농장 이용자에 회원인증 메일 및 집 초대장 메일 전송  <br><br>" \
           f" □ 수집하는 개인정보의 항목  <br>" \
           f" 필수정보 : 사용자 이름, E-Mail 주소  <br><br>" \
           f" * 귀하는 위와 관련된 동의를 거부할 권리가 있으나, 필수정보 수집에 동의하지 않는 경우 오렌지농장 서비스 이용이 제한됩니다. </span><br>"
