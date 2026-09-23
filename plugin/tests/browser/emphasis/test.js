const result=document.querySelector('#results');
try{
 const rows=await(await fetch('data.json')).json(),expected=new Map();let checks=0;
 const props=['fontFamily','fontSize','fontWeight','fontStyle','fontVariant','lineHeight','letterSpacing','textTransform','textDecorationLine','textDecorationStyle','textDecorationColor','textUnderlineOffset','color','backgroundColor','backgroundImage','borderTopWidth','borderRadius','padding','boxShadow','textShadow','webkitTextStroke','textEmphasisStyle','textEmphasisColor','textEmphasisPosition','display','position'];
 const capture=e=>[...props.map(p=>getComputedStyle(e)[p]),...['::before','::after'].flatMap(p=>['content','color','position','border','transform'].map(k=>getComputedStyle(e,p)[k]))];
 for(const row of rows){
  const host=document.body.appendChild(document.createElement('div'));host.id=row.host;host.className='markdown-preview-view markdown-rendered';host.innerHTML='<p>Текст <strong>проверяемый фрагмент</strong> <em>проверяемый фрагмент</em> <mark>проверяемый фрагмент</mark></p>';
  const others=[...host.querySelectorAll('strong,em,mark')].filter(e=>e.tagName.toLowerCase()!==row.tag),before=others.map(capture);
  const style=document.head.appendChild(document.createElement('style'));style.textContent=row.css;
  const actual=capture(host.querySelector(row.tag));
  if(expected.has(row.id)&&JSON.stringify(actual)!==JSON.stringify(expected.get(row.id)))throw Error('Different appearance '+row.id+' '+row.tag+' '+JSON.stringify(actual));
  expected.set(row.id,actual);checks++;
  if(JSON.stringify(before)!==JSON.stringify(others.map(capture)))throw Error('Changed other targets '+row.id);checks++;
  style.remove();if(JSON.stringify(before)!==JSON.stringify(others.map(capture)))throw Error('Leak '+row.id);checks++;
 }
 result.textContent='PASS '+rows.length+' variants; '+checks+' checks: equal appearance on strong/em/mark, pseudoelements, unaffected other targets and isolated previews.';
 document.title='PASS — Emphasis targets';
}catch(e){result.textContent='FAIL '+e.stack;document.title='FAIL — Emphasis targets';}
