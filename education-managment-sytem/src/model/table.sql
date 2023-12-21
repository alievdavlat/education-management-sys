CREATE TABLE IF NOT EXISTS admins (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    username varchar(65) not null , 
    name varchar(65) not null,
    last_name varchar(65) not null,
    email varchar(100) not null,
    password varchar(255) not null,
    dob DATE not null,
    gender int not null,
    phone bigint not null,
    img text ,
    role varchar(25) not null DEFAULT 'eadmin',
    t_account varchar(200) not null,
    created_at timestamptz not null default current_timestamp
);



    CREATE TABLE company (
        id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
        c_name varchar(100) NOT NULL,
        logo text,
        eadmin_id uuid not null REFERENCES admins(id) ON DELETE CASCADE,
        blocked BOOLEAN DEFAULT false,
        payment_status BOOLEAN DEFAULT false, 
        company_payed_at DATE, 
        created_at timestamptz not null default current_timestamp
    );


CREATE TABLE branches (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    address text not null,
    branch_img text ,
    company_payed_at DATE ,
    payment_status BOOLEAN DEFAULT false,
    company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
    created_at timestamptz not null default current_timestamp

);


CREATE TABLE stafs (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    username varchar(65) not null , 
    name varchar(65) not null,
    last_name varchar(65) not null,
    email varchar(120) not null,
    password varchar(255) not null,
    dob DATE not null,
    gender int not null DEFAULT 0 ,
    proffesion varchar(100) not null,
    phone bigint not null,
    fee bigint not null,
    img text ,
    role varchar(64) not null,
    t_account varchar(200) not null,
    branch_id uuid not null REFERENCES branches(id) ,
    company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
    created_at timestamptz not null default current_timestamp   
);




DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE students (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    username varchar(65) not null,
    name varchar(65) not null,
    last_name varchar(65) not null,
    gender int not null,
    dob DATE not null,
    branch_id uuid not null REFERENCES branches(id),
    company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
    payment_status BOOLEAN  DEFAULT false,
    blocked BOOLEAN  DEFAULT false,
    student_payed_at DATE ,
    created_at timestamptz  not null default current_timestamp
);

CREATE TABLE students_techers (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  teacher_id uuid REFERENCES stafs(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE
);


CREATE TABLE students_assistants (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  assistant_id uuid REFERENCES stafs(id) ON DELETE CASCADE,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE
);



DROP TABLE IF EXISTS groups CASCADE;

CREATE TABLE groups (
   id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
   g_name varchar(150) not null,
   group_n varchar(100) not null,
   room varchar(100) not  null, 
   days varchar(150) not null,
   time varchar(70) not null,
   teacher_id uuid not null REFERENCES stafs(id) ,
   assistant_id uuid  REFERENCES stafs(id) ,
   branch_id uuid not null REFERENCES branches(id),
   company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
   sesioon text not null ,
   created_at timestamptz not null default current_timestamp
);


CREATE TABLE groups_students (
   id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
   group_id uuid NOT NULL REFERENCES groups(id),
   student_id uuid NOT NULL REFERENCES students(id)
);

CREATE TABLE courses (
   id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
   course_n varchar(160) not null,
   price bigint not null ,
   img text ,
   company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
   created_at timestamptz not null default current_timestamp
);

DROP TABLE IF  EXISTS courses_teachers;
CREATE TABLE courses_teachers(
   id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
   course_id uuid not null REFERENCES courses(id) ON DELETE CASCADE,
   teachers_id uuid  REFERENCES stafs(id) ON DELETE CASCADE,
   assistant_id uuid  REFERENCES stafs(id) ON DELETE CASCADE

);


drop table if EXISTS homeworks cascade;
CREATE TABLE homeworks (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT not NULL,
  body TEXT ,
  group_id uuid not null REFERENCES groups(id) ON DELETE CASCADE,
  company_id uuid not null REFERENCES company(id) ON DELETE CASCADE,
  created_at timestamptz not null default current_timestamp

);




CREATE TABLE student_atentdance (
  student_id uuid NOT NULL REFERENCES students(id),
  is_present BOOLEAN not null , 
  created_at timestamptz not null default current_timestamp
);







CREATE OR REPLACE FUNCTION calculate_payment_due()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO PaymentSchedule (student_id, due_date)
  VALUES (NEW.student_id, NOW() + INTERVAL '30 days');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER payment_due_trigger
AFTER INSERT ON students
FOR EACH ROW
EXECUTE FUNCTION calculate_payment_due();







CREATE OR REPLACE FUNCTION calculate_payment_due()
RETURNS TRIGGER AS $$
DECLARE
    student_payeed_at DATE ;
BEGIN
    student_payeed_at := OLD.student_payed_at;

    IF student_payeed_at - NOW() = interval '30' THEN 
    UPDATE STUDENTS set payment_status = false;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER calculate_payment_due_trigger
AFTER INSERT ON Students
FOR EACH ROW
EXECUTE FUNCTION calculate_payment_due();






