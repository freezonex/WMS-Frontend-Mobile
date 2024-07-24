# Define default RUNTIME_IDC_NAME value
RUNTIME_IDC_NAME ?= sg

# Define default target
.PHONY: all mobile

# Set default target to 'frontend'
all: mobile

# Define 'frontend' target for building Docker image
mobile:
	docker build --platform=linux/amd64 --build-arg RUNTIME_IDC_NAME=$(RUNTIME_IDC_NAME) -t wms-mobile:1.0.0 .
