# docker build -t codelytics-design .
# docker run -p 8888:90 -d codelytics-design

FROM nginx:mainline-alpine
USER root
ADD nginx.conf /etc/nginx/
ADD webapp /usr/share/nginx/html/
EXPOSE 80