FROM golang:1.21

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

# RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY . .
RUN go build -o /usr/local/bin/app ./

RUN sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt update
RUN apt install -y postgresql-client

CMD app -h ${dbhost} -P ${dbport} -d ${dbname} -u ${dbusr} -p ${PGPASSWORD} -s ${svrhost}

# CMD ["sh", "-c", "tail -f /dev/null"]
