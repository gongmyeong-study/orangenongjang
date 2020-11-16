import os


ENV_MODE = os.getenv('MODE', 'dev')


def user_invite_message(domain, uidb64, token):
    if ENV_MODE == 'dev':
        link = "http://{}/api/v1/user/{}/activate/{}/".format(domain, uidb64, token)
    else:
        link = "http://{}/user/{}/activate/{}".format(domain, uidb64, token)

    return f"아래 링크를 클릭하면 회원 인증이 완료됩니다.\n\n" \
           f"링크 : {link}\n\n" \
           f"오렌지농장에 오신 것을 환영합니다 :)"
