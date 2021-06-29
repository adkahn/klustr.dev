# ohana app image
FROM node:latest AS app
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENTRYPOINT ["node", "./server/server.js"]

## Installs gcloud and kubectl as well as other products
###### old gcloud link gcr.io/google.com/cloudsdktool/cloud-sdk:latest
FROM gcr.io/google.com/cloudsdktool/cloud-sdk:slim as gcloud
WORKDIR /

## Install debian as OS for container
FROM debian:latest as os
WORKDIR /
COPY --from=app / .
COPY --from=gcloud / .
RUN apt-get update
RUN apt-get install sudo
# RUN apt-get install vim
# authenticate gcloud service account via json token
ENV gcloud_acc=newadmin@klustr-316321.iam.gserviceaccount.com

ENV secret=/secret/klustr-316321-f31f9767f260.json

RUN gcloud auth activate-service-account ${gcloud_acc}  --key-file=${secret}

ENV project=klustr-316321

RUN gcloud config set project ${project}

RUN sudo apt-get install kubectl

# generate kubectl config file via gcloud cli (note 'cluster-1' is cluster name to be replaced)
ENV cluster=us-west1-a
RUN gcloud container clusters get-credentials cluster-1 --zone=${cluster}

## run sequential commands to install helm
RUN curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
RUN sudo apt-get install apt-transport-https --yes
RUN echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
RUN sudo apt-get update
RUN sudo apt-get install helm

# install vCluster
RUN curl -s -L "https://github.com/loft-sh/vcluster/releases/latest" | sed -nE 's!.*"([^"]*vcluster-linux-amd64)".*!https://github.com\1!p' | xargs -n 1 curl -L -o vcluster && chmod +x vcluster;
RUN sudo mv vcluster /usr/local/bin;

# spin up webpack dev server
CMD npm run dev
