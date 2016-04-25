Configuration = require 'steps/configuration'
Scale         = require 'steps/scale'
Summary       = require 'steps/summary'
Sequence      = require 'misc/sequence'

stepManager   = require 'jade/step-manager'

module.exports = class StepManager

  constructor: ($el) ->
    $node = $ stepManager( {} )
    $el.append $node
    @$content = $ ".steps", $node
    castShadows $node

    steps = [
      {klass: Configuration}
      {klass: Scale}
      {klass: Summary}
    ]
    @steps = new Sequence steps
    @nextStep()
    @steps.next()
    @nextStep()
    @steps.next()
    @nextStep()


  nextStep : () ->
    klass = @steps.getCurrentItem().klass
    new klass @$content
