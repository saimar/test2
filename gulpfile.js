var gulp       = require('gulp')
var uglify     = require("gulp-uglify");
var browserify = require('browserify');
var sourcemaps = require("gulp-sourcemaps");
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var glob       = require('glob');
var  rename    = require('gulp-rename');
var  es        = require('event-stream');
var concat 	   = require('gulp-concat');
var dest = require('gulp-dest');

/*css variables*/
var sass = require('gulp-sass');
var path = require('path');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('default',[,'sass','browserifyApp','concatJsScripts']);


var devPath='./src/main/webapp/development';
var appPath='./src/main/webapp/resources/angularProject';
var globalPath='./src/main/webapp/resources/global';
var monitoreoPath='./src/main/webapp/resources/centroMonitoreo';


/*css*/
//gulp.task('sass', function () {
//  return gulp.src(devPath+'/sass/**/*.scss')
//    .pipe(sass().on('error', sass.logError))
//	.pipe(concatCss("bundle.css"))
//    .pipe(gulp.dest(dexPath+'/css/'));
//});

/*css*/
gulp.task('sass', function () {
  return gulp.src(appPath+'/sass/bundle.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(appPath+'/css/'));
});
/*css*/
gulp.task('minifyCss', ['sass'], function () {
	gulp.src(appPath+'/css/bundle.css')
    .pipe(minifyCSS())
    //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concatCss('bundle.min.css'))
    .pipe(gulp.dest(appPath+'/css/'));
	
});



// browserify all te app modules of the aplication
gulp.task('browserifyApp', function(done) {
	
	
	//console.log('Copiying HTML partial FILES');
	//copia los template HTML de las directivas y web components
	// gulp.src('./**/*.html', {cwd: devPath+'/jsDex/'})
	//.pipe(gulp.dest(dexPath+'/js/'));
	
	console.log('browserify modules');
            return browserify(appPath+'/js/app.js')
                .bundle()
                .pipe(source('appModules.js'))
                //.pipe(buffer())
				//.pipe(sourcemaps.init())
                //.pipe(uglify())
				//.pipe(sourcemaps.write())
                .pipe(gulp.dest(appPath+'/js_prod'));
                
});

//Minifica los archivos JS excluyendo los que incluyen el patron config y los copia en la carpeta del modulo
gulp.task('minifyJsDex', function(done) {
	console.log('minify all modules');
	
    glob(devPath+'/jsDex/**/!(config*)+(*.js)', function(err, files) {
	
        if(err) done(err);
		
        var tasks = files.map(function(entry) {
          
          var destino=entry.replace(devPath+'/jsDex/','');
          console.log(destino); 
		  
		  destino=destino.substring(0,destino.lastIndexOf('/')); 
          

            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                //.pipe(sourcemaps.init())
                //.pipe(uglify())
                
                .pipe(dest(':name.js', {foo: 'angular_prod'}))
                .pipe(gulp.dest(dexPath+'/js/'+destino));
            });
        es.merge(tasks).on('end', done);
    })
	
	console.log('Copiying HTML FILES');
	//copia los template HTML de las directivas y web components
	 gulp.src('./**/*.html', {cwd: devPath+'/jsDex/'})
	.pipe(gulp.dest(dexPath+'/js/'));
});

//Minifica los archivos JS excluyendo los que incluyen el patron config y los copia en la carpeta del modulo

//Falta incluir tarea que copie los archivos HTML de partials
gulp.task('minifyJsCore', function(done) {
	console.log('minify all modules');
	
    glob(devPath+'/jsCore/**/!(config*)+(*.js)', function(err, files) {
	
        if(err) done(err);
        //var destino='';
       

        var tasks = files.map(function(entry) {
          
          var destino=entry.replace(devPath+'/jsCore/','');
          console.log(destino); 
		  
		  destino=destino.substring(0,destino.lastIndexOf('/')); 
          

            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(dest(':name.js', {foo: 'noUSADO'}))
                .pipe(gulp.dest(globalPath+'/js/'+destino));
            });
        es.merge(tasks).on('end', done);
    })
	console.log('Copiying HTML FILES');
	//copia los HTML del origen a la carpeta de global
	 gulp.src('./**/*.html', {cwd: devPath+'/jsCore/'})
	.pipe(gulp.dest(globalPath+'/js/'));
	
});

var pluginPath=appPath+'/plugins/pld';


//concatenate all the libraries used for the proyect
gulp.task('concatCoreScripts', function() {
	
	console.log('Concatenating all core Scripts');
	  					//core dependencies
	  return gulp.src([  pluginPath+'/jquery/dist/jquery.min.js',//listo
	                     pluginPath+'/bootstrap/dist/js/bootstrap.min.js',//listo
	                     //Angular dependencies
	                    pluginPath+'/angular/angular.min.js',//listo
	                    pluginPath+'/angular/angular-sanitize.min.js',
	                    //pluginPath+'/angular/angular-touch.min.js',//The ngTouch module provides touch events and other helpers for touch-enabled devices. The implementation is based on jQuery Mobile touch event handling (jquerymobile.com).See $swipe for usage
	                    pluginPath+'/angular/angular-animate.min.js',
						pluginPath+'/angular/activity-monitor.min.js',//listo
						pluginPath+'/angular-breadcrumb/dist/angular-breadcrumb.min.js',//listo
	                    pluginPath+'/oclazyload/dist/ocLazyLoad.min.js',
	                    pluginPath+'/angular-ui-router/release/angular-ui-router.min.js',//listo
	                    pluginPath+'/angular-loading-bar/build/loading-bar.min.js',
	                    pluginPath+'/ng-dialog/js/ngDialog.min.js',
						pluginPath+'/jquery-nicescroll/jquery.nicescroll.min.js',//nice scroll on menu lateral //listo
						pluginPath+'/jquery.easy-autocomplete/jquery.easy-autocomplete.min.js',//busqueda de menus en bara superior//listo
						pluginPath+'/bootstrap-datepicker-vitalets/js/bootstrap-datepicker.js'//calendario de la aplicacion
						])
	    .pipe(concat('corePlugins.js'))
	    .pipe(gulp.dest(appPath+'/js_prod/'));
	});

// concatenate all the libraries used for the proyect
/*gulp.task('concatCoreScripts', function() {
	
	console.log('Concatenating all core Scripts');
	  					// core dependencies
	  return gulp.src([  pluginPath+'/jquery/dist/jquery.min.js',
	                     // pluginPath+'/jquery-cookie/jquery.cookie.js',
	                     pluginPath+'/bootstrap/dist/js/bootstrap.min.js',
	                     // pluginPath+'/ionsound/js/ion.sound.min.js',
	                     // pluginPath+'/bootbox/bootbox.js',
	                     // pluginPath+'/retina.js/dist/retina.min.js',
	                     // pluginPath+'/cargaArchivo/holder.js',
	                     // pluginPath+'/cargaArchivo/jasny-bootstrap.fileinput.min.js',   
	                     // pluginPath+'/file-saver/fileSaver.js',
	                     // Centro de monitoreo dependencies
	                     // pluginPath+'/underscore/underscore-min.js',
	                     // pluginPath+'/backbone/backbone.js',
	                     // pluginPath+'/backbone/BackBoneModels.js',
	                     // pluginPath+'/backbone/BackBoneCollections.js',
	                     // pluginPath+'/backbone/BackBoneViews.js',
	                     // pluginPath+'/highcharts-4.1.5/highcharts.js',
	                     // pluginPath+'/highcharts-4.1.5/highcharts-more.js',
	                     // pluginPath+'/highcharts-4.1.5/themes/grid-light.js',
	                     // monitoreoPath+'/js/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js',                                  
	                	 // monitoreoPath+'/js/d3.v3.min.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/mexicoMap.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/guatemalaMap.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/salvadorMap.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/peruMap.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/hondurasMap.js',
	                	 // monitoreoPath+'/js/jquery-jvectormap/maps/panamaMap.js',
	                     // Angular dependencies
	                    pluginPath+'/angular/angular.min.js',
	                    pluginPath+'/angular/angular-sanitize.min.js',
	                    // pluginPath+'/angular/angular-touch.min.js',//The ngTouch module provides touch events and other helpers for touch-enabled devices. The implementation is based on jQuery Mobile touch event handling (jquerymobile.com).See $swipe for usage
	                    pluginPath+'/angular/angular-animate.min.js',
						pluginPath+'/angular/activity-monitor.min.js',
						pluginPath+'/angular-breadcrumb/dist/angular-breadcrumb.min.js',
	                    // pluginPath+'/oclazyload/dist/ocLazyLoad.min.js',
	                    pluginPath+'/angular-ui-router/release/angular-ui-router.min.js',
	                    // pluginPath+'/angular-loading-bar/build/loading-bar.min.js',
	                    pluginPath+'/ng-dialog/js/ngDialog.min.js',
						pluginPath+'/jquery-nicescroll/jquery.nicescroll.min.js',//nice scroll on menu lateral
						pluginPath+'/jquery.easy-autocomplete/jquery.easy-autocomplete.min.js',//busqueda de menus en bara superior
						pluginPath+'/bootstrap-datepicker-vitalets/js/bootstrap-datepicker.js'//calendario de la aplicacion
						
						])
	    .pipe(concat('corePlugins.js'))
	    .pipe(gulp.dest(appPath+'/js_prod/'));
	});*/
	
	gulp.task('concatCMScripts', function() {
	
	console.log('Concatenating all Monitoreo Center Scripts');
	  					//core dependencies
	  return gulp.src([ 
	                     /*Centro de monitoreo dependencies*/
	             
						 monitoreoPath+'/js/plugin/jquery.number.js',
                         monitoreoPath+'/js/plugin/jquery.animateNumber.min.js',
						 
						 pluginPath+'/underscore/underscore-min.js',
	                     pluginPath+'/backbone/backbone.js',
	                     pluginPath+'/backbone/BackBoneModels.js',
	                     pluginPath+'/backbone/BackBoneCollections.js',
	                     pluginPath+'/backbone/BackBoneViews.js',
	                     pluginPath+'/highcharts-4.1.5/highcharts.js',
	                     pluginPath+'/highcharts-4.1.5/highcharts-more.js',
	                     pluginPath+'/highcharts-4.1.5/themes/grid-light.js',
						 pluginPath+'/highcharts-4.1.5/modules/solid-gauge.js',
	                     monitoreoPath+'/js/jquery-jvectormap/jquery-jvectormap-1.2.2.min.js',                                  
	                	 monitoreoPath+'/js/d3.v3.min.js',
						 
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/mexicoMap.js',
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/guatemalaMap.js',
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/salvadorMap.js',
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/peruMap.js',
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/hondurasMap.js',
	                	 monitoreoPath+'/js/jquery-jvectormap/maps/panamaMap.js',
						 
						 monitoreoPath+'/js/jquery-jvectormap/jvectormap-pld.js',
                         monitoreoPath+'/js/chartjs/chart.min.js',
                         monitoreoPath+'/js/chartist-js/chartist.min.js',
                         monitoreoPath+'/js/plugin/jquery.vticker.min.js',
                         monitoreoPath+'/js/justgage/raphael-2.1.4.min.js',
                         monitoreoPath+'/js/justgage/justgage.js',
	                    
						])
	    .pipe(concat('cmPlugins.js'))
	    .pipe(gulp.dest(appPath+'/js_prod/'));
	});

