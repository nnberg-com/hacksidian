from pathlib import Path
import subprocess,json,sys
root=Path(__file__).resolve().parents[1]
blocked=[Path('/Users/op/dev/sobakapav/callmered'),Path('/Users/op/vaults/callmered'),Path('/Users/op/vaults/op/! P R O/callmered')]
for p in blocked:
 try:list(p.iterdir())
 except PermissionError:continue
 else:raise RuntimeError(f'Access not blocked: {p}')
print('Confirmed: all three legacy directories are inaccessible',flush=True)
commands=[
 ['python3','atlas/tools/assemble.py'],
 ['npm','--prefix','plugin','run','check'],
 ['python3','atlas/sources/table-styles-demo/verify.py'],
 ['node','atlas/tools/verify.mjs'],
 ['node','atlas/sources/callout-styles-demo/verify-scenarios.mjs'],
 ['node','atlas/sources/footnote-styles-demo/verify.mjs'],
 ['node','atlas/sources/pseudo-task-styles-demo/verify.mjs'],
 ['node','atlas/sources/task-styles-demo/verify.mjs'],
]
results=[]
previous=json.loads((root/'independence-verification.json').read_text())['checks'] if '--resume' in sys.argv else []
for cmd in commands:
 old=next((r for r in previous if r['command']==cmd and r['exitCode']==0),None)
 if old:
  results.append(old);print('Already verified:', ' '.join(cmd),flush=True);continue
 print('Checking:', ' '.join(cmd),flush=True)
 r=subprocess.run(cmd,cwd=root,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
 results.append({'command':cmd,'exitCode':r.returncode,'output':r.stdout})
 print(r.stdout[-1600:],flush=True)
 (root/'independence-verification.json').write_text(json.dumps({'blockedDirectories':[str(p) for p in blocked],'checks':results,'passed':all(r['exitCode']==0 for r in results) and len(results)==len(commands)},ensure_ascii=False,indent=2)+'\n')
 if r.returncode:sys.exit(r.returncode)
