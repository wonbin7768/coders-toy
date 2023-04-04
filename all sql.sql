use toy;
select * from account;
select * from timeline;
select * from comment;
select * from timelinelike;
delete from timelinelike where tl_like_seq = 6;
show tables;
desc timelinelike;

alter table timelinelike drop tl_like;
alter table timeline add tl_like bigint default 0 after tag;
alter table timelinelike add tl_like_seq bigint primary key auto_increment;
alter table timelinelike modify like_id varchar(50) default null;
alter table timeline change tl_img tl_img varchar(500);
alter table account add area_count int after area;
alter table account change area region varchar(50);
alter table account add profilImg varchar(300) after area_count;
alter table account modify profilImg varchar(300) default "img/user.png";
alter table timelinelike modify like_id varchar(16000) default "d";
alter table timeline add tag varchar(300) after id;


desc toy.account;
alter table account modify region varchar(50) not null;

update account set area = concat(area,",대구") where id = "jell7768";
update account set area = "서울,수원,고양" where id = "jell7768";
update account set area_count = 5 where id = "jull7768";

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

truncate comment;
delete from comment where cm_seq = 1;
update timeline set tl_img = "./img/coders by sjy.png" where tl_seq = 1;

