/**
 * Compile 阶段插件接口
 * @param  {string} content     文件内容
 * @param  {File}   file        fis 的 File 对象 [fis3/lib/file.js]
 * @param  {object} settings    插件配置属性
 * @return {string}             处理后的文件内容
 */

/**
 * fis-conf.js
 * fis.match('/widget/**.{vm,scss,js}', {
 *   preprocessor: fis.plugin('cssspace')
 * });
 */

/**
 * css里所有的class和id名都会加上前缀
 * 要匹配全局的样式，需要在给名称加前缀G_，如下匹配全局的.button。
 * .G_button
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

module.exports = function (content, file, options) {
  var arr_path = file.subpathNoExt.split("/"),

      //模块名，作为命名空间
      module_name = arr_path[arr_path.length-2],

      //前缀
      prev = "MD-" + module_name + "-";

  if(file.isCssLike){
    content = content.replace(/([.#])(?=[^{}]*\{)/ig,"$1" + prev).
              replace(new RegExp('([.#])' + prev + 'G_', 'g'), '$1');
  }else {
    content = content.replace(/(?:id|class)\s*=\s*(["']?)([^\1]*?)\1/ig, function (n) {
      return n.replace(/@/g, prev);
    });
    content = content.replace(/@MD-NAME/g, prev);

    //基于vm模板时，给html中的widget标签添加index参数
    if(file.isHtmlLike){
      var i = 0;
      content = content.replace(/\#widget\((.*?)\)/ig, function(str, $1){
        i++;
        return '#widget('+$1+' "var:MDINDEX='+i+'")';
      });
    }
  }
  return content;
}
