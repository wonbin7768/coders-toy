--프로시저 사용시 조건문 달기가 애매해진다 server 에서 애초에 조건을 걸어서 실행해야할듯
delimiter $$
create trigger tl_like after update
on timelinelike for each row
begin
update timeline set tl_like = tl_like + 1 where tl_seq = 1;
end $$
delimiter ;
desc timelinelike;

drop trigger if exists tl_like;

delimiter $$
create trigger tl_after_tllike_insert after insert on timeline
for each row 
begin
insert into timelinelike(tl_seq) values (new.tl_seq);
end;
$$
delimiter ;

select * from timelinelike;
select * from timeline;


-- timeline insert 부터 하고 프로시저 설정을 하던가 아니면 timeline insert 내에서 작성시 insert문하나더 사용해서 2번 insert하기
-- delimiter $$
-- create trigger create_tl_like after insert
-- on timeline for each row
-- begin
-- insert into timelinelike(tl_seq,like_id)values(1,"jolly7768,jell7768,jull7768,jelly7768");
-- end $$
-- delimiter ;
