//トップページアクセス時にロゴ表示
$(function() {
  setTimeout(function(){
    $('.start p').fadeIn(1600);
  },500); //0.5秒後にロゴをフェードイン
  setTimeout(function(){
    $('.start').fadeOut(500);
  },2500); //2.5秒後にロゴ含め真っ白背景をフェードアウト
  
  //ロードが完了後、一定時間ローディング画面表示
  $(window).on('load', function(){
    setTimeout(function() {
      $('.spin-loading-bg,.spin-loading').fadeOut();
    },1500);
  });

  //スクロールトップ
  let topBtn = $('.pagetop');    
  topBtn.hide();
  //スクロールが指定値に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      //ボタンの表示方法
      topBtn.fadeIn();
    } else {
      //ボタンの非表示方法
      topBtn.fadeOut();
    }
  });
  
  //予約ボタン表示・非表示
  $(window).on('load',function(){    
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300 && $(window).scrollTop() + $(window).height() < $('footer').offset().top) {
        //ボタンの表示方法
        $('.reservation').fadeIn();
      } else {
        //ボタンの非表示方法
        $('.reservation').fadeOut();
      }
    });
    //スクロールしてトップ
    topBtn.click(function () {
      $('body, html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    
    //トップスライダー
    let slider01 = $('#top-slider').bxSlider({
      pagerCustom: '#top-slider-thumbnail',
      onSlideBefore: function($slideElement, oldIndex, newIndex) {
        slider02.goToSlide(newIndex);
      }
    });
    $('#top-slider-thumbnail li:last-child').prependTo('#top-slider-thumbnail');
    $('#top-slider-thumbnail li:last-child').prependTo('#top-slider-thumbnail');
    let slider02 = $('#top-slider-thumbnail').bxSlider({
      pager: false,
      minSlides: 5,
      maxSlides: 5,
      moveSlides: 1,
      slideWidth: 180,
      slideMargin: 10,
      controls: false,
      auto: true,
      speed: 500,
      onSlideNext: function($slideElement, oldIndex, newIndex) {
        slider01.goToSlide(newIndex);
      },
      onSlidePrev: function($slideElement, oldIndex, newIndex) {
        slider01.goToSlide(newIndex);
      }
    });
    
    $(".food-slider").bxSlider({
      easing: 'easeOutBounce',
      minSlides: 3,
      maxSlides: 9,
      slideWidth: 350,
      slideMargin: 10,
      ticker: true,//tickerオプション、デフォルトはfalse
      speed: 30000,
      tickerHover: false, // tickerモード時のホバーオプション
      useCSS: false
    });
    
    $('.lunch-slider').bxSlider({
      easing: 'easeOutBounce',
      minSlides: 3,
      maxSlides: 9,
      slideWidth: 350,
      slideMargin: 10,
      ticker: true,//tickerオプション、デフォルトはfalse
      speed: 30000,
      tickerHover: false, // tickerモード時のホバーオプション
      useCSS: false,
      autoDirection: 'prev'
    });
    
    //指定値スクロールでナビゲーション関係固定・解除
    $(window).scroll(function() {
      if($(window).scrollTop() > 100) {
        $('.scroll-hide').hide();
        $('nav').addClass('nav-fixed');
        $('.bc').hide();
        $('nav').fadeIn();
      } else {
        $('.scroll-hide').show();
        $('nav').removeClass('nav-fixed');
        $('.bc').show();
      }
    });
    
    $(document).ready(function(){
      $('.sidenav').sidenav();
    });
    
    $(document).ready(function(){
      $('.slider').slider();
    });
    
    $(document).ready(function(){
      $('.modal').modal();
    });
    
    $(document).ready(function(){
      $('.scrollspy').scrollSpy();
    });
    
    //スクロールで要素がフェードインする
    $(function(){
      let effect_btm = 300; // 画面下からどの位置でフェードさせるか(px)
      let effect_move = 50; // どのぐらい要素を動かすか(px)
      let effect_time = 800; // エフェクトの時間(ms) 1秒なら1000
      //親要素と子要素のcssを定義
      $('.fadein').css({
        opacity: 0
      });
      $('.fadein').children().each(function(){
        $(this).css({
          opacity: 0,
          transform: 'translateY('+ effect_move +'px)',
          transition: effect_time + 'ms'
        });
      });
      
      // スクロールまたはロードするたびに実行
      $(window).on('scroll load', function(){
        let scroll_top = $(this).scrollTop();
        let scroll_btm = scroll_top + $(this).height();
        let effect_pos = scroll_btm - effect_btm;
        
        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $('.fadein').each( function() {
          let this_pos = $(this).offset().top;
          if ( effect_pos > this_pos ) {
            $(this).css({
              opacity: 1,
              transform: 'translateY(0)'
            });
            $(this).children().each(function(i){
              $(this).delay(100 + i*200).queue(function(){
                $(this).css({
                  opacity: 1,
                  transform: 'translateY(0)'
                }).dequeue();
              });
            });
          }
        });
      });
      
    });
    
    //インスタグラムAPI
    $(function(){
      $.ajax({
        type: 'GET',
        url: 'https://graph.facebook.com/v3.0/17841406273944061?fields=name%2Cmedia.limit(6)%7Bcaption%2Clike_count%2Cmedia_url%2Cpermalink%2Ctimestamp%2Cusername%7D&access_token=EAAG0RdfG2OMBAPqBYwFMd0UYdLrWZACIHfruZCgrVMT52faXQbEQJvJsZBUTN77zoRmZA8qlh8yMzw3py2axZB4zZCnxZC5hruZA7pmk08mm2BklOPsWCO4uMG8H2VxiqvxPvQ7pUXnqSZBDKp0P7UY8eCMSjon4xgyg1Gf16i9kJH56GBYQen3Eb',
        dataType: 'json',
        success: function(json) {
          
          let html = '';
          let insta = json.media.data;
          for (let i = 0; i < insta.length; i++) {
            html += '<div class="col s6 m4"><a href="' + insta[i].permalink + '" target="_blank"><div class="trim"><img class="responsive-img" src="' + insta[i].media_url + '"></div></a></div>';
          }
          $("#instafeed").append(html);			
        },
        error: function() {
          
          //エラー時の処理
        }
      }); 
    });	
    
  });
});