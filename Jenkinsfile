def ecrName = "165498330170.dkr.ecr.ap-northeast-2.amazonaws.com"
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
        sh "pwd"
        sh "ls"
        sh "zip ${applicationName}.zip ${env.WORKSPACE}/Dockerrun.json"
        sh "ls"
        sh "export AWS_REGION=ap-northeast-2"
        sh "docker-compose build"
        sh "docker tag ${applicationName}_master_nongjang:latest ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker tag ${applicationName}_master_orange:latest ${ecrName}/${repoName}/${applicationName}_orange:latest"
        sh "docker tag ${applicationName}_master_nginx:latest ${ecrName}/${repoName}/${applicationName}_nginx:latest"
        sh "aws ecr describe-repositories --repository-names ${repoName}/${applicationName}_nongjang || aws ecr create-repository --repository-name ${repoName}/${applicationName}_nongjang"
        sh "aws ecr describe-repositories --repository-names ${repoName}/${applicationName}_orange || aws ecr create-repository --repository-name ${repoName}/${applicationName}_orange"
        sh "aws ecr describe-repositories --repository-names ${repoName}/${applicationName}_nginx || aws ecr create-repository --repository-name ${repoName}/${applicationName}_nginx"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_orange:latest"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nginx:latest"
      }
    }

  }
}
