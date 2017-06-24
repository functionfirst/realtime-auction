// load the plugins
var gulp 		= require('gulp');
var less 		= require('gulp-less');
var cleanCSS 	= require('gulp-clean-css');
var rename 		= require('gulp-rename');
var jshint 		= require('gulp-jshint');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var ngAnnotate 	= require('gulp-ng-annotate');
var nodemon 	= require('gulp-nodemon');

// define a task called css
gulp
	.task('css', css)
	.task('js', js)
	.task('scripts', scripts)
	.task('watch', watch)
	.task('default', monitor);

// grab the less file, process the LESS, save to style.css
function css() {
	return gulp.src('public/assets/css/style.less')
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(rename({ suffix : '.min' }))
		.pipe(gulp.dest('public/assets/css'));
};

function js() {
	return gulp.src(['server.js', 'public/app/*.js', '/public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
};

function scripts() {
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(ngAnnotate())
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));
};

function watch() {
	// watch less file and run the css task
	gulp.watch('public/assets/css/style.less', ['css']);

	// watch js files and run lint as well as js and script tasks
	gulp.watch(['server.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'scripts']);
}

// nodemon task
function monitor() {
	nodemon({
		script : 'server.js',
		ext : 'js less html'
	})
	.on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function() {
		console.log('Restarted!');
	})
}