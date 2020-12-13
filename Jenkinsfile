pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        git(branch: 'master', url: 'https://github.com/gongmyeong-study/orangenongjang.git')
        sh 'sudo docker-compose build'
      }
    }

  }
}
