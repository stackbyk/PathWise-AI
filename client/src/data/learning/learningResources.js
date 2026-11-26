// @ts-check
import { createPlan, slugify } from './createPlan.js';
import { careerSkills, originalResourceLinks } from './careerSkills.js';
import { cybersecurityPaths } from './cybersecurityPaths.js';
import { resourceCatalog } from './resourceCatalog.js';
/** @typedef {import('./types').SkillLearningPath} SkillLearningPath */
/** @type {Record<string, [string,string,string,string,string]>} */
const outlines = {
 'HTML & CSS':['semantic structure','responsive layouts','accessible forms','an accessible multi-page site','HTML, CSS and browser developer tools'],
 JavaScript:['values and functions','arrays and objects','asynchronous requests','a tested interactive application','JavaScript and browser developer tools'],
 React:['components and props','state and events','effects and data loading','an accessible reusable component library','React and browser developer tools'],
 'Node.js':['the runtime and modules','asynchronous file operations','HTTP handlers and validation','a tested command-line tool and local API','Node.js and its built-in test runner'],
 'REST APIs':['HTTP methods and status codes','resource modeling','validation and authorization','a documented local API with contract tests','Node.js, curl and a text editor'],
 MongoDB:['documents and collections','queries and updates','indexes and validation','a local document-backed application','MongoDB Community and Node.js'],
 'Git & GitHub':['commits and history','branches and merges','conflict resolution','a reviewed repository with an automated check','Git and GitHub free repositories'],
 'Problem Solving':['problem decomposition','data structures','edge cases and complexity','a collection of tested algorithm solutions','Python and unittest'],
 Python:['variables and functions','files and structured data','exceptions and tests','a tested data-processing CLI','Python and unittest'],
 Mathematics:['algebra and functions','vectors and matrices','derivatives and optimization','a notebook explaining numerical experiments','Python, NumPy and Jupyter'],
 Statistics:['distributions and summaries','sampling and uncertainty','hypothesis testing','a reproducible statistical analysis','Python, pandas and Jupyter'],
 'Machine Learning':['features and targets','train-validation splits','metrics and leakage','a reproducible model evaluation project','Python and scikit-learn'],
 'Deep Learning':['tensors and gradients','neural-network training','regularization and evaluation','a locally trained small neural-network experiment','PyTorch and Jupyter'],
 'Data Processing':['data types and missing values','cleaning and transformations','validation pipelines','a repeatable and tested cleaning pipeline','Python and pandas'],
 'Model Evaluation':['holdout data','classification and regression metrics','cross-validation and error analysis','a reproducible comparison with a simple baseline','Python and scikit-learn'],
 'TensorFlow / PyTorch':['tensors and automatic differentiation','training loops','checkpointing and inference','a small reproducible neural-network project','PyTorch and Python'],
 SQL:['tables and constraints','joins and aggregation','query plans and indexes','a well-modeled local database with tested queries','SQLite and a SQL editor'],
 'Data Analysis':['data quality','grouping and exploration','interpreting comparisons','a reproducible notebook with evidence-led conclusions','Python, pandas and Jupyter'],
 'Data Visualization':['charts and encodings','axes and uncertainty','accessible presentation','an annotated data-story portfolio','Python and Matplotlib'],
 'Pandas / NumPy':['arrays and DataFrames','selection and transformation','aggregation and vectorization','a tested analysis notebook','pandas, NumPy and Jupyter'],
 Programming:['control flow','functions and data structures','testing and debugging','a documented and tested command-line application','Python and a text editor'],
 Databases:['data modeling','queries and transactions','constraints and indexing','a local application with a reproducible database setup','SQLite and Python'],
 Authentication:['identity and sessions','password hashing','authorization and secure cookies','a local demo with tested access rules','Node.js, SQLite and browser developer tools'],
 'Server Architecture':['request lifecycles','service boundaries','caching and failure handling','a measured local service with operational notes','Node.js, Docker and curl'],
 'AWS / Azure / GCP':['cloud service models','identity and networks','reliability and cost boundaries','a local simulation and provider-neutral architecture document','Docker, local VMs and diagrams.net'],
 Docker:['images and containers','volumes and networking','multi-stage builds','a reproducible local multi-container application','Docker Engine and Compose'],
 Kubernetes:['pods and deployments','services and configuration','readiness and resource limits','a locally deployed application with failure-recovery notes','kind, kubectl and Docker'],
 'Cloud Security':['shared responsibility','identity and least privilege','secrets and network boundaries','a documented threat model with local control demonstrations','Local VMs, Docker and a text editor'],
 'CI/CD':['versioned build steps','automated tests','artifacts and release gates','a locally reproducible build-and-test pipeline','Git, shell scripts and Node.js'],
 Infrastructure:['compute and network primitives','declarative configuration','state and safe change review','a local reproducible service environment','Docker Compose and local VMs'],
};
const dataSkills = new Set(['Python','Mathematics','Statistics','Machine Learning','Deep Learning','Data Processing','Model Evaluation','TensorFlow / PyTorch','Data Analysis','Data Visualization','Pandas / NumPy']);
const cloudSkills = new Set(['AWS / Azure / GCP','Docker','Kubernetes','Cloud Security','CI/CD','Infrastructure']);
const overrides = {
 'Deep Learning':'https://pytorch.org/tutorials/',
 'AWS / Azure / GCP':'https://docs.aws.amazon.com/',
 Infrastructure:'https://docs.docker.com/compose/',
 'Cloud Security':'https://docs.aws.amazon.com/',
 'Problem Solving':'https://cs50.harvard.edu/x/',
};
/** @type {Record<string, SkillLearningPath>} */
const additionalPaths = {};
for (const skill of new Set(Object.values(careerSkills).flat())) {
 if (cybersecurityPaths[skill]) continue;
 const [first,second,third,outcome,tools] = outlines[skill] || outlines.Programming;
 const docKey=`docs-${slugify(skill)}`;
 const url=overrides[/** @type {keyof typeof overrides} */ (skill)] || originalResourceLinks[skill] || resourceCatalog.cs50x.url;
 resourceCatalog[docKey]={title:`${skill} · official learning material`,url,provider:new URL(url).hostname.replace(/^www\./,''),access:'Free learning material; use local exercises when services are billable'};
 const science=dataSkills.has(skill),cloud=cloudSkills.has(skill),sql=skill==='SQL'||skill==='Databases',deep=skill==='Deep Learning'||skill==='TensorFlow / PyTorch';
 additionalPaths[skill]=createPlan(skill,`Build a practical foundation in ${skill} through small exercises, documentation and a project you can explain.`,4,[
  [`Understand ${first}`,`Use the official material to explain ${first}. Keep a short glossary and a working example.`,4],
  [`Practice ${second}`,`Complete small exercises on ${second}. Record expected outputs and explain what happens.`,5],
  [`Explore ${third}`,`Test ${third} with edge cases and document the trade-offs or failure modes you observe.`,6],
  ['Build something small and testable',`Create ${outcome}. Keep the setup local and reproducible.`,8],
  ['Review, document and improve',`Review your ${skill} project against the documentation, add checks and write a clear explanation of your decisions.`,5],
 ],{officialDocs:[docKey],youtube:[science?'corey':'fccVideo',science?'fccVideo':cloud?'linuxVideo':'corey'],freeCourses:deep?['fastai','mlCourse']:science?['mlCourse','kaggle']:sql?['sqlCourse','cs50x']:cloud?['learnCloud','missing']:['fcc','cs50x'],practiceLabs:science?['kaggle']:cloud?[docKey]:['fcc'],articlesAndBooks:science?['pythonDocs']:['mdn']},[
  [`${skill}: a working field guide`,`Create annotated examples covering ${first} and ${second}, with reproducible inputs and expected results.`,[first,second],[tools],5],
  [`${skill}: a focused practice project`,`Deliver ${outcome}. Include a README, examples and checks for typical mistakes.`,[second,third,'Testing'],[tools,'Git'],10],
  [`${skill}: a portfolio case study`,`Extend the practice project, compare two approaches and publish evidence, limitations and a clear demonstration.`,[third,'Problem solving','Documentation'],[tools,'Git','A text editor'],18],
 ]);
}
export const learningResources = {...additionalPaths,...cybersecurityPaths};
/** @param {string} skill @returns {SkillLearningPath} */
export function getLearningPath(skill) {
 return learningResources[skill] || {...additionalPaths.Programming,skill,slug:slugify(skill)};
}
export { cybersecurityPaths };
