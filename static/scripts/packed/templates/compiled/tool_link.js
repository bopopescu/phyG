(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a.tool_link=b(function(e,n,d,l,k){d=d||e.helpers;var i="",c,h,o=this,f="function",m=d.helperMissing,g=void 0,j=this.escapeExpression;i+='<a class="';h=d.id;c=h||n.id;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"id",{hash:{}})}}i+=j(c)+' tool-link" href="';h=d.link;c=h||n.link;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"link",{hash:{}})}}i+=j(c)+'" target="';h=d.target;c=h||n.target;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"target",{hash:{}})}}i+=j(c)+'" minsizehint="';h=d.min_width;c=h||n.min_width;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"min_width",{hash:{}})}}i+=j(c)+'">';h=d.name;c=h||n.name;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"name",{hash:{}})}}i+=j(c)+"</a> ";h=d.description;c=h||n.description;if(typeof c===f){c=c.call(n,{hash:{}})}else{if(c===g){c=m.call(n,"description",{hash:{}})}}i+=j(c);return i})})();