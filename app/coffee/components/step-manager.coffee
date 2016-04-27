Configuration = require 'steps/configuration'
Scale         = require 'steps/scale'
Summary       = require 'steps/summary'
Sequence      = require 'misc/sequence'

stepManager   = require 'jade/step-manager'

module.exports = class StepManager

  constructor: ($el, @isHorizontal=false) ->
    @$node = $ stepManager( {} )
    $el.append @$node
    @$wrapper = $ '.step-wrapper', @$node
    @$steps = $ ".steps", @$node
    castShadows @$node
    @$currentStep = $ "#current-step", @$node
    @$stepTitle   = $ ".step-title", @$node

    @initClickHandlers()
    @initSteps()

  initClickHandlers : () ->
    # Click Events
    $('.forward', @$node).on 'click', ()=>
      @nextStep()

    $('.back', @$node).on 'click',    ()=>
      @previousStep()

  initSteps : () ->
    @configuration = new Configuration @$steps, @isHorizontal, @onConfigurationChange
    @scale         = new Scale @$steps, @isHorizontal
    @summary       = new Summary @$steps, @isHorizontal

    steps = [@configuration, @scale, @summary]
    @steps = new Sequence steps

    @slideToCurrentStep()
    $("#total-steps", @$node).text steps.length

  nextStep : () ->
    if @steps.isAtLastItem()
      console.log "submit"
    else
      @steps.next()
      @slideToCurrentStep()

  onConfigurationChange : (config) ->
    console.log "configuration change : #{config}"

  previousStep : () ->
    @steps.prev()
    @slideToCurrentStep()

  slideToCurrentStep : ()->
    @$currentStep.text @steps.currentItemIndex+1
    @$stepTitle.text @steps.currentItem().getTitle()
    left = - @steps.currentItem().$node.position().left
    tall = @steps.currentItem().$node.children().outerHeight()
    @$wrapper.css height: tall
    me = @

    setTimeout ()->
      me.$steps.css left: left
    , 100


    # If it's the last item, change the next button to submit
    @$node.removeClass 'submit'
    @$node.removeClass 'first'

    if @steps.isAtLastItem()
      @$node.addClass 'submit'
    else if @steps.currentItemIndex == 0
      @$node.addClass 'first'
