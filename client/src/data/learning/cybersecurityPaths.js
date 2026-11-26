// @ts-check
import { createPlan } from './createPlan.js';
/** @type {Record<string, import('./types').SkillLearningPath>} */
export const cybersecurityPaths = {
 'Cybersecurity Fundamentals':createPlan('Cybersecurity Fundamentals','Understand what you are protecting, why it matters, and how to reduce everyday risk.',4,[
  ['Learn the security foundations','Explain confidentiality, integrity and availability using examples from your own devices.',4],
  ['Understand threats and identity','Compare phishing, malware and account attacks. Practice MFA and safe recovery on a test account.',5],
  ['Map assets and risk','Create an asset inventory and rank threats by likelihood and impact using the NIST CSF.',5],
  ['Practice core defenses','Explore backups, least privilege and patching in a local test environment. Record your choices.',6],
  ['Turn knowledge into a security plan','Write a small risk register, choose controls and explain the trade-offs to a nontechnical reader.',6],
 ],{officialDocs:['nistCsf'],youtube:['messer','fccVideo'],freeCourses:['cs50Cyber','ciscoIntro'],practiceLabs:['pwn','bandit'],articlesAndBooks:['owasp']},[
  ['A personal security baseline','Deliver a documented device and account inventory, an MFA checklist and a tested backup-restore exercise.',['Asset inventory','Identity','Backups'],['LibreOffice','KeePassXC','Local backup tools'],5],
  ['A small-business risk register','Model a fictional business, score ten risks and create a prioritized, cost-free control plan.',['Risk assessment','Least privilege','Security controls'],['LibreOffice Calc','NIST CSF'],9],
  ['A security improvement review','Review a local lab against CSF functions, test selected controls and present evidence with a 30-day improvement plan.',['Control testing','Evidence','Communication'],['VirtualBox','Ubuntu','LibreOffice'],16],
 ]),
 'Network Security':createPlan('Network Security','Protect a small network through segmentation, filtering and evidence from real packets.',4,[
  ['Review network traffic','Explain TCP, UDP, DNS and TLS. Capture your own lab traffic and identify the protocol layers.',5],
  ['Build an isolated network lab','Create two local VMs on a private network and document the intended communication paths.',6],
  ['Apply least-privilege firewall rules','Allow only required lab traffic, test denied traffic and keep an annotated rule table.',7],
  ['Inspect suspicious patterns','Use sample captures to compare a normal connection with repeated failed or unusual requests.',7],
  ['Validate and report the defense','Retest segmentation and filtering, explain gaps and write a concise network-security report.',6],
 ],{officialDocs:['wireshark'],youtube:['bombal','practical'],freeCourses:['ciscoDefense','ciscoNetwork'],practiceLabs:['captures','wazuhLab'],articlesAndBooks:['networkBook']},[
  ['A traffic field guide','Capture your own DNS and HTTPS connections and deliver an annotated packet-flow diagram.',['Packet analysis','DNS','TLS'],['Wireshark','Browser','LibreOffice Draw'],5],
  ['A segmented home lab','Use Ubuntu routing and nftables between local VMs. Produce a rule table and a pass/fail connectivity test matrix.',['Segmentation','Firewall rules','Validation'],['VirtualBox','Ubuntu','nftables'],12],
  ['A network detection case study','Generate benign test traffic in your lab, capture it, identify an agreed suspicious pattern and document the detection limits.',['Traffic analysis','Detection','Reporting'],['Wireshark','tcpdump','Ubuntu VMs'],18],
 ]),
 'Ethical Hacking':createPlan('Ethical Hacking','Learn a repeatable, evidence-led testing process in deliberately vulnerable training environments.',5,[
  ['Define scope and a testing workflow','Write the boundaries, objectives and reporting format for a local practice assessment.',4],
  ['Explore web and system basics','Review requests, sessions and permissions. Complete introductory exercises in the linked training platforms.',6],
  ['Practice guided vulnerability labs','Follow PortSwigger learning material in its dedicated labs and explain the root cause of each finding.',8],
  ['Test a local vulnerable application','Run OWASP Juice Shop locally, reproduce a small set of training findings and record evidence.',9],
  ['Write and retest a report','Prioritize findings, recommend fixes and demonstrate how you would verify a remediation.',7],
 ],{officialDocs:['wstg'],youtube:['bombal','fccVideo'],freeCourses:['academy','pwn'],practiceLabs:['academy','bandit'],articlesAndBooks:['owasp']},[
  ['A beginner lab journal','Complete a small set of Bandit or introductory academy exercises and explain the concepts without publishing challenge secrets.',['Command line','Observation','Documentation'],['OpenSSH','Browser','Text editor'],6],
  ['A local application assessment','Assess a local OWASP Juice Shop instance and deliver a scoped report with reproducible evidence and remediation ideas.',['Web testing','Evidence','Risk ranking'],['OWASP Juice Shop','Docker','Burp Suite Community'],14],
  ['An assessment and retest portfolio','Conduct a full scoped review of a local training application, map findings to WSTG and write an executive summary plus a retest plan.',['Test planning','Reporting','Remediation verification'],['OWASP Juice Shop','Browser developer tools','LibreOffice'],22],
 ]),
 'Python & Scripting':createPlan('Python & Scripting','Turn repetitive security tasks into small, testable Python tools.',4,[
  ['Write small Python programs','Practice variables, loops, functions and error handling with the official tutorial.',5],
  ['Work with files and structured data','Read text, CSV and JSON files. Validate inputs and handle missing or malformed records.',6],
  ['Understand sockets and safe automation','Learn connection timeouts and argument parsing. Limit experiments to a local test service.',6],
  ['Build log-analysis workflows','Parse sample authentication logs, aggregate events and produce a useful report.',7],
  ['Test and package a reusable tool','Add unit tests, helpful CLI messages and sample inputs. Explain the tool’s limitations.',7],
 ],{officialDocs:['pythonDocs'],youtube:['corey','fccVideo'],freeCourses:['cs50Python','mitPython'],practiceLabs:['exercism','pwn'],articlesAndBooks:['boring']},[
  ['A localhost service inventory','Build a small scanner for an explicitly configured localhost port list, with timeouts and readable output.',['Sockets','Input validation','CLI design'],['Python standard library','Local test server'],5],
  ['A log parser and alert report','Read sample logs, count repeated failures and export a timestamped CSV report with tested thresholds.',['Parsing','Aggregation','Testing'],['Python','unittest','CSV sample data'],10],
  ['An automated findings report','Convert saved lab findings into a structured HTML or Markdown report with severity summaries and regression tests.',['JSON processing','Reporting','Error handling'],['Python','unittest','Text editor'],16],
 ]),
 'Networking':createPlan('Networking','Build a practical mental model of addressing, switching, routing and troubleshooting.',4,[
  ['Follow a packet end to end','Learn the roles of hosts, switches, routers and DNS. Draw a request’s path through a small network.',4],
  ['Practice addresses and subnets','Work through IPv4/CIDR exercises and explain network, host and gateway addresses.',6],
  ['Observe core protocols','Capture your own DNS, TCP and HTTP traffic and label what each protocol contributes.',6],
  ['Build and troubleshoot a lab','Connect local VMs, introduce a harmless routing or DNS error and document a systematic diagnosis.',7],
  ['Design a small reliable network','Create an addressing plan, document failure cases and write a repeatable troubleshooting runbook.',6],
 ],{officialDocs:['wireshark'],youtube:['practical','bombal'],freeCourses:['ciscoNetwork','ciscoDefense'],practiceLabs:['captures','bandit'],articlesAndBooks:['networkBook']},[
  ['A subnet planning workbook','Deliver a CIDR workbook and a labeled network diagram for a fictional small office.',['IP addressing','Subnetting','Documentation'],['LibreOffice Calc','diagrams.net'],5],
  ['A two-network routing lab','Connect local VM networks, test DNS and routing, and publish a packet-level explanation of the path.',['Routing','DNS','Packet analysis'],['VirtualBox','Ubuntu','Wireshark'],12],
  ['A network troubleshooting playbook','Create five lab fault scenarios and record symptoms, diagnostic evidence, fixes and verification results.',['Diagnosis','Protocols','Runbooks'],['iproute2','tcpdump','dig','Ubuntu VMs'],18],
 ]),
 'Linux':createPlan('Linux','Become comfortable with the shell, permissions, services and secure system operations.',4,[
  ['Find your way around the shell','Navigate files, read help and practice pipes and redirection in a disposable local environment.',5],
  ['Understand identities and permissions','Create lab users and groups, inspect ownership and explain least privilege.',6],
  ['Manage services and logs','Inspect processes, services and journal entries. Diagnose a harmless service failure.',6],
  ['Automate repeatable checks','Write shell scripts that summarize users, permissions and system health with clear output.',7],
  ['Harden and monitor a mini-server','Apply a documented baseline, test access and review audit evidence after controlled lab activity.',8],
 ],{officialDocs:['ubuntu'],youtube:['linuxVideo','fccVideo'],freeCourses:['linuxCourse','missing'],practiceLabs:['bandit','pwn'],articlesAndBooks:['commandLine']},[
  ['A documented Linux VM baseline','Install Ubuntu in a local VM, configure a non-root user and demonstrate backups, updates and permission checks.',['Installation','Permissions','Hardening'],['VirtualBox','Ubuntu'],6],
  ['A user and permission audit script','Build a Bash report of local accounts and selected risky permissions, with reproducible sample output.',['Shell scripting','Account auditing','Reporting'],['Bash','GNU coreutils','ShellCheck'],10],
  ['A monitored mini-server','Run a local service with fail2ban and auditd, generate benign test events and explain the resulting alerts.',['Service administration','Audit logs','Monitoring'],['Ubuntu','fail2ban','auditd','Wazuh'],18],
 ]),
 'Threat Detection':createPlan('Threat Detection','Turn system events into evidence-backed detections and useful analyst workflows.',5,[
  ['Understand events and useful context','Identify authentication, process and network logs and describe what each source can and cannot show.',5],
  ['Collect events in a local lab','Set up a small self-hosted Wazuh environment and verify that a test endpoint is reporting.',8],
  ['Write a simple detection rule','Create a rule for benign repeated test failures and document its expected signals.',7],
  ['Map detections to ATT&CK','Link a detection to a relevant technique, replay sample log data and record false positives.',8],
  ['Evaluate and improve the workflow','Measure detection coverage on your scenarios, tune a rule and write an analyst triage note.',8],
 ],{officialDocs:['attack','wazuh'],youtube:['dfirVideo','bombal'],freeCourses:['splunk','ciscoThreat'],practiceLabs:['wazuhLab','datasets'],articlesAndBooks:['attack']},[
  ['A local monitoring dashboard','Install Wazuh locally, ingest one test endpoint and document a set of healthy baseline events.',['Log collection','Baselining','Monitoring'],['Wazuh','Ubuntu VM'],8],
  ['A small detection-rule pack','Create and test rules for benign lab scenarios, recording expected events and known false positives.',['Rule writing','Validation','Tuning'],['Wazuh','Sample logs','Text editor'],14],
  ['An ATT&CK-mapped detection portfolio','Replay selected sample event datasets, map five use cases to ATT&CK and publish coverage and limitations.',['Threat modeling','ATT&CK mapping','Investigation'],['Wazuh','OTRF Security Datasets','MITRE ATT&CK'],22],
 ]),
 'Incident Response':createPlan('Incident Response','Prepare for incidents, investigate evidence and turn recovery into better defenses.',5,[
  ['Prepare people, assets and decisions','Use current NIST SP 800-61 Rev. 3 and CSF 2.0 to define roles, contacts, assets and escalation criteria.',5],
  ['Triage a sample alert','Separate facts from hypotheses, preserve timestamps and build an initial case timeline from sample logs.',6],
  ['Plan containment and evidence handling','Compare containment options for a fictional incident and document evidence integrity and decision trade-offs.',7],
  ['Practice recovery and communication','Run a tabletop scenario, draft stakeholder updates and define verification checks before restoring service.',7],
  ['Review lessons and improve the playbook','Summarize root causes, response gaps and tracked improvement actions in a clear after-action report.',7],
 ],{officialDocs:['nistIr'],youtube:['dfirVideo','messer'],freeCourses:['ciscoThreat','splunk'],practiceLabs:['datasets','wazuhLab'],articlesAndBooks:['nistCsf']},[
  ['An incident response playbook','Write a playbook aligned with NIST Rev. 3/CSF 2.0, with roles, escalation points and evidence-handling notes.',['Preparation','Communication','Decision-making'],['NIST guidance','LibreOffice'],6],
  ['A tabletop incident exercise','Run a fictional account-compromise scenario and deliver a decision timeline, communications and lessons learned.',['Triage','Containment planning','Recovery'],['Scenario cards','LibreOffice','Sample logs'],12],
  ['A sample-log investigation report','Investigate a provided event dataset, explain a defensible timeline and produce an executive report with recovery and detection improvements.',['Evidence analysis','Timeline reconstruction','Reporting'],['OTRF Security Datasets','Python','Wazuh','LibreOffice'],20],
 ]),
};
