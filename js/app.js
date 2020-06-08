'use strict';

let globalCache = [];
let allKeywords = [];
// let pageChoice = 'Page1';

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

// Replaced with template function
// HornImage.prototype.render = function () {
//     let template = $('#photo-template').html();
//     let $hornsClone = $('<section></section>');

//     $('main').append($hornsClone);
//     $hornsClone.html(template);
//     $hornsClone.find('h2').text(this.title);
//     $hornsClone.find('img').attr('src', this.image_url);
//     $hornsClone.find('p').text(this.description);
//     $hornsClone.attr('data-keyword', this.keyword);
// }



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

// Renders using mustache.js
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
        method: 'get',// method: 'get' doesn't need to be deffered, it goes straight to success
        dataType: 'json'
    })
        .then(data => {
            console.log('this is data', data);
            data.forEach(horns => {
                console.log('this is horns', horns);
                new HornImage(horns);
            });
            console.log('this is global cache', globalCache);
            // globalCache.forEach(item => {
            //     item.render();
            // });
            console.log('this is all key words array', allKeywords);
            render(globalCache);
            addDropDownOptions();
            $('#filterOptions').on('change', function () {
                //this.value is the value of filterOption after change.
                // get an array of elements that have class show ie all our divs.
                let array = $('.show').get();
                // itterate over array
                array.forEach(ele => {
                    //remove display style for each element.
                    ele.style.display = '';
                    // ele.attributes['data-keyword'].value is the value of the data-keyword attribute
                    // for each element compare the data-keyword attribute to this.value
                    if (ele.attributes['data-keyword'].value !== this.value) {
                        //match change display style to none. BOOM!
                        ele.style.display = 'none';
                    }
                });
            });
        });
}

$('#pageSelect').on('change', function () {
    let pageValue = $('#pageSelect').children('option:selected').val();
    console.log(pageValue);
    $('#target').html('');
    $('#filterOptions').html('');
    getData(pageValue)


})

getData('page-1');
// HornImage.readJson = () => {
    // if (page === 'Page1') {
    //     dataBaseCache = 'data/page-1.json';
    // } else {
    //     dataBaseCache = 'data/page-2.json';
    // }

// }  
//   $(() => HornImage.readJson());//anonymous function