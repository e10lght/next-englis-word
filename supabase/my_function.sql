CREATE
OR REPLACE FUNCTION my_function(record_id integer) RETURNS SETOF wordlist AS $ $ BEGIN RETURN QUERY
SELECT
    *
FROM
    wordlist
WHERE
    id = record_id;

END;

$ $ LANGUAGE 'plpgsql';