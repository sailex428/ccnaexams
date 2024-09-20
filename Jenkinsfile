pipeline {
    agent { label "agent1" }

    environment {
        GITHUB_API_URL = 'https://github.com/sailex428/ccnaexams.git'
        DOCKER_CREDENTIALS_ID = 'dockerhub'
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
                sh 'cd backend'
                sh 'echo "Building the backend"'
                sh './gradlew clean build'
            }
        }

        stage("Build Image") {
            steps {
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB_PWD')]) {
                    sh 'echo "Building Image"'
                    sh 'sudo docker build -t eliashahn12/ccnaexams_frontend:dev .'
                    sh 'sudo docker build -t eliashahn12/ccnaexams_backend:dev .'
                    sh 'echo "Logging in to Docker Hub"'
                    sh "sudo docker login -u eliashahn12 -p ${DOCKERHUB_PWD}"
                    sh 'echo "Pushing images to Docker Hub"'
                    sh 'sudo docker push eliashahn12/ccnaexams_frontend:dev'
                    sh 'sudo docker push eliashahn12/ccnaexams_backend:dev'
                }
            }
        }

        stage("Deploy Containers") {
            steps {
                sh 'echo "Deploying Containers"'
                sshagent(credentials: ["ce-ssh-key"]) {
                    sh 'echo "SSH Agent Started"'
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@ec2-3-68-199-220.eu-central-1.compute.amazonaws.com << EOF
                            echo "Cloning the repository"
                            sudo git clone -b develop ${GITHUB_API_URL}
                            echo "Logging in to Docker Hub"
                            sudo docker login -u eliashahn12 -p ${DOCKERHUB_PWD}
                            echo "Pulling the images"
                            sudo docker pull eliashahn12/ccnaexams_frontend:dev
                            sudo docker pull eliashahn12/ccnaexams_backend:dev
                            cd ccnaexams
                            echo "Deploying the containers"
                            sudo docker compose up -d
                        EOF
                    '''
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
