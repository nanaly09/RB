###MAP TO ANCHOR

```html
<div class="header">MAP TO ANCHOR</div>
<div class="wrap">
	<div class="original-side">
		<div class="txt-area">
			<textarea name="" id="" cols="30" rows="10" placeholder="Map 코드 입력"><img src="https://i.ytimg.com/vi/H46C8rEaVHg/maxresdefault.jpg" alt="CodePen" usemap="#Map" border="0">
<map name="Map">
	<area shape="rect" coords="69,110,571,618" href="#codepen" alt="CodePen">
	<area shape="rect" coords="623,191,1087,539" href="#none">
</map>
</textarea>
		</div>
		<div class="viewport"></div>
	</div>
	<div class="result-side">
		<div class="txt-area">
			<div class="option-wrap">
				<input type="radio" id="percent" name="optionRadio" checked="checked" /><label for="percent">퍼센트</label>
				<input type="radio" id="rem" name="optionRadio" /><label for="rem">REM</label>
			</div>
			<textarea name="" id="" cols="30" rows="10" placeholder="Anchor 코드 출력" readonly="readonly"></textarea>
		</div>
		<div class="viewport">
		</div>
	</div>
</div>
```

```css
html {font-size:20px; font-family:'NanumGothic';}
body {background:#ECEFF2; overflow-y:scroll;}
.header {padding:20px; font-size:20px; color:#dddedf; background:#263238;}
.wrap {overflow:hidden;}
.wrap > div {float:left; width:48.5%; padding:1%;}
.wrap > div:first-child {padding-right:0;}
.wrap .txt-area {width:100%; background:#fff; border-radius:5px; border-right:1px solid rgba(109,109,109,.2); border-bottom:2px solid rgba(109,109,109,.2); overflow:hidden;}
.wrap .txt-area textarea {width:96%; height:100%; padding:2%; margin-bottom:0; border:none; text-align:left; resize:vertical;}
.wrap .viewport {margin-top:10px;}
.wrap .viewport img {max-width:100%;}
.wrap .result-side .viewport a {border:1px dashed red; background:rgba(255,255,0,.3); box-sizing:border-box;}
.wrap .result-side .txt-area {position:relative; text-align:right;}
.wrap .result-side .txt-area input[type='radio'] {position:absolute; top:0; left:-9999px;}
.wrap .result-side .txt-area .option-wrap {position:absolute; top:5px; right:20px;}
.wrap .result-side .txt-area input[type='radio']:checked + label {color:#dddedf; background:#263238;}
.wrap .result-side .txt-area label {display:inline-block; padding:5px 10px; border:1px solid #263238; font-size:20px; background:#fff; cursor:pointer;
```

```javascript
$(function(){
  var currentOption = localStorage.getItem('resultOption');

  $('#' + currentOption).prop('checked', true);

  $('.original-side textarea').keyup(function(){
    resultWrite($(this), currentOption);
  })

  $('.option-wrap input[type=radio]').change(function(){
    var checked = $(this).parent().find('input[type=radio]:checked').attr('id');
    localStorage.setItem('resultOption', checked);
    currentOption = localStorage.getItem('resultOption')
    resultWrite($('.original-side textarea'), currentOption)
  })

  resultWrite($('.original-side textarea'), currentOption);
});

function originalFunc($this, thisValue) {
  $this.parent().next('.viewport').html(thisValue);
};

function resultWrite($this, currentOption) {
  var thisValue = $this.val();
  if (thisValue == null || thisValue == '') {
    $('.result-side textarea').val('');
    $('.viewport').html('');
  } else {
    originalFunc($this, thisValue);
    resultFunc($this, thisValue, currentOption);
  }
}

function resultFunc($this, thisValue, currentOption) {
  var style =
      '<style type="text/css">'
  +'	.hasmap-wrap {display:block; position:relative;}'
  +'	.hasmap-wrap img {width:100%;}'
  +'	.hasmap-wrap a {position:absolute; display:block; font:0/0 a;}'
  +'</style>';
  $('.result-side .viewport').html(style + thisValue)//.html(style + thisValue)
  $('.result-side map').each(function(){
    var thisName = $(this).attr('name'); // map 의 name값
    var $findImg = $('.result-side img[usemap="#' + thisName + '"]'); // 해당 map을 참조하는 이미지

    $($findImg).each(function(){
      var $this = $(this);
      var newImage = new Image();

      newImage.src = $this.attr('src');
      $this.wrap('\n<div class="hasmap-wrap" />'); // wrap 생성

      if (currentOption == 'percent') {
        calPercent($this, thisName, newImage);
      } else if (currentOption == 'rem') {
        calRem($this, thisName, newImage);
      }

      $this.removeAttr('usemap'); // 이미지에서 usemap값 삭제
    });
  });
  $('.result-side map').remove(); // 문서에서 map 태그 삭제
  $('.result-side textarea').val($('.result-side .viewport').html().replace(/ border\=\"0\"/gi, '').replace(/\t/g, '').replace(/\n/g, '').replace('<img', '\n	<img').replace(/\<a href/g, '\n	<a href').replace('</div>', '\n</div>').replace(/\.hasmap/g,'\n	.hasmap').replace('</style>','\n</style>\n'));
}

function calPercent($this, thisName, newImage){
  $('.result-side .viewport').removeAttr('style');
  $('.result-side [name=' + thisName + '] area').each(function(){
    var thisHref = $(this).attr('href');
    var thisAlt = $(this).attr('alt');
    var coordsArray = $(this).attr('coords').split(','); // 좌표 배열
    var calLeft = ((coordsArray[0]/newImage.width)*100).toFixed(4) + '%'; // left값 계산
    var calTop = ((coordsArray[1]/newImage.height)*100).toFixed(4) + '%'; // top값 계산
    var calWidth = (((coordsArray[2] - coordsArray[0])/newImage.width)*100).toFixed(4) + '%'; // width값 계산
    var calheight = (((coordsArray[3] - coordsArray[1])/newImage.height)*100).toFixed(4) + '%'; // height값 계산

    if (thisAlt == null || thisAlt == '') { thisAlt = 'alt없음'; };
    $this.closest('.hasmap-wrap').append('<a href="' + thisHref + '" style="' + 'left:' + calLeft + '; top:' + calTop + '; width:' + calWidth + '; height:' + calheight + ';">' + thisAlt + '</a>'); // a태그 생성
  });
}

function calRem($this, thisName, newImage){
  $('.result-side .viewport').css('width', newImage.width);
  $('.result-side [name=' + thisName + '] area').each(function(){
    var thisHref = $(this).attr('href');
    var thisAlt = $(this).attr('alt');
    var coordsArray = $(this).attr('coords').split(','); // 좌표 배열
    var calLeft = coordsArray[0]/20 + 'rem'; // left값 계산
    var calTop = coordsArray[1]/20 + 'rem'; // top값 계산
    var calWidth = (coordsArray[2] - coordsArray[0])/20 + 'rem'; // width값 계산
    var calheight = (coordsArray[3] - coordsArray[1])/20 + 'rem'; // height값 계산

    if (thisAlt == null || thisAlt == '') { thisAlt = 'alt없음'; };
    $this.closest('.hasmap-wrap').append('<a href="' + thisHref + '" style="' + 'left:' + calLeft + '; top:' + calTop + '; width:' + calWidth + '; height:' + calheight + ';">' + thisAlt + '</a>'); // a태그 생성
  });
}
```