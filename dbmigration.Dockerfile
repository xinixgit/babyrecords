FROM debian:bookworm-slim

WORKDIR /

COPY db.sql .

RUN apt update
RUN apt install -y gnupg wget
RUN sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt update
RUN apt install -y postgresql-client

CMD psql -h ${dbhost} -U ${dbusr} -d ${dbname} -w -f db.sql
