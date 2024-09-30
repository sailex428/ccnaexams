plugins {
    id("org.springframework.boot") version "3.2.4"
    `java-library`
    `maven-publish`
    id("com.diffplug.spotless") version "7.0.0.BETA2"
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
    testImplementation(libs.org.springframework.boot.spring.boot.starter.test)
    compileOnly("org.projectlombok:lombok:1.18.34")
    annotationProcessor("org.projectlombok:lombok:1.18.34")
}

group = "io.sailex"
version = "1.0.0"
description = "backend"
java.sourceCompatibility = JavaVersion.VERSION_21
java.targetCompatibility = JavaVersion.VERSION_21

tasks.jar {
    manifest {
        attributes["Main-Class"] = "io.sailex.ccnaexams_backend.App"
    }
}

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}

spotless {
    java {
        googleJavaFormat("1.23.0")
        indentWithTabs(2)
        indentWithSpaces(4)
    }
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}

tasks.withType<Javadoc> {
    options.encoding = "UTF-8"
}
