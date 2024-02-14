# Backstage

This is the Backstage App

To start the app, run:

```sh
yarn install
yarn dev
```

If you want to set up the project from scratch, follow these instructions:

## Getting started with Backstage

1. **Init the project**

   Backstage comes equipped with a script that helps you get up and running super quickly:

   ```sh
   npx @backstage/create-app
   ```
2. **Run the application**

   ```sh
   yarn install && yarn dev
   ```

   Verify your application:

   Go to the Backstage UI (should open automatically after the `yarn dev` command)

   Review the example component

3. Configuring Backstage
   **Set up PostgreSQL**
   (Follow this docs)[https://backstage.io/docs/getting-started/configuration/]

   **Setting up authentication**

   - Add a new app to GitHub
   - Add the credentials to the configuration
   - Add sign-in option to the frontend
     [The full instruction](https://backstage.spotify.com/learn/standing-up-backstage/configuring-backstage/7-authentication/)
4. **Adding components**

   - Register an existing component or Create a new component
     [The full instruction](https://backstage.spotify.com/learn/standing-up-backstage/putting-backstage-into-action/9-software-catalog/)

   My service component name is [backstage-docker-service] located the same repository (https://github.com/SvitlanaRybakova/bakckstage/tree/main/packages/components/backstage-docker-service). This is a simple nodeJS server that returns only one GET route "Hello World"
5. **Building a Docker image**

   - Host build

     ```sh
     yarn install --frozen-lockfile
     yarn tsc
     yarn build:backend
     ```
   - Build the image

     ```sh
     docker image build . -f packages/backend/Dockerfile --tag backstage:1.0.0
     ```
6. **Run Backstage On Kubernetes**

   - Preparation:
     Install Kind

     ```sh
      # mac users:
     brew install kind
     ```
   - Create a cluster

     ```sh
     kind create cluster --name <cluster-name>
     ```
   - Upload the image to your registry/kind cluster

     ```sh
     kind load docker-image backstage:1.0.0 --name backstage-node
     ```
7. **Deploy to Kubernetes cluster**

   - Create Kubernetes Deployment Manifest
   - Apply Deployment Manifest

     ```sh
     kubectl apply -f <path-to-deployment-manifest>
     ```
   - Check Deployment

     ```sh
     kubectl get deployments
     ```
8. **Find the Service URL:**

   - List all services in Kubernetes cluster

     ```sh
     kubectl get services
     ```
   - Access Backstage:
     Open a web browser.
     Enter the URL in the format http://`<external-ip>`:`<port>` in the address bar, replacing `<external-ip>` and `<port>` with the values obtained from the service.

# Deploying Backstage on AWS

This guide outlines the steps to deploy Backstage on AWS. Follow the instructions below to set up your Backstage instance.

## Prerequisites

1. **AWS Account**: You need an AWS account to deploy Backstage.
2. **AWS CLI**: [install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
3. **AWS IAM User**: [Create an IAM user with appropriate permissions for deploying resources on AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)

## Deployment Steps

1. **Set Up AWS Infrastructure**

   - Log in to your AWS Management Console.
   - [Create an Amazon Elastic Kubernetes Service (EKS) cluster] (https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html)
   - Configure your `kubectl` to connect to the newly created EKS cluster.
2. **Build and Push Docker Image**

   - Build the Docker image for Backstage:

     ```sh
     docker image build . -f packages/backend/Dockerfile --tag backstage:latest
     ```
   - Tag the Docker image with the Amazon Elastic Container Registry (ECR) repository URI:

     ```sh
     docker tag backstage:latest <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/backstage:latest
     ```
   - Push the Docker image to the Amazon ECR repository:

     ```sh
     aws ecr get-login-password --region <aws_region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com
     docker push <aws_account_id>.dkr.ecr.<aws_region>.amazonaws.com/backstage:latest
     ```
3. **Deploy Backstage to EKS**

   - Create Kubernetes deployment manifests for Backstage.
   - Apply the deployment manifests to the EKS cluster:

     ```sh
     kubectl apply -f <path_to_deployment_manifests>
     ```
4. **Access Backstage**

   - Once the service is deployed and the load balancer is configured, access Backstage by navigating to the load balancer's DNS name or IP address in browser.
