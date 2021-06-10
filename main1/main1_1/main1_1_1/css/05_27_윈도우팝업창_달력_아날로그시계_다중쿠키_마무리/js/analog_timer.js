;(function($){

    var timer = {      
        init: function(){
          
          this.cookieFn();
          this.analogTimerFn();

        },
        cookieFn(){

            var start  = null;
            var end = null;

            //2-1 
            function getCookieFn(name){
                start = 0;
                end  = document.cookie.indexOf('='); //0 ~                 
                    
                if( document.cookie.slice(start, end) == name ){
                    start = document.cookie.indexOf('=');                
                    return  document.cookie.slice(start+1); //no
                }

                return ''; //쿠키를 못 찾으면

            }

            //2-2 
            function openPopFn(){
                var isCookie = getCookieFn('popup_20210526');                

                    if( isCookie != 'no' ){
                        window.open("popup_20210526.html","popup_20210526","width=500, height=800,top:0,left:0");                    
                    }
            }
            openPopFn();

        },
        analogTimerFn: function(){
            var today   = null;    //날짜 객체
            var hours   = null; //시
            var minutes = null; //분
            var seconds = null; //초

            var year    = null; //년
            var month   = null; //월
            var date    = null; //일
            var day     = null; //요일

            var y       = 0; //년 카운트 변수
            var m       = 0; //월 카운트 변수
            
            var timerImg2 = $('.timer-img2'); //시
            var timerImg3 = $('.timer-img3'); //분
            var timerImg4 = $('.timer-img4'); //초
            var dateBox   = $('.date-box span');   //날짜박스
            var txt       = '';

            



            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            //아날로그시계 알고리즘 
            function timerFn(){
                today   = new Date();          //날짜 생성자 객체
                //시간 - 시:분:초
                hours   = today.getHours();    //시
                minutes = today.getMinutes();  //분
                seconds = today.getSeconds();  //초
                // console.log( hours + '시 ' +  minutes + '분 ' + seconds +'초' ); 

                //날짜 - 년-월-일-요일
                year    = today.getFullYear(); //년 1900 ~ 9999
                month   = today.getMonth()+1;    //월 : 0 ~ 11 : 12개월
                date    = today.getDate();     //일 : 1 ~ 30 , 1 ~ 31, 1 ~ 28, 1 ~ 29
                day     = today.getDay();      //요일 일요일 시작요일(0,1,2,3,4,5,6)
                // yoil    = ['SUN','MON','TUE','WED','THU','FRI','STA'];    //숫자 요일을 한글이나 영문 표기
                yoil    = ['일','월','화','수','목','금','토'];    //숫자 요일을 한글이나 영문 표기
                
                // console.log( year + '년 ' +  (month+1) + '월 ' + date +'일 ' + yoil +'요일' ); 
                txt = year + '-' +  (month+1) + '-' + date +'-' + yoil[day];
               
                //현재 시각
                timerImg2.css({ transform: 'rotate(' + ((hours*30)+(0.5*minutes)) + 'deg)' }); /* 1시간 30도+(1시간에 해당하는분의각도*분) */
                timerImg3.css({ transform: 'rotate(' + (minutes*6) + 'deg)' }); /* 1분 6도 */
                timerImg4.css({ transform: 'rotate(' + (seconds*6) + 'deg)' }); /* 1초 6도 */                

                //현재 날짜
                dateBox.html( txt );

            }

            //아날로그 시계와 날짜 1초 간격으로 현재 날짜 시간 가져오기 그리고 시간과 각도 계산
            setInterval(function(){
                timerFn();
            }, 1000);
            timerFn();


















            /////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////
            //달력 알고리즘 
            // 월별 마지막 날짜 가져오기
            // 1. Date 객체 월별 설정
            // 2. 변수 설정 
            // 3. 출력하기

            var firstDay = null;
            var lastDate = null;


            //5월 달력 일자 출력 42칸(td)
            //1. 5월 1일 첫날 요일(토 index = 6)에 맞게 칸(coluum)을 설정 - firstDay  
            var col = null;  //칸번호
            var prevLastDate = null; //이전달 마지막 일자 기억변수
            var cnt = 0;




            function calendarFn( y, m ){
                col = null;
                prevLastDate = null;
                cnt = 0;

                $('.calendar table caption').html( y + '년도 ' +  m + '월' );
                $('td').removeClass('now');

                //오늘 날짜의 달(월) 가져오기                
                //오늘 날짜의 날(일) 가져오기
                var nowYear = new Date().getFullYear(); //0 ~ 11  반드시 1을 더한다
                var nowMonth = new Date().getMonth()+1; //0 ~ 11  반드시 1을 더한다
                var nowDate  = new Date().getDate();

                // console.log( nowYear , y);
                // console.log( nowMonth , m);


                //이달 달력 채우기
                firstDay = new Date( y + '-' + m + '-' + 1).getDay(); //5월 1일 요일 구하기
                col = firstDay; //몇번째 칸(6)에서 시작하는가를 결정 카운트 ~ 마지막날까지(lastDate)
                prevLastDate = new Date( y, m-1, 0).getDate();     //4월달(이전달) 마지막 일자 가져오기
                lastDate = new Date( y, m, 0).getDate(); //5월 마지막 일자 구하기
                

                for(var i=1; i<=lastDate; i++){ //i변수가 날짜
                    if( col !== null ){
                        $('td').eq(col).html( i );   //td 칸의 시작번호 부터 1씩증가 마지막 날짜까지 증가해서 칸증가                       
                        //조건 2021 년 조건이 만족
                        //조건    1 월(달) 조건이 만족
                        //조건    2 일(날) 조건이 만족
                        if( nowYear == y && nowMonth == m  ){                                                        
                            if( nowDate == i ){
                                $('td').eq(col).addClass('now');    
                            }                                                    
                        }
                        else{
                            $('td').removeClass('now');
                        }

                        col++;  //다음칸으로 증가 누적변수

                    }
                }

                


                //이전 빈칸채우기
                //이전달 마지막 일자
                // console.log('이전달 마지막 일자 ', prevLastDate );
                //이번달 첫날 이전에 빈칸을 이전달 마지막 날자로 차례로 채우기
                // for(var i=이번달첫날요일인덱스값6-1; i>=0; i--){
                for(var i=firstDay-1; i>=0; i--){
                    // $('td').removeClass('color1'); 버튼클릭시 다음달 이전달 이동시
                    $('td').eq(i).html(prevLastDate).addClass('color1');
                    prevLastDate--;
                }



                //다음 빈칸채우기
                //이번달 칸번호 카운트변수가 다음 빈칸 첫칸으로 사용 그리고 증가 카운트
                //td.length 미만까지 <42(41까지)
                for(var i=col; i<$('td').length; i++){
                    cnt++;
                    $('td').eq(i).html( cnt ).addClass('color1');
                }



            }

            //달력 함수 실행
            calendarFn( year, month ); //아규먼트


            y = year;  //현재 년도 변수에 대입
            m = month; //현재 월 변수에 대입

            //다음 달 버튼 클릭 
            $('.next-btn').on({
                click:  function(){
                    m++;
                    if(m>12){
                        m=1; //다음년도 1월
                        y++; //1년 증가
                    }
                    // console.log(y + '년도 ' + m + '월' );
                    $('td').removeClass('color1'); //삭제 빈칸 addClass 삭제
                    calendarFn( y, m ); //아규먼트

                }
            });

            //이전 달 버튼 클릭 
            $('.prev-btn').on({
                click:  function(){
                    m--;
                    if(m<1){
                        m=12;//1월에서 이전년도 12월
                        y--; //년도 감수
                    }
                    // console.log(y + '년도 ' + m + '월' );
                    $('td').removeClass('color1'); //이전 빈칸 addClass 삭제
                    calendarFn( y, m ); //아규먼트

                }
            });


        }    
    } //객체 끝

    timer.init();


})(jQuery);