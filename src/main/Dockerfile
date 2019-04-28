#
# BudgetTracker Dockerfile for UI
#
FROM nginx:mainline-alpine

USER root

# Remove the default Nginx configuration file RUN rm -v /etc/nginx/nginx.conf
# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

ADD webapp /usr/share/nginx/html/
#ADD web /var/www/html/

# Append "daemon off;" to the beginning of the configuration
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 90

#RUN rm /etc/nginx/conf.d/*
#ADD hello.conf /etc/nginx/conf.d/
#ADD index.html /usr/share/nginx/html/
