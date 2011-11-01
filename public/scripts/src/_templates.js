FD.templates = {
	fontView: _.template([
		'<div class="<%= active ? \'active\' : \'\' %>" style="font-family: \'<%= name %>\';" tabindex="0">',
			'<span><%= name %></span>',
			'<div class="info01" tabindex="0">',
				'<ul>',
					'<li class="title"><strong style="font-family: \'<%= name %>\';"><%= name %></strong></li>',
					'<li><strong>Size:</strong> <%= size %> </li>',
					'<li><strong>Author:</strong> <a href="<%= authorurl %>"><%= author %></a> </li>',
					'<li><strong>License:</strong> <a href="<%= licenseurl %>"><%= license %></a></li>',
				'</ul>',
			'</div>',
		'</div>'
	].join('')),
	
	galleryView: _.template([
		'<div class="colx4 item">',
			'<h2>',
				'<%= name %>',
				'<div class="info01" tabindex="0">',
					'<ul>',
						'<li class="title"><strong><%= name %></strong></li>',
						'<li><strong>Size:</strong> <%= size %> </li>',
						'<li><strong>Author:</strong> <a href="<%= authorurl %>"><%= author %></a></li>',
						'<li><strong>License:</strong> <a href="<%= licenseurl %>"><%= license %></a></li>',
					'</ul>',
				'</div>',
			'</h2>',
			'<p class="preview" style="font-family: <%= name %>-subset">AaBbCcDd</p>',
			'<a class="button" href="/gallery/<%= name %>/" draggable="true" id="<%= name %>" data-font="<%= name %>">Load <%= name %></a>',
		'</div>'
	].join(''))
};