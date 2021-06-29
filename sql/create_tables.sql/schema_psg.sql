createdb products;

USE products;

CREATE TABLE product_info (
  id integer primary key,
  name varchar(500),
  slogan varchar(1000),
  description varchar(1000),
  category varchar(250),
  default_price varchar(250)
);

CREATE TABLE product_styles (
  id integer primary key,
  product_id integer,
  name varchar(250),
  sale_price varchar(15),
  original_price varchar(15),
  default_style varchar(15),
  constraint product_id
    foreign key (product_id)
      references product_info(id)
);

CREATE TABLE style_skus (
  id integer primary key,
  style_id integer,
  size varchar(15),
  quantity integer,
  constraint style_id
    foreign key (style_id)
      references product_styles(id)
);

CREATE TABLE style_photos (
  id integer primary key,
  style_id integer,
  thumbnail_url text,
  url text,
  constraint style_id
    foreign key (style_id)
      references product_styles(id)
);

CREATE TABLE related_products (
  id integer primary key,
  product_id integer,
  related_id integer,
  constraint product_id
    foreign key (product_id)
      references product_info(id)
);

CREATE TABLE product_features (
  id integer primary key,
  product_id integer,
  feature varchar(250),
  value varchar(250),
  constraint product_id
    foreign key (product_id)
      references product_info(id)
);


CREATE INDEX ON product_features USING HASH (product_id);

CREATE INDEX ON style_photos USING HASH (style_id);

CREATE INDEX ON style_skus USING HASH (style_id);

CREATE INDEX ON product_styles USING HASH (product_id);

CREATE INDEX ON related_products USING HASH (product_id);