Configuration = require 'steps/configuration'
Scale         = require 'steps/scale'
Summary       = require 'steps/summary'
Sequence      = require 'misc/sequence'

stepManager   = require 'jade/step-manager'

module.exports = class StepManager

  constructor: (@$el, config) ->
    @isHorizontal = config.category != "data"
    @category     = config.category
    @isCluster    = config.isCluster
    @bunkHouses   = config.bunkHouses
    @submitCb     = config.submitCb
    @cancelCb     = config.cancelCb
    @componentId  = config.componentId
    @clusterable  = config.clusterable

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
    @configuration = new Configuration @$steps, @isHorizontal, @bunkHouses, @clusterable, @isCluster, @changeIsExistingBunkhouse
    @scale         = new Scale @$steps, @isHorizRedund, @getConfiguration
    @summary       = new Summary @$steps, @isHorizontal, @isHorizRedund, @getPlans

    steps = [@configuration, @scale, @summary]
    @steps = new Sequence steps

    @slideToCurrentStep()
    $("#total-steps", @$node).text @steps.totalItems

  # ------------------------------------ Step Data
  # Retrieving data from various steps,
  # (usually called by the subsequent step)

  # Get the scale / plan for each member
  getPlans      : () =>
    plans : @scale.getSelectedPlans()
    meta  : @scale.getMeta()
  isHorizRedund : () => @isHorizontal && !@configuration.isBunkhouse()


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
      componentId : @componentId
      category    : @category

    # If they are simply transferring to an existing bunkhouse:
    if isExistingBunkhouse
      data.bunkhouseId = $("#bunkhaus-picker", @$el).val()
      data.topology    = 'bunkhouse'

    # Else they are transferring to a new server:
    else
      plans         = @scale.getSelectedPlans()
      config        = @configuration.getData()
      isDataCluster = @category == 'data' && config.topology == 'cluster'

      data.topology    = config.topology
      data.sizes       = {}

      # Grab all the plans and save them to the data
      for key, plan of plans
        data.totalInstances = plan.totalInstances


        # If this isn't a redundant data cluster, the rails app wants the
        # plan key to be `default` instead of primay
        planKey = key
        if planKey == 'primary' && !isDataCluster
          planKey = 'default'

        data.sizes[planKey] = plan.planId

    if data.totalInstances == undefined
      delete data.totalInstances

    @submitCb data
    PubSub.publish 'SPLITTER.SPLIT', data
