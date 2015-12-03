# fis3-preprocessor-cssspace
fis3插件，给模块的css添加模块名为前缀，相当于每个模块的css都在独立的命名空间里，简化模块内css命名的同时，解决css命名冲突的问题。

/**
 * fis-conf.js
 * fis.match('/widget/**.{vm,scss,js}', {
 *   preprocessor: fis.plugin('cssspace')
 * });
 */

/**
 * css里所有的class和id名都会加上前缀
 */

/**
 * html文件里这么写，在class和id中，以@开头代表使用本模块目录下的css文件里的样式名，@会替换为前缀
 * <div class="@logo"></div>
 * <div class="logo-sub" id=' @logo-sub'></div>
 */

/**
 * 除css外的其它文件里，用 @MD-NAME 会被替换为前缀，方便在js里使用。
 * var prev = "@MD-NAME";
 * $("." + prev + "logo")
 * ES6：$(`.${prev}logo`)
 */
