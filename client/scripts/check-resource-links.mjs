import { writeFile } from 'node:fs/promises';
import { learningResources } from '../src/data/learning/learningResources.js';
const urls=[...new Set(Object.values(learningResources).flatMap(plan=>Object.values(plan.resources).flat().map(resource=>resource.url)))].sort();
const output=[];
let cursor=0;
async function check(url) {
 let lastError='';
 for(const method of ['HEAD','GET']) {
  for(let attempt=0;attempt<2;attempt++) {
   try {
    const response=await fetch(url,{method,redirect:'follow',signal:AbortSignal.timeout(18000),headers:{'User-Agent':'Mozilla/5.0 PathWiseResourceCheck/1.0','Accept':'text/html,application/xhtml+xml,*/*'}});
    const result={url,status:response.status,method,finalUrl:response.url,ok:response.ok,blocked:[401,403,429].includes(response.status)};
    if(response.body)await response.body.cancel();
    if(response.ok)return result;
    lastError=`HTTP ${response.status}`;
    if(method==='GET')return result;
    break;
   } catch(error) {lastError=error instanceof Error?error.message:String(error);}
  }
 }
 return {url,status:0,method:'GET',ok:false,blocked:false,error:lastError};
}
async function worker(){while(cursor<urls.length){const url=urls[cursor++];const result=await check(url);output.push(result);console.log(`${result.ok?'OK':result.blocked?'REVIEW':'FAIL'} ${result.status} ${url}`);}}
await Promise.all(Array.from({length:5},worker));
output.sort((a,b)=>a.url.localeCompare(b.url));
const report={checkedAt:new Date().toISOString(),total:urls.length,passed:output.filter(row=>row.ok).length,blocked:output.filter(row=>row.blocked).length,failed:output.filter(row=>!row.ok&&!row.blocked).length,results:output};
await writeFile(new URL('../resource-link-report.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(`\n${report.total} unique URLs: ${report.passed} reachable, ${report.blocked} blocked by provider protections, ${report.failed} failed.`);
console.log('Report: client/resource-link-report.json. REVIEW requires a browser/primary-source check; it is never counted as an automated pass.');
process.exitCode=report.failed?1:report.blocked?2:0;
