	const preprocessor = 'less';
	
	const { src, dest, parallel, series, watch } = require('gulp');
	const rename                                 = require('gulp-rename');
	const concat                                 = require('gulp-concat');
	const uglify                                 = require('gulp-uglify');
	const del                                    = require('del');
	const imagemin                               = require('gulp-imagemin');
	const pngquant                               = require('imagemin-pngquant');
	const cache                                  = require('gulp-cache');
	const spritesmith                            = require('gulp.spritesmith');
	const autoprefixer                           = require('gulp-autoprefixer');
	const cleanCSS                               = require('gulp-clean-css');
	const less                                   = require('gulp-less');
	const sass                                   = require('gulp-sass');
	const autoprefix                             = new less({ browsers: ['last 2 versions'] });
	const browserSync                            = require('browser-sync').create();
	
	/*Less*/
		const from_preprocessor = done => {
			return src([
					`./app/${ preprocessor }/main.${ preprocessor }`,
					`./app/${ preprocessor }/media.${ preprocessor }`,
				])
				.pipe(concat('main.css'))
				.pipe(eval(preprocessor)())
				.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
				.pipe(dest('./app/css'))
				.pipe(browserSync.stream())
				.on('end', () => {
					console.log('main.less та media.less об\'єднанні та уcпішно сконвертовані...');
				}) +
				done();
		};
		
		const from_preprocessor_libs = () => {
			return src(`./app/${ preprocessor }/libs.${ preprocessor }`)
				.pipe(eval(preprocessor)())
				.pipe(autoprefixer([
					'> 1%',
					'last 15 versions',
					'firefox >= 4',
					'safari 7',
					'safari 8',
					'IE 8',
					'IE 9',
					'IE 10',
					'IE 11'
				], { cascade: true }))
				.pipe(dest('./app/css'))
				.pipe(browserSync.stream())
				.on('end', () => {
					console.log('libs.less уcпішно сконвертовано...');
				});
		};
	/*Less/ */
	
	/*Browser sync*/
		const browser_sync = () => {
			browserSync.init({
				server: {
					baseDir: "./app"
				},
				notify: false,
				online: false
			});
			console.log('Сервер успішно запущено...');
		};
	/*Browser sync/ */
	
	/*Scripts*/
		const scripts = () => {
			return src([
	           './app/libs/jquery/dist/jquery.min.js',
	           './app/libs/bootstrap/dist/js/bootstrap.min.js',
	           './app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
	           './app/libs/fancybox/dist/jquery.fancybox.min.js',
	           './app/libs/owl.carousel/dist/owl.carousel.min.js',
           ])
           .pipe(concat('libs.min.js'))
           .pipe(uglify())
           .pipe(dest('./app/js'))
           .on('end', () => {
	           console.log('js-файли бібліотек для frontend успішно об\'єднанні та мініфіковані...');
           });
		};
	/*Scripts/ */
	
	/*Libs CSS*/
		const css_libs = () => {
			return src([
	           './app/css/libs.css',
	           './app/img/sprite.css',
	           './app/fonts/fonts.css',
           ])
           .pipe(concat('libs.css'))
           .pipe(cleanCSS({level: {1: {specialComments: 0}}} ))
           .pipe(rename({ suffix: '.min' }))
           .pipe(dest('./app/css'))
           .on('end', () => {
	           console.log('libs.css мініфікований...');
           });
		};
	/*Libs CSS/ */
	
	/*Watch*/
		const watch_func = () => {
			watch(`./app/${preprocessor}/**/*.${preprocessor}`, from_preprocessor);
			watch(`./app/${preprocessor}/**/libs.${preprocessor}`, from_preprocessor_libs);
			watch('./app/*.html').on('change', browserSync.reload);
			watch('./app/js/**/*.js').on('change', browserSync.reload);
			console.log('Відсліковування файлів активовано...');
		};
	/*Watch/ */
	
	/*Clean directory*/
		const clean = done => {
			return del.sync('dist') +
				console.log('Дерикторія dist вилучена...') +
				done();
		};
	/*Clean directory/ */
	
	/*Clear Cache*/
		const clear = done => {
			return cache.clearAll() +
				console.log('КЕШ успішно очищено...') +
				done();
		};
	/*Clear Cache/ */
	
	/*Sprite form images*/
		const sprite = () => {
			var spriteData = src('./app/img/sprite/*.png')
		                     .pipe(spritesmith({
			                     imgName: 'sprite.png',
			                     cssName: 'sprite.css'
		                     }));
			return spriteData.pipe(dest('./app/img/'))
            .on('end', () => {
				console.log('Спрайт успішно створено...');
			});
		};
	/*Sprite form images/ */
	
	/*Optimize*/
		const img = () => {
			return src('./app/img/**/*')
	           .pipe(imagemin({
		           interlaced : true,
		           progressive: true,
		           svgoPlugins: [{ removeViewBox: false }],
		           use        : [pngquant]
	           }))
	           .pipe(dest('dist/img'))
	           .on('end', () => {
		           console.log('Зображення успішно оптимізовані...');
	           });
		};
	/*Optimize/ */
	
	/*Build*/
		const build = () => {
			return src([
				'app/css/main.css',
				'app/css/libs.css',
				'app/js/**/*',
				'app/*.html'
			], {base: 'app'})
			.pipe(dest('dist'))
			.on('end', () => {
				console.log('Проєкт успішно зібрано...');
			});
		};
	/*Build/ */
	
	exports.watch                = watch_func;
	exports.browserSync          = browser_sync;
	exports.fromPreprocessor     = from_preprocessor;
	exports.fromPreprocessorLibs = from_preprocessor_libs;
	exports.cssLibs              = series(
		from_preprocessor,
		from_preprocessor_libs,
		css_libs
	);
	exports.scripts              = scripts;
	exports.clean                = clean;
	exports.clear                = clear;
	exports.sprite               = sprite;
	exports.img                  = img;
	exports.build                = parallel(
		clean,
		img,
		from_preprocessor,
		from_preprocessor_libs,
		scripts,
		build
	);
	exports.default = parallel(
		css_libs,
		scripts,
		sprite,
		browser_sync,
		watch_func
	);
