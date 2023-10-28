CREATE KEYSPACE defaultks WITH REPLICATION = {'class' : 'SimpleStrategy','replication_factor' : 1};

CREATE TABLE IF NOT EXISTS defaultks.produtos (id uuid, title TEXT, price DECIMAL, currency TEXT,
                                               storage INT, manufacturer TEXT, in_stock BOOLEAN,
                                               last_update TIMESTAMP,
                                               PRIMARY KEY (id, manufacturer)
                                              ) WITH CLUSTERING ORDER BY (manufacturer ASC);

INSERT INTO defaultks.produtos (id, title, price, currency, storage, manufacturer, in_stock, last_update)
VALUES (now(), 'PRIMEIRO PRODUTO',50000.99, 'AWA', 9001, 'Pietro Neverlands', true, totimestamp(now()));

select * from defaultks.produtos where price > 10 allow filtering;

drop table defaultks.produtos