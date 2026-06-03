#!/bin/sh
set -e

mysql --default-character-set=utf8mb4 -uroot -p"$MYSQL_ROOT_PASSWORD" <<'EOSQL'
SOURCE /seed/schema.sql;
SOURCE /seed/seed.sql;
EOSQL
