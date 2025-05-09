FROM nginx:stable-alpine
#standard dockerbuild for at få ting over på docker
COPY . /usr/share/nginx/html
#Det her copier fra vores project vores html filer
EXPOSE 80
#En port 80
#CMD ["nginx"]
#Commando der siger nginx.
