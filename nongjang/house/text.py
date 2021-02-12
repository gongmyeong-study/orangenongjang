def house_invite_subject(self):
    return "오렌지농장 House에 초대합니다."


def house_invite_message(domain, house_uidb64, user_uidb64, token, user, house, invited_user):
    link = f"{domain}api/v1/house/{house_uidb64}/user/{user_uidb64}/activate/{token}/"

    return f"<h2> To. {invited_user}</h2> <br>" \
           f"<span style='font-size: 14px'> <strong>{user.username}</strong> 님이 <strong>{house.name}</strong> 초대장을 전송했습니다! <br>" \
           f"아래 <a href='{link}'>링크</a>로 접속하면 <strong>{house.name}</strong> 에 초대됩니다. <br><br>" \
           f"링크 : {link} <br><br><br> </span>" \
           f"<h2> From. 오렌지농장(orangenongjang)</h2>" \
           f"<img src='https://orangenongjang-static.s3.ap-northeast-2.amazonaws.com/image/orangenongjang_logo_2.png' " \
           f"alt='Orangenongjang_logo' width='550' height='500'>"
