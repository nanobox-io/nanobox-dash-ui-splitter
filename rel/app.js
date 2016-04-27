!function s(t,e,n){function i(l,o){if(!e[l]){if(!t[l]){var c="function"==typeof require&&require;if(!o&&c)return c(l,!0);if(a)return a(l,!0);var r=new Error("Cannot find module '"+l+"'");throw r.code="MODULE_NOT_FOUND",r}var d=e[l]={exports:{}};t[l][0].call(d.exports,function(s){var e=t[l][1][s];return i(e?e:s)},d,d.exports,s,t,e,n)}return e[l].exports}for(var a="function"==typeof require&&require,l=0;l<n.length;l++)i(n[l]);return i}({1:[function(s,t,e){var n,i,a,l,o,c,r=function(s,t){return function(){return s.apply(t,arguments)}};n=s("steps/configuration"),i=s("steps/scale"),o=s("steps/summary"),a=s("misc/sequence"),c=s("jade/step-manager"),t.exports=l=function(){function s(s,t){this.isHorizontal=null!=t?t:!1,this.getPlans=r(this.getPlans,this),this.$node=$(c({})),s.append(this.$node),this.$wrapper=$(".step-wrapper",this.$node),this.$steps=$(".steps",this.$node),castShadows(this.$node),this.$currentStep=$("#current-step",this.$node),this.$stepTitle=$(".step-title",this.$node),this.initClickHandlers(),this.initSteps()}return s.prototype.initClickHandlers=function(){return $(".forward",this.$node).on("click",function(s){return function(){return s.nextStep()}}(this)),$(".back",this.$node).on("click",function(s){return function(){return s.previousStep()}}(this))},s.prototype.initSteps=function(){var s;return this.configuration=new n(this.$steps,this.isHorizontal,this.onConfigurationChange),this.scale=new i(this.$steps,this.isHorizontal),this.summary=new o(this.$steps,this.isHorizontal,this.getPlans),s=[this.configuration,this.scale,this.summary],this.steps=new a(s),this.slideToCurrentStep(),$("#total-steps",this.$node).text(s.length)},s.prototype.getPlans=function(){return this.scale.getSelectedPlans()},s.prototype.nextStep=function(){return this.steps.isAtLastItem()?console.log("submit"):(this.steps.next(),this.slideToCurrentStep())},s.prototype.onConfigurationChange=function(s){return console.log("configuration change : "+s)},s.prototype.previousStep=function(){return this.steps.prev(),this.slideToCurrentStep()},s.prototype.slideToCurrentStep=function(){var s,t,e;return this.steps.currentItem().activate(),this.$currentStep.text(this.steps.currentItemIndex+1),this.$stepTitle.text(this.steps.currentItem().getTitle()),s=-this.steps.currentItem().$node.position().left,e=this.steps.currentItem().$node.children().outerHeight(),this.$wrapper.css({height:e}),t=this,setTimeout(function(){return t.$steps.css({left:s})},100),this.$node.removeClass("submit"),this.$node.removeClass("first"),this.steps.isAtLastItem()?this.$node.addClass("submit"):0===this.steps.currentItemIndex?this.$node.addClass("first"):void 0},s}()},{"jade/step-manager":9,"misc/sequence":3,"steps/configuration":4,"steps/scale":5,"steps/summary":6}],2:[function(s,t,e){var n,i;i=s("components/step-manager"),n=function(){function s(s,t){this.stepManager=new i(s,t)}return s}(),window.nanobox||(window.nanobox={}),nanobox.Splitter=n},{"components/step-manager":1}],3:[function(s,t,e){var n;t.exports=n=function(){function s(s){this.items=s,this.reset(),this.totalItems=this.items.length}return s.prototype.next=function(s){return null==s&&(s=!1),this.incramentItemIndex(1,s)},s.prototype.prev=function(s){return null==s&&(s=!1),this.incramentItemIndex(-1,s)},s.prototype.isAtLastItem=function(){return this.currentItemIndex===this.totalItems-1},s.prototype.getCurrentItem=function(){return this.items[this.currentItemIndex]},s.prototype.currentItem=function(){return this.getCurrentItem()},s.prototype.incramentItemIndex=function(s,t){var e;return null==t&&(t=!1),e=this.currentItemIndex+s,e>this.totalItems-1?e=t?0:this.totalItems-1:0>e&&(e=t?this.totalItems-1:0),this.currentItemIndex!==e?(this.currentItemIndex=e,!0):!1},s.prototype.changeItemByIndex=function(s){var t,e;return e=s>this.currentItemIndex?1:-1,t=Math.abs(this.currentItemIndex-s)*e,this.incramentItemIndex(t)},s.prototype.activateItemByParam=function(s,t){return this.currentItemIndex=this.getIndexByParam(s,t)},s.prototype.getIndexByParam=function(s,t){var e,n,i,a,l;for(l=this.items,e=i=0,a=l.length;a>i;e=++i)if(n=l[e],n[s]===t)return e;return null},s.prototype.getItemByParam=function(s,t){return this.items[this.getIndexByParam(s,t)]},s.prototype.reset=function(){return this.currentItemIndex=0},s}()},{}],4:[function(s,t,e){var n,i;i=s("jade/configuration"),t.exports=n=function(){function s(s,t,e){this.isHorizontal=t,this.configChangeCb=e,this.$node=$(i(this.getConfig())),s.append(this.$node),castShadows(this.$node),this.$options=$(".option",this.$node),$(".icon").on("click",function(s){return function(t){return s.onClick($(t.currentTarget))}}(this))}return s.prototype.getConfig=function(){var s;return s={singleTitle:"Single",singleBlurb:"A single instance of this component  installed on a multi-component server."},this.isHorizontal?(s.singleIcon="horizontal-single",s.redundantIcon="horizontal-cluster",s.redundantTitle="Horizontal Cluster",s.redundantBlurb="Cluster one or more instances of this component. Each instance lives on it’s own server for redundancy and greater performance. "):(s.singleIcon="vertical-single",s.redundantIcon="vertical-redundant",s.redundantTitle="Redundant Cluster",s.redundantBlurb="A primary and secondary instance of your data component plus  a small monitor to sync data state between the two and switch traffic to the secondary if the primary should fail."),s},s.prototype.onClick=function(s){var t;return t=s.attr("data-id"),this.selection!==t?(this.selection=t,this.$options.removeClass("picked"),s.parent().addClass("picked"),this.configChangeCb(this.selection)):void 0},s.prototype.getTitle=function(){return"Choose a Configuration"},s.prototype.activate=function(){},s}()},{"jade/configuration":7}],5:[function(s,t,e){var n,i,a=function(s,t){return function(){return s.apply(t,arguments)}};i=s("jade/scale"),t.exports=n=function(){function s(s,t){var e;this.isHorizontallyScalable=t,this.onSelectionChange=a(this.onSelectionChange,this),this.$node=$(i({isHorizontal:this.isHorizontallyScalable})),s.append(this.$node),e=$(".scale-holder",this.$node),this.isHorizontallyScalable?(this.scaleMachine=new nanobox.ScaleMachine(e,"default",this.onSelectionChange,this.onInstanceTotalChange,1),this.instanceData={}):(this.scaleMachine=new nanobox.ScaleMachine(e,"default",this.onSelectionChange),this.initMemberEvents(),this.memberData={primary:{},secondary:{},monitor:{}}),this.scaleMachine.hideInstructions(),this.scaleMachine.keepHoverInbounds(),castShadows(this.$node)}return s.prototype.initMemberEvents=function(){return this.$members=$(".member",this.$node),this.activeMember=$(".member.active",this.$node).attr("data-id"),this.$members.on("click",function(s){return function(t){var e;return e=$(t.currentTarget),s.activeMember=e.attr("data-id"),s.$members.removeClass("active"),e.addClass("active"),"secondary"!==s.activeMember||s.memberData.secondary.userHasSpecified||(s.memberData.secondary.planId=s.memberData.primary.planId),s.scaleMachine.refresh(s.memberData[s.activeMember].planId)}}(this))},s.prototype.onSelectionChange=function(s){return this.isHorizontallyScalable?this.instanceData.planId=s:(this.memberData[this.activeMember].planId=s,this.memberData[this.activeMember].planData=this.scaleMachine.getPlanData(s),"primary"!==this.activeMember||this.memberData.secondary.userHasSpecified||(this.memberData.secondary.planId=this.memberData.primary.planId,this.memberData.secondary.planData=this.memberData.primary.planData),"secondary"===this.activeMember?this.memberData.secondary.userHasSpecified=!0:void 0)},s.prototype.onInstanceTotalChange=function(){},s.prototype.getSelectedPlans=function(){var s,t,e;if(this.isHorizontallyScalable)return this.instanceData;e=this.memberData;for(s in e)t=e[s],null==t.planId&&(t.planId=this.scaleMachine.getDefaultPlan(),t.planData=this.scaleMachine.getPlanData(t.planId));return this.memberData},s.prototype.getTitle=function(){return this.isHorizontallyScalable?"Choose a VM size and number of instances":"Configure the scale for each cluster member"},s.prototype.activate=function(){},s}()},{"jade/scale":8}],6:[function(s,t,e){var n,i;i=s("jade/summary"),t.exports=n=function(){function s(s,t,e){this.$el=s,this.isHorizontal=t,this.getPlans=e}return s.prototype.getTitle=function(){return"Review and Submit"},s.prototype.activate=function(){var s,t,e,n;null!=(n=this.$node)&&n.remove(),e=this.getPlans();for(s in e)t=e[s],t.icon=this.getIcon(s);return this.$node=$(i({members:e})),this.$el.append(this.$node),castShadows(this.$node)},s.prototype.getIcon=function(s){switch(s){case"primary":return"vertical-single";case"secondary":return"vertical-single";case"monitor":return"monitor";case"cluster":return"horizontal-cluster";case"single":return this.isHorizontal?"horizontal-single":"vertical-single"}},s}()},{"jade/summary":10}],7:[function(s,t,e){t.exports=function(s){var t,e=[],n=s||{};return function(s,n,i,a,l,o){e.push('<div class="step configuration"><div class="wrapper"><div class="option picked"><div data-id="redundant" class="icon"><img'+jade.attr("data-src",""+n,!0,!1)+' class="shadow-icon"/><div class="check-icon"><img data-src="check" class="shadow-icon"/></div></div><div class="title">'+jade.escape(null==(t=i)?"":t)+'</div><div class="blurb">'+jade.escape(null==(t=s)?"":t)+'</div></div><div class="option"><div data-id="single" class="icon"><img'+jade.attr("data-src",""+l,!0,!1)+' class="shadow-icon"/><div class="check-icon"><img data-src="check" class="shadow-icon"/></div></div><div class="title">'+jade.escape(null==(t=o)?"":t)+'</div><div class="blurb">'+jade.escape(null==(t=a)?"":t)+"</div></div></div></div>")}.call(this,"redundantBlurb"in n?n.redundantBlurb:"undefined"!=typeof redundantBlurb?redundantBlurb:void 0,"redundantIcon"in n?n.redundantIcon:"undefined"!=typeof redundantIcon?redundantIcon:void 0,"redundantTitle"in n?n.redundantTitle:"undefined"!=typeof redundantTitle?redundantTitle:void 0,"singleBlurb"in n?n.singleBlurb:"undefined"!=typeof singleBlurb?singleBlurb:void 0,"singleIcon"in n?n.singleIcon:"undefined"!=typeof singleIcon?singleIcon:void 0,"singleTitle"in n?n.singleTitle:"undefined"!=typeof singleTitle?singleTitle:void 0),e.join("")}},{}],8:[function(s,t,e){t.exports=function(s){var t=[],e=s||{};return function(s){t.push('<div class="step scale"><div class="wrapper">'),s||t.push('<div class="members"><div data-id="primary" class="member active"><img data-src="vertical-single" class="shadow-icon"/><div class="txt">Primary</div></div><div data-id="secondary" class="member"><img data-src="vertical-single" class="shadow-icon"/><div class="txt">Secondary</div></div><div data-id="monitor" class="member"><img data-src="monitor" class="shadow-icon"/><div class="txt">Monitor</div></div></div>'),t.push('<div class="scale-holder"></div></div></div>')}.call(this,"isHorizontal"in e?e.isHorizontal:"undefined"!=typeof isHorizontal?isHorizontal:void 0),t.join("")}},{}],9:[function(s,t,e){t.exports=function(s){var t=[];return t.push('<div class="step-manager"><div class="wrapper"><div class="step-key"><div class="step-count">Step <span id=\'current-step\'>1</span> of <span id=\'total-steps\'>3 : </span></div><div class="step-title">Review And Submit</div></div><div class="step-wrapper"><div class="steps"></div></div><div class="ui"><div class="ui-btn back"> <img data-src="back-arrow" class="shadow-icon"/><div class="txt">Back</div></div><div class="ui-btn cancel"> <img data-src="cancel-x" class="shadow-icon"/><div class="txt">Cancel</div></div><div class="btn forward"><img data-src="next-btn" class="shadow-icon"/></div></div></div></div>'),t.join("")}},{}],10:[function(s,t,e){t.exports=function(s){var t,e=[],n=s||{};return function(s,n){e.push('<div class="step summary"><div class="wrapper"><div class="hosts">'),function(){var n=s;if("number"==typeof n.length)for(var i=0,a=n.length;a>i;i++){var l=n[i];e.push('<div class="host"><div class="icon"><img'+jade.attr("data-src",""+l.icon,!0,!1)+' class="shadow-icon"/><div class="txt">'+jade.escape(null==(t=i)?"":t)+'</div></div><div class="details"><div class="title">AWS Instance Specs</div><div class="specs"><div class="spec">'+jade.escape(null==(t=l.planData.RAM)?"":t)+' GB RAM</div><div class="spec">'+jade.escape(null==(t=l.planData.CPU)?"":t)+' CPU CORE</div><div class="spec">'+jade.escape(null==(t=l.planData.DISK)?"":t)+' GB SSD DISK</div><div class="spec">$'+jade.escape(null==(t=l.planData.dollarsPerHr)?"":t)+"/hr</div></div></div></div>")}else{var a=0;for(var i in n){a++;var l=n[i];e.push('<div class="host"><div class="icon"><img'+jade.attr("data-src",""+l.icon,!0,!1)+' class="shadow-icon"/><div class="txt">'+jade.escape(null==(t=i)?"":t)+'</div></div><div class="details"><div class="title">AWS Instance Specs</div><div class="specs"><div class="spec">'+jade.escape(null==(t=l.planData.RAM)?"":t)+' GB RAM</div><div class="spec">'+jade.escape(null==(t=l.planData.CPU)?"":t)+' CPU CORE</div><div class="spec">'+jade.escape(null==(t=l.planData.DISK)?"":t)+' GB SSD DISK</div><div class="spec">$'+jade.escape(null==(t=l.planData.dollarsPerHr)?"":t)+"/hr</div></div></div></div>")}}}.call(this),e.push("</div></div></div>")}.call(this,"members"in n?n.members:"undefined"!=typeof members?members:void 0,"undefined"in n?n.undefined:void 0),e.join("")}},{}]},{},[2]);var pxSvgIconString=pxSvgIconString||"";pxSvgIconString+='<g id="horizontal-single" data-size="44x53" class="splitter-svg-svg ">	<polyline class="st0" points="31.756,7.541 11.936,18.94 11.936,44.056 	"/><line class="st0" x1="6.551" y1="15.842" x2="26.371" y2="4.441"/><line class="st0" x1="11.936" y1="18.94" x2="31.756" y2="7.541"/><line class="st0" x1="17.323" y1="22.037" x2="37.141" y2="10.639"/><polyline class="st0" points="6.681,20.911 6.681,41.729 6.502,41.729 1.244,38.706 1.165,38.706 1.165,12.744 20.983,1.344 		42.528,13.736 42.528,32.656 42.528,39.548 22.708,50.948 17.452,47.924 17.452,27.38 	"/><polyline class="st0" points="42.528,13.736 22.708,25.136 22.708,44.056 37.141,35.754 	"/><line class="st0" x1="28.636" y1="29.081" x2="43.069" y2="20.78"/><line class="st0" x1="27.683" y1="35.762" x2="37.243" y2="30.263"/></g><g id="horizontal-cluster" data-size="119x117" class="splitter-svg-svg ">	<polyline class="st0" points="26.974,42.894 10.253,52.511 10.253,73.7 	"/><line class="st0" x1="5.71" y1="49.897" x2="22.431" y2="40.279"/><line class="st0" x1="10.253" y1="52.511" x2="26.974" y2="42.894"/><line class="st0" x1="14.798" y1="55.124" x2="31.518" y2="45.508"/><polyline class="st0" points="5.819,54.173 5.819,71.737 5.668,71.737 1.233,69.187 1.165,69.187 1.165,47.283 17.885,37.666 		36.063,48.12 36.063,64.083 36.063,69.897 19.341,79.515 14.906,76.964 14.906,59.632 	"/><polyline class="st0" points="36.063,48.12 19.341,57.738 19.341,73.7 31.518,66.697 	"/><line class="st0" x1="24.342" y1="61.067" x2="36.519" y2="54.063"/><line class="st0" x1="23.538" y1="66.703" x2="31.604" y2="62.063"/><polyline class="st0" points="67.5,42.894 50.778,52.511 50.778,73.7 	"/><line class="st0" x1="46.235" y1="49.897" x2="62.957" y2="40.279"/><line class="st0" x1="50.778" y1="52.511" x2="67.5" y2="42.894"/><line class="st0" x1="55.323" y1="55.124" x2="72.043" y2="45.508"/><polyline class="st0" points="46.344,54.173 46.344,71.737 46.193,71.737 41.758,69.187 41.691,69.187 41.691,47.283 58.41,37.666 		76.588,48.12 76.588,64.083 76.588,69.897 59.866,79.515 55.432,76.964 55.432,59.632 	"/><polyline class="st0" points="76.588,48.12 59.866,57.738 59.866,73.7 72.043,66.697 	"/><line class="st0" x1="64.867" y1="61.067" x2="77.044" y2="54.063"/><line class="st0" x1="64.063" y1="66.703" x2="72.129" y2="62.063"/><polyline class="st0" points="108.025,42.894 91.303,52.511 91.303,73.7 	"/><line class="st0" x1="86.76" y1="49.897" x2="103.482" y2="40.279"/><line class="st0" x1="91.303" y1="52.511" x2="108.025" y2="42.894"/><line class="st0" x1="95.848" y1="55.124" x2="112.568" y2="45.508"/><polyline class="st0" points="86.869,54.173 86.869,71.737 86.719,71.737 82.283,69.187 82.216,69.187 82.216,47.283 		98.936,37.666 117.113,48.12 117.113,64.083 117.113,69.897 100.391,79.515 95.957,76.964 95.957,59.632 	"/><polyline class="st0" points="117.113,48.12 100.391,57.738 100.391,73.7 112.568,66.697 	"/><line class="st0" x1="105.392" y1="61.067" x2="117.569" y2="54.063"/><line class="st0" x1="104.588" y1="66.703" x2="112.654" y2="62.063"/><polyline class="st0" points="45.549,6.572 28.827,16.189 28.827,37.379 	"/><line class="st0" x1="24.284" y1="13.576" x2="41.005" y2="3.957"/><line class="st0" x1="28.827" y1="16.189" x2="45.549" y2="6.572"/><line class="st0" x1="33.372" y1="18.802" x2="50.092" y2="9.186"/><polyline class="st0" points="24.393,17.852 24.393,35.416 24.242,35.416 19.807,32.865 19.739,32.865 19.739,10.962 36.459,1.344 		54.637,11.799 54.637,27.761 54.637,33.576 37.915,43.193 33.48,40.643 33.48,23.31 	"/><polyline class="st0" points="54.637,11.799 37.915,21.416 37.915,37.379 50.092,30.375 	"/><line class="st0" x1="42.916" y1="24.745" x2="55.093" y2="17.742"/><line class="st0" x1="42.112" y1="30.381" x2="50.178" y2="25.742"/><polyline class="st0" points="86.074,6.572 69.352,16.189 69.352,37.379 	"/><line class="st0" x1="64.809" y1="13.576" x2="81.531" y2="3.957"/><line class="st0" x1="69.352" y1="16.189" x2="86.074" y2="6.572"/><line class="st0" x1="73.897" y1="18.802" x2="90.617" y2="9.186"/><polyline class="st0" points="64.918,17.852 64.918,35.416 64.768,35.416 60.332,32.865 60.265,32.865 60.265,10.962 76.984,1.344 		95.162,11.799 95.162,27.761 95.162,33.576 78.44,43.193 74.006,40.643 74.006,23.31 	"/><polyline class="st0" points="95.162,11.799 78.44,21.416 78.44,37.379 90.617,30.375 	"/><line class="st0" x1="83.441" y1="24.745" x2="95.618" y2="17.742"/><line class="st0" x1="82.637" y1="30.381" x2="90.703" y2="25.742"/><polyline class="st0" points="48.712,78.558 31.991,88.176 31.991,109.365 	"/><line class="st0" x1="27.447" y1="85.562" x2="44.169" y2="75.943"/><line class="st0" x1="31.991" y1="88.176" x2="48.712" y2="78.558"/><line class="st0" x1="36.536" y1="90.789" x2="53.256" y2="81.172"/><polyline class="st0" points="27.557,89.838 27.557,107.402 27.406,107.402 22.97,104.851 22.903,104.851 22.903,82.948 		39.623,73.33 57.801,83.785 57.801,99.747 57.801,105.562 41.079,115.179 36.644,112.629 36.644,95.296 	"/><polyline class="st0" points="57.801,83.785 41.079,93.403 41.079,109.365 53.256,102.361 	"/><line class="st0" x1="46.08" y1="96.731" x2="58.256" y2="89.728"/><line class="st0" x1="45.276" y1="102.367" x2="53.342" y2="97.728"/><polyline class="st0" points="89.238,78.558 72.516,88.176 72.516,109.365 	"/><line class="st0" x1="67.973" y1="85.562" x2="84.694" y2="75.943"/><line class="st0" x1="72.516" y1="88.176" x2="89.238" y2="78.558"/><line class="st0" x1="77.061" y1="90.789" x2="93.781" y2="81.172"/><polyline class="st0" points="68.082,89.838 68.082,107.402 67.931,107.402 63.496,104.851 63.428,104.851 63.428,82.948 		80.148,73.33 98.326,83.785 98.326,99.747 98.326,105.562 81.604,115.179 77.169,112.629 77.169,95.296 	"/><polyline class="st0" points="98.326,83.785 81.604,93.403 81.604,109.365 93.781,102.361 	"/><line class="st0" x1="86.605" y1="96.731" x2="98.782" y2="89.728"/><line class="st0" x1="85.801" y1="102.367" x2="93.867" y2="97.728"/></g><g id="vertical-redundant" data-size="125x82" class="splitter-svg-svg ">	<polyline class="st1" points="13.453,27.71 2.366,18.158 2.366,24.063 13.453,33.613 31.505,33.486 	"/><polyline class="st1" points="35.628,34.266 46.715,24.716 46.715,30.302 35.628,39.2 13.453,39.2 0.825,28.108 	"/><polyline class="st1" points="46.715,36.008 35.628,44.906 14.99,44.906 	"/><polyline class="st1" points="12.912,44.937 1.825,35.387 1.825,41.237 12.912,50.748 35.088,50.748 46.861,41.154 	"/><polyline class="st1" points="21.374,10.799 30.082,10.799 38.665,18.33 46.715,10.8 35.628,1.25 13.411,1.25 2.366,10.8 		16.119,23.017 31.613,23.017 34.85,20.707 	"/><polyline class="st1" points="11.724,9.606 20.945,17.418 30.325,17.418 	"/><polyline class="st1" points="15.142,6.107 33.435,6.107 39.012,11.456 	"/><polyline class="st1" points="93.374,27.71 111.665,27.71 122.752,18.158 122.752,15.525 	"/><polyline class="st1" points="89.49,27.71 78.403,18.158 78.403,24.063 89.49,33.613 107.542,33.486 	"/><polyline class="st1" points="111.665,34.266 122.752,24.716 122.752,30.302 111.665,39.2 89.49,39.2 76.862,28.108 	"/><polyline class="st1" points="122.752,36.008 111.665,44.906 91.026,44.906 	"/><polyline class="st1" points="88.949,44.937 77.862,35.387 77.862,41.237 88.949,50.748 111.124,50.748 122.898,41.154 	"/><polyline class="st1" points="97.411,10.799 106.119,10.799 114.702,18.33 122.752,10.8 111.665,1.25 89.448,1.25 78.403,10.8 		92.155,23.017 107.649,23.017 110.886,20.707 	"/><polyline class="st1" points="87.761,9.606 96.982,17.418 106.361,17.418 	"/><polyline class="st1" points="91.179,6.107 109.471,6.107 115.049,11.456 	"/><polyline class="st2" points="57.263,76.907 57.263,66.4 62.844,63.083 68.425,66.4 68.425,76.907 62.844,73.59 62.844,69.19 	"/><line class="st2" x1="57.263" y1="76.907" x2="62.844" y2="73.59"/><path class="st3" d="M62.844,73.59"/><polyline class="st3" points="62.844,57.596 62.844,60.374 62.844,63.288 	"/><polyline class="st2" points="73.203,63.638 62.844,69.835 52.485,63.638 	"/><polygon class="st2" points="73.203,74.055 62.844,80.252 52.485,74.055 52.485,63.638 62.844,57.44 73.203,63.638 	"/><polyline class="st1" points="17.337,27.71 35.628,27.71 46.715,18.158 	"/><line class="st1" x1="78.146" y1="40.457" x2="54.423" y2="40.457"/><polyline class="st1" points="59.004,45.757 53.703,40.457 59.004,35.156 	"/><line class="st1" x1="46.715" y1="10.552" x2="69.624" y2="10.374"/><polyline class="st1" points="65.043,5.073 70.344,10.374 65.043,15.674 	"/></g><g id="vertical-single" data-size="49x52" class="splitter-svg-svg ">	<polyline class="st1" points="17.337,27.71 35.629,27.71 46.716,18.158 46.716,15.525 	"/><polyline class="st1" points="13.453,27.71 2.366,18.158 2.366,24.063 13.453,33.613 31.505,33.486 	"/><polyline class="st1" points="35.629,34.266 46.716,24.716 46.716,30.302 35.629,39.2 13.453,39.2 0.825,28.108 	"/><polyline class="st1" points="46.716,36.008 35.629,44.906 14.99,44.906 	"/><polyline class="st1" points="12.912,44.937 1.825,35.387 1.825,41.237 12.912,50.748 35.088,50.748 46.862,41.154 	"/><polyline class="st1" points="21.374,10.799 30.083,10.799 38.665,18.33 46.716,10.8 35.629,1.25 13.411,1.25 2.366,10.8 		16.119,23.017 31.613,23.017 34.85,20.707 	"/><polyline class="st1" points="11.724,9.606 20.945,17.418 30.325,17.418 	"/><polyline class="st1" points="15.142,6.107 33.435,6.107 39.013,11.456 	"/></g><g id="check" data-size="27x27" class="splitter-svg-svg ">	<circle class="st4" cx="13.467" cy="13.467" r="13.467"/><path  class="check-mark st5" d="M11.878,19.169c-0.234,0-0.448-0.045-0.641-0.137c-0.193-0.092-0.377-0.214-0.55-0.366		l-3.236-3.252c-0.163-0.163-0.285-0.349-0.366-0.558c-0.082-0.208-0.122-0.419-0.122-0.633s0.041-0.423,0.122-0.626		c0.082-0.204,0.204-0.382,0.366-0.534C7.614,12.9,7.8,12.775,8.008,12.689c0.208-0.087,0.42-0.13,0.634-0.13		s0.422,0.043,0.626,0.13c0.203,0.086,0.387,0.211,0.549,0.374l2.061,2.061l5.206-5.221c0.163-0.163,0.346-0.285,0.549-0.366		c0.204-0.082,0.415-0.122,0.634-0.122c0.219,0,0.43,0.04,0.633,0.122c0.204,0.081,0.387,0.203,0.55,0.366s0.282,0.346,0.359,0.55		c0.076,0.203,0.114,0.414,0.114,0.633c0,0.22-0.038,0.431-0.114,0.634c-0.077,0.204-0.196,0.387-0.359,0.55l-6.397,6.396		c-0.152,0.152-0.328,0.274-0.526,0.366C12.328,19.124,12.112,19.169,11.878,19.169z"/></g><g id="next-btn" data-size="83x40" class="splitter-svg-svg ">	<polygon class="st6" points="70.474,0.016 0,0 0,39.644 70.474,39.644 82.664,19.822 	"/></g><g id="cancel-x" data-size="12x12" class="splitter-svg-svg ">	<line class="st7" x1="0.354" y1="0.354" x2="10.977" y2="10.977"/><line class="st7" x1="10.977" y1="0.354" x2="0.354" y2="10.977"/></g><g id="back-arrow" data-size="6x12" class="splitter-svg-svg ">	<polyline class="st7" points="5.196,10.998 0.656,5.661 5.196,0.324 	"/></g><g id="monitor" data-size="23x25" class="splitter-svg-svg ">	<polyline class="st2" points="5.778,20.325 5.778,9.818 11.359,6.501 16.94,9.818 16.94,20.325 11.359,17.008 11.359,12.608 	"/><line class="st2" x1="5.778" y1="20.325" x2="11.359" y2="17.008"/><path class="st3" d="M11.359,17.008"/><polyline class="st3" points="11.359,1.014 11.359,3.792 11.359,6.706 	"/><polyline class="st2" points="21.718,7.056 11.359,13.253 1,7.056 	"/><polygon class="st2" points="21.718,17.473 11.359,23.67 1,17.473 1,7.056 11.359,0.858 21.718,7.056 	"/></g>';var pxSvgIconString=pxSvgIconString||"";pxSvgIconString+="";