# ── Build stage ────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy the pom.xml and download dependencies first (layer caching)
COPY backend/pom.xml backend/pom.xml
RUN mvn -f backend/pom.xml dependency:go-offline -q || true

# Copy frontend source (needed for frontend-maven-plugin)
COPY frontend/ frontend/

# Copy backend source
COPY backend/ backend/

# Build the production JAR (includes frontend build)
RUN mvn -f backend/pom.xml clean package -DskipTests -q

# ── Runtime stage ─────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY --from=build /app/backend/target/*.jar app.jar

# Create uploads directory
RUN mkdir -p /app/uploads

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
