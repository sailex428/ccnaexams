plugins {
    `java-library`
    `maven-publish`
}

repositories {
    mavenLocal()
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    api(libs.org.springframework.boot.spring.boot.starter)
    api(libs.org.springframework.boot.spring.boot.starter.data.mongodb)
    api(libs.org.springframework.boot.spring.boot.starter.web)
    runtimeOnly(libs.org.springframework.boot.spring.boot.devtools)
    runtimeOnly(libs.org.springframework.boot.spring.boot.docker.compose)
    testImplementation(libs.org.springframework.boot.spring.boot.starter.test)
}

group = "me.sailex"
version = "1.0.0"
description = "backend"
java.sourceCompatibility = JavaVersion.VERSION_21
java.targetCompatibility = JavaVersion.VERSION_21

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}

tasks.withType<Javadoc> {
    options.encoding = "UTF-8"
}