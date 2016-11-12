"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha       = require("gulp-mocha"),
    istanbul    = require("gulp-istanbul"),
    browserSync = require('browser-sync').create();
    
//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function() {
    return gulp.src([
        "source/**/**.ts",
        "test/**/**.test.ts"
    ])
    .pipe(tslint({ }))
    .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
            "source/**/**.ts",
            "typings/index.d.ts/",
            "source/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("source/"));
});
gulp.task("build-app-du", function() {
    return gulp.src([
            "source/app/**/**.ts",
            "source/lib/**/**.ts",
            "typings/index.d.ts/",
            "source/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("source/lib/"));
});
var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function() {
    return gulp.src([
            "test/**/*.ts",
            "typings/index.d.ts/",
            "source/interfaces/interfaces.d.ts"
        ])
        .pipe(tsc(tsTestProject))
        .js.pipe(gulp.dest("test/"));
});

gulp.task("build", function(cb) {
    runSequence(["build-app", "build-test"], cb);
});
gulp.task("build-du", function(cb) {
    runSequence(["build-app-du", "build-test"], cb);
});
//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function() {
    return gulp.src(['source/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function() {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha({ui: 'bdd'}))
        .pipe(istanbul.writeReports());
});

//******************************************************************************
//* realease
//******************************************************************************
var appPublishPathName="release";
var appSourcePathName="Booking";

var libraryName1 = "internationalfilght";
var outputFileName1 = libraryName1 + ".min.js";
var mainTsFilePath1 = "source/"+appSourcePathName+"/"+libraryName1+".js";

var libraryName2="domesticfilght";
var outputFileName2 = libraryName2 + ".min.js";
var mainTsFilePath2 = "source/"+appSourcePathName+"/"+libraryName2+".js";

var libraryName3="shiftrptofmajordomo";
var outputFileName3 = libraryName3 + ".min.js";
var mainTsFilePath3 = "source/"+appSourcePathName+"/"+libraryName3+".js";

var outputFolder   = appPublishPathName+"/"+appSourcePathName+"/dist/";
var outputRootFolder   = appPublishPathName+"/"+appSourcePathName+"/";
var outputComponentFolder   = appPublishPathName+"/"+appSourcePathName+"/dist/Component/";
 
var outputComponentFolderjs  = appPublishPathName+"/"+appSourcePathName+"/dist/shiftjs/";
 var durandaloutputFolder   = appPublishPathName+"/";
 /////////////////duranal
    var durandaloutputAppFolder   = appPublishPathName+"/app/";
    var durandaloutputCssFolder   = appPublishPathName+"/css/";
    var durandaloutputLibFolder   = appPublishPathName+"/lib/";
   var durandaloutputjsFolder   = appPublishPathName+"/js/";
   var durandaloutputvendorFolder   = appPublishPathName+"/vendor/";
//var durandaloutputFolder   = appPublishPathName+"/";
gulp.task("bundle", function() {
   
   
   var bundler = browserify({
        debug: true,
        standalone : libraryName3
    });
  
    gulp.src("source/"+appSourcePathName+'/approot/*.html')
        .pipe(gulp.dest(outputRootFolder));
    gulp.src("source/"+appSourcePathName+'/component/*.html')
        .pipe(gulp.dest(outputComponentFolder));
     
    gulp.src("source/"+appSourcePathName+'/shiftjs/*.js')
        .pipe(gulp.dest(outputComponentFolderjs));
    gulp.src("source/"+appSourcePathName+'/*.js')
        .pipe(gulp.dest(outputFolder));
   
      gulp.src("source/"+appSourcePathName+'/*.json')
        .pipe(gulp.dest(appPublishPathName));
});
/////////////////duranal
gulp.task("bundle-du", function() {
   
   
   var bundler = browserify({
        debug: true,
        standalone : libraryName3
    });
      
    gulp.src("source/img/*.*")
        .pipe(gulp.dest(durandaloutputFolder+'/img'));
        
    gulp.src("source/cache.manifest")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/index.html")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/app.html")
        .pipe(gulp.dest(durandaloutputFolder));
     gulp.src("source/app.manifest")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/app/**")
        .pipe(gulp.dest(durandaloutputAppFolder));
     gulp.src("source/css/**")
        .pipe(gulp.dest(durandaloutputCssFolder));
     gulp.src("source/lib/**")
        .pipe(gulp.dest(durandaloutputLibFolder));
     gulp.src("source/js/**")
        .pipe(gulp.dest(durandaloutputjsFolder));
    gulp.src("vendor/**")
        .pipe(gulp.dest(durandaloutputvendorFolder));
       gulp.src("source/*.json")
        .pipe(gulp.dest(durandaloutputFolder));
     
     
});
//******************************************************************************
//* DEV SERVER for duarandal
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch-debug", ["default-du"], function () {
    
    browserSync.init({
        server: "./"+durandaloutputFolder 
        
    });
    //test2
    gulp.watch(["source/app.manifest",  "source/cache.manifest","source/css/**","source/**/**.json","source/*.html","source/**/**.ts","source/**/**.js","source/**/**/**","source/**/**.html", "test/**/*.ts"], ["default-du"]);
    gulp.watch(durandaloutputFolder+"/*.*").on('change', browserSync.reload); 
});


//******************************************************************************
//* DEV SERVER
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch", ["default"], function () {
    
    browserSync.init({
        server: "./"+appPublishPathName+"/"+appSourcePathName,
        startPath: "/"+currentStartpage
        
    });
    //test2
    gulp.watch([ "source/**/**.json","source/**/**.ts","source/**/**.js","source/**/**.html", "test/**/*.ts"], ["default"]);
    gulp.watch(appPublishPathName+"/"+appSourcePathName+"/dist/*.*").on('change', browserSync.reload); 
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
    runSequence("lint", "build", "test", "bundle-du", cb);
});
gulp.task("default-du", function (cb) {
    runSequence("lint", "build-du", "bundle-du", cb);
});
//******************************************************************************
//* durandal
//***
var durandal = require('gulp-durandal');
var durandalReleaseDir='durandalRelease'
var appdir='app'
gulp.task('durandal', function(){
  durandal({
         baseDir: 'source/app',   //same as default, so not really required.
         main: 'main.js',  //same as default, so not really required.
         output: 'main.js', //same as default, so not really required.
         almond: true,
         minify: true 

         })
         .pipe(gulp.dest(durandalReleaseDir+'/'+appdir));
   
    gulp.src("source/img/*.*")
        .pipe(gulp.dest(durandalReleaseDir+'/img'));
    gulp.src("source/index.html")
        .pipe(gulp.dest(durandalReleaseDir));
     gulp.src("source/app.html")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/app.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
     gulp.src("source/cache.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
     gulp.src("source/css/**")
        .pipe(gulp.dest(durandalReleaseDir+"/css"));
     gulp.src("source/lib/**")
       .pipe(gulp.dest(durandalReleaseDir+"/lib"));
     gulp.src("source/js/**")
       .pipe(gulp.dest(durandalReleaseDir+"/js"));
     gulp.src("vendor/**")
       .pipe(gulp.dest(durandalReleaseDir+"/vendor"));
     
       gulp.src("source/*.json")
        .pipe(gulp.dest(durandalReleaseDir));
     
 });
 //******************************************************************************
//* DEV SERVER for duarandal
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch-durandal", ["durandal"], function () {
    
    browserSync.init({
        server: "./"+durandalReleaseDir 
        
    });
    //test2
    gulp.watch([ "source/cache.manifest","source/app.manifest","source/**/**.json","source/*.html","source/**/**.ts","source/**/**.js","source/**/**.html", "test/**/*.ts"], ["durandal"]);
    gulp.watch(durandalReleaseDir+"/*.*").on('change', browserSync.reload); 
});
gulp.task("browse", function () {
    
    browserSync.init({
        server: "./"+appPublishPathName 
        
    });
    
});

