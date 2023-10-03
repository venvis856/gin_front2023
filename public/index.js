// 全局通知消息
function alertTips(string){
  $('.global-tips').remove();
  $('body').prepend('<div class="global-tips">' + string + '</div>');
  $('.global-tips').fadeIn(500);
  $('.global-tips').delay(2000).fadeOut(500);
};

//导航条颜色切换
function fixedHeaderBg(){
	var winWidth = $(window).width();
	var header = $('header');
	var top = $(window).scrollTop();
  var logo = $('.logo img');
	if(winWidth > 999){
		if(top >= 1){
			header.addClass('white-header');
      logo.attr('src', 'https://www.4itool.com/index/favicon.ico?w=64&h=64');
		}else{
			header.removeClass('white-header');
      logo.attr('src', 'https://www.4itool.com/index/img/logo-white.png');
		}
	}else{
		if(top >= 1){
			header.addClass('white-header');
      logo.attr('src', 'https://www.4itool.com/index/favicon.ico?w=64&h=64');
		}else{
			header.removeClass('white-header');
      logo.attr('src', 'https://www.4itool.com/index/img/logo-white.png');
		}
	}
};

//小屏幕导航条控制
$(document).on('click', '.menu', function(){
	$('header').addClass('active-header');
	$('body').css('position', 'fixed');
  $('.logo img').attr('src', 'https://www.4itool.com/index/favicon.ico?w=64&h=64');
});
$(document).on('click', '.icon-close', function(){
	$('header').removeClass('active-header');
	$('body').css('position', 'static');
  $('.logo img').attr('src', 'https://www.4itool.com/index/img/logo-white.png');
});

$(document).on('click', '.nav-item', function(){
  var windowWidth = window.innerWidth;
  if(windowWidth < 999){
    if($(this).find('.nav-drop').css('display') === 'block'){
    	$(this).find('.iconfont').removeClass('icon-arrow-up');
	    $(this).find('.iconfont').addClass('icon-arrow-down');
      	$(this).find('.nav-drop').slideUp(200);
    }else{
    	var parent = $(this).parents('ul');
    	parent.find('.icon-arrow-up').addClass('icon-arrow-down');
    	parent.find('.icon-arrow-down').removeClass('icon-arrow-up');
      	parent.find('.nav-drop').slideUp(200);
      	$(this).find('.nav-drop').css('display', 'block');
      	// $(this).find('.nav-drop').slideDown(200);
    };
  };
});

$(window).resize(function (){
  var windowWidth = window.innerWidth;
  if(windowWidth <= 999 && $('header').hasClass('active-header')){
    $('body').css('position', 'fixed');
  }else{
    $('body').css('position', 'static');
  };

  if(windowWidth > 999){
    $('header').removeClass('active-header');
    $('.nav-drop').removeAttr("style");
  };
});


// 处理返回顶部
var $goTop = $('#go-top');
$(window).scroll(function(){
    var winHeight = $(window).height();
    var scrollHeight = $(document).scrollTop();
    if(scrollHeight > winHeight){
        $goTop.show();
    }else{
        $goTop.hide();
    }
});
$goTop.click(function () {
    $('html ,body').animate({scrollTop: 0}, 300);
});


// 处理FAQ展开和收缩
$(document).on('click', '.faq-title', function(){
  if($(this).next().css('display') === 'block'){
    $(this).find('.iconfont').removeClass('icon-arrow-up').addClass('icon-arrow-down');
    $('.faq-content').slideUp(200);
  }else{
    $(this).find('.iconfont').removeClass('icon-arrow-down').addClass('icon-arrow-up');
    $('.faq-content').slideUp(200);
    $(this).next().css('display', 'block');
  };
});



function alertDownload(){
  $('body').prepend('<div class="full-mask"></div><div class="download-window"><i class="iconfont icon-close"></i><div class="subscribe-title">The software is about to launch, before that, you can subscribe first. After subscribing, we will email you as soon as possible to let you know and get free online video or music download tools!</div><div class="subscribe-form"><input class="subscribe-input" type="text" placeholder="Please enter your email"><div class="subscribe">Subscribe</div></div><img src="./img/4itoolgo-software.png" alt="KeepVid Software" class="software-img"><div class="product-des"><h4 class="software-name">KeepVid Online Video Downloader</h4><ul><li>Download videos from more than 1,000 video sharing sites.</li><li>Download 1080P, full HD, 4K videos without quality loss.</li><li>Download entire playlist with one click.</li><li>Download videos with 3x faster speed.</li><li>Download and convert videos for different uses.</li></ul></div></div>');
  gtag('event', 'ClickDownloadSoftware', {
    'event_category': 'Subscribe',
  });
};
$(document).on('click', '.download-window .icon-close', function(){
  $('.full-mask').remove();
  $('.download-window').remove();
});
$(document).on('click', '.full-mask', function(){
  $('.full-mask').remove();
  $('.download-window').remove();
});

$(document).on('click', '.subscribe', function(){
  $('.email-tips').remove();
  var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  var email = $('.subscribe-input').val().trim();
  if(!pattern.test(email)){
    $('.subscribe-form').append('<div class="email-tips">Please enter a valid email address!</div>');
    return;
  };
  $('.full-mask').remove();
  $('.download-window').remove();
  alertTips('Subscription successful!');
  gtag('event', 'Email', {
    'event_category': 'Subscribe',
    'event_label': email,
  });
});


function formatSeconds(s) {   
  var hh = parseInt(s/3600);  
  if(hh<10) hh = "0" + hh;  
  var mm = parseInt((s-hh*3600)/60);  
  if(mm<10) mm = "0" + mm;  
  var ss = parseInt((s-hh*3600)%60);  
  if(ss<10) ss = "0" + ss;  
  var length = hh + ":" + mm + ":" + ss;  
  if(s>0){  
    return length;  
  }else{  
    return "N/A";  
  }  
};

function getfilesize(size) {
    if (!size)
        return "";

    var num = 1024.00; //byte

    if (size < num)
        return size + " B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + " KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + " MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + " GB"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + " TB"; //T
}; 

// 处理加载失败的图片
function errorImg(img){
  img.src = './img/default-thumbnail.png';
  img.onerror = null;
};


$(document).on('click', '.parse', function(){

  gtag('event', 'ClickParse', {
    'event_category': 'MediaParse',
  });

  if($('.parse').html() == 'Analysing...'){
    return;
  };
  
  var content = $('.parse-input').val().trim();
  if(content.indexOf('http') < 0){
    alertTips('Please enter the correct video link!');
    return;
  };

  gtag('event', 'ParseURL', {
    'event_category': 'MediaParse',
    'event_label': content,
  });

  $('.parse').html('Analysing...');
  $('.parse-result-container').remove();
  $('.terms-tips').after('<div class="parsing"><div class="loadingio-spinner-dual-ball-oqr9wk7x0r"><div class="ldio-53faqx9iix9"><div></div><div></div><div></div></div></div><div>Analyzing download link...</div></div>');
  var ts = (new Date()).getTime();
  var salt = ts + Math.floor(Math.random()*10);
  var sign = $.md5('S2VlcFZpZDIwMjA=' + content + salt + 'KeepVid2020');
  $('.best-result').remove();
  $('.other-result').remove();
  gtag('event', 'StartParse', {
    'event_category': 'MediaParse',
  });
  $.ajax({
    url: 'https://www.4itool.com/parse/getvideo',
    type: "GET",
    dataType: "json",
    data: {
      'url': content,
      'ts': ts,
      'salt': salt,
      'sign': sign,
    },
    error: function(){
      $('.parsing').remove();
      $('.parse').html('Download');
      $('.terms-tips').after('<div class="best-result padding-container"><div class="download-tips"><strong>Sorry, the download link analysis failed!</strong><br>1. Retry a few times when make sure the video exists;<br>2. Use KeepVid Online Downloader, 100% safe and can download all online videos. <a href="javascript:alertDownload()">Download KeepVid Online Downloader Now >></a></div></div>');
      $("html, body").animate({scrollTop: $('.best-result').offset().top -88+ "px"}, 200);
      gtag('event', 'ParseResult', {
        'event_category': 'MediaParse',
        'event_label': '500 - ' + content,
      });
      return;
    },
    success: function(data){
      console.log(data,222)
      $('.parsing').remove();
      $('.parse').html('Download');
      if(data.code == -1){
        if(data.message == 'Invalid Parameter'){
          alertTips('This parameter is invalid. Please refresh your browser and try again!');
        }else if(data.message == 'Invalid URL'){
          alertTips('Please enter the correct video link!');
        }else if(data.message == 'This video is unavailable'){
          alertTips('This video is unavailable！');
        }else if(data.message == 'Unsupported URL' || data.message == 'Unsupported List'){
          $('.terms-tips').after('<div class="best-result padding-container"><div class="download-tips"><strong>Sorry, KeepVid Web does not support analysis of this type of video!</strong><br>1. Use KeepVid Online Downloader, 100% safe and can download all online videos. <a href="javascript:alertDownload()">Download KeepVid Online Downloader now >></a></div></div>');
          $("html, body").animate({scrollTop: $('.best-result').offset().top -88+ "px"}, 200);
        }else if(data.message == 'Analysis failed'){
          $('.terms-tips').after('<div class="best-result padding-container"><div class="download-tips"><strong>Sorry, the download link analysis failed!</strong><br>1. Retry a few times when make sure the video exists;<br>2. Use KeepVid Online Downloader, 100% safe and can download all online videos. <a href="javascript:alertDownload()">Download KeepVid Online Downloader Now >></a></div></div>');
          $("html, body").animate({scrollTop: $('.best-result').offset().top -88+ "px"}, 200);
        };
        gtag('event', 'ParseResult', {
          'event_category': 'MediaParse',
          'event_label': data.msg + ' - ' + content,
        });
        return;
      };
      if(data.data.formats.length == 0){
        $('.terms-tips').after('<div class="best-result padding-container"><div class="download-tips"><strong>Sorry, the download link analysis failed!</strong><br>1. Retry a few times when make sure the video exists;<br>2. Use KeepVid Online Downloader, 100% safe and can download all online videos. <a href="javascript:alertDownload()">Download KeepVid Online Downloader Now >></a></div></div>');
        $("html, body").animate({scrollTop: $('.best-result').offset().top -88+ "px"}, 200);
        gtag('event', 'ParseResult', {
          'event_category': 'MediaParse',
          'event_label': 'Formats is null' + ' - ' + content,
        });
        return;
      };
      if(data.data.duration == null || data.data.duration == 'none'){
        var duration = 'N/A';
      }else{
        var duration = formatSeconds(data.data.duration);
      };
      if(data.data.thumbnail == null || data.data.thumbnail == 'none'){
        var thumbnail = './img/default-thumbnail.png';
      }else{
        var thumbnail = data.data.thumbnail;
      };
      if(data.data.title == null || data.data.title == 'none'){
        var title = 'Video';
      }else{
        var title = data.data.title;
      };

      var video = [];
      var silentVideo = [];
      var audio = [];
      for (var i = data.data.formats.length - 1; i >= 0; i--) {
        var format = data.data.formats[i];
        console.log(format,22211)
        if(!format.hasOwnProperty("height") || format.height == null || format.height == 'none'){
          format.height = 'N/A';
        }else{
          format.height = format.height + ' P';
        };
        if(!format.hasOwnProperty("abr") || format.abr == null || format.abr == 'none'){
          format.abr = 'N/A';
        }else{
          format.abr = format.abr + ' Kbs';
        };
        if(!format.hasOwnProperty("ext") || format.ext == null || format.ext == 'none' || format.ext.toLowerCase().indexOf('unknown') >= 0){
          format.ext = 'N/A';
        };
        if(!format.hasOwnProperty("filesize") || format.filesize == null || format.filesize == 'none'){
          format.filesize = 'N/A';
        }else{
          format.filesize = getfilesize(format.filesize);
        };

        var A = format.hasOwnProperty("vcodec") && format.vcodec != null && format.vcodec != 'none';
        var B = format.hasOwnProperty("vcodec") && (format.vcodec == null || format.vcodec == 'none');
        var C = !format.hasOwnProperty("vcodec");
        var D = format.hasOwnProperty("acodec") && format.acodec != null && format.acodec != 'none';
        var E = format.hasOwnProperty("acodec") && (format.acodec == null || format.acodec == 'none');
        var F = !format.hasOwnProperty("acodec");
        if((A && D) || (A && F) || (B && E) || (B && F) || (C && F)){
          video.push({'quality': format.height, 'format': format.ext, 'size': format.filesize, 'url': format.url,});
        }else if(A && E){
          silentVideo.push({'quality': format.height, 'format': format.ext, 'size': format.filesize, 'url': format.url,});
        }else if((B && D) || (C && D) || (C && E)){
          audio.push({'quality': format.abr, 'format': format.ext, 'size': format.filesize, 'url': format.url,});
        };
      };

      $('.terms-tips').after('<div class="best-result padding-container"><img class="video-thumbnail" src="' + thumbnail + '" onerror="errorImg(this)"><div class="video-des"><div class="video-title">'+ title +'</div><div class="video-duration">Duration: ' + duration + '</div></div><div class="download-tips"><strong>Download tips:</strong><br><b>Computer: </b>Right-click the download button and select "Save Link As" to download;<br><b>Android: </b>Long press the download button, select "Save Link As" to download;<br><b>iOS: </b>Use the built-in browser of the Documents App to download on this site.</div></div>');
      if(video.length > 0){
        $('.video-des').append('<a class="best-download" href="' + video[0].url + '" target="_blank" rel="nofollow noreferrer">Download ' + video[0].quality + ' / ' + video[0].format + '</a>');
      }else if(silentVideo.length > 0){
        $('.video-des').append('<a class="best-download" href="' + silentVideo[0].url + '" target="_blank" rel="nofollow noreferrer">Download ' + silentVideo[0].quality + ' / ' + silentVideo[0].format + '</a>');
      };

      if(audio.length > 0){
        $('.video-des').append('<a class="best-download" href="" target="_blank" download="KeepVid.mp3" rel="nofollow noreferrer">Download ' + audio[0].quality + ' / ' + audio[0].format + '</a>');
      };

      if(video.length > 1 || silentVideo.length > 1 || audio.length > 1){
        $('.video-des').append('<div class="download-more">Download Other Formats</div>');
        $('.best-result').after('<div class="other-result padding-container"><div class="left"></div><div class="right"></div></div>');
        
        if(video.length > 0){
          $('.left').append('<div class="table-title">Video</div><table class="video-table" align="center" cellpadding="8" cellspacing="0"></table>');
          for(var i = video.length - 1; i >= 0; i--){
            $('.video-table').prepend('<tr><th>' + video[i].quality + '</th><th>' + video[i].format + '</th><th>' + video[i].size + '</th><th><a href="' + video[i].url + '" target="_blank" rel="nofollow noreferrer">Download Now</a></th></tr>');
          };
          $('.video-table').prepend('<tr><th>Quality</th><th>Format</th><th>Size</th><th>Download</th></tr>');
        };

        if(silentVideo.length > 0){
          $('.left').append('<div class="table-title">Silent Video</div><table class="silent-video-table" align="center" cellpadding="8" cellspacing="0"></table>');
          for(var i = silentVideo.length - 1; i >= 0; i--){
            $('.silent-video-table').prepend('<tr><th>' + silentVideo[i].quality + '</th><th>' + silentVideo[i].format + '</th><th>' + silentVideo[i].size + '</th><th><a href="' + silentVideo[i].url + '" target="_blank" rel="nofollow noreferrer">Download Now</a></th></tr>');
          };
          $('.silent-video-table').prepend('<tr><th>Quality</th><th>Format</th><th>Size</th><th>Download</th></tr>');
        };

        if(audio.length > 0){
          $('.right').append('<div class="table-title">Audio</div><table class="audio-table" align="center" cellpadding="8" cellspacing="0"></table>');
          for(var i = audio.length - 1; i >= 0; i--){
            $('.audio-table').prepend('<tr><th>' + audio[i].quality + '</th><th>' + audio[i].format + '</th><th>' + audio[i].size + '</th><th><a href="' + audio[i].url + '" target="_blank" rel="nofollow noreferrer">Download Now</a></th></tr>');
          };
          $('.audio-table').prepend('<tr><th>Quality</th><th>Format</th><th>Size</th><th>Download</th></tr>');
        };
      };
      $("html, body").animate({scrollTop: $('.best-result').offset().top -88+ "px"}, 200);
      gtag('event', 'ParseResult', {
        'event_category': 'MediaParse',
        'event_label': 'Success',
      });
      return;
    }
  });
});

$(document).on('focus', '.parse-input', function(){
    if($(this).val() != ''){
        if($('.parse-clear').length <= 0){
            $('.parse-form').append('<i class="parse-clear iconfont icon-close"></i>');
        };
    }else{
        $('.parse-clear').remove();
    };
});
$(document).on('input', '.parse-input', function(){
    if($(this).val() != ''){
        if($('.parse-clear').length <= 0){
            $('.parse-form').prepend('<i class="parse-clear iconfont icon-close"></i>');
        };
    }else{
        $('.parse-clear').remove();
    };
});


$(document).on('click', '.parse-clear', function(){
  $('.parse-input').val('').focus();
  $('.parse-clear').remove();
});


$(document).on('click', '.download-more', function(){
  $("html, body").animate({scrollTop: $('.other-result').offset().top -88+ "px"}, 200);
  return;
});


 // 反调试函数,参数：开关，执行代码
!function(){
    setInterval(check, 1000);
    function check() {
      function doCheck(a) {
          // (function() {}["constructor"]("debugger")()); //debugger
          doCheck(++a);
      }
      try {
          doCheck(0)
      } catch(err) {
          console.log(err)
      }
    };
}();