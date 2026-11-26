// @ts-check
/** @param {{value:number,label:string}} props */
export function ProgressBar({value,label}) {
 const percent=Number.isFinite(value)?Math.max(0,Math.min(100,value)):0;
 return <div className="rec-progress" role="progressbar" aria-label={label} aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${percent}%`}}/></div>;
}
