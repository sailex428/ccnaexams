pipeline {
    agent { label "jenkins_agent_dind" }

    environment {
        GITHUB_API_URL = 'https://github.com/sailex428/ccnaexams.git'
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
                sh 'gradle clean build'
            }
        }

        stage("Build Image") {
            steps {
               withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PWD')]) {
                    sh 'echo "Building Image"'
                    sh "sudo docker build -t ${DOCKERHUB_USER}/ccnaexams_frontend:dev ."
                    sh "sudo docker build -t ${DOCKERHUB_USER}/ccnaexams_backend:dev ."
                    sh 'echo "Logging in to Docker Hub"'
                    sh "sudo docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PWD}"
                    sh 'echo "Pushing images to Docker Hub"'
                    sh "sudo docker push ${DOCKERHUB_USER}/ccnaexams_frontend:dev"
                    sh "sudo docker push ${DOCKERHUB_USER}/ccnaexams_backend:dev"
               }
            }
        }

        stage("Deploy Containers") {
            steps {
                echo "Deploying Containers"

                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PWD')]) {
                    sshagent(credentials: ['ce-ssh-key']) {
                        sh 'echo "SSH Agent Started"'

                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@ec2-3-68-199-220.eu-central-1.compute.amazonaws.com << EOF
                                echo "Cloning the repository"
                                sudo git clone -b develop ${GITHUB_API_URL}

                                echo "Logging in to Docker Hub"
                                sudo docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PWD}

                                echo "Pulling the images"
                                sudo docker pull ${DOCKERHUB_USER}/ccnaexams_frontend:dev
                                sudo docker pull ${DOCKERHUB_USER}/ccnaexams_backend:dev

                                cd ccnaexams
                                echo "Deploying the containers"
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
