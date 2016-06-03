Configuration = require 'steps/configuration'
Scale         = require 'steps/scale'
Summary       = require 'steps/summary'
Sequence      = require 'misc/sequence'

stepManager   = require 'jade/step-manager'

module.exports = class StepManager

  constructor: (@$el, config) ->
    @isHorizontal = config.isHorizontal
    @bunkHouses   = config.bunkHouses
    @submitCb     = config.submitCb
    @cancelCb     = config.cancelCb
    @componentId  = config.componentId

    @$node = $ stepManager( {} )
    @$el.append @$node
    @$wrapper = $ '.step-wrapper', @$node
    @$steps = $ ".steps", @$node
    castShadows @$node
    @$currentStep = $ "#current-step", @$node
    @$stepTitle   = $ ".step-title", @$node

    @initClickHandlers()
    @initSteps()

  # ------------------------------------ Initialize

  initClickHandlers : () ->
    $('.forward', @$node).on 'click', ()=>
      if !@pickingExistingHost
        @nextStep()
      else
        @submit(true)

    $('.back', @$node).on 'click',    ()=>
      @previousStep()

    $('.cancel', @$node).on 'click',  ()=>
      @cancelCb()

  initSteps : () ->
    @configuration = new Configuration @$steps, @isHorizontal, @bunkHouses, @changeIsExistingBunkhouse
    @scale         = new Scale @$steps, @isHorizontal, @getConfiguration
    @summary       = new Summary @$steps, @isHorizontal, @getPlans

    steps = [@configuration, @scale, @summary]
    @steps = new Sequence steps

    @slideToCurrentStep()
    $("#total-steps", @$node).text @steps.totalItems

  # ------------------------------------ Step Data
  # Retrieving data from various steps,
  # (usually called by the subsequent step)

  # Get the scale / plan for each member
  getPlans : () => @scale.getSelectedPlans()

  # When the user wants to split onto an existing bunkhouse, we need to
  # modify the neumber of steps and a few other things..
  changeIsExistingBunkhouse : (movingToAnExistingBunkhouse) =>
    if movingToAnExistingBunkhouse
      $("#total-steps", @$node).text 1
      @pickingExistingHost = true
      @$node.addClass "existing-host-pick"
    else
      $("#total-steps", @$node).text @steps.totalItems
      @pickingExistingHost = false
      @$node.removeClass "existing-host-pick"

  # Retrieve @configuration's data
  getConfiguration : () =>
    @configuration.getData()

  # ------------------------------------ Step Navigation
  nextStep : () ->
    if @steps.isAtLastItem()
      @submit()
    else
      @steps.next()
      @slideToCurrentStep()

  previousStep : () ->
    @steps.prev()
    @slideToCurrentStep()

  slideToCurrentStep : ()->
    @steps.currentItem().activate()
    @$currentStep.text @steps.currentItemIndex+1
    @$stepTitle.text @steps.currentItem().getTitle()
    left = - @steps.currentItem().$node.position().left
    me = @

    setTimeout ()->
      tall = me.steps.currentItem().$node.children().outerHeight()
      me.$wrapper.css height: tall
    , 100
    setTimeout ()->
      me.$steps.css left: left
    , 200

    # If it's the last item, change the next button to submit
    @$node.removeClass 'submit'
    @$node.removeClass 'first'

    if @steps.isAtLastItem()
      @$node.addClass 'submit'
    else if @steps.currentItemIndex == 0
      @$node.addClass 'first'

  # ------------------------------------ Submit

  submit : (isExistingBunkhouse=false)->
    data =
      componentId: @componentId
    # If they are simply transferring to an existing bunkhouse:
    if isExistingBunkhouse
      data.isNewServer = false
      data.bunkhouseId = $("#bunkhaus-picker", @$el).val()

    # Else they are transferring to a new server:
    else
      plans  = @scale.getSelectedPlans()
      config = @configuration.getData()

      data.isBunkhouse = config.isBunkhouse
      data.isNewServer = config.isNewServer
      data.topology    = config.topology
      data.plans       = {}

      # Grab all the plans and save them to the data
      for key, plan of plans
        data.plans[key] =
          planId: plan.planId
          totalInstances: plan.totalInstances

    @submitCb data
    PubSub.publish 'SPLITTER.SPLIT', data
