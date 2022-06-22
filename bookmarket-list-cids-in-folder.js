// Bookmarklet
function() {
	for (var l = document.links, re = new RegExp("/ipfs/(Qm.{44})?"), i = 0; i < l.length; i++) l[i].classList.contains("ipfs-hash") && (match = l[i].href.match(re), match && (l[i].innerHTML = match[1], console.log(match[1])));
}

// Minified (copy-paste this)
javascript:(function(){for(var l=document.links,re=new RegExp("/ipfs/(Qm.{44})?"),i=0;i<l.length;i++)l[i].classList.contains("ipfs-hash")&&(match=l[i].href.match(re),match&&(l[i].innerHTML=match[1],console.log(match[1])));})();
