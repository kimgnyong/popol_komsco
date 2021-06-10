//한국조폐공사 스크립트 웹개발
//IIFE 즉시 실행 함수 표현식
;(function($,window,document,undefined){

  var komsco = {
        init: function(){

          this.cookieFn();
          this.headerFn();
          this.section1Fn();
          this.section2Fn();
          this.section3Fn();
          this.section4Fn();
          this.section5Fn();
          this.section6Fn();
          this.footerFn();

        },
        cookieFn: function(){

          var today = null;
          var $closeBtn = $('.close-btn');
          var $popup = $('#popup');
          var $header = $('#header');
          var txt = '';

              ////////////////////////////////////////////////
              // 레이어 팝업창
              ////////////////////////////////////////////////
              //1 쿠키설정(setCookie)
              //  언제? 오늘 하루동안 열리지 않음을 체크(checked)하고 팝업창을 닫기 한 경우에 쿠키 설정 
              //1-1 클릭 이벤트와 체크박스 체크 유무
              $closeBtn.on({
                click: function(e){
                  e.preventDefault();
                   if( cookieForm.chk.checked ){
                      setCookieFn('popup2021052601', 'no', 1);  //전달인자 아규먼트값들
                      //팝업창 / 헤더 애니메이션
                      $popup.addClass('addPop');
                      $header.addClass('addPop');
                   }
                }
              });

              //1-2 함수 쿠키설정 함수 
              function setCookieFn(cookieName, cookieValue, expires){ //매개변수 파라미터 값들
                  today = new Date();
                  today.setDate( today.getDate() + expires  ); //만료일 1일 더하기 
                  // today.setMinutes( today.getMinutes() + expires  ); //만료일 1분 더하기

                  txt += cookieName + '=' + cookieValue + ';'
                  txt += 'expires=' + today.toUTCString() + ';';

                  document.cookie = txt ;
              }




              var regExp = /\s/g;
              /////////////////////////////////////////////////////////////////
              //2 팝업창 오픈 : 쿠키가져와서 비교 판단
              //2-1 쿠기 가져오는 함수
              //20210527  멀티쿠키 다중팝업창(레이어팝업창1개, 윈도우팝업창2개)              
              function getCookieFn(cookieName){

                  var cookie = document.cookie.replace(regExp,'').split(';');
                              
                        for(var i in cookie){
                            var start = 0;
                            var end = cookie[i].indexOf('='); //15 길이
                               
                               if( cookie[i].slice(start, end) == cookieName ){
                                    start = cookie[i].indexOf('=')+1; // no
                                    return cookie[i].slice(start); //no                    
                                }
                        }
                        return '';
              }

              //2-2 팝업창이 열리게 해주는 함수
              function layer_popFn(){
                var isCoookie = getCookieFn('popup2021052601');

                    if(isCoookie =='no'){
                      // 팝업창 클로즈(열지않음) addClass
                        $popup.addClass('addPop');
                        $header.addClass('addPop');
                    }
                    else{
                      // 팝업창 오픈 removeClass
                        $popup.removeClass('addPop');
                        $header.removeClass('addPop');
                    }
              }
              layer_popFn(); //로딩시 실행
                              



              //2-2-1 윈도우 팝업창이 열리게 해주는 함수
              function win_pop_01Fn(){
                var isCoookie = getCookieFn('popup_20210526_01');

                    if(isCoookie =='yes'){
                      // 팝업창 클로즈(열지않음)
                        return false;
                    }
                    else{
                      // 팝업창 오픈 removeClass
                      window.open('./popup_20210526_01.html','popup_20210526_01','width=500, height=500, top=0, left=0');
                    }
              }
              win_pop_01Fn(); //로딩시 실행
                              
              //2-2-2 윈도우 팝업창이 열리게 해주는 함수
              function win_pop_02Fn(){
                var isCoookie = getCookieFn('popup_20210526_02');

                    if(isCoookie =='yes'){
                      // 팝업창 클로즈(열지않음)
                        return false;
                    }
                    else{
                      // 팝업창 오픈 removeClass
                      window.open('./popup_20210526_02.html','popup_20210526_02','width=500, height=500, top=0, left=510');
                    }
              }
              win_pop_02Fn(); //로딩시 실행
                              




              
        },
        headerFn: function(){
          var $a = $('a');
          //메인메뉴 서브메뉴

            $a.on({
                click:function(e){
                  e.preventDefault();
                      var url = $(this).attr('href');
                          window.location.href = 'http://localhost/komsco' + url ; //하위폴더 http 통신
                }
            });

            //네비게이션 애니메이션



        },
        section1Fn: function(){
            //메인 슬라이드 4개 페이드인/아웃 효과
            var cnt = 0;
            var $slide = $('.slide');
            var $pageBtn = $('.page-btn');
            var $stopPlayBtn = $('.stop-play-btn');
            var n = $('.slide').length-1; //0 ~ 3(4)
            var z = null; //초기값
            var setId  = null;
            var setId2 = null;
            var second = 0; //증가변수
            var t = 0;
            
                //1. 메인 다음 슬라이드 함수
                //   디버그(오류수정)
                //   현재 슬라이드(cnt-1)는 그대로 있고 다음 슬라이드(cnt)가 나타난다.
                function mainNextSlideFn(){
                  if(z==null){ //페이지 버튼을 클릭한적이 없는경우
                    z = cnt==0?n:cnt-1; //이제 z는 null 이 아니다
                  }

                  $slide        .css({ zIndex:1 }).stop().animate({opacity:1},0); //전체 슬라이드 초기화
                  $slide.eq( z ).css({ zIndex:2 });                               //현재 슬라이드를 다음 슬라이드가 덮는다
                  $slide.eq(cnt).css({ zIndex:3 }).stop().animate({opacity:0},0).animate({opacity:1},1500); //부드럽게 나탄다.
                  pageButtonEventFn(); //페이지버튼 이벤트 함수 호출
                  z = null; //초기화
                }

                //1. 메인 이전 슬라이드 함수
                function mainPrevSlideFn(){
                  if(z==null){ //페이지 버튼을 클릭한적이 없는경우
                    z = cnt==3?0:cnt+1;
                  } 
                  $slide        .css({ zIndex:1 }).stop().animate({opacity:1},0); //전체 슬라이드 초기화
                  $slide.eq(cnt).css({ zIndex:2 });                               //이전 슬라이드 위에서 현재 슬라이드가 사라진다. 그러면 이전 슬라이드가 보인다.
                  $slide.eq( z ).css({ zIndex:3 }).stop().animate({opacity:1},0).animate({opacity:0},1500); //부드럽게 사라진다.
                  pageButtonEventFn(); //페이지버튼 이벤트 함수 호출
                  z = null; //초기화
                }

                //2. 다음 슬라이드 카운트 함수
                function nextSlideCountFn(){
                    cnt++; //1 2 3 0 1 2 3 
                    if( cnt > n ){
                      cnt=0;
                    }
                    mainNextSlideFn(); //메인 다음슬라이드 함수 호출
                }
                //2. 이전 슬라이드 카운트 함수
                function prevSlideCountFn(){
                    cnt--; //3 2 1 0 3 2 1 0 ...
                    if( cnt < 0 ){
                      cnt=3;
                    }
                    mainPrevSlideFn(); //메인 이전슬라이드 함수 호출
                }

                //3. 자동 타이머
                function autoTimerFn(){
                    setId = setInterval(nextSlideCountFn, 4000);
                    // setInterval(prevSlideCountFn, 4000);
                }
                autoTimerFn();


                //4. 페이지 버튼 이벤트 함수
                function pageButtonEventFn(){
                    $pageBtn.removeClass('addPage');
                    $pageBtn.eq(cnt).addClass('addPage');
                }



                //5. 페이지 버튼 클릭 이벤트
                //   호출대상 메인함수
                //페이지 첫번째 버튼 나열형 클릭 이벤트
                // each()
                $pageBtn.each(function(index){
                    $(this).on({
                      click:function(event){
                          event.preventDefault();
                          
                          z = cnt; // 현재실행중인 슬라이드

                          if(cnt > index){ //페이지버튼 클릭 인덱스 값이 cnt 보다 더 작으면
                            cnt=index;     //클릭된 인덱스 번호
                            mainPrevSlideFn(); //메인 이전 슬라이드 호출
                          }
                          if(cnt < index){  //페이지버튼 클릭 인덱스 값이 cnt 보다 더 크면
                            cnt=index;      //클릭된 인덱스 번호
                            mainNextSlideFn();//메인 다음 슬라이드 호출
                          }

                          //타이머 중지
                          stopAndAutoPlay(); //초를 카운트

                      }
                    });
                });



                //6. 타이머 중지(버튼을 클릭한 경우) 그리고 자동 플레이
                function stopAndAutoPlay(){
                    second = 0;
                    clearInterval(setId);
                    clearInterval(setId2);
                    $stopPlayBtn.addClass('addStop'); //플레이버튼 ▶ 으로 이미지 변경

                    setId2 = setInterval(function(){
                        second++;
                        console.log( second +'초');
                        if(second>=5){
                          second = 0;
                          clearInterval(setId);
                          clearInterval(setId2);
                          nextSlideCountFn() //즉시 다음 슬라이드 호출 실행 그리고
                          autoTimerFn(); //오토 타이머는 4초 후에 실행 반복
                          $stopPlayBtn.removeClass('addStop'); //플레이 버튼 || 으로 이미지 변경
                        }
                    },1000);

                }

                //7. || 정지버튼 클릭 이벤트 (완전 중지)
                $stopPlayBtn.on({
                  click: function(event){
                    event.preventDefault();                    
                    
                    if(t==0){
                      t=1;
                      clearInterval(setId); //중지
                      $stopPlayBtn.addClass('addStop'); 
                    }
                    else{
                      t=0;
                      clearInterval(setId);//중지
                      nextSlideCountFn()   //즉시 다음 슬라이드 호출 실행 그리고
                      autoTimerFn();      //슬라이드 재생
                      $stopPlayBtn.removeClass('addStop'); 
                    }

                  }
                });


        },
        section2Fn: function(){
            var $tabBtn = $('.tab-btn');
            var $row2_1 = $('.row2-1');
            var $row2_2 = $('.row2-2');

              $tabBtn.each(function(idx){
                $(this).on({
                  click:function(evt){
                      evt.preventDefault();

                      $tabBtn.removeClass('addTabbtn');
                      $(this).addClass('addTabbtn');

                      if(idx == 0){
                        $row2_1.css({zIndex:2,position:'relative'}).stop().animate({opacity:0},0).animate({opacity:1},1000);
                        $row2_2.css({zIndex:1,position:'absolute'}).stop().animate({opacity:1},0).animate({opacity:0},0);
                      }
                      if(idx == 1){
                        $row2_2.css({zIndex:2,position:'relative'}).stop().animate({opacity:0},0).animate({opacity:1},1000);
                        $row2_1.css({zIndex:1,position:'absolute'}).stop().animate({opacity:1},0).animate({opacity:0},0);
                      }

                  }
                });
              });




        },
        section3Fn: function(){
          
        },
        section4Fn: function(){
          
        },
        section5Fn: function(){
          
        },
        section6Fn: function(){
          
        },
        footerFn: function(){
          
        }        
  }

  komsco.init();

})(jQuery,window,document);