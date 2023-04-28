use toy;
select * from account;
select * from timeline;
select * from comment;
select * from timelinelike;
select * from follow;
select region from account where id = "jelly7768";
delete from timelinelike where tl_like_seq >=8;	
update timeline set tl_like = 0 where tl_seq >= 3;
update timeline set tl_like = 2 where tl_seq = 1 ;
update timeline set tl_like = 1 where tl_seq = 2;
show tables;
desc timelinelike;
desc account;
select * from follow;
-------------------------------------------------------------
select * from timeline order by tl_dt desc limit 5 offset 20;
select * from timeline order by tl_dt desc limit 5;
select * from timeline where tl_seq < 16 order by tl_dt desc limit 5;
-- auto increment 초기화 문법
alter table timelinelike auto_increment = 1;
set@count = 0;
-- error 1175 safe update 일시적해제 쿼리
set sql_safe_updates=0;
update timelinelike set tl_like_seq = @count:=@count+1;
---------------------------------------------------------------
select * from timelinelike where like_id = "jjiyun7768" and tl_seq = 3;
select * from timeline;
update timeline set region = "경북,강원,제주,서울,인천" where id = "jjiyun7768";
alter table timelinelike drop tl_like;
alter table timeline add tl_like bigint default 0 after tag;
alter table timeline add region varchar(50) after tag;
alter table timelinelike add tl_like_seq bigint primary key auto_increment;
alter table timelinelike modify like_id varchar(50) default null;
alter table timeline change tl_img tl_img varchar(500);
alter table account add area_count int after area;
alter table account change area region varchar(50);
alter table account add profilImg varchar(300) after area_count;
alter table account modify profilImg varchar(300) default "user.png";
alter table timelinelike modify like_id varchar(16000) default "d";
alter table timeline add tag varchar(300) after id;


desc toy.account;
alter table account modify region varchar(50) not null;

update account set area = concat(area,",대구") where id = "jell7768";
update account set area = "서울,수원,고양" where id = "jell7768";
update account set area_count = 5 where id = "jull7768";
update account set profilImg = "user.png" where id = "router12";
select * from account;
select * from timeline;
update timeline set tl_img = "sea.jpg" where tl_seq =3;
update timelinelike set tl_like = 4 where tl_seq = 1;
select * from timelinelike;
select substring_index2(area,',',1) from account where id ="jell7768";
insert into timelinelike(tl_seq) values (1);

drop table timelinelike;
create table timelinelike(
tl_seq bigint,
like_id varchar(13000),
foreign key(tl_seq) references timeline(tl_seq) on update cascade
);
create table follow(
fw_seq bigint auto_increment primary key,
follower varchar(50) not null,
following varchar(50) not null
);

drop table follow;
insert into follow(follower,following)values("jull7768","jjiyun7768");
select * from follow;

create table alert_tl(
al_seq bigint auto_increment primary key,
tl_seq bigint,
al_receiver varchar(50) not null,
show_al boolean not null default false,
al_dt datetime not null default now(),
foreign key(tl_seq) references timeline(tl_seq)
);
--  7 jelly7768 jolly7768 jull7768 jell7768
-- 8 jelly7768 joly7768
-- 9 jell7768 jull7768 jolly7768
-- 11 jjiyun7768
-- 13 jjiyun7768
-- 16 jell7768 jolly7768 jelly7768
-- 22~24 jjiyun7768
-- 25 26
-- jjiyun7768 7 8 9 16 20 26
-- jolly7768 25242322
-- jull7768 11
-- jelly7768 13
select * from account where id= "jjiyun7768";
select a.* , count(b.follower) , count(b.following) from account a join follow b where a.id = "jjiyun7768" and b.follower = "jjiyun7768";
select count(follower) , count(following) from follow where following = "jjiyun7768" ;
select count(follower) , (select count(following) from follow where following = "jolly7768")  from follow where follower = "jolly7768" ;
select * from follow where follower ="jjiyun7768" and following ="jolly7768";
update alert_tl set tl_sender = "jull7768" where tl_seq = 11;
insert into alert_tl(tl_seq,al_receiver) values(300,"jjiyun7768123");
alter table alert_tl add tl_sender varchar(50) after tl_seq;
select * from timeline;
select * from alert_tl;
select * from alert_tl where al_receiver like "%jjiyun7768%";

desc alert_tl;
select * from follow;

select tl_seq from timeline where tl_img ="1681884887594-user.png";
select * from timeline;
delete from timelinelike where like_id = null;
update timeline set tl_like = 1 where tl_seq = 2;
select * from timelinelike;
alter table timelinelike add tl_like bigint;
update timelinelike set like_id = null where tl_seq = 7;
update timelinelike set like_id = "d" where tl_seq = 8;
update timelinelike set tl_like = 0 where tl_seq = 2;
update account set profilImg = "img/user.png" where id = "jull7768";
select * from timelinelike;

select timeline.* , timelinelike.like_id from timeline left outer join timelinelike using (tl_seq);
select * from timeline;
insert into timelinelike(tl_seq,like_id) values (1,"jolly7768");

select * from account;
desc timelinelike;
select * from timeline;
insert into timeline(tl_img,tl_content,tl_dt,tl_like,id)values("./img/sea.jpg","두번째 게시글 테스트",now(),5000,"jell7768");
insert into comment(cm_content,cm_dt,cm_like,id,tl_seq) values("무플방지",now(),4,"jolly7768",3);
insert into timelinelike(tl_seq,like_id)values(1,"jolly7768,jell7768,jull7768,jelly7768");
insert into timelinelike(tl_seq)values (7);
select * from timelinelike;


-- search query
select a.id , a.profilImg from account a
inner join follow f on a.id = f.follower 
or a.id = f.following 
where (f.follower ="jjiyun7768" or f.following = "jjiyun7768") or 
(f.follower="%jelly7768%" and f.following="jjiyou7768")
group by a.id having not id ="jjiyun7768" and id like "%jelly7768%";
-- id,id,follower,id,id,follower
select * from account;
select * from timeline;
select * from account where id="jjiyun7768";
update account set profilImg = "hi" where id ="jjiyun7768";
desc account;
-- jolly7768 jelly7768 jell7768 jull7768
select * from follow where (follower ="jjiyun7768" or following = "jjiyun7768") or (follower="jolly7768" and following="jjiyou7768");
select * from follow;
--프로시저 사용시 조건문 달기가 애매해진다 server 에서 애초에 조건을 걸어서 실행해야할듯
delimiter $$
create trigger tl_like after update
on timelinelike for each row
begin
update timeline set tl_like = tl_like + 1 where tl_seq = 1;
end $$
delimiter ;
-- timeline insert 부터 하고 프로시저 설정을 하던가 아니면 timeline insert 내에서 작성시 insert문하나더 사용해서 2번 insert하기
-- delimiter $$
-- create trigger create_tl_like after insert
-- on timeline for each row
-- begin	
-- insert into timelinelike(tl_seq,like_id)values(1,"jolly7768,jell7768,jull7768,jelly7768");
-- end $$
-- delimiter ;

select timeline.* , timelinelike.like_id from timeline left outer join timelinelike using (tl_seq);

select * from account;
select * from timeline;
truncate comment;
delete from comment where cm_seq = 1;
update timeline set tl_img = "./img/coders by sjy.png" where tl_seq = 1;

select j.region_json from account
join json_table(
replace(json_array(region),',','","'),
'$[*]' columns(region_json varchar(100) path '$')
)j 
where id = "jolly7768";

select * from timeline where region like '%서울%' or region like '%서울%';
select * from account;
select * from timeline where region like '%제주%' or region like '%인천%' or region like '%부산%';
