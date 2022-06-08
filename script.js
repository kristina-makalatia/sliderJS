// ეს არის ჩვენი დატა მასივი, რომ დინამიურად წამოვიღოთ სლაიდების სურათები და ტექსტები
let data = [
    {
        id: 1,
        imageUrl: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
        title: 'Image Title 1',
        url: 'https://google.com'
    },
    {
        id: 2,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        title: 'Image Title 2',
        url: 'https://google.com'
    },
    {
        id: 3,
        imageUrl: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg',
        title: 'Image Title 3',
        url: 'https://google.com'
    },
    {
        id: 4,
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        title: 'Image Title 4',
        url: 'https://google.com'
    }
]


// ცალკე ცვლადებში ვინახავთ ჩვენს ელემნტებს
let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let dotItem = document.getElementsByClassName('dot');

let sliderIndex = 0;


// ამ ფუნქიის საშუალებით ვქმნის ა ტეგს
function createAtag(item) {
    let tag = document.createElement('a');
    tag.setAttribute('href', item.url);
    tag.classList.add('slide');

    return tag;
}


// ამ ფუნქცციის საშუალებით ვქმნით სურათს
function createImgtag(item) {
    let tagImage = document.createElement('img');
    tagImage.setAttribute('src',item.imageUrl);
    tagImage.setAttribute('alt', item.title);
    tagImage.classList.add('image-slider');

    return tagImage;
}

// ამ ფუნქციის საშუალებით ვქმნით სათაურის ტეგს
function createH2tag(item) {
    let tagTitle = document.createElement('h2');
    tagTitle.textContent = item.title;
    // tagTitle.append(item.title);
    tagTitle.classList.add('title-slider');

    return tagTitle;
}


// ამ ფუნქციის საშუალებით ვქმნით ბურთულებს
function createDots(item) {
    let dots = document.createElement('div');
    dots.classList.add('dots-wraper');

// დატა მასივს გადვუვლით ციკლის საშუალებით, რომ იმდენი ბურთულა სეაიმნას რამდენი სლაიდიც გვექნება ჩვენს მასივში
    data.forEach( (element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id - 1);

        dot.onclick = function(event) {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlide();
        }
        dots.appendChild(dot);

    })
    return dots;

}


//  ეს არის ჩვენი მთავარი ფუნქცია, რომელიც იძახებს დანარჩენ პატარა ფუნქციებს
function setSlide() {
    sliderContent.innerHTML = '';
    let slideItem = createAtag(data[sliderIndex]);
    let imgTag = createImgtag(data[sliderIndex]);
    let h2Tag = createH2tag(data[sliderIndex]);
    let dots = createDots();

    slideItem.appendChild(imgTag);
    slideItem.appendChild(h2Tag);
    sliderContent.appendChild(slideItem);
    sliderContent.appendChild(dots);
    currentDotActive();

    console.log(slideItem);
}

// აქტიური ბურთულა რომ იყოს სხვა ფერის
function currentDotActive() {
    dotItem[sliderIndex].classList.add('active');
}

// ფუნქციაში აღწერილია რა უნდა  მოხდეს როცა დავაწვები previuos ისარს
function arrowLeftClickSlider() {
    if (sliderIndex == 0) {
        sliderIndex = data.length -  1;
        setSlide();
        return;
    }
    sliderIndex--;
    setSlide();
}

// ფუნქციაში აღწერილია რა უნდა  მოხდეს როცა დავაწვები next ისარს
function arrowRightClickSlider() {
    if (sliderIndex == data.length - 1) {
        sliderIndex = 0;
        setSlide();
        return;
    }
    sliderIndex++;
    setSlide();
}


// ქლიქის დროს ვიძახებ ფუნქციებს
arrowLeft.addEventListener('click', arrowLeftClickSlider);

arrowRight.addEventListener('click',arrowRightClickSlider);


// თავისით რომ გადავიდეს ახალ სლაიდზე 3 წამშ ერთხელ
// setInterval( () => {
//     arrowRightClickSlider();
// }, 3000);


setSlide();
