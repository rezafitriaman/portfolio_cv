const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const minify = require('gulp-minify');
const image = require('gulp-image');
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const tsProject = ts.createProject("tsconfig.json");
const watchify = require("watchify");
const buffer = require('vinyl-buffer');
const paths = {
    pages: ['src/*.html']
};

/*const port = 3000;
const watch = () => {
	browserSync.init({
        server: {
			baseDir: 'dist',
			proxy: "grqbge-nwx7013:3000",
			port: port
		}
    });

	gulp.watch(jsFiles, gulp.series('typescript'))


	gulp.watch(scssFiles, gulp.series('sass'))
		.on('change', reload);

	gulp.watch(htmlFiles, gulp.parallel('html'))
		.on('change', reload);

	gulp.watch(imageFiles, gulp.parallel('image'))
		.on('change', reload);
}*/

sass.compiler = require('node-sass');

//custom JS
const jsFiles = [
	'src/js/*.ts'
]

//custom SCSS
const scssFiles = [
	'src/scss/*.scss',
	'node_modules/bootstrap/scss/bootstrap.scss',
	'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
	'node_modules/@fortawesome/fontawesome-free/scss/regular.scss',
	'node_modules/@fortawesome/fontawesome-free/scss/solid.scss',
	'node_modules/@fortawesome/fontawesome-free/scss/brands.scss',
	'!src/scss/_hamburger.scss',
	'!src/scss/_var.scss',
	'!src/scss/_button.scss'
]

//custom HTML
const htmlFiles = [
	'src/*.html'
]

//vendor file CSS
const cssVendorFiles = [
	'node_modules/normalize\.css/normalize.css'
]

//vendor JS
const jsVendorFiles = [
	'node_modules/bootstrap/dist/js/bootstrap.min.js',
	'src/js/ease.min.js',
	'src/js/hamburger.js',
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/segment-js/dist/segment.min.js',
	'node_modules/gsap/src/minified/TweenLite.min.js',
	'node_modules/gsap/src/minified/TimelineLite.min.js',
	'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js'

]

//webfonts
const webfontsVendor = [
	'node_modules/@fortawesome/fontawesome-free/webfonts/*'
]

//image
const imageFiles = [
	'src/image/*'
]

//delete
const deleteAll = [
	'dist'
]

//task
/*gulp.task('image', function () {
	return gulp.src(imageFiles)
    .pipe(image())
    .pipe(gulp.dest('dist/image'))
});*/

//delted -------------------------------
/*gulp.task('typescript',  () => {
    return gulp.src(jsFiles)
    	.pipe(plumber())
	  	.pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: false,
        	target: "es2015",
        	module: "none"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});*/
//delted -------------------------------

/*gulp.task('typescript',  () => {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/js/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task('vendor:js', function() {
    return gulp.src(jsVendorFiles)
        .pipe(gulp.dest("dist/js"))
});

gulp.task('vendor:webfonts', function() {
    return gulp.src(webfontsVendor)
        .pipe(gulp.dest("dist/webfonts"))
});

gulp.task('vendor:css', function() {
    return gulp.src(cssVendorFiles)
        .pipe(gulp.dest("dist/css"))
});

gulp.task('sass', () => {
  	return gulp.src(scssFiles)
  		.pipe(plumber())
	  	.pipe(sourcemaps.init())
	  	.pipe(sourcemaps.identityMap())
	  	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	    .pipe(sass.sync().on('error', sass.logError))
	    .pipe(sourcemaps.write('.'))
	    .pipe(gulp.dest('dist/css'))
});

gulp.task('html', () => {
	return gulp.src(htmlFiles)
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:all', () => {
	return del(deleteAll);
});*/

//watch
/*gulp.task('browser', gulp.series('image', watch));*/

//serve
/*gulp.task('serve', gulp.series(
	'clean:all', 
	gulp.parallel(
		'typescript', 
		'sass',
		'html',
		'vendor:js',
		'vendor:webfonts',
		'browser',
	)
));*/

//default
/*gulp.task('default', gulp.series('serve'));*/

const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/js/main.ts'],
    cache: {},
    packageCache: {}
	})
	.plugin(tsify, { 
			"files": [
	        	"src/main.ts"
	    	],
	    	"compilerOptions": {
	        	"noImplicitAny": true,
	        	"target": "es2015"
	    }
	})
	.transform("babelify", {
		presets: ["@babel/preset-env"],
		extensions: ['.ts']
	})
);

const bundle = () => {
	console.log('bundel')
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/js"));
}


gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task('default', gulp.series('copy-html', bundle));
watchedBrowserify.on("update", bundle);




