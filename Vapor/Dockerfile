# You can set the Swift version to what you need for your app. Versions can be found here: https://hub.docker.com/_/swift
FROM swift:4.2.1 as builder

LABEL maintainer="AldebaRain"
LABEL description="Docker Container for Vapor in SPO"

# For local build, add `--build-arg env=docker`
# In your application, you can use `Environment.custom(name: "docker")` to check if you're in this env
ARG env=docker

RUN apt-get -qq update && apt-get install -y \
  libssl-dev zlib1g-dev \
  && rm -r /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN mkdir -p /build/lib && cp -R /usr/lib/swift/linux/*.so* /build/lib
RUN swift build -c release && mv `swift build -c release --show-bin-path` /build/bin

# Production image
FROM ubuntu:16.04
ARG env=docker
# DEBIAN_FRONTEND=noninteractive for automatic UTC configuration in tzdata
RUN apt-get -qq update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
  libatomic1 libcurl3 libxml2 libedit2 libsqlite3-0 libc6-dev libz-dev \
  binutils libgcc-5-dev libstdc++-5-dev zlib1g-dev libpython2.7 libbsd0 \
  tzdata pkg-config curl wget clang libicu55 libicu-dev \
  && rm -r /var/lib/apt/lists/*
RUN wget https://swift.org/builds/swift-4.2.1-release/ubuntu1604/swift-4.2.1-RELEASE/swift-4.2.1-RELEASE-ubuntu16.04.tar.gz
RUN tar -xvzf swift-4.2.1-RELEASE-ubuntu16.04.tar.gz
ENV PATH="/swift-4.2.1-RELEASE-ubuntu16.04/usr/bin:${PATH}"

WORKDIR /app
COPY --from=builder /build/bin/Run .
COPY --from=builder /build/lib/* /usr/lib/
COPY --from=builder /app/Public ./Public
COPY --from=builder /app/Resources ./Resources
ENV ENVIRONMENT=$env

ENTRYPOINT ./Run serve --env $ENVIRONMENT --hostname 0.0.0.0 --port 8080
