fis3-preprocessor-cssspace
=============================

使用说明示例

## fis3配置，fis-conf.js
```
  fis.match('/widget/**.{vm,scss,js}', {
    preprocessor: fis.plugin('cssspace')
  });
```

## CSS或Scss等
```
  css里所有的class和id名都会加上前缀
```

## HTML模板中
```
  html文件里这么写，在class和id中，以@开头代表使用本模块目录下的css文件里的样式名，@会替换为前缀
  <div class="@logo"></div>
  <div class="logo-sub" id=' @logo-sub'></div>
```

### 其它文件
```
  除css外的其它文件里，用 @MD-NAME 会被替换为前缀，方便在js里使用。
  var prev = "@MD-NAME";
  $("." + prev + "logo")
  ES6：$(`.${prev}logo`)
```
