// @ts-check
import { Play, ExternalLink } from 'lucide-react';
/** @param {{videos:import('../../data/learning/types').LearningResource[]}} props */
export function VideoGrid({videos}) {
 return <div><p className="rec-tab-intro">Free public video collections. Choose the lessons that match your next learning step.</p><div className="rec-video-grid">{videos.map(video=><article className="rec-video" key={video.url}><a href={video.url} target="_blank" rel="noopener noreferrer" aria-label={`${video.title} by ${video.channel} (opens in a new tab)`}><span className="rec-video-placeholder" aria-hidden="true"><span><Play size={25} fill="currentColor"/></span><small>{video.kind==='channel'?'CHANNEL COLLECTION':'VIDEO LESSON'}</small></span><div><span className="rec-provider">{video.channel}</span><h5>{video.title}</h5><p>{video.why}</p><span className="rec-external-label">Explore videos<ExternalLink size={13}/></span></div></a></article>)}</div></div>;
}
