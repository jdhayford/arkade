# base image
FROM python:3

# set working directory
WORKDIR /app


# install and cache app dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app/

# start app
CMD ["python", "/app/app.py"]