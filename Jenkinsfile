pipeline {
    agent { label "jenkins_agent_dind" }

    environment {
        GITHUB_API_URL = 'https://github.com/sailex428/ccnaexams.git'
        VERSION = 'latest'
        BRANCH = 'develop'
    }

    stages {

        stage("Checkout") {
            steps {
                git branch: "${BRANCH}",
                    url: "${GITHUB_API_URL}"

                sh """
                    git fetch origin
                    git pull origin ${BRANCH}
                """
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
                    sh "sudo docker buildx build --platform=linux/amd64 -t ${DOCKERHUB_USER}/ccnaexams_frontend:${VERSION} -f frontend/Dockerfile frontend"
                    sh "sudo docker buildx build --platform=linux/amd64 -t ${DOCKERHUB_USER}/ccnaexams_backend:${VERSION} -f backend/Dockerfile backend"
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
                            ssh -o StrictHostKeyChecking=no ubuntu@ec2-3-68-199-220.eu-central-1.compute.amazonaws.com '
                                echo "Logging in to Docker Hub"
                                docker login -u '"$DOCKERHUB_USER"' -p '"$DOCKERHUB_PWD"'

                                echo "Cloning or updating the repository"
                                if [ ! -d "ccnaexams" ]; then
                                    git clone ${GITHUB_API_URL}
                                else
                                    cd ccnaexams
                                    git fetch origin
                                    git pull
                                fi

                                echo "Pulling the images"
                                sudo docker pull '"$DOCKERHUB_USER"'/ccnaexams_frontend:'"$VERSION"'
                                sudo docker pull '"$DOCKERHUB_USER"'/ccnaexams_backend:'"$VERSION"'

                                echo "Deploying the containers"
                                sudo docker compose down
                                sudo docker compose up -d
                            '
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
