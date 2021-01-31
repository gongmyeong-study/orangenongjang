def house_invite_message(domain, house_uidb64, user_uidb64, token, user, house, invited_user):
    link = f"{domain}/{house_uidb64}/user/{user_uidb64}/activate/{token}/"

    return f"To. [ {invited_user} ]\n\n" \
           f" [ {user.username} ]님이 [ {house.name} ] 초대장을 전송했습니다!\n" \
           f"아래 링크를 클릭하면 [ {house.name} ]에 초대됩니다.\n\n" \
           f"링크 : {link}\n\n" \
           f"From. 오렌지농장(orangenongjang)"
