def ecrName = "165498330170.dkr.ecr.ap-northeast-2.amazonaws.com/orangenongjang"
def repoName = "orangenongjang"
def bucketName = ""
def environmentName = ""
def applicationName = "orangenongjang"

pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        git(branch: 'master', url: 'https://github.com/gongmyeong-study/orangenongjang.git')
        sh "docker-compose build"
        sh "docker tag ${applicationName}_master_nongjang:latest ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker tag ${applicationName}_master_orange:latest ${ecrName}/${repoName}/${applicationName}_orange:latest"
        sh "docker tag ${applicationName}_master_nginx:latest ${ecrName}/${repoName}/${applicationName}_nginx:latest"
        sh "aws ecr get-login --region ap-northeast-2"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_orange:latest"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nginx:latest"
      }
    }

  }
}
