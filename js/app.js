'use strict';

let globalCache = [];
let allKeywords = [];


// Constructor function
function HornImage(horns) {
    this.title = horns.title;
    this.image_url = horns.image_url;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;

    globalCache.push(this);
    addKeyWord(horns.keyword);
}


HornImage.prototype.render = function () {
    let template = $('#photo-template').html();
    let $hornsClone = $('<section></section>');

    $('main').append($hornsClone);
    $hornsClone.html(template);
    $hornsClone.find('h2').text(this.title);
    $hornsClone.find('img').attr('src', this.image_url);
    $hornsClone.find('p').text(this.description);
    $hornsClone.attr('data-keyword', this.keyword);
}

function addKeyWord(keyword) {
    if (!allKeywords.includes(keyword)) {
        allKeywords.push(keyword);
    }
}

function addDropDownOptions() {
    let $dropdown = $('select');
    allKeywords.forEach(keyword => {
        let $newOption = $(`<option value = "${keyword}">${keyword}</option>`);
        $dropdown.append($newOption);
    })
}


$.ajax('data/page-1.json', {
    method: 'get',
    dataType: 'json',
})
.then(horn => {
    horn.forEach(horns => {
        new HornImage(horns);
    });
    globalCache.forEach(item => {
        item.render();
    });
    addDropDownOptions();
    $('select').on('change', function() {
        $('section').hide();
        $('section').each((index, element) => {
            if (this.value === $(element).attr('data-keyword')) {
                $(element).show();
            };
        });
    });
});
