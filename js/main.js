'use strict';

$(document).ready(function () {
  // =====================-ACORDEON-=====================
  $('.accordion__title').click(function () {
    const panel = $(this).closest('.accordion__box');
    if (panel.hasClass('active')) {
      panel.removeClass('active');
    } else {
      $('.accordion__box').removeClass('active');
      panel.addClass('active');
    }
  });
  // =====================-ACORDEON-=====================

  // if ($('.wpm-select').length) {
  //   $('.wpm-select').wpmSelect({
  //     placeholder: 'Select value',
  //     allowClear: false,
  //     search: false,
  //     autofocus: true,
  //     countryFlag: false,
  //     onInit: function (el) {
  //       console.log(el.val(), 'init');
  //     },
  //     onSelected: function (el) {
  //       console.log(el.val(), 'selected');
  //     },
  //     onClear: function (el) {
  //       console.log(el.val(), 'clear');
  //     },
  //   });
  // }
  // if ($('#sidebar').length) {
  //   var topSpacing = window.innerWidth <= 991 ? 88 : 20;
  //   var sidebar = new StickySidebar('#sidebar', {
  //       containerSelector: '#main-content',
  //       innerWrapperSelector: '.sidebar-inner',
  //       topSpacing: topSpacing,
  //       bottomSpacing: 20,
  //       minWidth: 768
  //   });
  // }
  /* header fixed top */
  let f = true;
  $(window).on('scroll', function () {
    let scrTop = $(window).scrollTop();
    let headerHeight = $('.header').height();
    if (scrTop > headerHeight && f) {
      f = false;
      $('.header').addClass('header_fixed');
      $('.section-1').css({
        marginTop: headerHeight,
      });
    } else if (scrTop <= headerHeight && !f) {
      f = true;
      $('.header').removeClass('header_fixed');
      $('.section-1').removeAttr('style');
    }
  });
  /* mobile check */
  // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // $('html, body').css('min-width', '1320px').addClass('mobile');
  // $('html').css('width', window.innerWidth + 'px');
  // }

  // menu-burger ----------------------------------

  $('.js-hamburger').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); // Остановить распространение события клика
    $(this).toggleClass('is-active');
    $('.header__menu').toggleClass('-active');
    $('body').toggleClass('locked');
  });

  // Код для закрытия меню при клике вне его области
  $(document).on('click', function (event) {
    // Проверяем, был ли клик вне меню и не на кнопке-гамбургере
    if (
      !$(event.target).closest('.header__menu').length &&
      !$(event.target).hasClass('js-hamburger')
    ) {
      // Закрываем меню
      $('.header__menu').removeClass('-active');
      $('.js-hamburger').removeClass('is-active');
      $('body').removeClass('locked');
    }
  });

  // menu-burger ----------------------------------

  // $(".send").on('click', function(e) {
  //   e.preventDefault();
  //   var form = $(this).parents("form");
  //   form.find("input").each(function() {
  //     var inp = $(this);
  //     var req = $(this).data("req");
  //     if (inp.attr('type') === 'email') {
  //       var em = inp.val();
  //       if (!validateEmail(em)) {
  //         inp.parent().addClass("dc-input_error");
  //       } else {
  //         inp.parent().removeClass("dc-input_error");
  //       }
  //     } else if (req === 1 && !inp.val().length) {
  //       inp.parent().addClass("dc-input_error");
  //     } else {
  //       inp.parent().removeClass("dc-input_error");
  //     }
  //   });
  //   if (form.find(".dc-input_error").length) {
  //     return false;
  //   } else {
  //     $.ajax({
  //       type: "POST",
  //       url: form.attr('action'),
  //       data: form.serialize(),
  //       success: function(response) {
  //         $(':input')
  //           .not(':button, :submit, :reset, :hidden')
  //           .val('')
  //           .removeAttr('checked')
  //           .removeAttr('selected');
  //         $.fancybox.close();
  //         // window.location.href = 'thx.html';
  //         $.fancybox.open({
  //           src: "#thx",
  //           touch: false,
  //           smallBtn: false,
  //           // autoFocus: false,
  //           // toolbar: false,
  //           // animationDuration: 400,
  //           // animationEffect: "zoom-in-out",
  //           // btnTpl: {
  //           //   smallBtn: '<div data-fancybox-close class="modal-close"><i class="icon-close"></i></div>'
  //           // },
  //           // mobile: {
  //           //   clickSlide: function(current, event) {
  //           //     return current.type === "image" ? "close" : "close"; // close when click outside
  //           //   },
  //           // },
  //         });
  //       }
  //     });
  //   }
  // });
  // $('input[type=tel], input[type=email]').focus(function() {
  //    $(this).closest('.dc-input').removeClass("dc-input_error");
  //  });
  /*SCROLL TO*/
  $('a.scrollto[href^="#"]').on('click', function (event) {
    let target = $($(this).attr('href'));
    let hH = window.innerWidth < 767 ? 15 : $('.header').innerHeight() + 15; // if header fixed
    if (target.length) {
      event.preventDefault();
      $('html, body').animate(
        {
          scrollTop: target.offset().top,
        },
        500,
        function () {
          if ($('.header__menu ').hasClass('-active')) {
            $('.header__menu ').removeClass('-active');
            $('.js-hamburger').removeClass('is-active');
          }
        }
      );
    }
  });

  // =========================================================
  // Додаємо обробник подій на клік по логотипу
  $('#logo, .header__menu-logo').click(function () {
    // Анімована прокрутка до верху сторінки
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false; // Відмінити стандартну дію посилання
  });
  // =========================================================
  /*html5 play*/
  // $('.video-js').each(function(i, item) {
  //   var vid = $(item).find('video').get(0);
  //   var playBtn = $(item).find('.video-js__play');
  //   var imgPoster = $(item).find('.video-js__img')
  //   playBtn.on('click', function(e) {
  //     e.preventDefault();
  //     setTimeout(function() {
  //       vid.play();
  //       playBtn.hide();
  //       imgPoster.css({
  //         opacity: '0',
  //         zIndex: '-1',
  //       });
  //     }, 200);
  //   });
  // });
  // var scr = $(".main-wrap").height() > $('body').height();
  // var flsm1 = true;
  // var flsm2 = true;
  // $(window).on('load resize', function() {
  //  if (window.innerWidth <= 991) {
  //    flsm2 = true;
  //    if (flsm1) {
  //      flsm1 = false;
  //    }
  //  } else {
  //    flsm1 = true;
  //    if (flsm2) {
  //      flsm2 = false;
  //    }
  //  }
  // });
  //   function alphaOnly(event) {
  //   var key = event.keyCode;
  //   console.log(((key >= 65 && key <= 90) || key == 8));
  //   return ((key >= 65 && key <= 90) || key == 8);
  // };
  // function validateAlpha(evt) {
  //   var theEvent = evt || window.event;
  //   // Handle paste
  //   if (theEvent.type === 'paste') {
  //       key = event.clipboardData.getData('text/plain');
  //   } else {
  //   // Handle key press
  //       var key = theEvent.keyCode || theEvent.which;
  //       key = String.fromCharCode(key);
  //   }
  //   var regex = /[0-9]|\./;
  //   if( regex.test(key) ) {
  //     theEvent.returnValue = false;
  //     if(theEvent.preventDefault) theEvent.preventDefault();
  //   }
  // }
  // $(".js-name").keypress(function(e) {
  //   validateAlpha(e);
  // });
  // var regDigits = new RegExp('^\\d+$');
  // $('input[type=tel]').keypress(function (e) {
  //  var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  //  if (!regDigits.test(key)) {
  //    e.preventDefault();
  //    return false;
  //  }
  // });
  // $('input[type=email]').keyup(function() {
  //  var thisVal = $(this);
  //  thisVal.val(thisVal.val().replace(/[^\x00-\x7F]+/i, ""))
  // });
  /*HIDE PLACEHOLDER*/
  // $('input,textarea')
  //   .focus(function () {
  //     $(this)
  //       .data('placeholder', $(this).attr('placeholder'))
  //       .attr('placeholder', '');
  //   })
  //   .blur(function () {
  //     $(this).attr('placeholder', $(this).data('placeholder'));
  //   });
  /* SUBMIT BUTTON DISABLED */
  // $('.checked').on('click', function(e) {
  //  e.preventDefault();
  //  var button = $(this).closest('form').find('button');
  //  var buttonVal = $(this).closest('form').find('button').prop('disabled');
  //  $(this).toggleClass('active');
  //  if (!buttonVal) {
  //    button.prop('disabled', true);
  //  } else {
  //    button.prop('disabled', false);
  //  }
  // });
  /*  ripple effect */
  //  $(".button").on('click', function (e) {
  //  // Remove any old one
  //  $(".ripple").remove();
  //  // Setup
  //  var posX = $(this).offset().left,
  //  posY = $(this).offset().top,
  //  buttonWidth = $(this).width(),
  //  buttonHeight =  $(this).height();
  //  // Add the element
  //  $(this).prepend("<span class='ripple'></span>");
  //  // Make it round!
  //  if(buttonWidth >= buttonHeight) {
  //    buttonHeight = buttonWidth;
  //  } else {
  //    buttonWidth = buttonHeight;
  //  }
  //  // Get the center of the element
  //  var x = e.pageX - posX - buttonWidth / 2;
  //  var y = e.pageY - posY - buttonHeight / 2;
  //  // Add the ripples CSS and start the animation
  //  $(".ripple").css({
  //    width: buttonWidth,
  //    height: buttonHeight,
  //    top: y + 'px',
  //    left: x + 'px'
  //  }).addClass("rippleEffect");
  // });
  // function validateEmail(email) {
  //   var re =
  //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }
  // плавна прокрутка до якоря
  // $('body').on('click', '[href*="#"]', function (e) {
  //   var fixed_offset = 100;
  //   $('html,body')
  //     .stop()
  //     .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 500);
  //   e.preventDefault();
  // });
  // window.addEventListener('scroll', function () {
  //   let header = document.querySelector('.header');
  //   header.classList.toggle('sticky', window.scrollY > 0);
  // });
  // плавна прокрутка до якоря
  // my-modal
  // let modal = {
  //   self: $('#modal'),
  //   showModal: function (content) {
  //     this.self.find('#innerModal').html(content);
  //     this.self.fadeIn(100);
  //   },
  //   hideModal: function () {
  //     this.self.fadeOut(100);
  //     this.self.find('#innerModal').html('');
  //   },
  // };
  // $('.showModal').on('click', function (e) {
  //   let id = $(this).data('id');
  //   let content = $('#cont' + id).html();
  //   modal.showModal(content);
  // });
  // $('#modal').on('click', function (e) {
  //   if (
  //     $(e.target).attr('id') === 'modal' ||
  //     $(e.target).hasClass('modal__close')
  //   ) {
  //     modal.hideModal();
  //   } else {
  //     return false;
  //   }
  // });
});

// ============== 1 вариант SWIPER ==============
const swiperOne = new Swiper('.reviews__swiper', {
  // Основные настройки
  direction: 'horizontal', // 'vertical', 'horizontal'
  loop: false, // true - круговой слайдер, false - слайдер с конечными положениями
  speed: 500, // скорость переключения слайдов
  effect: 'slider', // cards, coverflow, flip, fade, cube,slider
  // initialSlide: 2, // Начинаем со 2 слайдера
  freeMode: true, // можно перетаскивать как ленту
  slidesPerView: 1, // кол-во активных слайдов
  autoHeight: true, //enable auto height
  // centeredSlides: true, // центрирование слайдов
  spaceBetween: 20,
  // Пагинация (точки)
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // true - Пагинация становится кликабельной
  },

  // Кнопки вперед и назад
  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },

  // Автоматическое перелистывание
  // autoplay: {
  //     delay: 1000, //Задержка перед перелистыванием 1с = 1000мл/с
  // },
});

// =====================-my-js-files-=====================
// Бібліотека АОS:
//? Загальні налаштування
//? michalsnik.github.io/aos/   ссилка на документацію
//? https://animista.net/       ссилка на додаткові анімації

AOS.init({
  // Global settings:
  disable: false, // приймає такі значення: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // назва події, надісланої в документі, яку AOS має ініціалізувати
  initClassName: 'aos-init', // class застосовується після ініціалізації
  animatedClassName: 'aos-animate', // class застосовується до анімації
  useClassNames: false, // якщо істина, додаватиме вміст `data-aos` як класи під час прокручування
  disableMutationObserver: false, // вимикає автоматичне виявлення мутацій (додатково)
  debounceDelay: 50, // затримка на усунення дребезгу, яка використовується під час зміни розміру вікна (додатково)
  throttleDelay: 99, // затримка на газі під час прокручування сторінки (додатково)

  //Параметри, які можна перевизначати для кожного елемента за допомогою атрибутів data-aos-*:
  offset: 100, // зсув (у пікселях) від початкової точки запуску
  delay: 0, // значення від 0 до 3000 з кроком 50 мс
  duration: 400, // значення від 0 до 3000 з кроком 50 мс
  easing: 'ease', // ослаблення за замовчуванням для анімацій AOS
  once: false, // чи має відбуватися анімація тільки один раз - під час прокручування вниз
  mirror: false, // чи повинні елементи анімуватися під час прокручування повз них
  anchorPlacement: 'top-bottom', //визначає, яка позиція елемента щодо вікна має запускати анімацію
});

//? вствити в html
// data-aos="fade-up"  --затухання
// data-aos-offset="200" --зміщення
// data-aos-delay="50" --затримка 50mls.l
// data-aos-duration="1000" --довжина анімації
// data-aos-easing="ease-in-out" --легкий вхід вихід
// data-aos-anchor-placement="top-center" --верх центр
// data-aos-mirror="true" --zerkalo
// data-aos-once="false" --???

// ==========================================================
//? Додавання спеціальних анімацій: Приклад(animista)
// [data-aos="new-animation"] {
//   opacity: 0;
//   transition-property: transform, opacity;

//   &.aos-animate {
//     opacity: 1;
//   }
// }
//? Потім використовуйте його в HTML:
// <div data-aos="new-animation"></div>

// =Anchor====================================================
// ?  перший елемент не занімується доти поки не з'явиться перший
// div data-aos='fade-up' data-aos-anchor='.other-element'></div;
// div clasa='other-element' data-aos='fade-up'></div>;

// ==АОS=========================================================
//=================================================================================================================================================================================================================================

//? документація:
// https://nashio.github.io/star-rating-svg/demo/

// добавити в html: <div class="my-rating"></div>

$('.my-rating').starRating({
  totalStars: 5,
  starShape: 'rounded',
  starSize: 40,
  emptyColor: 'lightgray',
  hoverColor: '#FFA928',
  activeColor: 'crimson',
  useGradient: false,
  ratedColors: ['#FFA928', '#FFA928', '#FFA928', '#FFA928', '#15B2F5'],
});

// $('.my-rating').starRating({
//   initialRating: 4.5,
//   strokeColor: '#894A00',
//   strokeWidth: 10,
//   starSize: 25,
//   starGradient: {
//     start: '#ec9523',
//     end: '#ec9523',
//   },
//   callback: function (currentRating, $el) {
//     alert('rated ' + currentRating);
//     console.log('DOM element ', $el);
//   ratedColors: ['#e2c181', '#ffa700', '#ec9523', '#9a321a', '#ec9523'],
//   },
// });

// STARS-RATING==================================================

// $(document).ready(function () {
//   const menu = $('.menu__body');
//   const menuBtn = $('.menu__icon');
//   const body = $('body');

//   if (menu.length && menuBtn.length) {
//     menuBtn.click(function (e) {
//       menu.toggleClass('active');
//       menuBtn.toggleClass('active');
//       body.toggleClass('lock');
//     });

//     menu.click(function (e) {
//       if ($(e.target).hasClass('menu__body')) {
//         menu.removeClass('active');
//         menuBtn.removeClass('active');
//         body.removeClass('lock');
//       }
//     });

//     menu.find('.menu__link').click(function () {
//       menu.removeClass('active');
//       menuBtn.removeClass('active');
//       body.removeClass('lock');
//     });
//   }

//   /*===========================================*/

//   $('a[href*="#"]').click(function (event) {
//     event.preventDefault();

//     const blockID = $(this).attr('href').substring(1);

//     $('#' + blockID).animate(
//       {
//         scrollTop: $('#' + blockID).offset().top,
//       },
//       {
//         duration: 'slow',
//         easing: 'swing',
//       }
//     );
//   });
// });

// =====================-ACORDEON-=====================
document.addEventListener('DOMContentLoaded', function () {
  const expandButton = document.querySelector('.button-see-more');
  const textContainer = document.querySelector('.card__text p');

  expandButton.addEventListener('click', function () {
    if (textContainer.classList.contains('expanded')) {
      // Згорнути текст, якщо він вже розгорнутий
      textContainer.classList.remove('expanded');
      expandButton.textContent = '...';
    } else {
      // Розгорнути текст
      textContainer.classList.add('expanded');
      expandButton.textContent = '...';
    }
  });
});

//=====================valid-form

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('myForm');
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', function (e) {
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailValue)) {
      e.preventDefault(); // Заборонити відправку форми
      errorMessage.textContent = 'Please enter a valid email'; // Встановити текст повідомлення про помилку
      errorMessage.style.display = 'block'; // Показати контейнер з повідомленням про помилку
    }
  });

  // Очищення повідомлення про помилку при вводі
  emailInput.addEventListener('input', function () {
    errorMessage.style.display = 'none'; // Приховати контейнер з повідомленням про помилку
  });
});
