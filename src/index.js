import * as Rx from 'rxjs/Rx';

window.Rx = Rx;

function complete(target) {
	return Rx.Observable.create(observer => {
		if(target.complete) {
			observer.next(target);
			observer.complete();
		}
		else {
			target.onload = () => {
				observer.next(target);
				observer.complete();
			}

			target.onerror = err => 
				observer.error(err);
		}
	})
}

function loadImage(url) {
	const img = document.createElement('img');
	img.src = url;

	return complete(img);
}

const onComplete = () => console.log('COMPLETE');

const windowReady$ = complete(window)


function initMouseEventStreams(img) {
	const mouseDown$ = Rx.Observable
			.fromEvent(img, 'mousedown')
			.do(e => e.preventDefault())

		, mouseMove$ = Rx.Observable
			.fromEvent(document.body, 'mousemove')

		, mouseUp$ = Rx.Observable
			.fromEvent(document.body, 'mouseup')

		, mouseDownAndUp$ = mouseDown$
			.flatMap(e => mouseUp$.take(1))

		, mouseEvent$ = mouseDown$
			.flatMap(() => mouseMove$.takeUntil(mouseUp$));

	return mouseEvent$.merge(mouseDown$, mouseDownAndUp$);
}

function addMouseEvents() {
	
}

const t$ = windowReady$.map(() => document.querySelector('#target_img'))
	.flatMap(img => initMouseEventStreams(img))
	.do(mouseEventStream => addMouseEvents())
	.map(e => ({type: e.type, x: e.clientX, y: e.clientY}))
	.subscribe(console.log, null, onComplete);


