(function($) {
  var methods = {
    init: function(options) {
      var settings = $.extend({
        // placeholder: false,
        placeholder: false,
        allowClear: false,
        autofocus: true,
        countryFlag: $(this).attr('data-wpm-countryflag') ? $(this).attr('data-wpm-countryflag') == "true" : false,
        search: $(this).attr('data-wpm-search') ? $(this).attr('data-wpm-search') == "true" : false,
        // minimumResultsForSearch: 10,
      }, options);

      var timerInput;

      var openClass = settings.search ? 'wpm-select-wrap_open' : 'wpm-select-wrap_open-dropdown';

      return this.each(function() {

        var select = this;
        $(select).css({
          position: 'absolute',
          zIndex: '-1',
          opacity: '0',
          display: 'none',
          pointerEvents: 'none',
          width: '1px',
          height: '1px'
        });

        $(select).on('change', function() {
          var th = this;
          var valFromMethod = $(this).val();
          console.log('change');
          placeholder.trigger('click', true);
          selectDropdownWrap.children().filter(function(i, item) {
            var valFormated = valFromMethod.toLowerCase().trim();
            var selOrigin = $(this).attr('data-wpmval').toLowerCase().trim();
            if (valFormated === selOrigin) {
              setOption($(item), true);
            }
          });
        });

        var placeholderText;
        // if ($(this).attr('data-wpm-placeholder')) {
        if ($(this).find('option[selected]').length === 0 && (settings.placeholder || ($(this).attr('data-wpm-placeholder') && $(this).attr('data-wpm-placeholder') !== 'false'))) {
          // placeholderText = $(this).attr('data-wpm-placeholder');
          if ($(this).attr('data-wpm-placeholder') !== 'false') {
            placeholderText = $(this).attr('data-wpm-placeholder') ? $(this).attr('data-wpm-placeholder') : settings.placeholder;
            $(select).prepend('<option disabled value=""></option>');
            $(select).val($(select).children().first().val());
          }
        } else {
          // $(select).val($(select).children().first().val()).trigger('change');

        }



        var tempObj = {
          options: []
        };

        var wpmSelectWrap = $('<div tabindex="0" class="wpm-select-wrap"></div>');
        var placeholder = $('<div class="wpm-select-placeholder"></div>');
        var single;
        var rendered;
        if (placeholderText) {
          single = $("<div class='wpm-select-placeholder__single'></div>");
          placeholder.append(single);
          rendered = $("<div class='wpm-select-placeholder__rendered'>" + placeholderText + "</div>");
          placeholder.append(rendered);
        } else {
          if (settings.countryFlag) {
            var classFlagSpan = 'flag-icon flag-icon-squared flag-icon-';
            if ($(this).find('option[selected]').length !== 0) {
              classFlagSpan += $(select).find('option[selected]').attr('data-wpm-id').toLowerCase();
              single = $("<div class='wpm-select-placeholder__single'>" + '<span class="' + classFlagSpan + '"></span>' + $(select).find('option[selected]').text() + "</div>");
            } else {
              classFlagSpan += $(select.options[0]).attr('data-wpm-id').toLowerCase();
              single = $("<div class='wpm-select-placeholder__single'>" + '<span class="' + classFlagSpan + '"></span>' + select.options[0].innerText + "</div>");
            }

          } else {

            if ($(this).find('option[selected]').length !== 0) {
              single = $("<div class='wpm-select-placeholder__single'>" + $(select).find('option[selected]').text() + "</div>");
            } else {
              single = $("<div class='wpm-select-placeholder__single'>" + select.options[0].innerText + "</div>");
            }

          }
          placeholder.append(single);
        }
        var btnsControl = $('<div class="wpm-select-placeholder__buttons"></div>');

        var btnArrow = $('<div class="wpm-select-placeholder__arrow"><svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6L12 0L0 -5.24537e-07L6 6Z" fill="#7A7A7A"/> </svg></div>');
        placeholder.append(btnsControl);
        btnArrow.on('click', function(e) {
          if (wpmSelectWrap.hasClass(openClass)) {
            e.preventDefault();
            e.stopPropagation();
            isOpen = false;
            wpmSelectWrap.removeClass(openClass);
          }
        });

        btnsControl.append(btnArrow);

        if (settings.allowClear && settings.search) {
          var btnClear = $('<div style="opacity: 0;" class="wpm-select-placeholder__clear"><svg height="20" width="20" viewBox="0 0 20 20"><path fill="rgb(40, 43, 93)" d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg></div>');
          btnsControl.prepend(btnClear);
          btnClear.on('click', function(e) {
            if (!(wpmSelectWrap.hasClass(openClass))) {
              // console.log('clear');

              selectDropdownWrap.html('');
              // tempObj.options.filter(function(item) {
              //   selectDropdownWrap.append($(item));
              // });

              // isOpen = true;
              // wpmSelectWrap.addClass(openClass);

              if (placeholderText) {
                $(select).val('');
                single.text('');
                rendered.text(placeholderText);
              } else {
                $(select).val($(select.options).first().val());
                if (settings.countryFlag) {
                  single.html('<span class="' + classFlagSpan + '"></span>' + select.options[0].innerText);
                } else {
                  single.text($(select.options).first().text());
                }
              }
              single.removeClass('wpm-select-placeholder__single_active');

              selectDropdownWrap.find('.wpm-select-dropdown__option').first().addClass('wpm-select-dropdown__option_highlighted').siblings().removeClass('wpm-select-dropdown__option_highlighted'); // ? comment ?
              searchField.focus();
              searchField.val('').trigger('keyup');

              isOpen = true;
              wpmSelectWrap.addClass(openClass);

              // console.log($(select).val());
              if (options.onClear !== undefined) {
                options.onClear($(select));
              }
            }
          });


        }

        if (settings.search) {
          var searchField = $('<input tabindex="20" type="text" class="wpm-select-placeholder__search">');
          placeholder.prepend(searchField);
          searchField.on("keyup", function(e) {
            clearTimeout(timerInput);
            var th = $(this);
            // timerInput = setTimeout(function() {
            selectDropdownWrap.html('');
            var val = th.val().toLowerCase().trim();
            if (val) {
              tempObj.options.filter(function(item) {
                if ($(item).text().toLowerCase().trim().indexOf(val) > -1) {
                  selectDropdownWrap.append($(item));
                }
              });
            } else {
              tempObj.options.filter(function(item) {
                selectDropdownWrap.append($(item));
              });
            }
            if (selectDropdownWrap) {
              selectDropdownWrap.find('.wpm-select-dropdown__option').first().addClass('wpm-select-dropdown__option_highlighted');
            }
            optionClick(selectDropdownWrap.find('.wpm-select-dropdown__option'));
            // console.log(e.keyCode);

            if (selectDropdownWrap.children().length == 0) {
              selectDropdownWrap.html('<div class="wpm-select-dropdown__empty">No options</div>');
            }


            if (e.key === 'Enter' || e.keyCode === 13) {
              setOption(selectDropdownWrap.find('.wpm-select-dropdown__option_highlighted'), true);
            }
            // }, 100);

          });

          searchField.on("keydown", function(e) {
            if (e.keyCode === 9) {
              setOption(selectDropdownWrap.find('.wpm-select-dropdown__option_highlighted'), true);
            }
          });

        }

        wpmSelectWrap.append(placeholder);

        // disable state
        if (!($(this).find('option:not([disabled])').length)) {
          wpmSelectWrap.addClass('wpm-select-wrap_disabled');
        } else {
          if (wpmSelectWrap.hasClass('wpm-select-wrap_disabled')) {
            wpmSelectWrap.removeClass('wpm-select-wrap_disabled');
          }
        }

        $(select).after(wpmSelectWrap);



        var selectDropdownContainer = $('<div class="wpm-select-dropdown-container"></div>');
        var selectDropdownWrap = $('<div class="wpm-select-dropdown"></div>');
        selectDropdownContainer.append(selectDropdownWrap);

        // console.time('time');

        // $(select.options).filter(function(index, item, arr) {
        //   if ($(item).clone().val()) {
        //     selectDropdownWrap.append('<div class="wpm-select-dropdown__option" data-wpmval="' + $(item).clone().val() + '">' + $(item).clone().text() + '</div>');
        //     tempObj.options.push('<div class="wpm-select-dropdown__option" data-wpmval="' + $(item).val() + '">' + $(item).text() + '</div>');
        //   }
        // });

        // console.timeEnd('time');


        // optionClick(selectDropdownWrap.find('.wpm-select-dropdown__option'));

        function optionClick(option) {
          option.on('mouseenter', function() {
            $(this).addClass('wpm-select-dropdown__option_highlighted').siblings().removeClass('wpm-select-dropdown__option_highlighted');
          });
          setOption(option);
        }

        function setOption(option, trigger) {
          option.on('click', function(e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            var optionVal = $(this).attr('data-wpmval').toLowerCase().trim();
            var optionText = $(this).html();

            placeholder.find('.wpm-select-placeholder__single').html(optionText).addClass('wpm-select-placeholder__single_active');

            isOpen = false;
            wpmSelectWrap.removeClass(openClass);
            $(select.options).filter(function(i, item) {
              var selOrigin = $(item).val().toLowerCase().trim();
              if (optionVal === selOrigin) {
                $(select).val($(item).val());
              }
            });
            // console.log($(select).val());
            if (options.onSelected !== undefined) {
              options.onSelected($(select));
            }
          });
          if (trigger) {
            // option.off('click');
            option.trigger('click');
          }
        }


        $('body').on('click', function(e) {
          isOpen = false;
          wpmSelectWrap.removeClass(openClass);
        });


        var isOpen = false;
        var isCreated = false;

        placeholder.on('click', function(e, arg1) {
          e.stopPropagation();
          if (!isCreated) {
            isCreated = true;
            var c = document.createDocumentFragment();
            for (var i = 0; i < select.options.length; i++) {
              if (select.options[i].value) {
                var e = document.createElement("div");
                e.className = "wpm-select-dropdown__option";
                e.setAttribute('data-wpmval', $(select.options[i]).clone().val());
                e.textContent = $(select.options[i]).clone().text();

                //
                if (settings.countryFlag) {
                  var classFlagSpan = 'flag-icon flag-icon-squared flag-icon-' + $(select.options[i]).attr('data-wpm-id').toLowerCase();
                  var f = document.createElement("span");
                  f.className = classFlagSpan;
                  e.prepend(f);
                }
                //

                c.appendChild(e);
                if (settings.countryFlag) {
                  tempObj.options.push('<div class="wpm-select-dropdown__option" data-wpmval="' + $(select.options[i]).val() + '">' + '<span class="' + classFlagSpan + '"></span>' + $(select.options[i]).text() + '</div>');
                } else {
                  tempObj.options.push('<div class="wpm-select-dropdown__option" data-wpmval="' + $(select.options[i]).val() + '">' + $(select.options[i]).text() + '</div>');
                }

              }

            }
            selectDropdownWrap.get(0).appendChild(c);
            placeholder.after(selectDropdownContainer);
          }
          if (!isOpen) {
            if (!arg1) {
              isOpen = true;
            }
            if (!(selectDropdownWrap.find('.wpm-select-dropdown__option_highlighted').length)) {
              selectDropdownWrap.find('.wpm-select-dropdown__option').first().addClass('wpm-select-dropdown__option_highlighted');
            }
            if (!arg1) {
              wpmSelectWrap.addClass(openClass);
              if (settings.autofocus && settings.search) {
                searchField.get(0).focus();
              }
            }

            optionClick(selectDropdownWrap.find('.wpm-select-dropdown__option'));
          }
        });

        if (!settings.search) {
          wpmSelectWrap.on('blur', function(event) {
            isOpen = false;
            wpmSelectWrap.removeClass(openClass);
          });
        } else {
          // wpmSelectWrap.find('.wpm-select-placeholder__search').on('blur', function(event) {
          // console.log(wpmSelectWrap, 'wpmSelectWrap');
          // });
        }


        if (options.onInit !== undefined) {
          options.onInit($(select));
        }



      });


    },
    show: function() {},
    hide: function() {},
    setVal: function(val) {
      // var optionVal = val;
      var th = this;

      if (val) {
        $(this).children().each(function() {
          if (($(this).val() && $(this).val().toLowerCase().trim()) === (val && val.toLowerCase().trim())) {
            console.log('est');
            $(th).val(val).trigger('change');
          }
        });
      }

    },
    reInit: function(reInitSettings) {
      var th = this;
      var obj = reInitSettings ? reInitSettings : {};
      th.next().remove();
      th.wpmSelect(obj);
    }
  };

  $.fn.wpmSelect = function(methodOrOptions) {

    if (methods[methodOrOptions]) {
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init"
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist on jQuery.wpmSelect');
    }

  };

}(jQuery));