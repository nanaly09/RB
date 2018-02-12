# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6

<pre>
>This is a first blockqute.
>>This is a second blockqute.
>>>This is a third blockqute.
</pre>

~~~javascript
	var lpayLayerFlag = true, // 레이어 컨트롤 함수
		lpayLayerFunc = function(){
			dafaultSet = {
				target : $('.lpay-layer-wrap')
			},
			_lpayLayerFunc = {
				open : function(){
					dafaultSet.target.addClass('active'); // 레이어 켬
					lpayLayerFlag = false;
					bgFixFunc.fix(); // 화면고정
					$('body').append('<div class="lpay-dim"></div>'); // 딤 추가
				},
				close : function(){
					dafaultSet.target.removeClass('active'); // 레이어 끔
					lpayLayerFlag = true;
					bgFixFunc.cancel(); // 화면고정 해제
					$('.lpay-dim').remove(); // 딤삭제
				}
			};
		
		(lpayLayerFlag) ? _lpayLayerFunc.open() : _lpayLayerFunc.close();
	}
~~~