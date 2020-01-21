FROM mysql:latest

LABEL maintainer="AldebaRain"
LABEL description="Docker Container for DataBase in SPO"

RUN mkdir /run/mysql

ADD mysql_user /run/mysql/user
ADD mysql_password /run/mysql/password
ADD mysql_db /run/mysql/db