def user_invite_message(domain, uidb64, token, user):
    link = f"{domain}/{uidb64}/activate/{token}/"

    return f"To. [ {user} ]\n\n\n\n" \
           f"아래 링크를 클릭하면 회원 인증이 완료됩니다.\n\n" \
           f"링크 : {link}\n\n" \
           f"오렌지농장에 오신 것을 환영합니다 :)\n\n" \
           f"From. 오렌지농장(orangenongjang)"

