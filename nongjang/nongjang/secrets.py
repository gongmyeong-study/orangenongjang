import boto3
import json

SECRETS_MANAGER = boto3.client('secretsmanager', region_name='ap-northeast-2')


def get_credential(secret_id, key):
    credential = SECRETS_MANAGER.get_secret_value(SecretId=secret_id)
    return json.loads(credential['SecretString'])[key]
