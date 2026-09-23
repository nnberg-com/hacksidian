const result=document.querySelector('#result');
try {
 const {variants,semantic}=await (await fetch('data.json')).json();
 const palette=document.head.appendChild(document.createElement('style'));
 const manual=document.head.appendChild(document.createElement('style'));
 const probe=document.body.appendChild(document.createElement('span'));
 const reference=document.body.appendChild(document.createElement('span'));
 const expected=Object.fromEntries([...semantic.matchAll(/--hacksidian-semantic-(\w+): (#[\da-f]+);/g)].map(m=>[m[1],m[2]]));
 let checks=0;
 const equal=(actual,wanted,label)=>{if(actual!==wanted)throw Error(`${label}: ${actual} != ${wanted}`);checks++;};
 const computed=value=>{reference.style.color=value;return getComputedStyle(reference).color;};
 const value=name=>{probe.style.color=`var(${name})`;return getComputedStyle(probe).color;};
 for(const variant of variants){
  palette.textContent=variant.css;manual.textContent='';
  const defaults=Object.fromEntries(Object.keys(expected).map(c=>[c,value('--color-'+c)]));
  for(const order of ['palette-first','manual-first']){
   if(order==='palette-first')document.head.append(manual);else document.head.append(palette);
   manual.textContent=semantic;
   for(const [c,hex] of Object.entries(expected))equal(value('--color-'+c),computed(hex),`${variant.name} ${order} ${c}`);
   for(const [role,c] of Object.entries({'text-error':'red','text-warning':'orange','text-success':'green','code-keyword':'purple','code-string':'green','code-function':'blue','code-property':'cyan','code-tag':'red','code-value':'orange'}))equal(value('--'+role),computed(expected[c]),role);
   equal(getComputedStyle(document.querySelector('.callout-title')).color,computed(expected.red),'stock callout title');
   const mix=`color-mix(in oklch, ${expected.red} 10%, transparent)`;
   reference.style.backgroundColor=mix;
   equal(getComputedStyle(document.querySelector('.callout')).backgroundColor,getComputedStyle(reference).backgroundColor,'stock callout background');
   manual.textContent=semantic.replace(/--hacksidian-semantic-red: #[\da-f]+;/,'--hacksidian-semantic-red: #123456;');
   equal(value('--text-error'),computed('#123456'),'edited error');
   equal(getComputedStyle(document.querySelector('.callout-title')).color,computed('#123456'),'edited callout');
   manual.textContent='';
   for(const c of Object.keys(expected))equal(value('--color-'+c),defaults[c],'restore '+c);
  }
 }
 result.textContent=`PASS: ${checks} computed-style checks; ${variants.length} palettes; both application orders; all eight colors, semantic/syntax roles, stock callout foreground/background, edit and disable.`;
 document.title='PASS — Palette color contract';
} catch(error){result.textContent='FAIL: '+error.stack;document.title='FAIL — Palette color contract';throw error;}
