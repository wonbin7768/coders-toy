select * from account;
select * from timelinelike;
delimiter $$
drop procedure if exists split_area;
create procedure split_area(
param_id varchar(100),
param_area_count int
)
begin
declare i int;
declare area_count int;
set i = 0;
set area_count = param_area_count;
    while(i < area_count)
    do
    select substring_index(area,',',i) from account where id = param_id;
    set i = i+1;
    end while;
    end $$
delimiter $$
call split_area("jell7768",5);
-- call split_area(id,(area_count+1));

delimiter $$
drop procedure if exists split_area;
create procedure split_area(
param_id varchar(100),
param_area_count int
)
begin
declare i int;
declare area_count int;
set i = 0;
set area_count = param_area_count;
    while(i < area_count)
    do
		select i,j.area_json from account
		join json_table(
		replace(json_array(area),',','","'),
		'$[*]' columns(area_json varchar(100) path '$')
		)j 
		where id = param_id;
    set i = i+1;
    end while;
    end $$
delimiter $$


-- like
delimiter $$
drop procedure if exists split_like_id;
create procedure split_area(
param_seq bigint,
param_id varchar(100),
param_tl_like bigint
)
begin
declare i int;
declare tl_like int;
set i = 0;
set tl_like = param_tl_like+2;
    while(i < tl_like)
    do
		select i,j.like_id_json from timelinelike
		join json_table(
		replace(json_array(like_id),',','","'),
		'$[*]' columns(like_id_json varchar(100) path '$')
		)j 
		where id = param_id;
    set i = i+1;
    end while;
    end $$
delimiter $$



select * from timelinelike;

-- json 이용해서 multiple rows 출력
select j.like_id_json from timelinelike
join json_table(
replace(json_array(like_id),',','","'),
'$[*]' columns(like_id_json varchar(100) path '$')
)j 
where tl_seq=1;

update timelinelike set like_id = "

-- json 이용해서 multiple rows 출력
select j.area_json from account
join json_table(
replace(json_array(area),',','","'),
'$[*]' columns(area_json varchar(100) path '$')
)j 
where id = "jell7768";

