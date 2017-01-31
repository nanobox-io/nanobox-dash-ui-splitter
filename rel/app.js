!function s(t,e,i){function n(a,l){if(!e[a]){if(!t[a]){var r="function"==typeof require&&require;if(!l&&r)return r(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var d=e[a]={exports:{}};t[a][0].call(d.exports,function(s){var e=t[a][1][s];return n(e?e:s)},d,d.exports,s,t,e,i)}return e[a].exports}for(var o="function"==typeof require&&require,a=0;a<i.length;a++)n(i[a]);return n}({1:[function(s,t,e){var i,n,o,a,l,r,c=function(s,t){return function(){return s.apply(t,arguments)}};i=s("steps/configuration"),n=s("steps/scale"),l=s("steps/summary"),o=s("misc/sequence"),r=s("jade/step-manager"),t.exports=a=function(){function s(s,t){this.$el=s,this.getConfiguration=c(this.getConfiguration,this),this.changeIsExistingBunkhouse=c(this.changeIsExistingBunkhouse,this),this.isHorizRedund=c(this.isHorizRedund,this),this.getPlans=c(this.getPlans,this),this.isHorizontal=this.isHorizontal(t.clusterShapeCanBe),this.category=t.category,this.isCluster="cluster"===t.topology,this.bunkHouses=t.bunkHouses,this.submitCb=t.submitCb,this.cancelCb=t.cancelCb,this.componentId=t.componentId,this.clusterable=this.isClusterable(t.clusterShapeCanBe),this.$node=$(r({})),this.$el.append(this.$node),this.$wrapper=$(".step-wrapper",this.$node),this.$steps=$(".steps",this.$node),castShadows(this.$node),this.$currentStep=$("#current-step",this.$node),this.$stepTitle=$(".step-title",this.$node),this.initClickHandlers(),this.initSteps()}return s.prototype.initClickHandlers=function(){return $(".forward",this.$node).on("click",function(s){return function(){return s.pickingExistingHost?s.submit(!0):s.nextStep()}}(this)),$(".back",this.$node).on("click",function(s){return function(){return s.previousStep()}}(this)),$(".cancel",this.$node).on("click",function(s){return function(){return s.cancelCb()}}(this))},s.prototype.initSteps=function(){var s;return this.configuration=new i(this.$steps,this.isHorizontal,this.bunkHouses,this.clusterable,this.isCluster,this.changeIsExistingBunkhouse),this.scale=new n(this.$steps,this.isHorizRedund,this.getConfiguration),this.summary=new l(this.$steps,this.isHorizontal,this.isHorizRedund,this.getPlans),s=[this.configuration,this.scale,this.summary],this.steps=new o(s),this.slideToCurrentStep(),$("#total-steps",this.$node).text(this.steps.totalItems),this.configuration.init()},s.prototype.getPlans=function(){return{plans:this.scale.getSelectedPlans(),meta:this.scale.getMeta()}},s.prototype.isHorizRedund=function(){return this.isHorizontal&&!this.configuration.isBunkhouse()},s.prototype.changeIsExistingBunkhouse=function(s){return s?($("#total-steps",this.$node).text(1),this.pickingExistingHost=!0,this.$node.addClass("existing-host-pick")):($("#total-steps",this.$node).text(this.steps.totalItems),this.pickingExistingHost=!1,this.$node.removeClass("existing-host-pick"))},s.prototype.getConfiguration=function(){return this.configuration.getData()},s.prototype.nextStep=function(){return this.steps.isAtLastItem()?this.submit():(this.steps.next(),this.slideToCurrentStep())},s.prototype.previousStep=function(){return this.steps.prev(),this.slideToCurrentStep()},s.prototype.slideToCurrentStep=function(){var s,t;return this.steps.currentItem().activate(),this.$currentStep.text(this.steps.currentItemIndex+1),this.$stepTitle.text(this.steps.currentItem().getTitle()),s=-this.steps.currentItem().$node.position().left,t=this,setTimeout(function(){var s;return s=t.steps.currentItem().$node.children().outerHeight(),t.$wrapper.css({height:s})},100),setTimeout(function(){return t.$steps.css({left:s})},200),this.$node.removeClass("submit"),this.$node.removeClass("first"),this.steps.isAtLastItem()?this.$node.addClass("submit"):0===this.steps.currentItemIndex?this.$node.addClass("first"):void 0},s.prototype.submit=function(s){var t,e,i,n,o,a,l;if(null==s&&(s=!1),e={componentId:this.componentId,category:this.category},s)e.bunkhouseId=$("#bunkhaus-picker",this.$el).val(),e.topology="bunkhouse";else{l=this.scale.getSelectedPlans(),t=this.configuration.getData(),i="data"===this.category&&"cluster"===t.topology,e.topology=t.topology,e.sizes={},"single-cluster"===e.topology&&(e.topology="cluster");for(n in l)o=l[n],e.totalInstances=o.totalInstances,a=n,"primary"!==a||i||(a="default"),e.sizes[a]=o.planId}return void 0===e.totalInstances&&delete e.totalInstances,this.submitCb(e),PubSub.publish("SPLITTER.SPLIT",e)},s.prototype.isHorizontal=function(s){return-1!==$.inArray("horizontal",s)},s.prototype.isClusterable=function(s){return-1!==$.inArray("horizontal",s)||-1!==$.inArray("data-redundant",s)},s}()},{"jade/step-manager":9,"misc/sequence":3,"steps/configuration":4,"steps/scale":5,"steps/summary":6}],2:[function(s,t,e){var i,n;n=s("components/step-manager"),i=function(){function s(s,t){this.stepManager=new n(s,t)}return s}(),window.nanobox||(window.nanobox={}),nanobox.Splitter=i},{"components/step-manager":1}],3:[function(s,t,e){var i;t.exports=i=function(){function s(s){this.items=s,this.reset(),this.totalItems=this.items.length}return s.prototype.next=function(s){return null==s&&(s=!1),this.incramentItemIndex(1,s)},s.prototype.prev=function(s){return null==s&&(s=!1),this.incramentItemIndex(-1,s)},s.prototype.isAtLastItem=function(){return this.currentItemIndex===this.totalItems-1},s.prototype.getCurrentItem=function(){return this.items[this.currentItemIndex]},s.prototype.currentItem=function(){return this.getCurrentItem()},s.prototype.incramentItemIndex=function(s,t){var e;return null==t&&(t=!1),e=this.currentItemIndex+s,e>this.totalItems-1?e=t?0:this.totalItems-1:0>e&&(e=t?this.totalItems-1:0),this.currentItemIndex!==e?(this.currentItemIndex=e,!0):!1},s.prototype.changeItemByIndex=function(s){var t,e;return e=s>this.currentItemIndex?1:-1,t=Math.abs(this.currentItemIndex-s)*e,this.incramentItemIndex(t)},s.prototype.activateItemByParam=function(s,t){return this.currentItemIndex=this.getIndexByParam(s,t)},s.prototype.getIndexByParam=function(s,t){var e,i,n,o,a;for(a=this.items,e=n=0,o=a.length;o>n;e=++n)if(i=a[e],i[s]===t)return e;return null},s.prototype.getItemByParam=function(s,t){return this.items[this.getIndexByParam(s,t)]},s.prototype.reset=function(){return this.currentItemIndex=0},s}()},{}],4:[function(s,t,e){var i,n;n=s("jade/configuration"),t.exports=i=function(){function s(s,t,e,i,o,a){var l;this.isHorizontal=t,this.clusterable=i,this.isCluster=o,this.isExistingHostCb=a,l=this.getConfig(e),this.$node=$(n(l)),s.append(this.$node),castShadows(this.$node),lexify(this.$node),this.$options=$(".option",this.$node),$(".icon",this.$node).on("click",function(s){return function(t){return s.onCategoryChange($(t.currentTarget))}}(this)),$("input",this.$node).on("click",function(s){return function(t){return s.singleKind=$(t.currentTarget).val(),"existing"===s.singleKind?s.isExistingHostCb(!0):s.isExistingHostCb(!1)}}(this)),this.selection=$(".option.picked .icon",this.$node).attr("data-id")}return s.prototype.init=function(){return this.setInitialState(),$(".icon:first",this.$node).trigger("click"),$("input:radio:first",this.$node).trigger("click")},s.prototype.setInitialState=function(){var s,t;return s=$(".option.bunkhouse",this.$node),t=$(".option.redundant",this.$node),this.clusterable?void 0:t.remove()},s.prototype.isBunkhouse=function(){return"bunkhouse"===this.selection},s.prototype.getConfig=function(s){var t,e,i,n,o;for(o={singleTitle:"Single",singleBlurb:"A single instance of this component."},this.isHorizontal?(o.isData=!1,o.singleIcon="horizontal-single",o.redundantIcon="horizontal-cluster",o.redundantTitle="Horizontal Cluster",o.redundantBlurb="Cluster one or more instances of this component. Each instance lives on it’s own server for redundancy and greater performance. "):(o.isData=!0,o.singleIcon="vertical-single",o.redundantIcon="vertical-redundant",o.redundantTitle="Redundant Cluster",o.redundantBlurb="A primary and secondary instance of your data component plus  a small monitor to sync data state between the two and switch traffic to the secondary if the primary should fail."),t=[],i=0,n=s.length;n>i;i++)e=s[i],"active"===e.state&&t.push(e);return o.bunkHouses=s,0===t.length?o.showBunkhouseSelector=!1:t.length>1?o.showBunkhouseSelector=!0:(o.showBunkhouseSelector=!0,s[0].current&&(o.showBunkhouseSelector=!1)),o},s.prototype.getData=function(){var s;return s={topology:this.selection,isNewServer:"new"===$("input[name='bunkhaus']:checked",this.$node).val(),isBunkhouse:"bunkhouse"===this.selection},s.isBunkhouse&&!s.isNewServer&&(s.existingServerId=$("select",this.$node).val()),"bunkhouse"===this.selection&&"new-single"===this.singleKind&&(s.topology="single-cluster"),s},s.prototype.onCategoryChange=function(s){var t;return t=s.attr("data-id"),this.selection!==t?(this.selection=t,this.$options.removeClass("picked"),s.parent().addClass("picked"),"cluster"===this.selection?($(".radios",this.$node).addClass("inactive"),$("input[value='new']",this.$node).prop("checked",!0),this.isExistingHostCb(!1)):$(".radios",this.$node).removeClass("inactive")):void 0},s.prototype.getTitle=function(){return"Choose a Configuration"},s.prototype.activate=function(){},s}()},{"jade/configuration":7}],5:[function(s,t,e){var i,n,o=function(s,t){return function(){return s.apply(t,arguments)}};n=s("jade/scale"),t.exports=i=function(){function s(s,t,e){var i,a;this.checkHorizReund=t,this.getConfiguration=e,this.onSelectionChange=o(this.onSelectionChange,this),this.isHorizRedund=this.checkHorizReund(),this.totalInstances=1,this.$node=$(n({isHorizontal:this.isHorizRedund})),s.append(this.$node),i=$(".holder",this.$node),a={activeServerId:"default",onSpecsChange:this.onSelectionChange,totalInstances:this.totalInstances,isHorizontallyScalable:this.isHorizRedund,isCluster:!0},this.scaleMachine=new nanobox.ScaleMachine(i,a)}return s.prototype.activate=function(){return this.isHorizRedund=this.checkHorizReund(),this.serverConfig=this.getConfiguration(),this.scaleMachine.refresh("cluster"===this.serverConfig.topology,this.isHorizRedund)},s.prototype.getTitle=function(){return"bunkhouse"===this.serverConfig.topology?"Choose a scale for a new multi-component VM":this.isHorizRedund?"Choose a VM size and number of instances":"Configure the scale for each cluster member"},s.prototype.onSelectionChange=function(){},s.prototype.getSelectedPlans=function(){return this.scaleMachine.getUserSelectedPlan()},s.prototype.getMeta=function(){return this.scaleMachine.getProviderMetadata()},s}()},{"jade/scale":8}],6:[function(s,t,e){var i,n;n=s("jade/summary"),t.exports=i=function(){function s(s,t,e,i){this.$el=s,this.isHorizontal=t,this.isHorizRedund=e,this.getScaleData=i}return s.prototype.getTitle=function(){return"Review and Submit"},s.prototype.activate=function(){var s,t,e,i,o;null!=(i=this.$node)&&i.remove(),s=this.getScaleData(),o=s.plans;for(t in o)e=o[t],e.icon=this.getIcon(t);return s={provider:s.meta.title,hostKind:s.meta.serverTitle,members:s.plans,isHorizontal:this.isHorizontal,isHorizontalRedund:this.isHorizRedund()},this.$node=$(n(s)),this.$el.append(this.$node),castShadows(this.$node)},s.prototype.getIcon=function(s){switch(s){case"default":case"primary":return this.isHorizRedund()?"horizontal-cluster":this.isHorizontal?"horizontal-single":"vertical-single";case"secondary":return"vertical-single";case"arbiter":return"monitor-instance";case"cluster":return"horizontal-cluster";case"single":return this.isHorizontal?"horizontal-single":"vertical-single"}},s}()},{"jade/summary":10}],7:[function(s,t,e){t.exports=function(s){var t,e=[],i=s||{};return function(s,i,n,o,a,l,r,c,d,u){e.push('<div class="step configuration lexi"><div class="wrapper"><div class="option redundant"><div data-id="cluster" class="icon"><img'+jade.attr("data-src",""+o,!0,!1)+' class="shadow-icon"/><div class="check-icon"><img data-src="split-check" class="shadow-icon"/></div></div><div class="title">'+jade.escape(null==(t=a)?"":t)+'</div><div class="blurb">'+jade.escape(null==(t=n)?"":t)+'</div></div><div class="option bunkhouse"><div data-id="bunkhouse" class="icon"><img'+jade.attr("data-src",""+c,!0,!1)+' class="shadow-icon"/><div class="check-icon"><img data-src="split-check" class="shadow-icon"/></div></div><div class="title">'+jade.escape(null==(t=d)?"":t)+'</div><div class="blurb">'+jade.escape(null==(t=r)?"":t)+"</div>"),e.push('<div class="radios inactive"><ul>'),i&&e.push('<li><label><input type="radio" name="bunkhaus" value="new-single" checked="checked"/><div class="txt">New Single-Component Host</div></label></li>'),e.push('<li><label><input type="radio" name="bunkhaus" value="new-multi"/><div class="txt">New Multi-component Host</div></label></li>'),l&&(e.push('<li><label><input type="radio" name="bunkhaus" value="existing"/><div class="txt">Existing Host</div></label><select id="bunkhaus-picker">'),function(){var i=s;if("number"==typeof i.length)for(var n=0,o=i.length;o>n;n++){var a=i[n];a.current?e.push("<option"+jade.attr("value",""+a.id,!0,!1)+' disabled="disabled">'+jade.escape(null==(t=a.name)?"":t)+" (Current)</option>"):e.push("<option"+jade.attr("value",""+a.id,!0,!1)+">"+jade.escape(null==(t=a.name)?"":t)+"</option>")}else{var o=0;for(var n in i){o++;var a=i[n];a.current?e.push("<option"+jade.attr("value",""+a.id,!0,!1)+' disabled="disabled">'+jade.escape(null==(t=a.name)?"":t)+" (Current)</option>"):e.push("<option"+jade.attr("value",""+a.id,!0,!1)+">"+jade.escape(null==(t=a.name)?"":t)+"</option>")}}}.call(this),e.push("</select></li>")),e.push("</ul></div>"),e.push("</div></div></div>")}.call(this,"bunkHouses"in i?i.bunkHouses:"undefined"!=typeof bunkHouses?bunkHouses:void 0,"isData"in i?i.isData:"undefined"!=typeof isData?isData:void 0,"redundantBlurb"in i?i.redundantBlurb:"undefined"!=typeof redundantBlurb?redundantBlurb:void 0,"redundantIcon"in i?i.redundantIcon:"undefined"!=typeof redundantIcon?redundantIcon:void 0,"redundantTitle"in i?i.redundantTitle:"undefined"!=typeof redundantTitle?redundantTitle:void 0,"showBunkhouseSelector"in i?i.showBunkhouseSelector:"undefined"!=typeof showBunkhouseSelector?showBunkhouseSelector:void 0,"singleBlurb"in i?i.singleBlurb:"undefined"!=typeof singleBlurb?singleBlurb:void 0,"singleIcon"in i?i.singleIcon:"undefined"!=typeof singleIcon?singleIcon:void 0,"singleTitle"in i?i.singleTitle:"undefined"!=typeof singleTitle?singleTitle:void 0,"undefined"in i?i.undefined:void 0),e.join("")}},{}],8:[function(s,t,e){t.exports=function(s){var t=[];return t.push('<div class="step scale"><div class="wrapper"><div class="holder"></div></div></div>'),t.join("")}},{}],9:[function(s,t,e){t.exports=function(s){var t=[];return t.push('<div class="splitter step-manager"><div class="wrapper"><div class="step-key"><div class="step-count">Step <span id=\'current-step\'>1</span> of <span id=\'total-steps\'>3 : </span></div><div class="step-title">Review And Submit</div><div class="ui-btn cancel"> <img data-src="cancel-x" class="shadow-icon"/><div class="txt">Cancel</div></div></div><div class="step-wrapper"><div class="steps"></div></div><div class="ui"><div class="ui-btn back"> <img data-src="back-arrow" class="shadow-icon"/><div class="txt">Back</div></div><div class="btn forward"><img data-src="next-btn" class="shadow-icon"/></div></div></div></div>'),t.join("")}},{}],10:[function(s,t,e){t.exports=function(s){var t,e=[],i=s||{};return function(s,i,n,o,a){e.push('<div class="step summary"><div class="wrapper"><div class="hosts">'),function(){var a=n;if("number"==typeof a.length)for(var l=0,r=a.length;r>l;l++){var c=a[l];e.push('<div class="host"><div class="icon"><img'+jade.attr("data-src",""+c.icon,!0,!1)+' class="shadow-icon"/><div class="txt">'+jade.escape(null==(t=l)?"":t)+'</div></div><div class="details"><div class="server-kind">'+jade.escape(null==(t=s)?"":t)+' Specs</div><div class="specs"><div class="spec"> <div class="metric">RAM</div><div class="value">'+jade.escape(null==(t=c.planData.RAM)?"":t)+' GB </div></div><div class="spec"> <div class="metric">CPU</div><div class="value">'+jade.escape(null==(t=c.planData.CPU)?"":t)+' CORES</div></div><div class="spec"> <div class="metric">DISK</div><div class="value">'+jade.escape(null==(t=c.planData.DISK)?"":t)+' GB</div></div><div class="spec cost"><div class="metric">'+jade.escape(null==(t=o)?"":t)+' Cost  </div><div class="value">$'+jade.escape(null==(t=c.planData.dollarsPerHr)?"":t)+"/hr</div></div></div></div>"),i&&e.push('<div class="total-instances"><img data-src="instance-multiply" class="shadow-icon"/><div class="total">'+jade.escape(null==(t=c.totalInstances)?"":t)+"</div></div>"),e.push("</div>")}else{var r=0;for(var l in a){r++;var c=a[l];e.push('<div class="host"><div class="icon"><img'+jade.attr("data-src",""+c.icon,!0,!1)+' class="shadow-icon"/><div class="txt">'+jade.escape(null==(t=l)?"":t)+'</div></div><div class="details"><div class="server-kind">'+jade.escape(null==(t=s)?"":t)+' Specs</div><div class="specs"><div class="spec"> <div class="metric">RAM</div><div class="value">'+jade.escape(null==(t=c.planData.RAM)?"":t)+' GB </div></div><div class="spec"> <div class="metric">CPU</div><div class="value">'+jade.escape(null==(t=c.planData.CPU)?"":t)+' CORES</div></div><div class="spec"> <div class="metric">DISK</div><div class="value">'+jade.escape(null==(t=c.planData.DISK)?"":t)+' GB</div></div><div class="spec cost"><div class="metric">'+jade.escape(null==(t=o)?"":t)+' Cost  </div><div class="value">$'+jade.escape(null==(t=c.planData.dollarsPerHr)?"":t)+"/hr</div></div></div></div>"),i&&e.push('<div class="total-instances"><img data-src="instance-multiply" class="shadow-icon"/><div class="total">'+jade.escape(null==(t=c.totalInstances)?"":t)+"</div></div>"),e.push("</div>")}}}.call(this),e.push("</div></div></div>")}.call(this,"hostKind"in i?i.hostKind:"undefined"!=typeof hostKind?hostKind:void 0,"isHorizontalRedund"in i?i.isHorizontalRedund:"undefined"!=typeof isHorizontalRedund?isHorizontalRedund:void 0,"members"in i?i.members:"undefined"!=typeof members?members:void 0,"provider"in i?i.provider:"undefined"!=typeof provider?provider:void 0,"undefined"in i?i.undefined:void 0),e.join("")}},{}]},{},[2]);var pxSvgIconString=pxSvgIconString||"";pxSvgIconString+='<g id="horizontal-single" data-size="44x53" class="splitter-svg-svg ">	<polyline class="st0" points="31.765,7.544 11.965,18.944 11.965,44.044 	"/><line class="st0" x1="6.565" y1="15.844" x2="26.365" y2="4.444"/><line class="st0" x1="11.965" y1="18.944" x2="31.765" y2="7.544"/><line class="st0" x1="17.365" y1="22.044" x2="37.165" y2="10.644"/><polyline class="st0" points="6.665,20.944 6.665,41.744 6.565,41.744 1.265,38.744 1.165,38.744 1.165,12.744 20.965,1.344 		42.565,13.744 42.565,32.644 42.565,39.544 22.765,50.944 17.465,47.944 17.465,27.344 	"/><polyline class="st0" points="42.565,13.744 22.765,25.144 22.765,44.044 37.165,35.744 	"/><line class="st0" x1="28.665" y1="29.044" x2="43.065" y2="20.744"/><line class="st0" x1="27.665" y1="35.744" x2="37.265" y2="30.244"/></g><g id="horizontal-cluster" data-size="119x117" class="splitter-svg-svg ">	<polyline class="st0" points="26.965,42.946 10.265,52.546 10.265,73.746 	"/><line class="st0" x1="5.765" y1="49.946" x2="22.465" y2="40.346"/><line class="st0" x1="10.265" y1="52.546" x2="26.965" y2="42.946"/><line class="st0" x1="14.865" y1="55.146" x2="31.565" y2="45.546"/><polyline class="st0" points="5.865,54.246 5.865,71.746 5.665,71.746 1.265,69.246 1.165,69.246 1.165,47.346 17.965,37.746 		36.065,48.146 36.065,64.146 36.065,69.946 19.365,79.546 14.965,77.046 14.965,59.646 	"/><polyline class="st0" points="36.065,48.146 19.365,57.746 19.365,73.746 31.565,66.746 	"/><line class="st0" x1="24.365" y1="61.146" x2="36.565" y2="54.146"/><line class="st0" x1="23.565" y1="66.746" x2="31.665" y2="62.146"/><polyline class="st0" points="67.565,42.946 50.765,52.546 50.765,73.746 	"/><line class="st0" x1="46.265" y1="49.946" x2="62.965" y2="40.346"/><line class="st0" x1="50.765" y1="52.546" x2="67.565" y2="42.946"/><line class="st0" x1="55.365" y1="55.146" x2="72.065" y2="45.546"/><polyline class="st0" points="46.365,54.246 46.365,71.746 46.265,71.746 41.765,69.246 41.765,69.246 41.765,47.346 		58.465,37.746 76.665,48.146 76.665,64.146 76.665,69.946 59.865,79.546 55.465,77.046 55.465,59.646 	"/><polyline class="st0" points="76.665,48.146 59.865,57.746 59.865,73.746 72.065,66.746 	"/><line class="st0" x1="64.865" y1="61.146" x2="77.065" y2="54.146"/><line class="st0" x1="64.065" y1="66.746" x2="72.165" y2="62.146"/><polyline class="st0" points="108.065,42.946 91.365,52.546 91.365,73.746 	"/><line class="st0" x1="86.765" y1="49.946" x2="103.465" y2="40.346"/><line class="st0" x1="91.365" y1="52.546" x2="108.065" y2="42.946"/><line class="st0" x1="95.865" y1="55.146" x2="112.565" y2="45.546"/><polyline class="st0" points="86.865,54.246 86.865,71.746 86.765,71.746 82.265,69.246 82.265,69.246 82.265,47.346 		98.965,37.746 117.165,48.146 117.165,64.146 117.165,69.946 100.465,79.546 95.965,77.046 95.965,59.646 	"/><polyline class="st0" points="117.165,48.146 100.465,57.746 100.465,73.746 112.565,66.746 	"/><line class="st0" x1="105.465" y1="61.146" x2="117.565" y2="54.146"/><line class="st0" x1="104.665" y1="66.746" x2="112.665" y2="62.146"/><polyline class="st0" points="45.565,6.646 28.865,16.246 28.865,37.446 	"/><line class="st0" x1="24.365" y1="13.646" x2="41.065" y2="4.046"/><line class="st0" x1="28.865" y1="16.246" x2="45.565" y2="6.646"/><line class="st0" x1="33.365" y1="18.846" x2="50.165" y2="9.246"/><polyline class="st0" points="24.465,17.946 24.465,35.446 24.265,35.446 19.865,32.946 19.765,32.946 19.765,11.046 36.465,1.346 		54.665,11.846 54.665,27.846 54.665,33.646 37.965,43.246 33.465,40.646 33.465,23.346 	"/><polyline class="st0" points="54.665,11.846 37.965,21.446 37.965,37.446 50.165,30.446 	"/><line class="st0" x1="42.965" y1="24.746" x2="55.165" y2="17.746"/><line class="st0" x1="42.165" y1="30.446" x2="50.165" y2="25.746"/><polyline class="st0" points="86.065,6.646 69.365,16.246 69.365,37.446 	"/><line class="st0" x1="64.865" y1="13.646" x2="81.565" y2="4.046"/><line class="st0" x1="69.365" y1="16.246" x2="86.065" y2="6.646"/><line class="st0" x1="73.965" y1="18.846" x2="90.665" y2="9.246"/><polyline class="st0" points="64.965,17.946 64.965,35.446 64.765,35.446 60.365,32.946 60.265,32.946 60.265,11.046 77.065,1.346 		95.165,11.846 95.165,27.846 95.165,33.646 78.465,43.246 74.065,40.646 74.065,23.346 	"/><polyline class="st0" points="95.165,11.846 78.465,21.446 78.465,37.446 90.665,30.446 	"/><line class="st0" x1="83.465" y1="24.746" x2="95.665" y2="17.746"/><line class="st0" x1="82.665" y1="30.446" x2="90.765" y2="25.746"/><polyline class="st0" points="48.765,78.646 32.065,88.246 32.065,109.446 	"/><line class="st0" x1="27.465" y1="85.646" x2="44.165" y2="75.946"/><line class="st0" x1="32.065" y1="88.246" x2="48.765" y2="78.646"/><line class="st0" x1="36.565" y1="90.846" x2="53.265" y2="81.246"/><polyline class="st0" points="27.565,89.846 27.565,107.446 27.465,107.446 22.965,104.946 22.965,104.946 22.965,83.046 		39.665,73.346 57.865,83.846 57.865,99.846 57.865,105.646 41.065,115.246 36.665,112.646 36.665,95.346 	"/><polyline class="st0" points="57.865,83.846 41.065,93.446 41.065,109.446 53.265,102.446 	"/><line class="st0" x1="46.065" y1="96.746" x2="58.265" y2="89.746"/><line class="st0" x1="45.265" y1="102.446" x2="53.365" y2="97.746"/><polyline class="st0" points="89.265,78.646 72.565,88.246 72.565,109.446 	"/><line class="st0" x1="67.965" y1="85.646" x2="84.765" y2="75.946"/><line class="st0" x1="72.565" y1="88.246" x2="89.265" y2="78.646"/><line class="st0" x1="77.065" y1="90.846" x2="93.765" y2="81.246"/><polyline class="st0" points="68.065,89.846 68.065,107.446 67.965,107.446 63.565,104.946 63.465,104.946 63.465,83.046 		80.165,73.346 98.365,83.846 98.365,99.846 98.365,105.646 81.665,115.246 77.165,112.646 77.165,95.346 	"/><polyline class="st0" points="98.365,83.846 81.665,93.446 81.665,109.446 93.765,102.446 	"/><line class="st0" x1="86.665" y1="96.746" x2="98.765" y2="89.746"/><line class="st0" x1="85.865" y1="102.446" x2="93.865" y2="97.746"/></g><g id="vertical-redundant" data-size="125x82" class="splitter-svg-svg ">	<polyline class="st1" points="13.426,27.75 2.326,18.15 2.326,24.05 13.426,33.65 31.426,33.45 	"/><polyline class="st1" points="35.626,34.25 46.726,24.75 46.726,30.35 35.626,39.25 13.426,39.25 0.826,28.15 	"/><polyline class="st1" points="46.726,36.05 35.626,44.95 14.926,44.95 	"/><polyline class="st1" points="12.826,44.95 1.826,35.35 1.826,41.25 12.826,50.75 35.026,50.75 46.826,41.15 	"/><polyline class="st1" points="21.326,10.85 30.026,10.85 38.626,18.35 46.726,10.85 35.626,1.25 13.326,1.25 2.326,10.85 		16.126,23.05 31.626,23.05 34.826,20.75 	"/><polyline class="st1" points="11.726,9.65 20.926,17.45 30.326,17.45 	"/><polyline class="st1" points="15.126,6.15 33.426,6.15 39.026,11.45 	"/><polyline class="st1" points="93.326,27.75 111.626,27.75 122.726,18.15 122.726,15.55 	"/><polyline class="st1" points="89.426,27.75 78.326,18.15 78.326,24.05 89.426,33.65 107.526,33.45 	"/><polyline class="st1" points="111.626,34.25 122.726,24.75 122.726,30.35 111.626,39.25 89.426,39.25 76.826,28.15 	"/><polyline class="st1" points="122.726,36.05 111.626,44.95 91.026,44.95 	"/><polyline class="st1" points="88.926,44.95 77.826,35.35 77.826,41.25 88.926,50.75 111.126,50.75 122.826,41.15 	"/><polyline class="st1" points="97.326,10.85 106.126,10.85 114.626,18.35 122.726,10.85 111.626,1.25 89.426,1.25 78.326,10.85 		92.126,23.05 107.626,23.05 110.826,20.75 	"/><polyline class="st1" points="87.726,9.65 96.926,17.45 106.326,17.45 	"/><polyline class="st1" points="91.126,6.15 109.426,6.15 115.026,11.45 	"/><polyline class="st2" points="57.226,76.95 57.226,66.45 62.826,63.05 68.426,66.45 68.426,76.95 62.826,73.65 62.826,69.25 	"/><line class="st2" x1="57.226" y1="76.95" x2="62.826" y2="73.65"/><path class="st3" d="M62.826,73.65"/><polyline class="st3" points="62.826,57.65 62.826,60.35 62.826,63.35 	"/><polyline class="st2" points="73.126,63.65 62.826,69.85 52.426,63.65 	"/><polygon class="st2" points="73.126,74.05 62.826,80.25 52.426,74.05 52.426,63.65 62.826,57.45 73.126,63.65 	"/><polyline class="st1" points="17.326,27.75 35.626,27.75 46.726,18.15 	"/><line class="st1" x1="78.126" y1="40.45" x2="54.426" y2="40.45"/><polyline class="st1" points="58.926,45.75 53.626,40.45 58.926,35.15 	"/><line class="st1" x1="46.726" y1="10.55" x2="69.626" y2="10.35"/><polyline class="st1" points="65.026,5.05 70.326,10.35 65.026,15.65 	"/></g><g id="split-check" data-size="27x27" class="splitter-svg-svg ">	<circle class="st4" cx="13.5" cy="13.5" r="13.5"/><path  class="check-mark st5" d="M11.9,19.2c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.4-0.2-0.5-0.4l-3.2-3.3		c-0.2-0.2-0.3-0.3-0.4-0.6c-0.1-0.2-0.1-0.4-0.1-0.6s0-0.4,0.1-0.6c0.1-0.2,0.2-0.4,0.4-0.5c0.2-0.2,0.3-0.3,0.6-0.4		c0.2-0.1,0.4-0.1,0.6-0.1s0.4,0,0.6,0.1s0.4,0.2,0.5,0.4l2.1,2.1l5.2-5.2c0.2-0.2,0.3-0.3,0.5-0.4c0.2-0.1,0.4-0.1,0.6-0.1		c0.2,0,0.4,0,0.6,0.1c0.2,0.1,0.4,0.2,0.5,0.4s0.3,0.3,0.4,0.6c0.1,0.2,0.1,0.4,0.1,0.6c0,0.2,0,0.4-0.1,0.6		c-0.1,0.2-0.2,0.4-0.4,0.6L13,18.8c-0.2,0.2-0.3,0.3-0.5,0.4C12.3,19.2,12.1,19.2,11.9,19.2z"/></g><g id="next-btn" data-size="81x36" class="splitter-svg-svg ">	<polygon class="st6" points="69,0 0,0 0,36 69,36 80.2,18 	"/></g><g id="cancel-x" data-size="12x12" class="splitter-svg-svg ">	<line class="st7" x1="0.354" y1="0.354" x2="10.954" y2="10.954"/><line class="st7" x1="10.954" y1="0.354" x2="0.354" y2="10.954"/></g><g id="back-arrow" data-size="6x12" class="splitter-svg-svg ">	<polyline class="st7" points="5.153,11.024 0.653,5.624 5.153,0.324 	"/></g><g id="instance-multiply" data-size="23x23" class="splitter-svg-svg ">	<line class="st8" x1="1.063" y1="1.058" x2="21.663" y2="21.758"/><line class="st8" x1="21.663" y1="1.058" x2="1.063" y2="21.758"/></g>';var pxSvgIconString=pxSvgIconString||"";pxSvgIconString+="";