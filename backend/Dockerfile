FROM openjdk:21-oracle

LABEL authors="sailex"

WORKDIR ./backend

ENV TZ=Europe/Berlin

COPY /build/libs/backend-1.0.0.jar .

EXPOSE 10051

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "backend-1.0.0.jar"]