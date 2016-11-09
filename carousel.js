// 缩略图指示器
var insertImg = function(images) {
    var url = images[0]
    $('.gua-slide-images').append(`<img class='gua-slide-img gua-slide-active' src="${url}" alt="" />`)
    for (var i = 1; i < images.length; i++) {
        url = images[i]
        $('.gua-slide-images').append(`<img class='gua-slide-img' src="${url}" alt="" />`)
    }

    var indicator = 1
    $('.gua-slide-indicators').append(`<div class="gua-slide-i gua-slide-i-active">${indicator}</div>`)
    for (var i = 2; i <= images.length; i++) {
        indicator = i
        $('.gua-slide-indicators').append(`<div class="gua-slide-i">${indicator}</div>`)
    }
}
var insertThumbnail = function(images) {
    var thumbnails = `
        <div class="gua-slide-thumbnails">
        </div>
        `
    $('body').append(thumbnails)
    for (var i = 0; i < images.length; i++) {
        var url = images[i]
        $('.gua-slide-thumbnails').append(`<img class='gua-slide-thumbnail' src="${url}" alt="" />`)
    }
}
var addEventThumbnailClick = function() {
    $('.gua-slide-thumbnails').on('click', function(event){
        var thumbnail = $(event.target)
        log('thumbnail-->', thumbnail)
        // 取出当前坐标，即为图片应该播放的图片
        var index = thumbnail.index()
        log('index-->', index)
        // 被点击的缩略图opacity=0.5
        thumbnail.fadeTo(100, 0.5, function(){
            thumbnail.fadeTo(100, 1)
        })
        // 使相应图片显示
        var imgCurrent = $('.gua-slide-active')
        imgCurrent.fadeOut()
        imgCurrent.removeClass('gua-slide-active')
        var imgNext = $($('.gua-slide-img')[index])
        imgNext.addClass('gua-slide-active')
        imgNext.fadeIn()
    })
}
// 作业 4
//
// 用一个函数传递图片 URL 参数来创建一个 slide
// 函数如下
var images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
]
var element = `
<div class="gua-slide">
    <div class="gua-slide-images" data-active="0" data-imgs='3'>

        <button class='gua-slide-button gua-slide-button-left vertical-center' type="button">上</button>
        <button class='gua-slide-button gua-slide-button-right vertical-center' type="button">下</button>
    </div>
    <div class="gua-slide-indicators">

    </div>
</div>
`
var GuaSlide = function(element, images) {
    /*
    element 是一个 div 容器, DOM 类型, 创建的 slide 就 append 到这个容器中
    images 是一个包含了图片地址的 array
    */
    $('body').append(element)
    insertImg(images)
    addEventButtonClick()
    addEventIndicatorClick()
    addEventIndicatorMEnter()
}

// 左右按钮切换
var addEventButtonClick = function() {
    $('.gua-slide-button').on('click', function(event){
        var button = $(event.target)
        if (button.hasClass('gua-slide-button-left')) {
            playPrev()
        } else {
            playNext()
        }
    })
}
// 底部指示器点击切换
var addEventIndicatorClick = function() {
    $('.gua-slide-indicators').on('click', function(event){
        var indicator = $(event.target)
        // 取出当前坐标，即为图片应该播放的图片
        var index = indicator.index()
        // 将此下标的红色，其他蓝色
        $('.gua-slide-i-active').removeClass('gua-slide-i-active')
        indicator.addClass('gua-slide-i-active')
        // 使相应图片显示
        var imgCurrent = $('.gua-slide-active')
        imgCurrent.fadeOut()
        imgCurrent.removeClass('gua-slide-active')
        var imgNext = $($('.gua-slide-img')[index])
        imgNext.addClass('gua-slide-active')
        imgNext.fadeIn()
    })
}
// 指示器鼠标移入，切换
var addEventIndicatorMEnter = function() {
    $('.gua-slide-i').mouseenter(function(event){
        var indicator = $(event.target)
        // 取出当前坐标，即为图片应该播放的图片
        var index = indicator.index()
        // 将此下标的红色，其他蓝色
        $('.gua-slide-i-active').removeClass('gua-slide-i-active')
        indicator.addClass('gua-slide-i-active')
        // 使相应图片显示
        var imgCurrent = $('.gua-slide-active')
        imgCurrent.fadeOut()
        imgCurrent.removeClass('gua-slide-active')
        var imgNext = $($('.gua-slide-img')[index])
        imgNext.addClass('gua-slide-active')
        imgNext.fadeIn()
    })
}
var insertImg = function(images) {
    var url = images[0]
    $('.gua-slide-images').append(`<img class='gua-slide-img gua-slide-active' src="${url}" alt="" />`)
    for (var i = 1; i < images.length; i++) {
        url = images[i]
        $('.gua-slide-images').append(`<img class='gua-slide-img' src="${url}" alt="" />`)
    }

    var indicator = 1
    $('.gua-slide-indicators').append(`<div class="gua-slide-i gua-slide-i-active">${indicator}</div>`)
    for (var i = 2; i <= images.length; i++) {
        indicator = i
        $('.gua-slide-indicators').append(`<div class="gua-slide-i">${indicator}</div>`)
    }
}
var log = function() {
    console.log.apply(console, arguments)
}
var play = function(offset) {
    var activeIndex = $('.gua-slide-images').data('active')
    var numberOfImgs = $('.gua-slide-images').data('imgs')
    var i = (activeIndex + numberOfImgs + offset) % numberOfImgs
    $('.gua-slide-images').data('active', i)
    //
    $('.gua-slide-active').fadeOut()
    $('.gua-slide-active').removeClass('gua-slide-active')
    //
    var active = $($('.gua-slide-img')[i])
    active.addClass('gua-slide-active')
    active.fadeIn()
    // 改变指示器
    $('.gua-slide-i-active').removeClass('gua-slide-i-active')
    var activeIndicator = $($('.gua-slide-i')[i])
    activeIndicator.addClass('gua-slide-i-active')
}
var playPrev = function() {
    play(-1)
}
var playNext = function() {
    play(1)
}
