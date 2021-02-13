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
           f"alt='Orangenongjang_logo' width='550' height='500'>"
