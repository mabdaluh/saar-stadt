!function(t){t.fn.WordpressUlikeTooltip=function(e){if(this.length>1)return this.each((function(){t(this).WordpressUlikeTooltip(e)})),this;if(void 0===this||1!==this.length)return!1;const i=t(this);e=t.extend({},t.WordpressUlikeTooltip.defaults,e,i.data());let s=i.attr("title");void 0!==s&&s.length&&(e.title=s),e.class+=" ulf-"+e.theme+"-theme",e.class+=" ulf-"+e.size,e.trigger=e.trigger.toLowerCase().trim();let n={dom:this,dom_wrapped:i,position_debug:e.position_debug,trigger:e.trigger,id:e.id,title:e.title,content:e.title,child_class:e.child,theme:e.theme,class:e.class,position:e.position,close_on_outside_click:e.close_on_outside_click,singleton:e.singleton,dataAttr:"ulike-tooltip",createTooltipHTML:function(){return`<div class='ulf-tooltip ${n.class}' role='tooltip'><div class='ulf-arrow'></div><div class='ulf-content'>${n.content}</div></div>`},destroy:function(){const e=n.dom_wrapped.data(n.dataAttr);null!=e&&(e.dom_wrapped.off("touchstart mouseenter",e.show),e.dom_wrapped.off("click",e.preventDefaultHandler),t(window).off("resize",e.onResize),e.isVisible()&&e.hide(),e.dom_wrapped.data(e.dataAttr,null))},initialize:function(){return n.dom_wrapped.on("touchstart mouseenter",n.show),n.dom_wrapped.on("click",n.preventDefaultHandler),t.WordpressUlikeTooltip.body_click_initialized||(t(document).on("touchstart mousedown",n.onClickOutside),t.WordpressUlikeTooltip.bodyClickInitialized=!0),n.dom_wrapped.data(n.dataAttr,n),t(document).on("WordpressUlikeLikersMarkupUpdated",(function(t,e,i,s){if("popover"==i)if(s.length)n.show();else{let t=e.data(n.dataAttr);null!=t&&t.destroy()}})),n.dom},preventDefaultHandler:function(t){return t.preventDefault(),!1},show:function(e){if(n.isVisible())return!1;n.singleton&&n.hideAllVisible();const i=t("body");(void 0===e||e)&&"function"==typeof n.title&&(n.content=n.title(n.dom_wrapped,n)),i.append(n.createTooltipHTML()),n.tooltip=t(".ulf-tooltip:last"),n.positionTooltip(),t(window).on("resize",n.onResize);const s="ulp-dom-"+n.id;n.tooltip.attr("id",s),n.dom.attr("aria-describedby",s),t.WordpressUlikeTooltip.visible.push(n),(void 0===e||e)&&n.dom.trigger("ulf-show",[n.tooltip,n.hide]),n.observer=new MutationObserver((function(t){n.positionTooltip()}));n.observer.observe(document.body,{attributes:!0,childList:!0,subtree:!0})},isVisible:function(){return t.inArray(n,t.WordpressUlikeTooltip.visible)>-1},hideAllVisible:function(){return t.each(t.WordpressUlikeTooltip.visible,(function(t,e){e.dom_wrapped.hasClass("ulf-focused")||e.hide()})),this},hide:function(e){n.observer&&(n.observer.disconnect(),n.observer=null),t(window).off("resize",n.onResize),n.dom.attr("aria-describedby",null),n.tooltip&&n.tooltip.length&&n.tooltip.remove(),(void 0===e||e)&&n.dom.trigger("ulf-hide"),"click"!==n.trigger&&n.dom_wrapped.off("touchstart mousedown",n.hide);var i=t.inArray(n,t.WordpressUlikeTooltip.visible);return t.WordpressUlikeTooltip.visible.splice(i,1),n.dom},onResize:function(){n.hide(!1),n.show(!1)},onClickOutside:function(e){const i=t(e.target);i.hasClass("ulf-tooltip")||i.parents(".ulf-tooltip:first").length||t.each(t.WordpressUlikeTooltip.visible,(function(t,e){void 0!==e&&e.close_on_outside_click&&(i!==e.dom_wrapped||"focus"!==e.trigger&&"hoverfocus"!==e.trigger)&&e.hide()}))},positionTooltip:function(){n.positionDebug("-- Start positioning --"),n.dom_wrapped.length&&n.dom_wrapped.is(":visible")||(n.positionDebug("Elem no longer exists. Removing tooltip"),n.hide(!0));let t=n.tooltip.find(".ulf-arrow"),[e,i,s,o,l,a]=n.calculateSafePosition(n.position);return void 0===l&&"auto"!==n.position&&(n.positionDebug("Couldn't fit preferred position"),[e,i,s,o,l,a]=n.calculateSafePosition("auto")),void 0===l?(n.positionDebug("Doesn't appear to fit. Displaying centered"),n.tooltip.addClass("ulf-centered").css({top:"50%",left:"50%","margin-left":-s/2,"margin-top":-o/2}),t&&t.length&&t.remove(),void n.positionDebug("-- Done positioning --")):(n.positionDebug({"Setting Position":{Left:l,Top:a}}),n.tooltip.css("left",l),n.tooltip.css("top",a),i<60&&(n.positionDebug("Element is less than "+i+"px. Setting arrow to hug the side tighter"),e+=" ulf-arrow-super-hug"),t.addClass("ulf-arrow-"+e),n.positionDebug("-- Done positioning --"),n)},calculateSafePosition:function(t){let e,i,s,o=n.tooltip.find(".ulf-arrow"),l=n.dom_wrapped.offset(),a=n.dom_wrapped.outerHeight(),r=n.dom_wrapped.outerWidth(),d=n.tooltip.outerWidth(),u=n.tooltip.outerHeight(),p=document.querySelector("body").offsetWidth,h=document.querySelector("body").offsetHeight,g=o.is(":visible")?o.outerHeight():0,c=o.is(":visible")?o.outerWidth():0,m={};if(m.below=h-(u+a+l.top)>5,m.above=l.top-u>5,m.vertical_half=l.top+r/2-u/2>5,m.right=p-(d+r+l.left)>5,m.right_half=p-l.left-r/2-d/2>5,m.right_full=p-l.left-d>5,m.left=l.left-d>5,m.left_half=l.left+r/2-d/2>5,m.left_full=l.left-d>5,n.positionDebug({"Clicked Element":{Left:l.left,Top:l.top}}),n.positionDebug({"Element Dimensions":{Height:a,Width:r},"Tooltip Dimensions":{Height:u,Width:d},"Window Dimensions":{Height:h,Width:p},"Arrow Dimensions":{Height:g,Width:c}}),n.positionDebug(m),("auto"===t||"bottom"===t)&&m.below&&m.left_half&&m.right_half)n.positionDebug("Displaying below, centered"),e="top",i=l.left-d/2+r/2,s=l.top+a+g/2;else if(("auto"===t||"top"===t)&&m.above&&m.left_half&&m.right_half){if(n.positionDebug("Displaying above, centered"),e="bottom",n.child_class){let t=n.dom_wrapped.find(n.child_class).first();i=t.offset().left-d/2+t.width()/2}else i=l.left-d/2+r/2;s=l.top-u-g/2}else("auto"===t||"left"===t)&&m.left&&m.vertical_half?(n.positionDebug("Displaying left, centered"),e="right",i=l.left-d-c/2,s=l.top+a/2-u/2):("auto"===t||"right"===t)&&m.right&&m.vertical_half?(n.positionDebug("Displaying right, centered"),e="left",i=l.left+r+c/2,s=l.top+a/2-u/2):("auto"===t||"bottom"===t)&&m.below&&m.right_full?(n.positionDebug("Displaying below, to the right"),e="top ulf-arrow-hug-left",i=l.left,s=l.top+a+g/2):("auto"===t||"bottom"===t)&&m.below&&m.left_full?(n.positionDebug("Displaying below, to the left"),e="top ulf-arrow-hug-right",i=l.left+r-d,s=l.top+a+g/2):("auto"===t||"top"===t)&&m.above&&m.right_full?(n.positionDebug("Displaying above, to the right"),e="bottom ulf-arrow-hug-left",i=l.left,s=l.top-u-g/2):("auto"===t||"top"===t)&&m.above&&m.left_full&&(n.positionDebug("Displaying above, to the left"),e="bottom ulf-arrow-hug-right",i=l.left+r-d,s=l.top-u-g/2);return[e,r,d,u,i,s]},positionDebug:function(t){return!!n.position_debug&&("object"==typeof t?console.table(t):console.log(`Position: ${t}`))}};return n.destroy(),n.initialize()},t.WordpressUlikeTooltip={},t.WordpressUlikeTooltip.visible=[],t.WordpressUlikeTooltip.body_click_initialized=!1,t.WordpressUlikeTooltip.defaults={id:Date.now(),title:"",trigger:"hoverfocus",position:"auto",class:"",theme:"black",size:"small",singleton:!0,close_on_outside_click:!0}}(jQuery),function(t){"use strict";var e="WordpressUlikeNotifications",i={messageType:"success",messageText:"Hello World!",timeout:8e3,messageElement:"wpulike-message",notifContainer:"wpulike-notification"};function s(s,n){this.element=s,this.$element=t(s),this.settings=t.extend({},i,n),this._defaults=i,this._name=e,this.init()}t.extend(s.prototype,{init:function(){this._message(),this._container(),this._append(),this._remove()},_message:function(){this.$messageElement=t("<div/>").addClass(this.settings.messageElement+" wpulike-"+this.settings.messageType).text(this.settings.messageText)},_container:function(){t("."+this.settings.notifContainer).length||this.$element.append(t("<div/>").addClass(this.settings.notifContainer)),this.$notifContainer=this.$element.find("."+this.settings.notifContainer)},_append:function(){this.$notifContainer.append(this.$messageElement).trigger("WordpressUlikeNotificationAppend")},_remove:function(){var e=this;this.$messageElement.on("click",(function(){t(this).fadeOut(300,(function(){t(this).remove(),t("."+e.settings.messageElement).length||e.$notifContainer.remove()})).trigger("WordpressUlikeRemoveNotification")})),e.settings.timeout&&setTimeout((function(){e.$messageElement.fadeOut(300,(function(){t(this).remove(),t("."+e.settings.messageElement).length||e.$notifContainer.remove()})).trigger("WordpressUlikeRemoveNotification")}),e.settings.timeout)}}),t.fn[e]=function(t){return this.each((function(){new s(this,t)}))}}(jQuery,window,document),function(t,e,i){"use strict";var s="WordpressUlike",n=(t(e),t(i)),o={ID:0,nonce:0,type:"",append:"",appendTimeout:2e3,displayLikers:!1,likersTemplate:"default",disablePophover:!0,isTotal:!1,factor:"",template:"",counterSelector:".count-box",generalSelector:".wp_ulike_general_class",buttonSelector:".wp_ulike_btn",likersSelector:".wp_ulike_likers_wrapper"},l={"ulike-id":"ID","ulike-nonce":"nonce","ulike-type":"type","ulike-append":"append","ulike-is-total":"isTotal","ulike-display-likers":"displayLikers","ulike-likers-style":"likersTemplate","ulike-disable-pophover":"disablePophover","ulike-append-timeout":"appendTimeout","ulike-factor":"factor","ulike-template":"template"};function a(e,i){for(var n in this.element=e,this.$element=t(e),this.settings=t.extend({},o,i),this._defaults=o,this._name=s,this.buttonElement=this.$element.find(this.settings.buttonSelector),l){var a=this.buttonElement.data(n);undefined!==a&&(this.settings[l[n]]=a)}this.generalElement=this.$element.find(this.settings.generalSelector),this.counterElement=this.generalElement.find(this.settings.counterSelector),this.counterElement.length&&this.counterElement.each(function(e,i){void 0!==t(i).data("ulike-counter-value")&&t(i).html(t(i).data("ulike-counter-value"))}.bind(this)),this.likersElement=this.$element.find(this.settings.likersSelector),this.init()}t.extend(a.prototype,{init:function(){this.buttonElement.on("click",this._initLike.bind(this)),this.generalElement.one("mouseenter",this._updateLikers.bind(this))},_ajax:function(e,i){t.ajax({url:wp_ulike_params.ajax_url,type:"POST",dataType:"json",data:e}).done(i)},_initLike:function(t){t.stopPropagation(),this._maybeUpdateElements(t),this._updateSameButtons(),this._updateSameLikers(),this.buttonElement.prop("disabled",!0),n.trigger("WordpressUlikeLoading",this.element),this.generalElement.addClass("wp_ulike_is_loading"),this._ajax({action:"wp_ulike_process",id:this.settings.ID,nonce:this.settings.nonce,factor:this.settings.factor,type:this.settings.type,template:this.settings.template,displayLikers:this.settings.displayLikers,likersTemplate:this.settings.likersTemplate},function(t){this.generalElement.removeClass("wp_ulike_is_loading"),t.success?(this._updateMarkup(t),this._appendChild()):t.data.hasToast&&this._sendNotification("error",t.data.message),this.buttonElement.prop("disabled",!1),n.trigger("WordpressUlikeUpdated",this.element)}.bind(this))},_maybeUpdateElements:function(e){this.buttonElement=t(e.currentTarget),this.generalElement=this.buttonElement.closest(this.settings.generalSelector),this.counterElement=this.generalElement.find(this.settings.counterSelector),this.settings.factor=this.buttonElement.data("ulike-factor")},_appendChild:function(){if(""!==this.settings.append){var e=t(this.settings.append);this.buttonElement.append(e),this.settings.appendTimeout&&setTimeout((function(){e.detach()}),this.settings.appendTimeout)}},_updateMarkup:function(t){this._setSbilingElement(),this._setSbilingButtons(),this._updateGeneralClassNames(t.data.status),null!==t.data.data&&(5!=t.data.status&&(this.__updateCounter(t.data.data),this.settings.displayLikers&&void 0!==t.data.likers&&this._updateLikersMarkup(t.data.likers)),this._updateButton(t.data.btnText,t.data.status)),t.data.hasToast&&this._sendNotification(t.data.messageType,t.data.message)},_updateGeneralClassNames:function(t){var e="wp_ulike_is_not_liked",i="wp_ulike_is_liked",s="wp_ulike_is_unliked",n="wp_ulike_click_is_disabled";switch(this.siblingElement.length&&this.siblingElement.removeClass(this._arrayToString([i,s])),t){case 1:this.generalElement.addClass(i).removeClass(e),this.generalElement.children().first().addClass(n);break;case 2:this.generalElement.addClass(s).removeClass(i);break;case 3:this.generalElement.addClass(i).removeClass(s);break;case 0:case 5:this.generalElement.addClass(n),this.siblingElement.length&&this.siblingElement.addClass(n)}},_arrayToString:function(t){return t.join(" ")},_setSbilingElement:function(){this.siblingElement=this.generalElement.siblings()},_setSbilingButtons:function(){this.siblingButton=this.buttonElement.siblings(this.settings.buttonSelector)},__updateCounter:function(t){this.counterElement.attr("data-ulike-counter-value",t).html(t),n.trigger("WordpressUlikeCounterUpdated",[this.buttonElement])},_updateLikers:function(t){if(this.settings.displayLikers){if("popover"==this.settings.likersTemplate&&this.$element.data("ulike-tooltip"))return;if("default"==this.settings.likersTemplate&&this.likersElement.length)return;return this.generalElement.addClass("wp_ulike_is_getting_likers_list"),this._ajax({action:"wp_ulike_get_likers",id:this.settings.ID,nonce:this.settings.nonce,type:this.settings.type,displayLikers:this.settings.displayLikers,likersTemplate:this.settings.likersTemplate},function(t){this.generalElement.removeClass("wp_ulike_is_getting_likers_list"),t.success&&this._updateLikersMarkup(t.data)}.bind(this)),t.stopImmediatePropagation(),!1}},_updateLikersMarkup:function(e){"popover"==this.settings.likersTemplate?(this.likersElement=this.$element,e.template&&this.likersElement.WordpressUlikeTooltip({id:this.settings.type.toLowerCase()+"-"+this.settings.ID,title:e.template,position:"top",child:this.settings.generalSelector,theme:"white",size:"tiny",trigger:"hover"})):(this.likersElement.length||(this.likersElement=t(e.template).appendTo(this.$element)),e.template?this.likersElement.show().html(e.template):this.likersElement.hide().empty()),n.trigger("WordpressUlikeLikersMarkupUpdated",[this.likersElement,this.settings.likersTemplate,e.template])},_updateSameButtons:function(){var t=void 0!==this.settings.factor?"_"+this.settings.factor:"";this.sameButtons=n.find(".wp_"+this.settings.type.toLowerCase()+t+"_btn_"+this.settings.ID),this.sameButtons.length>1&&(this.buttonElement=this.sameButtons,this.generalElement=this.buttonElement.closest(this.settings.generalSelector),this.counterElement=this.generalElement.find(this.settings.counterSelector))},_updateSameLikers:function(){this.sameLikers=n.find(".wp_"+this.settings.type.toLowerCase()+"_likers_"+this.settings.ID),this.sameLikers.length>1&&(this.likersElement=this.sameLikers)},_getLikersElement:function(){return this.likersElement},_updateButton:function(t,e){this.buttonElement.hasClass("wp_ulike_put_image")?(4==e?this.buttonElement.addClass("image-unlike wp_ulike_btn_is_active"):this.buttonElement.toggleClass("image-unlike wp_ulike_btn_is_active"),this.siblingElement.length&&this.siblingElement.find(this.settings.buttonSelector).removeClass("image-unlike wp_ulike_btn_is_active"),this.siblingButton.length&&this.siblingButton.removeClass("image-unlike wp_ulike_btn_is_active")):this.buttonElement.hasClass("wp_ulike_put_text")&&null!==t&&this.buttonElement.find("span").html(t)},_sendNotification:function(e,s){t(i.body).WordpressUlikeNotifications({messageType:e,messageText:s})}}),t.fn[s]=function(e){return this.each((function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new a(this,e))}))}}(jQuery,window,document),function(t){var e,i,s;t(".wpulike").WordpressUlike(),e=".wpulike",i=function(e){t(e).WordpressUlike()},s=t("body")[0],new(window.MutationObserver||window.WebKitMutationObserver)((function(s){s.forEach((function(s){if(s.addedNodes.length)for(var n=t(s.addedNodes).find(e),o=0,l=n.length;o<l;o++)i(n[o])}))})).observe(s,{childList:!0,subtree:!0})}(jQuery);