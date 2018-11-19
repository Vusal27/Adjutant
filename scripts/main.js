//// обработка кнопки show на 1200px
var show1200 = document.querySelector(".header__btn_show");
var search1200 = document.querySelector(".header__form_1200");

function toggleSearch1200() {
    search1200.classList.toggle('header__form_1200_active');
};
show1200.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleSearch1200();
});
document.addEventListener('click', function (e) {
    var target = e.target;
    var its_search1200 = target == search1200 || search1200.contains(target);
    var its_show1200 = target == show1200;
    var search1200_is_active = search1200.classList.contains('header__form_1200_active');
    if (!its_search1200 && !its_show1200 && search1200_is_active) {
        toggleSearch1200();
    }
});
// На 992px
var showMob = document.querySelector(".header__btnmob-show");
var search992 = document.querySelector(".header__formmob");

function toggleSearch992() {
    search992.classList.toggle('header__formmob_active');
};
showMob.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleSearch992();
});
document.addEventListener('click', function (e) {
    var target = e.target;
    var its_search992 = target == search992 || search992.contains(target);
    var its_showMob = target == showMob;
    var search992_is_active = search992.classList.contains('header__formmob_active');
    if (!its_search992 && !its_showMob && search992_is_active) {
        toggleSearch992();
    }
});
//// Обработка кнопки бургер
var burger = document.querySelector(".navr__burger");
var burgerMenu = document.querySelector(".navr__list");
var burgerMenuItem = document.querySelector(".navr__item");
var catalogBtn = document.querySelector(".navl__btn");
var catalogMenu = document.querySelector(".navl__list");
var form = document.querySelector(".header__formmobile");

burger.addEventListener('click', function() {
    toggleBurger();
});
function toggleBurger() {
    form.classList.toggle('header__formmobile_active');
    burgerMenu.classList.toggle('navr__list_active');
    burger.classList.toggle('navr__burger_active');
    if (catalogMenu.classList.contains('navl__list_active')) {
        catalogMenu.classList.remove('navl__list_active');
        burgerMenu.style.opacity=1;
        form.style.opacity=1;
        catalogBtn.classList.remove('navl__btn_active');
    }
};
burgerMenuItem.addEventListener('click', function() {
    goCatalog();
});
function goCatalog() {
    catalogBtn.classList.add('navl__btn_active');
    catalogMenu.classList.add('navl__list_active');
    form.style.opacity=0;
    burgerMenu.style.opacity=0;
}
//// Обработка кнопки Каталог
catalogBtn.addEventListener('click', function() {
    toggleCatalog();
});
function toggleCatalog() {
    catalogBtn.classList.toggle('navl__btn_active');
    catalogMenu.classList.toggle('navl__list_active');
    if (burger.classList.contains('navr__burger_active')) {
        form.classList.remove('header__formmobile_active');
        form.style.opacity=1;
        burger.classList.remove('navr__burger_active');
        burgerMenu.classList.remove('navr__list_active');
        burgerMenu.style.opacity=1;
    }
}
//// Фильтры
var filterBtns = document.querySelectorAll('.filter__title');
var filterLists = document.querySelectorAll('.filter__list');
var empty = document.querySelector('.empty');
var filterItems = document.querySelectorAll('.filter__item');
var iconRemove = document.querySelectorAll('.filter__icon_remove');
var iconArrow = document.querySelectorAll('.filter__icon_arrow');
//Обработка кнопки удаления фильтров
for (var remove of iconRemove) {
    remove.addEventListener('click', removeItems);
}
function removeItems() {
    target = event.target;
    title = target.parentNode;
    if (title.classList.contains('filter__title_remove')) {  
        for (const item of filterItems) {
            item.classList.remove('del');
            var titleData = title.getAttribute("data");
            iData = item.getAttribute("data");
            if (item.getAttribute("data") === titleData) {
                item.classList.remove('filter__item_active');

            }
        }
        title.classList.remove('filter__title_remove');
    }  
}
//Обработка кнопки открывающей список
for (var btn of filterBtns) {
    btn.addEventListener('click', toggleOpen);
}
function toggleOpen() {
    target = event.target.parentNode;
    sibling = target.nextElementSibling;
    var data = target.getAttribute("data");
    for (const btn of filterBtns) {
        if (btn !== target) {
            btn.classList.remove('filter__title_active');
            for (const list of filterLists) {
                if (list !== sibling) {
                    list.classList.remove('filter__list_active');
                    empty.classList.remove('empty_active');
                }
            }
        }
    } 
    if (target.classList.contains('filter__title_active')) {
        target.classList.remove('filter__title_active');
        filterLists[data].classList.remove('filter__list_active');
        empty.classList.remove('empty_active');
    }
    else {
        target.classList.add('filter__title_active');
        filterLists[data].classList.add('filter__list_active');
        empty.classList.add('empty_active');
    }
}
// Обработка клика на фильтр
for (var item of filterItems) {
    item.addEventListener('click', toggleActive);
}
function toggleActive() {
    target = event.target;
    main = target.parentNode.previousElementSibling;
    if (main.classList.contains('filter__title_remove') && target.classList.contains('filter__item_active')) {
        main.classList.remove('filter__title_remove');
        target.classList.toggle('filter__item_active');
        item.classList.remove('del');
    } else {
        for (var item of filterItems) {
            var filterAttr = item.getAttribute('filter');
            var array = ["8", "9", "10", "14"];
            for (const arr of array) {
                if (filterAttr === arr) {
                    item.classList.add('del');
                    main.classList.add('filter__title_remove');
                    target.classList.toggle('filter__item_active');
                }
            }
        }
    }
}

////Параллакс
$(window).scroll(function(){
    $('.info__pic').css({'background-position-y': $(window).scrollTop()/5-100})
});

//// Фиксация header
var header = document.querySelector(".header");
$(window).scroll(function(){
    var windowY = $(window).scrollTop();
  if(windowY > 40) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
});

//// Слайдер
var sliderList = document.querySelector(".slider__list");
var sliderItemWidth = document.querySelector(".slider__item").clientWidth;
var sliderNext = document.querySelector(".slider__btn_next");
var sliderPrev = document.querySelector(".slider__btn_prev");
var computed = getComputedStyle(sliderList);
var step = sliderItemWidth + 30;
var screenWidth = document.body.clientWidth;

sliderNext.addEventListener('click', function(e) {
    var currentLeft = parseInt(computed.left);
    if (screenWidth < 481 && newScreenWidth < 481) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft > -step*7) {
            sliderList.style.left = currentLeft - step + "px";
        }
    }
    if (screenWidth < 780) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft > -step*6) {
            sliderList.style.left = currentLeft - step + "px";
        }
    }
    if (screenWidth < 1041) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft > -step*5) {
            sliderList.style.left = currentLeft - step + "px";
        }
    }
    if (screenWidth < 1501) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft > -step*4) {
            sliderList.style.left = currentLeft - step + "px";
        }
    } else {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft > -step*2) {
            sliderList.style.left = currentLeft - step + "px";
        }
    }
});

sliderPrev.addEventListener('click', function(e) {
    var currentLeft = parseInt(computed.left);
    if (screenWidth < 481) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft < 0) {
            sliderList.style.left = currentLeft + step + "px";
        }
    }
    if (screenWidth < 780) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft < 0) {
            sliderList.style.left = currentLeft + step + "px";
        }
    }
    if (screenWidth < 1041) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft < 0) {
            sliderList.style.left = currentLeft + step + "px";
        }
    }
    if (screenWidth < 1501) {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft < 0) {
            sliderList.style.left = currentLeft + step + "px";
        }
    } else {
        if (!currentLeft) {
            currentLeft = 0;
        }
        if (currentLeft < 0) {
            sliderList.style.left = currentLeft + step + "px";
        }
    }
});
// Изменение шага прокрутки при resize
$(window).resize(function() {
    if (sliderItemWidth != $('.slider__item').width()) {
      var currentSliderItemWidth = $(".slider__item").width();
      var newScreenWidth = $(window).width();
      var newStep = currentSliderItemWidth + 60;

    sliderNext.addEventListener('click', function(e) {
        var currentLeft = parseInt(computed.left);
        if (newScreenWidth < 481) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft > -newStep*7+2) {
                sliderList.style.left = currentLeft - newStep + "px";
                console.log(newStep);
                
            }
        }
        if (newScreenWidth < 780) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft > -newStep*6+2) {
                sliderList.style.left = currentLeft - newStep + "px";
            }
        }
        if (newScreenWidth < 1041) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft > -newStep*5+2) {
                sliderList.style.left = currentLeft - newStep + "px";
            }
        }
        if (newScreenWidth < 1501) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft > -newStep*4+2) {
                sliderList.style.left = currentLeft - newStep + "px";
            }
        } else {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft > -newStep*2+2) {
                sliderList.style.left = currentLeft - newStep + "px";
            }
        }
    });
    
    sliderPrev.addEventListener('click', function(e) {
        var currentLeft = parseInt(computed.left);
        if (newScreenWidth < 481) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft < 0) {
                sliderList.style.left = currentLeft + newStep + "px";
            }
        }
        if (newScreenWidth < 780) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft < 0) {
                sliderList.style.left = currentLeft + newStep + "px";
            }
        }
        if (newScreenWidth < 1041) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft < 0) {
                sliderList.style.left = currentLeft + newStep + "px";
            }
        }
        if (newScreenWidth < 1501) {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft < 0) {
                sliderList.style.left = currentLeft + newStep + "px";
            }
        } else {
            if (!currentLeft) {
                currentLeft = 0;
            }
            if (currentLeft < 0) {
                sliderList.style.left = currentLeft + newStep + "px";
            }
        }
    });
  }
});
//// Обработка события клик на пункт меню
var menuItems = document.querySelectorAll(".header__nav-link");
for (const it of menuItems) {
    it.addEventListener('click', activeMenu);
}
function activeMenu() {
    target = event.target;
    sibling = target.nextElementSibling;
    for (const it of menuItems) {
        if (it !== target) {
            it.classList.remove('header__nav-link_active');
        } else {
            it.classList.add('header__nav-link_active');
        }
    } 
}