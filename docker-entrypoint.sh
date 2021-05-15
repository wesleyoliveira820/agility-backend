#!/bin/sh

echo "Waiting for PostgresSQL..."

while ! nc -z postgres 5432; do
  sleep 0.1
done

echo "PostgreSQL started."

adonis migration:run

adonis seed

adonis serve --dev --debug=0.0.0.0
