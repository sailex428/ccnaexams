pipeline {
    agent { label "agent1" }

    environment {
        GITHUB_API_URL = 'https://github.com/sailex428/ccnaexams.git'
    }

    stages {
        stage("Deploy Containers") {
            steps {
                sh 'echo "Deploying Containers"'
                sshagent(credentials: ["ce-ssh-key"]) {
                    sh 'echo "SSH Agent Started"'
                    sh '''
                        bash -c '
                        ssh -o StrictHostKeyChecking=no ubuntu@ec2-18-199-99-51.eu-central-1.compute.amazonaws.com << EOF
                        sudo git clone -b develop ${GITHUB_API_URL}
                        echo "Cloned the repository"
                        cd ccnaexams
                        sudo gradle clean build
                        echo "Built the project"
                        sudo docker compose up -d
                        echo "Deployed the containers"
                        EOF
                        '
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