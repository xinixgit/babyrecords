FROM golang:1.21 as builder

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -o /usr/local/bin/app ./

FROM debian:bookworm-slim
COPY --from=builder /usr/local/bin/app .

CMD ./app -h ${dbhost} -P ${dbport} -d ${dbname} -u ${dbusr} -p ${PGPASSWORD} -s ${svrhost} -jwtKey ${jwtkey} -userPwd ${userpwd}

# CMD ["sh", "-c", "tail -f /dev/null"]
