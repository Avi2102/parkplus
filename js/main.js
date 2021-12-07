$(function(){
    // Code for Custom select & multiple select
    function generate_custom (){
        $('.custom-select').each(function(){
            let blank;
            var attr = $(this).attr('multiple');
            if (typeof attr !== typeof undefined && attr !== false) {
                $(this).after('<input type="text" class="form-control dropdown-val multiple-val empty" value=""><ul class="custom-dropdown multiple-select scrollbar-styling"></ul>');
                $(this).closest('.form-group').addClass('multiple-select-wrapper')
            }
            else {
                $(this).after('<input type="text" class="form-control dropdown-val empty" value=""><ul class="custom-dropdown scrollbar-styling"></ul>');
            }
            // $(this).attr('id', '').attr('name', '');
            $(this).addClass('empty');
        });
        $('.custom-select option').each(function(){
            var attr = $(this).attr('hidden');
            var attr1 = $(this).attr('disabled');
            if (typeof attr !== typeof undefined && attr !== false) {}
            else if (typeof attr1 !== typeof undefined && attr1 !== false)  {
                $(this).parent().siblings('.custom-dropdown').append('<li data-value="'+$(this).val()+'" class="disabled">'+$(this).text()+'</li>');
            }
            else{
                if($(this).prop('selected') == true) {
                    $(this).parent().siblings('.custom-dropdown').append('<li class="active" data-value="'+$(this).val()+'">'+$(this).text()+'</li>');
                    let next_field = $(this).parent().next('.dropdown-val');
                    if ($(next_field).val() == 0 ) {
                        $(next_field).val($(this).text());
                    }
                    else {
                        let next_fieldVal = $(next_field).val();
                        $(next_field).val(next_fieldVal +', '+ $(this).text());
                    }
                    $(this).parent().removeClass('empty').siblings('.form-control').removeClass('empty');
                }
                else {
                    $(this).parent().siblings('.custom-dropdown').append('<li data-value="'+$(this).val()+'">'+$(this).text()+'</li>');
                }
            }
        });
    }
    generate_custom ();
    $(document).on('focusin', '.dropdown-val', function(e){
        e.preventDefault();
        $(this).next('.custom-dropdown').slideDown(350).parent().addClass('active');
        $('.custom-dropdown').not($(this).next('.custom-dropdown')).slideUp(350).parent().removeClass('active');
    });
    $('.custom-dropdown:not(.multiple-select) li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parent().siblings('.dropdown-val').val($(this).text());
        $(this).parent().siblings('select').children('option[value="'+$(this).data('value')+'"]').prop("selected",true);
        $(this).parent().siblings('.dropdown-val').removeClass('empty');
        // alert($(this).parent().siblings('.dropdown-val').val())
    });
    $(document).on('focusout', '.dropdown-val',function(e){
        e.preventDefault();
        if (!$(this).hasClass('multiple-val')) {
            setTimeout(() => { 
                $(this).next('.custom-dropdown').slideUp(350).parent().removeClass('active');
            }, 200);
        }
    });
    $(".dropdown-val").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        var target = $(this).siblings('.custom-dropdown').children('li');
        $(target).filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('body').click(function(){
        $('.custom-dropdown.multiple-select').slideUp(350);
    });
    $('.dropdown-val').click(function(e){
        e.stopPropagation();
    });
    $('.custom-dropdown.multiple-select li').click(function(e){
        e.stopPropagation();
        $(this).toggleClass('active');
        var ths = $(this).closest('.custom-dropdown'),
            lngth = $(ths).children('li.active').length,
            prv = $(ths).prev('.dropdown-val');
        if (lngth == 0) {
            $(prv).val('');
        }
        else if (lngth == 1) {
            $(prv).val($(ths).find('li.active').text());
        }
        else {
            $(prv).val('');
            for (a=0;a<lngth;a++){
                var val1 = $(prv).val();
                if (val1 == 0) {
                    $(prv).val($(ths).children('li.active').eq(a).text());
                }
                else {
                    $(prv).val(val1+ ", " +$(ths).children('li.active').eq(a).text());
                }
            }
        }
        if($(this).parent().siblings('select').children('option[value="'+$(this).data('value')+'"]').prop('selected') == true) {
            $(this).parent().siblings('select').children('option[value="'+$(this).data('value')+'"]').prop("selected",false);
        }
        else if ($(this).parent().siblings('select').children('option[value="'+$(this).data('value')+'"]').prop('selected') == false){
            $(this).parent().siblings('select').children('option[value="'+$(this).data('value')+'"]').prop("selected",true);
        }
        // alert($(this).parent().siblings('.dropdown-val').val())
        
    });

    $('.dropdown-val.status-dropdown + .custom-dropdown li').click(function(){
        var prnt = $(this).closest('.custom-dropdown').siblings('.dropdown-val.status-dropdown');
        $(prnt).html('<span class="status-td '+$(this).text().toLowerCase().replace(/[^a-zA-Z0-9\.-]+/g,"-")+'">'+$(this).text()+'</span> <img src="../images/edit.png">');
    });

    // Code END for Custom select & multiple select

    // Material Design Start
    
    $('.form-control:empty').addClass('empty');
	$('.form-control').on('blur', function(){
		if($(this).val() == 0){
			$(this).addClass('empty');
		}
		else{
			$(this).removeClass('empty');
		}
	});
	$('.form-control').each(function(){
		if($(this).val() == 0){
			$(this).addClass('empty');
		}
		else{
			$(this).removeClass('empty');
		}
	});
    // Material Design End

    // Menu
    $('.treeview > a').click(function(){
        $(this).next('.treeview-menu').slideToggle(350);
        $(this).parent().toggleClass('active').siblings('.treeview').removeClass('active').find('.treeview-menu').slideUp(350);
    })
    var url = window.location.pathname,
    urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");  
    $('.sidebar-menu li a').each(function () {
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).parent('li').addClass('active').closest('.treeview').addClass('children-active active');
        }
    });

    // $('.sidebar-hamburger').click(function(){
    //     $('body').toggleClass('show-sidebar');
    // });
    // $('body').click(function(){
    //     if($(this).hasClass('show-sidebar')){
    //         $(this).removeClass('show-sidebar');
    //     }
    // });
    // $('.main-sidebar, .sidebar-hamburger').click(function(e){
    //     e.stopPropagation();
    // });
    $('.sidebar-hamburger').click(function(){
        $('body').toggleClass('show-sidebar').removeClass('show-filter');
    });
    $('.filter-hamburger').click(function(){
        $('body').toggleClass('show-filter');
    });
    $('body, .close').click(function(){
        if($('body').hasClass('show-sidebar') || $('body').hasClass('show-filter')){
          $('body').removeClass('show-sidebar, show-filter');
        }
    });
    $('.main-sidebar, .sidebar-hamburger, .filter-hamburger, .filter-wrapper').click(function(e){
        e.stopPropagation();
    });

    $('.accordion-title').click(function(){
        $(this).next().slideToggle(350).parent().toggleClass('active').siblings().removeClass('active').find('.accordion-container').slideUp(350);
    })
    $('.select-all').click(function(e){
        e.stopPropagation();
        $(this).closest('.accordion-title').siblings('.accordion-container').find('input:checkbox').each(function(){
            this.checked = true;
        });
    });
    $('.deselect-all').click(function(e){
        e.stopPropagation();
        $(this).closest('.accordion-title').siblings('.accordion-container').find('input:checkbox').each(function(){
            this.checked = false;
        });
    });

    // Custom Upload 
    $('.custom-upload input:file').change(function(){
        var fileName = $(this).val();
        if (fileName.substring(3,11) == 'fakepath') {
            fileName = fileName.substring(12);
        }
        $(this).parent().after('<div class="upload-module"><span class="file-name"><img src="../images/file-icon.png" alt="">'+fileName+'</span><img src="../images/cross.png" width="14" alt="" class="remove-icon"></div>');
        $(this).parent().hide();
    });
    $(document).on('click', '.remove-icon', function(){
        $(this).closest('.upload-module').siblings('.custom-upload').show().children('input:file').val('');
        $(this).closest('.upload-module').remove();
    })

});