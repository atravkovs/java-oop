FROM gradle:8.1-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM amazoncorretto:17.0.7-al2

EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/imt.jar

ENTRYPOINT ["java", "-jar","/app/imt.jar"]

