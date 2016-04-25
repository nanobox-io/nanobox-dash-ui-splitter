Configuration = require 'steps/configuration'
Scale         = require 'steps/scale'
Summary       = require 'steps/summary'
Sequence      = require 'misc/sequence'

stepManager   = require 'jade/step-manager'

module.exports = class StepManager

  constructor: ($el) ->
    @$node = $ stepManager( {} )
    $el.append @$node
    @$wrapper = $ '.step-wrapper', @$node
    @$steps = $ ".steps", @$node
    castShadows @$node
    @$currentStep = $ "#current-step", @$node
    @$stepTitle   = $ ".step-title", @$node

    # Click Events
    $('.forward', @$node).on 'click', ()=>
      @nextStep()

    $('.back', @$node).on 'click',    ()=>
      @previousStep()

    # Init Steps
    steps = [
      {klass: Configuration}
      {klass: Scale}
      {klass: Summary}
    ]
    @steps = new Sequence steps
    @initStep step for step in steps
    @slideToCurrentStep()
    $("#total-steps", @$node).text steps.length


  initStep : (obj) ->
    obj.instance = new obj.klass @$steps

  nextStep : () ->
    if @steps.isAtLastItem()
      console.log "submit"
    else
      @steps.next()
      @slideToCurrentStep()

  previousStep : () ->
    @steps.prev()
    @slideToCurrentStep()

  slideToCurrentStep : ()->
    @$currentStep.text @steps.currentItemIndex+1
    @$stepTitle.text @steps.currentItem().instance.getTitle
    left = - @steps.currentItem().instance.$node.position().left - 40
    tall = @steps.currentItem().instance.$node.children().height() + 40
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
