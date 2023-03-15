use toy;
select * from account;
select * from timeline;
select * from comment;
select * from timelinelike;
show tables;

alter table account add area_count int after area;
update account set area = concat(area,",대구") where id = "jell7768";
update account set area = "서울,수원,고양" where id = "jell7768";
update account set area_count = 5 where id = "jull7768";

select substring_index2(area,',',1) from account where id ="jell7768";

drop table timelinelike;
create table timelinelike(
tl_seq bigint,
like_id varchar(13000),
foreign key(tl_seq) references timeline(tl_seq) on update cascade
);
alter table timelinelike add tl_like bigint;
update timelinelike set tl_like = 0 where tl_seq = 1;
update timeline set tl_like = 0 where tl_seq = 3;
select * from timeline;
insert into timeline(tl_img,tl_content,tl_dt,tl_like,id)values("./img/sea.jpg","두번째 게시글 테스트",now(),5000,"jell7768");
insert into comment(cm_content,cm_dt,cm_like,id,tl_seq) values("무플방지",now(),4,"jolly7768",3);
insert into timelinelike(tl_seq,like_id)values(1,"jolly7768,jell7768,jull7768,jelly7768");


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

