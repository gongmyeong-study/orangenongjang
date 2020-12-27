def applicationName = "orangenongjang"
def ecrName = "165498330170.dkr.ecr.ap-northeast-2.amazonaws.com"
def repoName = "orangenongjang"
def bucketName = "orangenongjang"
def environmentName = "production"

pipeline {
  agent any
  stages {
    when { branch 'master' }
    stage('Build') {
      steps {
        git(branch: 'master', url: 'https://github.com/gongmyeong-study/orangenongjang.git')
        sh "export AWS_REGION=ap-northeast-2"
        sh "docker-compose build"
      }
    }

    stage('Upload') {
      steps {
        sh "zip ${applicationName}.zip Dockerrun.aws.json"
        sh "aws s3 cp ${applicationName}.zip s3://${bucketName}/${applicationName}/deploy.zip --region ap-northeast-2"
        sh "docker tag ${applicationName}_master_nongjang:latest ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker tag ${applicationName}_master_nginx:latest ${ecrName}/${repoName}/${applicationName}_nginx:latest"
        sh "aws ecr describe-repositories --repository-names ${repoName}/${applicationName}_nongjang || aws ecr create-repository --repository-name ${repoName}/${applicationName}_nongjang"
        sh "aws ecr describe-repositories --repository-names ${repoName}/${applicationName}_nginx || aws ecr create-repository --repository-name ${repoName}/${applicationName}_nginx"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nongjang:latest"
        sh "docker push ${ecrName}/${repoName}/${applicationName}_nginx:latest"
      }
    }
    
    stage('Deploy') {
      steps {
        sh "aws elasticbeanstalk create-application-version \
            --region ap-northeast-2 \
            --application-name ${applicationName} \
            --version-label ${environmentName}-${BUILD_NUMBER} \
            --description ${BUILD_TAG} \
            --source-bundle S3Bucket='${bucketName}',S3Key='${applicationName}/deploy.zip'"
        sh "aws elasticbeanstalk update-environment \
            --region ap-northeast-2 \
            --environment-name Orangenongjang-env \
            --version-label ${environmentName}-${BUILD_NUMBER}"  
      }
    }
  }
  post {
    success {
      slackSend (channel: '#developers', color: '#00FF00', message: "SUCCESS: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})")
    }
    failure {
      slackSend (channel: '#developers', color: '#FF0000', message: "FAILURE: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})")
    }
  }
}
