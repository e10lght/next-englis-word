CREATE
OR REPLACE FUNCTION add_section_and_wordlist(section_data jsonb, wordlist_data jsonb) RETURNS void AS $ $ DECLARE new_section_id int8;

BEGIN
INSERT INTO
    section (name)
VALUES
    (section_data ->> 'name') RETURNING id INTO new_section_id;

FOR item IN
SELECT
    *
FROM
    jsonb_array_elements(wordlist_data) LOOP
INSERT INTO
    wordlist (
        word,
        example,
        exampleanswer,
        type,
        explain,
        sectionid
    )
VALUES
    (
        item ->> 'word',
        item ->> 'example',
        item ->> 'exampleanswer',
        item ->> 'type',
        item ->> 'explain',
        new_section_id
    );

END LOOP;

END;

$ $ LANGUAGE plpgsql;