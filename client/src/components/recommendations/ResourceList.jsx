// @ts-check
import { ExternalLink, BookOpen, GraduationCap, FlaskConical, Library } from 'lucide-react';
const groups=/** @type {const} */ ([['officialDocs','Official docs',BookOpen],['freeCourses','Free courses',GraduationCap],['practiceLabs','Practice labs',FlaskConical],['articlesAndBooks','Articles & books',Library]]);
/** @param {{resources:import('../../data/learning/types').ResourceGroups}} props */
export function ResourceList({resources}) {
 return <div className="rec-resource-groups"><p className="rec-tab-intro">Use the free content linked here. Account requirements and local-hardware needs are listed per resource; paid upgrades and certificates are optional.</p>{groups.map(([key,title,Icon])=><section key={key}><h5><Icon size={18}/>{title}</h5><ul>{resources[key].map(resource=><li key={`${resource.title}-${resource.url}`}><div><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title}<ExternalLink size={14}/><span className="rec-sr-only"> (opens in a new tab)</span></a><span className="rec-provider">{resource.provider}</span>{resource.why&&<p>{resource.why}</p>}<p className="rec-access">{resource.access}</p></div></li>)}</ul></section>)}</div>;
}
