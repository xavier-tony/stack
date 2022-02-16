-- user_type 
drop table if exists user_type;
create table user_type(
	id smallserial primary key,
	type varchar(50) unique not null
);


-- user 
drop table if exists "user";
create table "user" (
	id serial primary key,
	user_type_id smallint not null references user_type(id),
	user_name varchar(50) unique not null,
	password varchar(50) not null,
	blocked boolean,
	frozen boolean,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

--teacher
drop table if exists teacher;
create table teacher(
	id serial primary key,
	first_name varchar(50),
	last_name varchar(50),
	display_name varchar(50) null,
	phone varchar(15) not null,
	email varchar(100) not null,
	user_id integer not null references "user"(id),
	dob  date not null,
	profile_image_url varchar(500) null,
	intro_video_url varchar(500) null,
	about_me text,
	require_password_switch boolean,
	joined_date timestamp with time zone not null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- parent
drop table if exists parent;
create table parent(
	id serial primary key,
	first_name varchar(50),
	last_name varchar(50),
	display_name varchar(50) null,
	phone varchar(15) not null,
	user_id integer not null references "user"(id),
	dob date not null,
	profile_image_url varchar(500),
	about_me text,
	require_password_switch boolean,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- student 

drop table if exists student;
create table student(
	id serial primary key,
	first_name varchar(50),
	last_name varchar(50),
	display_name varchar(50) null,
	phone varchar(15) not null,
	user_id integer references "user"(id) not null,
	parent_id integer references parent(id) not null ,
	use_parent_login boolean,
	dob  date not null,
	profile_image_url varchar(500),
	about_me text,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- address
drop table if exists address;
create table address(
	id serial primary key,
	line_1 varchar(300) not null,
	line_2 varchar(300),
	line_3 varchar(300),
	city varchar(100) not null,
	state varchar(100) not null,
	country varchar(100) not null,
	other_details text null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- address_type
drop table if exists address_type;
create table address_type(
	id smallserial primary key,
	code char(5) not null,
	type varchar(25) not null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- address_category
drop table if exists address_category;
create table address_category(
	id smallserial primary key,
	code char(5) not null,
	category varchar(25) not null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- user_address
drop table if exists user_address;
create table user_address(
	id serial primary key,
	address_id integer not null references address(id),
	address_type_id smallint not null references address_type(id),
	address_category_id smallint not null references address_category(id),
	active boolean,
	added_on timestamp with time zone,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- teacher_experience
drop table if exists teacher_experience;
create table teacher_experience(
	int serial primary key,
	teacher_id integer references teacher(id),
	experince varchar(300),
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- teacher_review 
drop table if exists teacher_review;
create table teacher_review(
	id serial primary key,
	teacher_id integer references teacher(id),
	review text null,
	rating smallint not null,
	likes smallint,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- teacher media 
drop table if exists teacher_media;
create table teacher_media(
	int serial primary key,
	teacher_id integer references teacher(id),
	url  varchar(300) not null,
	description text null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- class_type
drop table if exists class_type;
create table class_type(
	id smallserial primary key,
	type varchar(50),
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- session/class
drop table if exists "class";
create table "class"(
	id serial primary key,
	name varchar(500),
	class_type_id smallint not null references class_type(id),
	min_age smallint,
	max_age smallint,
	duration smallint,
	min_count smallint,
	max_count smallint,
	description text,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

--taxonomy
drop table if exists taxonomy;
create table taxonomy(
	id smallserial primary key,
	taxonomy  varchar(300) unique,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

--class_taxonomy
drop table if exists class_taxonomy;
create table class_taxonomy(
	class_id   integer references "class"(id),
	taxonomy_id  integer references taxonomy(id),
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- class_review
drop table if exists class_review;
create table class_review(
	id serial primary key,
	class_id integer references "class"(id),
	rating smallint not null,
	review text,
	likes smallint,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- class_schedule
drop table if exists class_schedule;
create table class_schedule(
	id serial primary key,
	class_id integer references "class"(id),
	class_type_id smallint references class_type(id),
	recurring_rule varchar(100) null,
	valid boolean not null,
	recurring_start_date date,
	recurring_end_date date,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- class_timing
drop table if exists class_timing;
create table class_timing(
	id serial primary key,
	class_schedule_id integer references class_schedule(id),
	start_time timestamp with time zone not null,
	end_time timestamp with time zone not null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- schedule-enrollment
drop table if exists schedule_enrollment;
create table scedule_enrollment(
	schedule_id integer references schedule(id),
	subscribed boolean,
	student_id integer references student(id)
);

-- enrollment
drop table if exists enrollment;
create table enrollment(
	id serial primary key,
	class_timing_id integer references class_timing(id),
	enrolled boolean,
	skipped boolean,
	student_id integer references student(id),
	attended boolean
);

-- offer_type
-- percentage discount, free classes etc
drop table if exists offer_type;
create table offer_type(
	id smallserial primary key,
	type varchar(200) not null,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- offer_category
-- class discounts, user discounts etc
drop table if exists offer_category;
create table offer_category(
	id smallserial primary key,
	category varchar(200),
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- discount 
drop table if exists offer;
create table offer(
	id serial primary key,
	offer_type_id smallint references offer_type(id),
	offer_category_id smallint references offer_category(id),
	formulae varchar(300),
	class_id integer references "class"(id),
	user_id integer references "user"(id),
	code varchar(50),
	code_expiration timestamp with time zone not null,
	activated boolean,
	activated_date timestamp with time zone,
	updated_on timestamp with time zone not null,
	updated_by integer not null references "user"(id)
);

-- user_referral
drop table if exists user_referral;
create table user_referral(
	id serial primary key,
	user_id integer references "user"(id),
	email varchar(100) not null,
	date timestamp with time zone not null,
	offer_id integer references offer(id),
	valid boolean
);




































































