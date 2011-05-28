(function(){

var eventSplitter = /^(\w+)\s*(.*)$/;

	_.extend(Backbone.View.prototype, Backbone.Events, {
		// Set callbacks, where `this.callbacks` is a hash of
		//
		// *{"event selector": "callback"}*
		//
		//     {
		//       'mousedown .title':  'edit',
		//       'click .button':     'save'
		//     }
		//
		// pairs. Callbacks will be bound to the view, with `this` set properly.
		// Uses event delegation for efficiency.
		// Omitting the selector binds the event to `this.el`.
		// This only works for delegate-able events: not `focus`, `blur`, and
		// not `change`, `submit`, and `reset` in Internet Explorer.
		delegateEvents : function(events) {
		  if (!(events || (events = this.events))) return;
		  bean.remove(this.el,'.delegateEvents');
		  for (var key in events) {
			var methodName = events[key];
			var match = key.match(eventSplitter);
			var eventName = match[1], selector = match[2];
			var method = _.bind(this[methodName], this);
			eventName += '.delegateEvents';
			if (selector === '') {
			  bean.add(this.el, eventName, method);
			} else {
			  bean.add(this.el, selector, eventName, method, qwery);
			}
		  }
		}
	});

})();