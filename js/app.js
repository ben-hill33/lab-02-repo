'use strict';

let globalCache = [];
let allKeywords = [];

function HornImage(horns) {
    this.title = horns.title;
    this.image_url = horns.image_url;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;

    globalCache.push(this);
    addKeyWord(horns.keyword);
}


function addKeyWord(keyword) {
    if (!allKeywords.includes(keyword)) {
        allKeywords.push(keyword);
    }
}

function addDropDownOptions() {
    let $dropdown = $('#filterOptions');
    allKeywords.forEach(keyword => {
        let $newOption = $(`<option value = "${keyword}">${keyword}</option>`);
        $dropdown.append($newOption);
    })
}

function render(array) {
    array.forEach(horns => {
        let $template = $('#photo-template').html();
        let rendered = Mustache.render($template, horns);
        $('#target').append(rendered)
    });
};


function getData(page) {
    globalCache = [];
    allKeywords = [];
    $.ajax(`data/${page}.json`, {
        method: 'get',
        dataType: 'json'
    })
        .then(data => {
            data.forEach(horns => {
                new HornImage(horns);
            });
            render(globalCache);
            addDropDownOptions();
            $('#filterOptions').on('change', function () {
                let array = $('.show').get();
                array.forEach(ele => {
                    ele.style.display = '';
                    if (ele.attributes['data-keyword'].value !== this.value) {
                        ele.style.display = 'none';
                    }
                });
            });
        });
}

$('#pageSelect').on('change', function () {
    let pageValue = $('#pageSelect').children('option:selected').val();
    $('#target').html('');
    $('#filterOptions').html('');
    getData(pageValue)

})

getData('page-1');
