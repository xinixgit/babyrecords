FROM golang:1.21

WORKDIR /usr/src/app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./...

RUN apt install postgresql-client
RUN psql -U ${dbusr} -d ${dbpwd} -f ./db.sql

CMD app -dbhost ${dbhost} -dbport ${dbport} -dbname {dbname} -dbusr ${dbusr} -dbpwd {dbpwd}