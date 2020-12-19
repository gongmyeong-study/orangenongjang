pipeline {
  agent {
    node {
      label 'orangenongjang'
    }

  }
  stages {
    stage('Build') {
      steps {
        git(branch: 'master', url: 'https://github.com/gongmyeong-study/orangenongjang.git')
        sh 'docker-compose --version'
        sh 'docker-compose build'
      }
    }

  }
}
