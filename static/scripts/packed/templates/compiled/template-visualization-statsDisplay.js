(function(){var b=Handlebars.template,a=Handlebars.templates=Handlebars.templates||{};a["template-visualization-statsDisplay"]=b(function(f,p,e,n,m){e=e||f.helpers;var k="",c,r,j,i,q=this,g="function",o=e.helperMissing,h=void 0,l=this.escapeExpression;function d(v,u){var s="",t;s+="\n        <tr><td>";j=e.name;t=j||v.name;if(typeof t===g){t=t.call(v,{hash:{}})}else{if(t===h){t=o.call(v,"name",{hash:{}})}}s+=l(t)+"</td><td>";j=e.xval;t=j||v.xval;if(typeof t===g){t=t.call(v,{hash:{}})}else{if(t===h){t=o.call(v,"xval",{hash:{}})}}s+=l(t)+"</td><td>";j=e.yval;t=j||v.yval;if(typeof t===g){t=t.call(v,{hash:{}})}else{if(t===h){t=o.call(v,"yval",{hash:{}})}}s+=l(t)+"</td></tr>\n        </tr>\n        ";return s}k+='<p class="help-text">By column:</p>\n    <table id="chart-stats-table">\n        <thead><th></th><th>X</th><th>Y</th></thead>\n        ';j=e.stats;c=j||p.stats;r=e.each;i=q.program(1,d,m);i.hash={};i.fn=i;i.inverse=q.noop;c=r.call(p,c,i);if(c||c===0){k+=c}k+="\n    </table>";return k})})();