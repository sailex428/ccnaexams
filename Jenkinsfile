pipeline {
    agent { label "jenkins_agent_dind" }

    environment {
        GITHUB_API_URL = 'https://github.com/sailex428/ccnaexams.git'
        VERSION = '1.0.0'
    }

    stages {

        stage("Checkout") {
            steps {
                git branch: "develop",
                    url: "${GITHUB_API_URL}"
            }
        }

        stage("Build Backend") {
            steps {
                script {
                    dir('backend') {
                        sh './gradlew clean build'
                    }
                }
            }
        }

        stage("Build Image") {
            steps {
               withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PWD')]) {
                    sh "sudo docker build -t ${DOCKERHUB_USER}/ccnaexams_frontend:${VERSION} -f frontend/Dockerfile frontend"
                    sh "sudo docker build -t ${DOCKERHUB_USER}/ccnaexams_backend:${VERSION} -f backend/Dockerfile backend"
                    sh 'echo "Logging in to Docker Hub"'
                    sh "sudo docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PWD}"
                    sh 'echo "Pushing images to Docker Hub"'
                    sh "sudo docker push ${DOCKERHUB_USER}/ccnaexams_frontend:${VERSION}"
                    sh "sudo docker push ${DOCKERHUB_USER}/ccnaexams_backend:${VERSION}"
               }
            }
        }

        stage("Deploy Containers") {
            steps {
                echo "Deploying Containers"
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PWD')]) {
                    sshagent(credentials: ['ce-ssh-key']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@ec2-3-68-199-220.eu-central-1.compute.amazonaws.com << EOF
                                echo "Logging in to Docker Hub"
                                docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PWD

                                echo "Pulling the images"
                                sudo docker pull $DOCKERHUB_USER/ccnaexams_frontend:${VERSION}
                                sudo docker pull $DOCKERHUB_USER/ccnaexams_backend:${VERSION}

                                echo "Deploying the containers"
                                cd ccnaexams
                                sudo docker compose up -d
                            EOF
                        '''
                    }
                }
            }
        }

    }

    post {
        success {
            echo 'Deployment successful'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
