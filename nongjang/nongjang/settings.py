"""
Django settings for nongjang project.

Generated by 'django-admin startproject' using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import json

ENV_MODE = os.getenv('MODE', 'dev')

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '%$(uu1zk1f4*8wnljep5ug(5t7*2u3+&exurk*0t+af56vbued'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
USE_DEBUG_TOOLBAR = os.getenv('DEBUG_TOOLBAR', '').lower() == 'true'

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'user.apps.UserConfig',
    'necessity.apps.NecessityConfig',
    'house.apps.HouseConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'nongjang.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'nongjang.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

secret_file = os.path.join(os.path.dirname(__file__), 'secret_info.json')
if ENV_MODE == 'test':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
elif os.path.exists(secret_file):
    with open(secret_file) as f:
        secret_info = json.loads(f.read())
        print(f"*** MODE: {ENV_MODE} ***")
        if ENV_MODE == 'prod':
            DATABASES = {
                'default': {
                    'ENGINE': 'django.db.backends.mysql',
                    'NAME': secret_info['DATABASE_NAME'],
                    'USER': secret_info['DATABASE_USER'],
                    'PASSWORD': secret_info['DATABASE_PASSWORD'],
                    'HOST': secret_info['DATABASE_HOST'],
                    'PORT': secret_info['DATABASE_PORT'],
                }
            }
        else:
            DATABASES = {
                'default': {
                    'ENGINE': 'django.db.backends.mysql',
                    'NAME': secret_info['DATABASE_NAME'],
                    'USER': secret_info['DATABASE_USER'],
                    'PASSWORD': secret_info['DATABASE_PASSWORD'],
                    'HOST': 'localhost',
                    'PORT': '3306',
                }
            }
else:
    raise Exception("Check your 'secret_info.json' file!")

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'TIMEOUT': 3600,
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Django Mail
with open(secret_file) as f:
    secret_info = json.loads(f.read())
EMAIL_BACKEND = secret_info['EMAIL_BACKEND']
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = secret_info['EMAIL_HOST_USER']
EMAIL_HOST_PASSWORD = secret_info['EMAIL_HOST_PASSWORD']
SERVER_EMAIL = secret_info['SERVER_EMAIL']
DEFAULT_FROM_MAIL = secret_info['DEFAULT_FROM_MAIL']


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

if USE_DEBUG_TOOLBAR:
    INSTALLED_APPS += (
        'debug_toolbar',
    )

    MIDDLEWARE += (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )

    INTERNAL_IPS = ('127.0.0.1', )
