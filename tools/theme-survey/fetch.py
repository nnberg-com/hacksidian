"""Fetch a pinned, sparse source checkout for each of the 100 selected themes.
Temporary source copies stay outside the project; coverage/evidence is persisted separately.
"""
import concurrent.futures, json, pathlib, subprocess, datetime
root=pathlib.Path('/tmp/hacksidian-theme-survey');root.mkdir(exist_ok=True)
project=pathlib.Path(__file__).resolve().parents[2]
themes=json.loads((project/'tools/theme-catalog/themes.json').read_text())['themes']
report=project/'docs/research/theme-survey/inventory.json'
previous={t['slug']:t['commit'] for t in json.loads(report.read_text()).get('themes',[]) if t.get('commit')} if report.exists() else {}
results=[]
def command(args,cwd=None):
 p=subprocess.run(args,cwd=cwd,text=True,capture_output=True,timeout=180)
 if p.returncode:raise RuntimeError(p.stderr[-500:])
 return p.stdout.strip()
def fetch(t):
 d=root/t['slug']; row={'slug':t['slug'],'name':t['name'],'repo':t['repo'],'rank':t['rank'],'local':str(d)}
 try:
  if not (d/'.git').exists():command(['git','clone','--depth=1','--filter=blob:none','--sparse','https://github.com/'+t['repo']+'.git',str(d)])
  expected=previous.get(t['slug'])
  if expected and command(['git','rev-parse','HEAD'],d)!=expected:
   command(['git','fetch','--depth=1','origin',expected],d)
   command(['git','checkout','--detach',expected],d)
  command(['git','sparse-checkout','set','--no-cone','*.css','*.scss','*.sass','*.less','*.md','*.mdx','*.json','*.yaml','*.yml','LICENSE*','COPYING*','!node_modules/','!vendor/'],d)
  row['commit']=command(['git','rev-parse','HEAD'],d)
  files=command(['git','ls-tree','-r','--name-only','HEAD'],d).splitlines()
  row['repositoryFiles']=len(files)
  row['files']=[f for f in files if pathlib.Path(f).suffix.lower() in ['.css','.scss','.sass','.less','.md','.mdx','.json','.yaml','.yml'] and (d/f).is_file() and not any(x in pathlib.Path(f).parts for x in ['node_modules','vendor'])]
  row['status']='fetched';row['bytes']=sum((d/f).stat().st_size for f in row['files'])
 except Exception as e:row['status']='error';row['error']=str(e)
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for row in pool.map(fetch,themes):
  results.append(row);report.write_text(json.dumps({'date':datetime.datetime.now(datetime.timezone.utc).isoformat(),'themes':results},ensure_ascii=False,indent=2));print(len(results),row['name'],row['status'],len(row.get('files',[])),flush=True)
