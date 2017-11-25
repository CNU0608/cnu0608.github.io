document.addEventListener('DOMContentLoaded', function () {
  var ias = $.ias({
    container: '.posts',
    item: '.post',
    pagination: '.pager-next-url',
    next: '.pager-next-url'
  })
  ias.on('loaded', function (data, items) {
    console.log('loaded:', items)
    if (window.MathJax) MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  })
  ias.extension(new IASSpinnerExtension({
    src: '/assets/img/loading.gif'
  }))
  ias.extension(new IASNoneLeftExtension({
    text: '只有这些了~',
    html: '<div class="ias-noneleft" style="text-align: center;">{text}</div>'
  }))

  $.get('/api/tags.json').done(function (tags) {
    var tagEls = tags
    .sort(function (lhs, rhs) {
      return rhs.count - lhs.count
    })
    .filter(function (tag) {
      return tag.count > 1
    })
    .map(function (tag) {
      return $('<a>', {
        class: 'tag',
        href: '/tags.html#' + tag.name
      }).html(tag.name + '(' + tag.count + ')')
    })
    $('.tag-list').append(tagEls)
  })
  var links = [{
    icon: 'fa-code-fork',
    url: 'https://gitee.com/chuangPeng',
    target: '_blank'
  }, {
    plugin: 'rss',
    url: 'http://searchuang.com/feed.xml',
    target: '_blank'
  }, {
    icon: 'fa-envelope',
    background: '#5484d6',
    url: 'mailto:cp9266@gmail.com?subject=来自彭创'
  }, {
    plugin: 'qrcode',
    title: '扫一扫！'
  }, {
    icon: 'fa-qq',
    background: '#5484d6',
    url: 'http://wpa.qq.com/msgrd?v=3&uin=734180379&site=qq&menu=yes',
    target: '_blank'
  }]
  socialShare($('.follow').get(0), links, {size: 'sm'})
})
