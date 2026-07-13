// CompTIA Security+ Acronyms data set
const ACRONYMS = [
  {
    "id": 1,
    "acronym": "2FA",
    "expansion": "Two-factor Authentication",
    "definition": "A security process requiring two types of credentials (like a password and a mobile code) to verify identity."
  },
  {
    "id": 2,
    "acronym": "3DES",
    "expansion": "Triple Data Encryption Standard",
    "definition": "An encryption method that applies DES three times to increase security for sensitive data."
  },
  {
    "id": 3,
    "acronym": "AAA",
    "expansion": "Authentication Authorization and Accounting",
    "definition": "A framework used to verify identity assign access rights and log activity."
  },
  {
    "id": 4,
    "acronym": "ACL",
    "expansion": "Access Control List",
    "definition": "A set of rules attached to resources specifying who can access what and what actions are allowed."
  },
  {
    "id": 5,
    "acronym": "AES",
    "expansion": "Advanced Encryption Standard",
    "definition": "A symmetric encryption algorithm used worldwide to protect sensitive information."
  },
  {
    "id": 6,
    "acronym": "AES-256",
    "expansion": "Advanced Encryption Standard, 256-bit",
    "definition": "A highly secure variant of AES that uses a 256-bit encryption key."
  },
  {
    "id": 7,
    "acronym": "AH",
    "expansion": "Authentication Header",
    "definition": "A protocol in the IPsec suite that provides data integrity and authentication for IP packets."
  },
  {
    "id": 8,
    "acronym": "AI",
    "expansion": "Artificial Intelligence",
    "definition": "Technology that simulates human intelligence for decision-making often used in threat detection."
  },
  {
    "id": 9,
    "acronym": "AIS",
    "expansion": "Automated Indicator Sharing",
    "definition": "A DHS initiative that helps organizations share cyber threat data in real time."
  },
  {
    "id": 10,
    "acronym": "ALE",
    "expansion": "Annualized Loss Expectancy",
    "definition": "The expected yearly financial loss from a particular risk used in risk assessments."
  },
  {
    "id": 11,
    "acronym": "AP",
    "expansion": "Access Point",
    "definition": "A device that enables wireless devices to connect to a wired network using Wi-Fi."
  },
  {
    "id": 12,
    "acronym": "API",
    "expansion": "Application Programming Interface",
    "definition": "A set of protocols allowing different software applications to communicate securely."
  },
  {
    "id": 13,
    "acronym": "APT",
    "expansion": "Advanced Persistent Threat",
    "definition": "A prolonged targeted cyberattack in which attackers remain undetected for a long period."
  },
  {
    "id": 14,
    "acronym": "ARO",
    "expansion": "Annualized Rate of Occurrence",
    "definition": "The estimated number of times a threat is expected to happen in a year."
  },
  {
    "id": 15,
    "acronym": "ARP",
    "expansion": "Address Resolution Protocol",
    "definition": "A protocol used to map IP addresses to physical MAC addresses in a local network."
  },
  {
    "id": 16,
    "acronym": "ASLR",
    "expansion": "Address Space Layout Randomization",
    "definition": "A security technique that randomizes memory addresses to prevent exploitation."
  },
  {
    "id": 17,
    "acronym": "ATT&CK",
    "expansion": "Adversarial Tactics Techniques and Common Knowledge",
    "definition": "A MITRE framework for understanding attacker behaviors and methods."
  },
  {
    "id": 18,
    "acronym": "AUP",
    "expansion": "Acceptable Use Policy",
    "definition": "A written agreement that outlines what is and isn't permitted when using organizational IT resources."
  },
  {
    "id": 19,
    "acronym": "AV",
    "expansion": "Antivirus",
    "definition": "Software that detects prevents and removes malicious software from systems."
  },
  {
    "id": 20,
    "acronym": "BASH",
    "expansion": "Bourne Again Shell",
    "definition": "A command-line shell used in many Unix/Linux systems often relevant in scripting and automation."
  },
  {
    "id": 21,
    "acronym": "BCP",
    "expansion": "Business Continuity Planning",
    "definition": "The process of creating systems to recover operations during and after a crisis."
  },
  {
    "id": 22,
    "acronym": "BGP",
    "expansion": "Border Gateway Protocol",
    "definition": "A routing protocol used to exchange routing information between autonomous systems on the internet."
  },
  {
    "id": 23,
    "acronym": "BIA",
    "expansion": "Business Impact Analysis",
    "definition": "A process to predict and evaluate the impact of disruption to business functions."
  },
  {
    "id": 24,
    "acronym": "BIOS",
    "expansion": "Basic Input/Output System",
    "definition": "Firmware that initializes hardware during the booting process and loads the operating system."
  },
  {
    "id": 25,
    "acronym": "BPA",
    "expansion": "Business Partners Agreement",
    "definition": "A formal agreement outlining responsibilities when two entities share protected data or systems."
  },
  {
    "id": 26,
    "acronym": "BPDU",
    "expansion": "Bridge Protocol Data Unit",
    "definition": "A message used in spanning tree protocols to prevent loops in network switches."
  },
  {
    "id": 27,
    "acronym": "BYOD",
    "expansion": "Bring Your Own Device",
    "definition": "A policy allowing employees to use personal devices for work which introduces security considerations."
  },
  {
    "id": 28,
    "acronym": "CA",
    "expansion": "Certificate Authority",
    "definition": "A trusted organization that issues digital certificates to verify identity and enable secure communications."
  },
  {
    "id": 29,
    "acronym": "CAPTCHA",
    "expansion": "Completely Automated Public Turing Test to Tell Computers and Humans Apart",
    "definition": "A test (CAPTCHA) to distinguish humans from bots."
  },
  {
    "id": 30,
    "acronym": "CAR",
    "expansion": "Corrective Action Report",
    "definition": "Documentation used to identify correct and prevent the recurrence of security issues or failures."
  },
  {
    "id": 31,
    "acronym": "CASB",
    "expansion": "Cloud Access Security Broker",
    "definition": "A software tool or service that sits between users and cloud services to enforce security policies."
  },
  {
    "id": 32,
    "acronym": "CBC",
    "expansion": "Cipher Block Chaining",
    "definition": "A mode of encryption where each plaintext block is XORed with the previous ciphertext block."
  },
  {
    "id": 33,
    "acronym": "CCMP",
    "expansion": "Counter Mode/CBC-MAC Protocol",
    "definition": "A secure encryption method combining counter mode for encryption and CBC-MAC for authentication."
  },
  {
    "id": 34,
    "acronym": "CCTV",
    "expansion": "Closed-circuit Television",
    "definition": "Video surveillance systems used to monitor and secure physical environments."
  },
  {
    "id": 35,
    "acronym": "CERT",
    "expansion": "Computer Emergency Response Team",
    "definition": "A group that responds to cybersecurity incidents and helps mitigate their effects."
  },
  {
    "id": 36,
    "acronym": "CFB",
    "expansion": "Cipher Feedback",
    "definition": "A mode of operation for block ciphers that turns them into stream ciphers for data encryption."
  },
  {
    "id": 37,
    "acronym": "CHAP",
    "expansion": "Challenge Handshake Authentication Protocol",
    "definition": "A protocol that uses a challenge-response method to authenticate users."
  },
  {
    "id": 38,
    "acronym": "CIA",
    "expansion": "Confidentiality Integrity Availability",
    "definition": "The core principles of cybersecurity ensuring data privacy accuracy and access."
  },
  {
    "id": 39,
    "acronym": "CIO",
    "expansion": "Chief Information Officer",
    "definition": "An executive responsible for the overall information technology strategy of an organization."
  },
  {
    "id": 40,
    "acronym": "CIRT",
    "expansion": "Computer Incident Response Team",
    "definition": "A team that handles and mitigates cybersecurity incidents within an organization."
  },
  {
    "id": 41,
    "acronym": "CMS",
    "expansion": "Content Management System",
    "definition": "Software that helps manage digital content often used in websites and document control."
  },
  {
    "id": 42,
    "acronym": "COBO",
    "expansion": "Corporate-owned Business-only",
    "definition": "A device policy where company-issued devices are restricted to work-related use only."
  },
  {
    "id": 43,
    "acronym": "COOP",
    "expansion": "Continuity of Operation Planning",
    "definition": "A government or business plan to ensure essential functions continue during emergencies."
  },
  {
    "id": 44,
    "acronym": "COPE",
    "expansion": "Corporate Owned Personally Enabled",
    "definition": "A policy allowing personal use on corporate devices with oversight and controls."
  },
  {
    "id": 45,
    "acronym": "CP",
    "expansion": "Contingency Planning",
    "definition": "Preparing backup procedures to maintain operations during unplanned events or disasters."
  },
  {
    "id": 46,
    "acronym": "CRC",
    "expansion": "Cyclical Redundancy Check",
    "definition": "An error-detecting code used to check data integrity in files and network transmissions."
  },
  {
    "id": 47,
    "acronym": "CRL",
    "expansion": "Certificate Revocation List",
    "definition": "A list of digital certificates that have been invalidated before their expiration date."
  },
  {
    "id": 48,
    "acronym": "CSO",
    "expansion": "Chief Security Officer",
    "definition": "A high-level executive responsible for the organization's entire security strategy physical and cyber."
  },
  {
    "id": 49,
    "acronym": "CSP",
    "expansion": "Cloud Service Provider",
    "definition": "A company that delivers cloud computing services like storage processing and apps over the internet"
  },
  {
    "id": 50,
    "acronym": "CSR",
    "expansion": "Certificate Signing Request",
    "definition": "A request sent from a client to a CA to apply for a digital certificate."
  },
  {
    "id": 51,
    "acronym": "CSRF",
    "expansion": "Cross-site Request Forgery",
    "definition": "A web attack where users are tricked into performing actions they didn't intend while authenticated."
  },
  {
    "id": 52,
    "acronym": "CSU",
    "expansion": "Channel Service Unit",
    "definition": "A device that connects digital equipment to a digital telephone line often used in leased lines."
  },
  {
    "id": 53,
    "acronym": "CTM",
    "expansion": "Counter Mode",
    "definition": "A mode of encryption where a counter value is encrypted and XORed with the plaintext for fast secure encryption."
  },
  {
    "id": 54,
    "acronym": "CTO",
    "expansion": "Chief Technology Officer",
    "definition": "An executive who oversees the development and use of technology in an organization."
  },
  {
    "id": 55,
    "acronym": "CVE",
    "expansion": "Common Vulnerability Enumeration",
    "definition": "A standardized identifier for known security vulnerabilities."
  },
  {
    "id": 56,
    "acronym": "CVSS",
    "expansion": "Common Vulnerability Scoring System",
    "definition": "A numerical scoring system to rate the severity of software vulnerabilities."
  },
  {
    "id": 57,
    "acronym": "CYOD",
    "expansion": "Choose Your Own Device",
    "definition": "A workplace policy allowing employees to select from approved personal devices for work use."
  },
  {
    "id": 58,
    "acronym": "DAC",
    "expansion": "Discretionary Access Control",
    "definition": "A security model where the data owner determines access permissions allowing flexibility but requiring careful management."
  },
  {
    "id": 59,
    "acronym": "DBA",
    "expansion": "Database Administrator",
    "definition": "A person responsible for managing and securing databases ensuring availability integrity and performance."
  },
  {
    "id": 60,
    "acronym": "DDoS",
    "expansion": "Distributed Denial of Service",
    "definition": "A type of attack that overwhelms a service with traffic from multiple sources causing disruption or shutdown."
  },
  {
    "id": 61,
    "acronym": "DEP",
    "expansion": "Data Execution Prevention",
    "definition": "A security feature that blocks code from running in memory regions not designated for execution helping prevent exploits."
  },
  {
    "id": 62,
    "acronym": "DES",
    "expansion": "Digital Encryption Standard",
    "definition": "An older symmetric-key encryption algorithm that has been replaced by stronger methods like AES due to vulnerabilities."
  },
  {
    "id": 63,
    "acronym": "DHCP",
    "expansion": "Dynamic Host Configuration Protocol",
    "definition": "A protocol that automatically assigns IP addresses and network settings to devices on a network."
  },
  {
    "id": 64,
    "acronym": "DHE",
    "expansion": "Diffie-Hellman Ephemeral",
    "definition": "A cryptographic key exchange method that uses temporary keys for enhanced session security and forward secrecy."
  },
  {
    "id": 65,
    "acronym": "DKIM",
    "expansion": "DomainKeys Identified Mail",
    "definition": "An email authentication method that verifies a sender'S domain using a digital signature to prevent spoofing."
  },
  {
    "id": 66,
    "acronym": "DLL",
    "expansion": "Dynamic Link Library",
    "definition": "A shared library of code used by multiple programs in Windows allowing modular and efficient software functionality."
  },
  {
    "id": 67,
    "acronym": "DLP",
    "expansion": "Data Loss Prevention",
    "definition": "Tools and strategies used to prevent unauthorized access transmission or leakage of sensitive information."
  },
  {
    "id": 68,
    "acronym": "DMARC",
    "expansion": "Domain Message Authentication Reporting and Conformance",
    "definition": "An email validation system that uses SPF and DKIM to prevent phishing and provides reporting."
  },
  {
    "id": 69,
    "acronym": "DNAT",
    "expansion": "Destination Network Address Translation",
    "definition": "A process that changes the destination IP address of incoming packets to route them to internal hosts."
  },
  {
    "id": 70,
    "acronym": "DNS",
    "expansion": "Domain Name System",
    "definition": "A naming system that translates human-readable domain names into IP addresses computers use to identify each other."
  },
  {
    "id": 71,
    "acronym": "DNSSEC",
    "expansion": "Domain Name System Security Extensions",
    "definition": "A suite of extensions to DNS that provide authentication and integrity to protect against spoofing."
  },
  {
    "id": 72,
    "acronym": "DoS",
    "expansion": "Denial of Service",
    "definition": "An attack that aims to shut down a service or system by flooding it with traffic or triggering resource exhaustion."
  },
  {
    "id": 73,
    "acronym": "DPO",
    "expansion": "Data Privacy Officer",
    "definition": "An individual responsible for ensuring compliance with data protection laws and managing data privacy policies."
  },
  {
    "id": 74,
    "acronym": "DRP",
    "expansion": "Disaster Recovery Plan",
    "definition": "A documented strategy outlining how to resume IT services and operations after a disruptive incident."
  },
  {
    "id": 75,
    "acronym": "DSA",
    "expansion": "Digital Signature Algorithm",
    "definition": "A cryptographic algorithm used to validate the authenticity and integrity of digital messages and documents."
  },
  {
    "id": 76,
    "acronym": "DSL",
    "expansion": "Digital Subscriber Line",
    "definition": "A high-speed internet connection over telephone lines commonly used in homes and small offices."
  },
  {
    "id": 77,
    "acronym": "EAP",
    "expansion": "Extensible Authentication Protocol",
    "definition": "A framework used in network access authentication that supports multiple authentication methods."
  },
  {
    "id": 78,
    "acronym": "ECB",
    "expansion": "Electronic Code Book",
    "definition": "A simple mode of symmetric encryption that encrypts each block of data separately making it less secure."
  },
  {
    "id": 79,
    "acronym": "ECC",
    "expansion": "Elliptic Curve Cryptography",
    "definition": "A type of asymmetric encryption using elliptic curves for fast strong encryption with smaller key sizes."
  },
  {
    "id": 80,
    "acronym": "ECDHE",
    "expansion": "Elliptic Curve Diffie-Hellman Ephemeral",
    "definition": "A secure key exchange protocol using elliptic curves and temporary keys for session confidentiality."
  },
  {
    "id": 81,
    "acronym": "ECDSA",
    "expansion": "Elliptic Curve Digital Signature Algorithm",
    "definition": "A digital signature method using elliptic curves that provides high security with efficient performance."
  },
  {
    "id": 82,
    "acronym": "EDR",
    "expansion": "Endpoint Detection and Response",
    "definition": "A security solution that monitors endpoints for malicious activity and provides real- time threat response."
  },
  {
    "id": 83,
    "acronym": "EFS",
    "expansion": "Encrypted File System",
    "definition": "A Windows feature that encrypts files and folders to protect them from unauthorized access on the local system."
  },
  {
    "id": 84,
    "acronym": "ERP",
    "expansion": "Enterprise Resource Planning",
    "definition": "Integrated software systems that manage core business processes often requiring tight security controls."
  },
  {
    "id": 85,
    "acronym": "ESN",
    "expansion": "Electronic Serial Number",
    "definition": "A unique identifier embedded in mobile devices used for tracking and authentication purposes."
  },
  {
    "id": 86,
    "acronym": "ESP",
    "expansion": "Encapsulated Security Payload",
    "definition": "A component of IPsec that provides confidentiality integrity and authentication of IP packets."
  },
  {
    "id": 87,
    "acronym": "EULA",
    "expansion": "End User License Agreement",
    "definition": "A legal contract between software developers and users outlining terms of use and restrictions."
  },
  {
    "id": 88,
    "acronym": "FACL",
    "expansion": "File System Access Control List",
    "definition": "A set of rules attached to files or folders that define which users or groups can access them and how."
  },
  {
    "id": 89,
    "acronym": "FDE",
    "expansion": "Full Disk Encryption",
    "definition": "A security feature that encrypts all data on a disk drive protecting contents even if the drive is stolen."
  },
  {
    "id": 90,
    "acronym": "FIM",
    "expansion": "File Integrity Management",
    "definition": "A process that monitors and detects changes to files helping identify unauthorized modifications or corruption."
  },
  {
    "id": 91,
    "acronym": "FPGA",
    "expansion": "Field Programmable Gate Array",
    "definition": "A hardware device that can be programmed to perform specific logic tasks used in custom security solutions."
  },
  {
    "id": 92,
    "acronym": "FRR",
    "expansion": "False Rejection Rate",
    "definition": "The rate at which valid users are incorrectly denied access in a biometric authentication system."
  },
  {
    "id": 93,
    "acronym": "FTP",
    "expansion": "File Transfer Protocol",
    "definition": "A standard protocol used to transfer files between systems over a network but not inherently secure."
  },
  {
    "id": 94,
    "acronym": "FTPS",
    "expansion": "Secured File Transfer Protocol",
    "definition": "A secure version of FTP that uses encryption (typically via SSH) to protect file transfers."
  },
  {
    "id": 95,
    "acronym": "GCM",
    "expansion": "Galois Counter Mode",
    "definition": "A secure encryption mode combining counter mode with authentication often used in AES encryption."
  },
  {
    "id": 96,
    "acronym": "GDPR",
    "expansion": "General Data Protection Regulation",
    "definition": "A European law that regulates data protection and privacy for individuals within the EU."
  },
  {
    "id": 97,
    "acronym": "GPG",
    "expansion": "Gnu Privacy Guard",
    "definition": "An open-source encryption software that enables secure data communication and digital signatures."
  },
  {
    "id": 98,
    "acronym": "GPO",
    "expansion": "Group Policy Object",
    "definition": "A collection of settings in Windows used to control user and computer configurations in an Active Directory environment."
  },
  {
    "id": 99,
    "acronym": "GPS",
    "expansion": "Global Positioning System",
    "definition": "A satellite-based navigation system used for location tracking and coordination with security implications in mobile devices and applications."
  },
  {
    "id": 100,
    "acronym": "GPU",
    "expansion": "Graphics Processing Unit",
    "definition": "A specialized processor that handles image rendering and parallel computations increasingly used in cryptographic operations."
  },
  {
    "id": 101,
    "acronym": "GRE",
    "expansion": "Generic Routing Encapsulation",
    "definition": "A tunneling protocol that encapsulates data packets to enable point-to-point communication over IP networks."
  },
  {
    "id": 102,
    "acronym": "HA",
    "expansion": "High Availability",
    "definition": "A design approach that ensures a system remains operational with minimal downtime even during failures."
  },
  {
    "id": 103,
    "acronym": "HDD",
    "expansion": "Hard Disk Drive",
    "definition": "A traditional magnetic storage device used to store operating systems applications and user data."
  },
  {
    "id": 104,
    "acronym": "HIDS",
    "expansion": "Host-based Intrusion Detection System",
    "definition": "Software that monitors a single system for suspicious activity or policy violations."
  },
  {
    "id": 105,
    "acronym": "HIPS",
    "expansion": "Host-based Intrusion Prevention System",
    "definition": "Software that detects and actively blocks malicious behavior on an individual host."
  },
  {
    "id": 106,
    "acronym": "HMAC",
    "expansion": "Hashed Message Authentication Code",
    "definition": "A hash function combined with a secret key to verify the integrity and authenticity of data."
  },
  {
    "id": 107,
    "acronym": "HOTP",
    "expansion": "HMAC-based One-time Password",
    "definition": "A secure one-time password algorithm that changes with each authentication attempt using HMAC."
  },
  {
    "id": 108,
    "acronym": "HSM",
    "expansion": "Hardware Security Module",
    "definition": "A physical device that securely stores cryptographic keys and performs encryption operations."
  },
  {
    "id": 109,
    "acronym": "HTML",
    "expansion": "Hypertext Markup Language",
    "definition": "The standard language used to create and format content for web pages."
  },
  {
    "id": 110,
    "acronym": "HTTP",
    "expansion": "Hypertext Transfer Protocol",
    "definition": "A protocol used to request and transfer web pages over the internet typically on port 80."
  },
  {
    "id": 111,
    "acronym": "HTTPS",
    "expansion": "Hypertext Transfer Protocol Secure",
    "definition": "The encrypted version of HTTP using TLS/SSL to secure web communications."
  },
  {
    "id": 112,
    "acronym": "HVAC",
    "expansion": "Heating Ventilation Air Conditioning",
    "definition": "Physical environmental controls that protect IT equipment from temperature and humidity-related issues."
  },
  {
    "id": 113,
    "acronym": "IaaS",
    "expansion": "Infrastructure as a Service",
    "definition": "A cloud computing model where users rent virtualized hardware resources like servers and storage."
  },
  {
    "id": 114,
    "acronym": "IaC",
    "expansion": "Infrastructure as Code",
    "definition": "The practice of managing and provisioning IT infrastructure using machine-readable configuration files."
  },
  {
    "id": 115,
    "acronym": "IAM",
    "expansion": "Identity and Access Management",
    "definition": "A framework for ensuring the right individuals access the right resources at the right times."
  },
  {
    "id": 116,
    "acronym": "ICMP",
    "expansion": "Internet Control Message Protocol",
    "definition": "A network protocol used for sending error messages and operational information about IP traffic."
  },
  {
    "id": 117,
    "acronym": "ICS",
    "expansion": "Industrial Control Systems",
    "definition": "Networked systems used to monitor and control industrial processes often targeted in critical infrastructure attacks."
  },
  {
    "id": 118,
    "acronym": "IDEA",
    "expansion": "International Data Encryption Algorithm",
    "definition": "A symmetric-key encryption algorithm used in secure communications."
  },
  {
    "id": 119,
    "acronym": "IDF",
    "expansion": "Intermediate Distribution Frame",
    "definition": "A wiring frame that connects and manages network cabling between equipment and end-user devices."
  },
  {
    "id": 120,
    "acronym": "IdP",
    "expansion": "Identity Provider",
    "definition": "A service that authenticates users and provides identity data to applications and systems."
  },
  {
    "id": 121,
    "acronym": "IDS",
    "expansion": "Intrusion Detection System",
    "definition": "A system that monitors network or system activity for signs of security breaches or malicious behavior."
  },
  {
    "id": 122,
    "acronym": "IEEE",
    "expansion": "Institute of Electrical and Electronics Engineers",
    "definition": "A global organization that develops technical standards including those used in networking and security."
  },
  {
    "id": 123,
    "acronym": "IKE",
    "expansion": "Internet Key Exchange",
    "definition": "A protocol used in IPsec to establish secure communication sessions by exchanging cryptographic keys."
  },
  {
    "id": 124,
    "acronym": "IM",
    "expansion": "Instant Messaging",
    "definition": "Real-time communication via text over a network which must be secured to prevent data leaks."
  },
  {
    "id": 125,
    "acronym": "IMAP",
    "expansion": "Internet Message Access Protocol",
    "definition": "A protocol used by email clients to retrieve messages from a mail server while keeping them stored on the server."
  },
  {
    "id": 126,
    "acronym": "IoC",
    "expansion": "Indicators of Compromise",
    "definition": "Evidence or artifacts that suggest a system has been breached or is under attack."
  },
  {
    "id": 127,
    "acronym": "IoT",
    "expansion": "Internet of Things",
    "definition": "The network of physical devices embedded with sensors and connectivity posing unique security risks."
  },
  {
    "id": 128,
    "acronym": "IP",
    "expansion": "Internet Protocol",
    "definition": "The primary protocol for sending data across networks assigning addresses and routing packets."
  },
  {
    "id": 129,
    "acronym": "IPS",
    "expansion": "Intrusion Prevention System",
    "definition": "A system that actively monitors and blocks detected threats or unauthorized activity in real-time."
  },
  {
    "id": 130,
    "acronym": "IPSec",
    "expansion": "Internet Protocol Security",
    "definition": "A suite of protocols for securing IP communications through encryption and authentication."
  },
  {
    "id": 131,
    "acronym": "IR",
    "expansion": "Incident Response",
    "definition": "The process of detecting analyzing and responding to security incidents to minimize damage."
  },
  {
    "id": 132,
    "acronym": "IRC",
    "expansion": "Internet Relay Chat",
    "definition": "A real-time messaging protocol used for chat often associated with command-and- control communications in attacks."
  },
  {
    "id": 133,
    "acronym": "IRP",
    "expansion": "Incident Response Plan",
    "definition": "A documented set of procedures for detecting responding to and recovering from security incidents."
  },
  {
    "id": 134,
    "acronym": "ISO",
    "expansion": "International Standards Organization",
    "definition": "An international body that creates standards for technology including information security (e.g. ISO/IEC 27001)."
  },
  {
    "id": 135,
    "acronym": "ISP",
    "expansion": "Internet Service Provider",
    "definition": "A company that provides access to the internet for individuals and organizations."
  },
  {
    "id": 136,
    "acronym": "ISSO",
    "expansion": "Information Systems Security Officer",
    "definition": "A professional responsible for implementing and managing an organization's IT security policies."
  },
  {
    "id": 137,
    "acronym": "IV",
    "expansion": "Initialization Vector",
    "definition": "A random value used with encryption algorithms to ensure that the same plaintext doesn't produce the same ciphertext."
  },
  {
    "id": 138,
    "acronym": "KDC",
    "expansion": "Key Distribution Center",
    "definition": "A server used in Kerberos authentication to issue keys and tickets to users and services."
  },
  {
    "id": 139,
    "acronym": "KEK",
    "expansion": "Key Encryption Key",
    "definition": "A key used to encrypt other cryptographic keys providing an extra layer of key management security."
  },
  {
    "id": 140,
    "acronym": "L2TP",
    "expansion": "Layer 2 Tunneling Protocol",
    "definition": "A VPN protocol that supports tunneling without encryption; often paired with IPsec for security."
  },
  {
    "id": 141,
    "acronym": "LAN",
    "expansion": "Local Area Network",
    "definition": "A group of interconnected computers and devices within a limited area such as an office or building."
  },
  {
    "id": 142,
    "acronym": "LDAP",
    "expansion": "Lightweight Directory Access Protocol",
    "definition": "A protocol used to access and maintain directory information like usernames and credentials."
  },
  {
    "id": 143,
    "acronym": "LEAP",
    "expansion": "Lightweight Extensible Authentication Protocol",
    "definition": "An authentication protocol often used with wireless networks for secure client verification."
  },
  {
    "id": 144,
    "acronym": "MaaS",
    "expansion": "Monitoring as a Service",
    "definition": "A cloud-based solution for monitoring systems networks or applications for performance and security."
  },
  {
    "id": 145,
    "acronym": "MAC",
    "expansion": "Mandatory Access Control",
    "definition": "A strict access control model where access rights are regulated by a central authority based on classifications."
  },
  {
    "id": 146,
    "acronym": "MAC",
    "expansion": "Media Access Control",
    "definition": "A unique hardware identifier assigned to network interfaces for communications on the physical network."
  },
  {
    "id": 147,
    "acronym": "MAC",
    "expansion": "Message Authentication Code",
    "definition": "A short piece of data used to confirm the integrity and authenticity of a message."
  },
  {
    "id": 148,
    "acronym": "MAN",
    "expansion": "Metropolitan Area Network",
    "definition": "A network that spans a city or campus larger than a LAN but smaller than a WAN."
  },
  {
    "id": 149,
    "acronym": "MBR",
    "expansion": "Master Boot Record",
    "definition": "The section of a hard drive containing boot information often targeted by malware."
  },
  {
    "id": 150,
    "acronym": "MD5",
    "expansion": "Message Digest 5",
    "definition": "A cryptographic hash function used for checksums now considered insecure due to vulnerability to collisions."
  },
  {
    "id": 151,
    "acronym": "MDF",
    "expansion": "Main Distribution Frame",
    "definition": "The central point where telecommunications lines terminate and connect to internal networks."
  },
  {
    "id": 152,
    "acronym": "MDM",
    "expansion": "Mobile Device Management",
    "definition": "Software used to monitor manage and secure employees' mobile devices used in the workplace."
  },
  {
    "id": 153,
    "acronym": "MFA",
    "expansion": "Multifactor Authentication",
    "definition": "A security method that requires two or more types of credentials for user authentication."
  },
  {
    "id": 154,
    "acronym": "MFD",
    "expansion": "Multifunction Device",
    "definition": "Hardware that combines functions like printing scanning copying and faxing into a single device."
  },
  {
    "id": 155,
    "acronym": "MFP",
    "expansion": "Multifunction Printer",
    "definition": "A type of multifunction device focused on printing-related tasks and often integrated into office networks."
  },
  {
    "id": 156,
    "acronym": "ML",
    "expansion": "Machine Learning",
    "definition": "A type of artificial intelligence that allows systems to learn from data and improve over time often used in threat detection."
  },
  {
    "id": 157,
    "acronym": "MMS",
    "expansion": "Multimedia Message Service",
    "definition": "A messaging service that allows sending multimedia content such as images and videos which can carry embedded threats."
  },
  {
    "id": 158,
    "acronym": "MOA",
    "expansion": "Memorandum of Agreement",
    "definition": "A formal document outlining specific agreements between parties including security responsibilities."
  },
  {
    "id": 159,
    "acronym": "MOU",
    "expansion": "Memorandum of Understanding",
    "definition": "A non-binding agreement that outlines terms and expectations for collaboration between entities."
  },
  {
    "id": 160,
    "acronym": "MPLS",
    "expansion": "Multi-protocol Label Switching",
    "definition": "A high-performance routing technique used to direct data across wide area networks efficiently."
  },
  {
    "id": 161,
    "acronym": "MSA",
    "expansion": "Master Service Agreement",
    "definition": "A contract that defines terms between parties for ongoing services including security and service levels."
  },
  {
    "id": 162,
    "acronym": "MSCHAP",
    "expansion": "Microsoft Challenge Handshake Authentication Protocol",
    "definition": "An authentication protocol used in Microsoft environments susceptible to certain attacks."
  },
  {
    "id": 163,
    "acronym": "MSP",
    "expansion": "Managed Service Provider",
    "definition": "A third-party company that remotely manages a customer's IT infrastructure and end- user systems."
  },
  {
    "id": 164,
    "acronym": "MSSP",
    "expansion": "Managed Security Service Provider",
    "definition": "A third-party vendor that provides outsourced monitoring and management of security systems."
  },
  {
    "id": 165,
    "acronym": "MTBF",
    "expansion": "Mean Time Between Failures",
    "definition": "The predicted time between one failure and the next for a system used to assess reliability."
  },
  {
    "id": 166,
    "acronym": "MTTF",
    "expansion": "Mean Time to Failure",
    "definition": "The average time a system is expected to operate before its first failure."
  },
  {
    "id": 167,
    "acronym": "MTTR",
    "expansion": "Mean Time to Recover",
    "definition": "The average time it takes to recover a system or service after a failure or security incident."
  },
  {
    "id": 168,
    "acronym": "MTU",
    "expansion": "Maximum Transmission Unit",
    "definition": "The largest size of a packet that can be transmitted on a network without fragmentation."
  },
  {
    "id": 169,
    "acronym": "NAC",
    "expansion": "Network Access Control",
    "definition": "A security solution that enforces policies for device compliance before allowing network access."
  },
  {
    "id": 170,
    "acronym": "NAT",
    "expansion": "Network Address Translation",
    "definition": "A process that modifies IP address information to allow multiple devices to share a single public IP."
  },
  {
    "id": 171,
    "acronym": "NDA",
    "expansion": "Non-disclosure Agreement",
    "definition": "A legal contract ensuring parties don't share confidential information with unauthorized entities."
  },
  {
    "id": 172,
    "acronym": "NFC",
    "expansion": "Near Field Communication",
    "definition": "A short-range wireless technology used in contactless payments and data sharing between devices."
  },
  {
    "id": 173,
    "acronym": "NGFW",
    "expansion": "Next-generation Firewall",
    "definition": "An advanced firewall with features like deep packet inspection intrusion prevention and application awareness."
  },
  {
    "id": 174,
    "acronym": "NIDS",
    "expansion": "Network-based Intrusion Detection System",
    "definition": "A system that monitors network traffic for signs of malicious activity or policy violations."
  },
  {
    "id": 175,
    "acronym": "NIPS",
    "expansion": "Network-based Intrusion Prevention System",
    "definition": "A security system that inspects network traffic and blocks threats in real time."
  },
  {
    "id": 176,
    "acronym": "NIST",
    "expansion": "National Institute of Standards & Technology",
    "definition": "A U.S. agency that develops cybersecurity standards and guidelines including the NIST Cybersecurity Framework."
  },
  {
    "id": 177,
    "acronym": "NTFS",
    "expansion": "New Technology File System",
    "definition": "A Windows file system offering features like permissions encryption and journaling."
  },
  {
    "id": 178,
    "acronym": "NTLM",
    "expansion": "New Technology LAN Manager",
    "definition": "A Microsoft authentication protocol used in Windows environments now replaced by Kerberos in most systems."
  },
  {
    "id": 179,
    "acronym": "NTP",
    "expansion": "Network Time Protocol",
    "definition": "A protocol used to synchronize clocks between systems over a network critical for accurate logging and security."
  },
  {
    "id": 180,
    "acronym": "OAUTH",
    "expansion": "Open Authorization",
    "definition": "A protocol that allows secure delegated access without sharing passwords often used in single sign-on for web apps."
  },
  {
    "id": 181,
    "acronym": "OCSP",
    "expansion": "Online Certificate Status Protocol",
    "definition": "A protocol used to check the revocation status of a digital certificate in real-time."
  },
  {
    "id": 182,
    "acronym": "OID",
    "expansion": "Object Identifier",
    "definition": "A globally unique string used to identify specific objects in standards like certificates and LDAP schemas."
  },
  {
    "id": 183,
    "acronym": "OS",
    "expansion": "Operating System",
    "definition": "The core software that manages hardware and software resources and provides services for applications."
  },
  {
    "id": 184,
    "acronym": "OSINT",
    "expansion": "Open-source Intelligence",
    "definition": "Publicly available information (like websites or social media) used for investigative or threat intelligence purposes."
  },
  {
    "id": 185,
    "acronym": "OSPF",
    "expansion": "Open Shortest Path First",
    "definition": "A dynamic routing protocol used in internal networks to determine the best path for data."
  },
  {
    "id": 186,
    "acronym": "OT",
    "expansion": "Operational Technology",
    "definition": "Systems used to control industrial equipment like SCADA often found in manufacturing or utilities."
  },
  {
    "id": 187,
    "acronym": "OTA",
    "expansion": "Over the Air",
    "definition": "The wireless transmission of data often used for updating firmware or mobile device settings remotely."
  },
  {
    "id": 188,
    "acronym": "OVAL",
    "expansion": "Open Vulnerability Assessment Language",
    "definition": "An XML-based language used to standardize and automate vulnerability testing and reporting."
  },
  {
    "id": 189,
    "acronym": "P12",
    "expansion": "PKCS #12",
    "definition": "A format for storing and transporting a user's private keys certificates and other credentials securely."
  },
  {
    "id": 190,
    "acronym": "P2P",
    "expansion": "Peer to Peer",
    "definition": "A decentralized network model where each device can act as both a client and a server raising security concerns."
  },
  {
    "id": 191,
    "acronym": "PaaS",
    "expansion": "Platform as a Service",
    "definition": "A cloud computing model that provides hardware and software tools over the internet for application development."
  },
  {
    "id": 192,
    "acronym": "PAC",
    "expansion": "Proxy Auto Configuration",
    "definition": "A file used by browsers to automatically select the appropriate proxy server for a given URL."
  },
  {
    "id": 193,
    "acronym": "PAM",
    "expansion": "Privileged Access Management",
    "definition": "Tools and strategies used to monitor and control accounts with elevated access rights to reduce risk."
  },
  {
    "id": 194,
    "acronym": "PAM",
    "expansion": "Pluggable Authentication Modules",
    "definition": "A flexible framework used in Linux to integrate multiple authentication technologies."
  },
  {
    "id": 195,
    "acronym": "PAP",
    "expansion": "Password Authentication Protocol",
    "definition": "A basic authentication method where usernames and passwords are sent in plain text now considered insecure."
  },
  {
    "id": 196,
    "acronym": "PAT",
    "expansion": "Port Address Translation",
    "definition": "A form of NAT where multiple devices share a single public IP by using different port numbers."
  },
  {
    "id": 197,
    "acronym": "PBKDF2",
    "expansion": "Password-based Key Derivation Function 2",
    "definition": "A key derivation function used to generate secure encryption keys from passwords."
  },
  {
    "id": 198,
    "acronym": "PBX",
    "expansion": "Private Branch Exchange",
    "definition": "A private telephone network used within an organization often integrated with VoIP systems."
  },
  {
    "id": 199,
    "acronym": "PCAP",
    "expansion": "Packet Capture",
    "definition": "The process of intercepting and logging network traffic for analysis often used in intrusion detection."
  },
  {
    "id": 200,
    "acronym": "PCI DSS",
    "expansion": "Payment Card Industry Data Security Standard",
    "definition": "A set of standards ensuring secure handling of credit card information."
  },
  {
    "id": 201,
    "acronym": "PDU",
    "expansion": "Power Distribution Unit",
    "definition": "A device that distributes electrical power to various IT equipment in a data center or server room."
  },
  {
    "id": 202,
    "acronym": "PEAP",
    "expansion": "Protected Extensible Authentication Protocol",
    "definition": "An authentication method that creates a secure tunnel before sending credentials."
  },
  {
    "id": 203,
    "acronym": "PED",
    "expansion": "Personal Electronic Device",
    "definition": "A user-owned device like a phone or tablet that may be used for work often under BYOD policies."
  },
  {
    "id": 204,
    "acronym": "PEM",
    "expansion": "Privacy Enhanced Mail",
    "definition": "A standard for securing email using encryption and digital signatures now largely outdated."
  },
  {
    "id": 205,
    "acronym": "PFS",
    "expansion": "Perfect Forward Secrecy",
    "definition": "A cryptographic feature that ensures session keys are not compromised even if the server's key is stolen."
  },
  {
    "id": 206,
    "acronym": "PGP",
    "expansion": "Pretty Good Privacy",
    "definition": "A data encryption program used for securing emails through encryption and digital signing."
  },
  {
    "id": 207,
    "acronym": "PHI",
    "expansion": "Personal Health Information",
    "definition": "Any health-related information tied to an individual protected by regulations like HIPAA."
  },
  {
    "id": 208,
    "acronym": "PII",
    "expansion": "Personally Identifiable Information",
    "definition": "Any data that can identify a person such as name SSN or email critical for data privacy."
  },
  {
    "id": 209,
    "acronym": "PIV",
    "expansion": "Personal Identity Verification",
    "definition": "A U.S. government standard for secure identity credentials used in federal employee authentication."
  },
  {
    "id": 210,
    "acronym": "PKCS",
    "expansion": "Public Key Cryptography Standards",
    "definition": "A set of standards developed to guide secure public key cryptography usage."
  },
  {
    "id": 211,
    "acronym": "PKI",
    "expansion": "Public Key Infrastructure",
    "definition": "A framework for managing digital certificates and public-key encryption to support secure communications."
  },
  {
    "id": 212,
    "acronym": "POP",
    "expansion": "Post Office Protocol",
    "definition": "A protocol used to retrieve emails from a mail server and delete them from the server after download."
  },
  {
    "id": 213,
    "acronym": "POTS",
    "expansion": "Plain Old Telephone Service",
    "definition": "The traditional analog telephone service still used in many environments for reliability."
  },
  {
    "id": 214,
    "acronym": "PPP",
    "expansion": "Point-to-Point Protocol",
    "definition": "A data link protocol used to establish a direct connection between two network nodes."
  },
  {
    "id": 215,
    "acronym": "PPTP",
    "expansion": "Point-to-Point Tunneling Protocol",
    "definition": "An older VPN protocol that encapsulates PPP frames; often combined with encryption protocols."
  },
  {
    "id": 216,
    "acronym": "PSK",
    "expansion": "Pre-shared Key",
    "definition": "A shared secret used in symmetric encryption and VPNs for authentication between parties."
  },
  {
    "id": 217,
    "acronym": "PTZ",
    "expansion": "Pan-tilt-zoom",
    "definition": "A feature in security cameras that allows remote control over viewing angles and zoom levels."
  },
  {
    "id": 218,
    "acronym": "PUP",
    "expansion": "Potentially Unwanted Program",
    "definition": "Software that may not be malicious but is often intrusive or unnecessary like adware or toolbars."
  },
  {
    "id": 219,
    "acronym": "RA",
    "expansion": "Recovery Agent",
    "definition": "A user or entity with the authority to restore encrypted data in case the original key is lost."
  },
  {
    "id": 220,
    "acronym": "RA",
    "expansion": "Registration Authority",
    "definition": "An entity that verifies user identity and forwards certificate requests to a Certificate Authority."
  },
  {
    "id": 221,
    "acronym": "RACE",
    "expansion": "Research and Development in Advanced Communications Technologies in Europe",
    "definition": "A European program that funded communication security innovations including cryptographic standards."
  },
  {
    "id": 222,
    "acronym": "RAD",
    "expansion": "Rapid Application Development",
    "definition": "A software development model that emphasizes quick prototyping and iterative feedback over long planning."
  },
  {
    "id": 223,
    "acronym": "RADIUS",
    "expansion": "Remote Authentication Dial-in User Service",
    "definition": "A centralized protocol for authentication authorization and accounting in remote access."
  },
  {
    "id": 224,
    "acronym": "RAID",
    "expansion": "Redundant Array of Inexpensive Disks",
    "definition": "A data storage method using multiple drives to improve performance or fault tolerance."
  },
  {
    "id": 225,
    "acronym": "RAS",
    "expansion": "Remote Access Server",
    "definition": "A server that allows remote users to connect to a network securely from offsite locations."
  },
  {
    "id": 226,
    "acronym": "RAT",
    "expansion": "Remote Access Trojan",
    "definition": "A type of malware that gives attackers unauthorized control over an infected computer."
  },
  {
    "id": 227,
    "acronym": "RBAC",
    "expansion": "Role-based Access Control",
    "definition": "A system of managing access where permissions are assigned based on user roles in the organization."
  },
  {
    "id": 228,
    "acronym": "RBAC",
    "expansion": "Rule-based Access Control",
    "definition": "A control model that applies predefined rules (like firewall or ACL policies) to determine access."
  },
  {
    "id": 229,
    "acronym": "RC4",
    "expansion": "Rivest Cipher version 4",
    "definition": "A widely used stream cipher in protocols like WEP and SSL now considered insecure."
  },
  {
    "id": 230,
    "acronym": "RDP",
    "expansion": "Remote Desktop Protocol",
    "definition": "A Microsoft protocol that allows users to remotely access and control a Windows computer."
  },
  {
    "id": 231,
    "acronym": "RFID",
    "expansion": "Radio Frequency Identifier",
    "definition": "A technology using electromagnetic fields to automatically identify and track tags on objects."
  },
  {
    "id": 232,
    "acronym": "RIPEMD",
    "expansion": "RACE Integrity Primitives Evaluation Message Digest",
    "definition": "A hash function developed as part of the European RACE project rarely used today."
  },
  {
    "id": 233,
    "acronym": "ROI",
    "expansion": "Return on Investment",
    "definition": "A metric used to evaluate the cost-effectiveness of a security solution by comparing benefits to costs."
  },
  {
    "id": 234,
    "acronym": "RPO",
    "expansion": "Recovery Point Objective",
    "definition": "The maximum acceptable amount of data loss measured in time used in disaster recovery planning."
  },
  {
    "id": 235,
    "acronym": "RSA",
    "expansion": "Rivest Shamir & Adleman",
    "definition": "A widely used asymmetric encryption algorithm known for secure data transmission."
  },
  {
    "id": 236,
    "acronym": "RTBH",
    "expansion": "Remotely Triggered Black Hole",
    "definition": "A network security technique that drops malicious traffic by routing it to a null interface."
  },
  {
    "id": 237,
    "acronym": "RTO",
    "expansion": "Recovery Time Objective",
    "definition": "The target time to restore systems and operations after a disruption or disaster."
  },
  {
    "id": 238,
    "acronym": "RTOS",
    "expansion": "Real-time Operating System",
    "definition": "An OS designed for real-time applications where consistent response time is critical."
  },
  {
    "id": 239,
    "acronym": "RTP",
    "expansion": "Real-time Transport Protocol",
    "definition": "A protocol used to deliver audio and video over IP networks often seen in VoIP systems."
  },
  {
    "id": 240,
    "acronym": "S/MIME",
    "expansion": "Secure/Multipurpose Internet Mail Extensions",
    "definition": "A protocol that provides email message encryption and digital signatures."
  },
  {
    "id": 241,
    "acronym": "SaaS",
    "expansion": "Software as a Service",
    "definition": "A cloud computing model where applications are delivered over the internet and maintained by a provider."
  },
  {
    "id": 242,
    "acronym": "SAE",
    "expansion": "Simultaneous Authentication of Equals",
    "definition": "A secure key exchange protocol used in WPA3 for Wi-Fi authentication."
  },
  {
    "id": 243,
    "acronym": "SAML",
    "expansion": "Security Assertions Markup Language",
    "definition": "An XML-based standard used for exchanging authentication and authorization data between parties."
  },
  {
    "id": 244,
    "acronym": "SAN",
    "expansion": "Storage Area Network",
    "definition": "A dedicated network that provides access to consolidated block-level data storage."
  },
  {
    "id": 245,
    "acronym": "SAN",
    "expansion": "Subject Alternative Name",
    "definition": "An extension in a digital certificate allowing multiple domain names to be associated with a single certificate."
  },
  {
    "id": 246,
    "acronym": "SASE",
    "expansion": "Secure Access Service Edge",
    "definition": "A cloud-delivered architecture that combines networking and security into one service."
  },
  {
    "id": 247,
    "acronym": "SCADA",
    "expansion": "Supervisory Control and Data Acquisition",
    "definition": "A control system used for industrial processes like power plants and water treatment."
  },
  {
    "id": 248,
    "acronym": "SCAP",
    "expansion": "Security Content Automation Protocol",
    "definition": "A set of standards for automating security configuration vulnerability checking and compliance."
  },
  {
    "id": 249,
    "acronym": "SCEP",
    "expansion": "Simple Certificate Enrollment Protocol",
    "definition": "A protocol that allows devices to automatically request digital certificates from a CA."
  },
  {
    "id": 250,
    "acronym": "SD-WAN",
    "expansion": "Software-defined Wide Area Network",
    "definition": "A virtual WAN architecture that provides more flexibility control and security over traditional WANs."
  },
  {
    "id": 251,
    "acronym": "SDK",
    "expansion": "Software Development Kit",
    "definition": "A collection of tools libraries and documentation developers use to build software applications"
  },
  {
    "id": 252,
    "acronym": "SDLC",
    "expansion": "Software Development Lifecycle",
    "definition": "A structured process for planning developing testing and deploying software systems."
  },
  {
    "id": 253,
    "acronym": "SDLM",
    "expansion": "Software Development Lifecycle Methodology",
    "definition": "A set of practices or frameworks (like Agile or Waterfall) for managing the SDLC process."
  },
  {
    "id": 254,
    "acronym": "SDN",
    "expansion": "Software-defined Networking",
    "definition": "An approach that separates the control plane from the data plane for flexible and programmable network management."
  },
  {
    "id": 255,
    "acronym": "SELinux",
    "expansion": "Security-enhanced Linux",
    "definition": "A Linux kernel security module that provides access control policies for enforcing mandatory access control."
  },
  {
    "id": 256,
    "acronym": "SED",
    "expansion": "Self-encrypting Drives",
    "definition": "Hard drives with built-in hardware encryption that automatically encrypt and decrypt data on the drive."
  },
  {
    "id": 257,
    "acronym": "SEH",
    "expansion": "Structured Exception Handler",
    "definition": "A Windows feature that handles unexpected system or application errors securely."
  },
  {
    "id": 258,
    "acronym": "SFTP",
    "expansion": "Secured File Transfer Protocol",
    "definition": "A secure version of FTP that uses SSH to encrypt file transfers and protect data in transit."
  },
  {
    "id": 259,
    "acronym": "SHA",
    "expansion": "Secure Hashing Algorithm",
    "definition": "A family of cryptographic hash functions used to ensure data integrity by producing a unique digest."
  },
  {
    "id": 260,
    "acronym": "SHTTP",
    "expansion": "Secure Hypertext Transfer Protocol",
    "definition": "An obsolete encryption method once used to secure HTTP traffic replaced by HTTPS (SSL/TLS)."
  },
  {
    "id": 261,
    "acronym": "SIEM",
    "expansion": "Security Information and Event Management",
    "definition": "A centralized solution for collecting analyzing and correlating security data in real time."
  },
  {
    "id": 262,
    "acronym": "SIM",
    "expansion": "Subscriber Identity Module",
    "definition": "A small chip in mobile devices that stores the subscriber's identity and enables cellular connectivity."
  },
  {
    "id": 263,
    "acronym": "SLA",
    "expansion": "Service-level Agreement",
    "definition": "A contract between a service provider and customer that outlines performance availability and responsibilities"
  },
  {
    "id": 264,
    "acronym": "SLE",
    "expansion": "Single Loss Expectancy",
    "definition": "The monetary loss expected from a single occurrence of a risk or threat event."
  },
  {
    "id": 265,
    "acronym": "SMB",
    "expansion": "Server Message Block",
    "definition": "A network protocol for sharing files printers and serial ports between nodes on a network."
  },
  {
    "id": 266,
    "acronym": "SMS",
    "expansion": "Short Message Service",
    "definition": "A text messaging service used in mobile devices sometimes leveraged in security notifications or MFA."
  },
  {
    "id": 267,
    "acronym": "SMTP",
    "expansion": "Simple Mail Transfer Protocol",
    "definition": "A protocol used to send email from clients to servers and between servers."
  },
  {
    "id": 268,
    "acronym": "SMTPS",
    "expansion": "Simple Mail Transfer Protocol Secure",
    "definition": "A secure version of SMTP using encryption (like TLS) for email transmission."
  },
  {
    "id": 269,
    "acronym": "SNMP",
    "expansion": "Simple Network Management Protocol",
    "definition": "A protocol used to monitor and manage devices on a network such as routers and switches."
  },
  {
    "id": 270,
    "acronym": "SOAP",
    "expansion": "Simple Object Access Protocol",
    "definition": "A protocol used for exchanging structured information in web services using XML."
  },
  {
    "id": 271,
    "acronym": "SOAR",
    "expansion": "Security Orchestration Automation Response",
    "definition": "A platform that integrates security tools to automate and streamline incident response."
  },
  {
    "id": 272,
    "acronym": "SoC",
    "expansion": "System on Chip",
    "definition": "A single chip that contains all components of a computer system commonly used in mobile and embedded systems."
  },
  {
    "id": 273,
    "acronym": "SOC",
    "expansion": "Security Operations Center",
    "definition": "A centralized team and facility that monitors and manages an organization's security posture."
  },
  {
    "id": 274,
    "acronym": "SOW",
    "expansion": "Statement of Work",
    "definition": "A formal document that outlines deliverables timelines and expectations for IT or security services."
  },
  {
    "id": 275,
    "acronym": "SPF",
    "expansion": "Sender Policy Framework",
    "definition": "An email validation system designed to prevent spoofing by verifying sender IPs."
  },
  {
    "id": 276,
    "acronym": "SPIM",
    "expansion": "Spam over Internet Messaging",
    "definition": "A form of unwanted or malicious content delivered through instant messaging platforms."
  },
  {
    "id": 277,
    "acronym": "SQL",
    "expansion": "Structured Query Language",
    "definition": "A standard language used for managing and querying databases."
  },
  {
    "id": 278,
    "acronym": "SQLi",
    "expansion": "SQL Injection",
    "definition": "A type of attack where malicious SQL code is inserted into input fields to access or manipulate a database."
  },
  {
    "id": 279,
    "acronym": "SRTP",
    "expansion": "Secure Real-Time Protocol",
    "definition": "A protocol used to deliver encrypted audio and video over IP enhancing VoIP security."
  },
  {
    "id": 280,
    "acronym": "SSD",
    "expansion": "Solid State Drive",
    "definition": "A fast and reliable data storage device with no moving parts commonly used in modern systems."
  },
  {
    "id": 281,
    "acronym": "SSH",
    "expansion": "Secure Shell",
    "definition": "A protocol that provides secure remote command-line access and encrypted data communication."
  },
  {
    "id": 282,
    "acronym": "SSL",
    "expansion": "Secure Sockets Layer",
    "definition": "An older encryption protocol used to secure web communications now deprecated in favor of TLS."
  },
  {
    "id": 283,
    "acronym": "SSO",
    "expansion": "Single Sign-on",
    "definition": "A user authentication process that allows access to multiple systems with one set of credentials."
  },
  {
    "id": 284,
    "acronym": "STIX",
    "expansion": "Structured Threat Information eXchange",
    "definition": "A standardized format for sharing threat intelligence across organizations."
  },
  {
    "id": 285,
    "acronym": "SWG",
    "expansion": "Secure Web Gateway",
    "definition": "A security solution that filters web traffic to prevent access to malicious websites and enforce policy."
  },
  {
    "id": 286,
    "acronym": "TACACS+",
    "expansion": "Terminal Access Controller Access Control System",
    "definition": "A legacy protocol that provides centralized authentication and authorization for remote access systems."
  },
  {
    "id": 287,
    "acronym": "TAXII",
    "expansion": "Trusted Automated eXchange of Indicator Information",
    "definition": "A DHS framework that automates the real-time exchange of cyber threat intelligence between organizations."
  },
  {
    "id": 288,
    "acronym": "TCP/IP",
    "expansion": "Transmission Control Protocol/Internet Protocol",
    "definition": "The foundational suite of communication protocols that governs how data is transmitted across networks."
  },
  {
    "id": 289,
    "acronym": "TGT",
    "expansion": "Ticket Granting Ticket",
    "definition": "A credential in Kerberos authentication used to obtain service tickets without needing to reauthenticate the user."
  },
  {
    "id": 290,
    "acronym": "TKIP",
    "expansion": "Temporal Key Integrity Protocol",
    "definition": "A security protocol used with WPA to improve WEP by rotating encryption keys dynamically."
  },
  {
    "id": 291,
    "acronym": "TLS",
    "expansion": "Transport Layer Security",
    "definition": "A cryptographic protocol that ensures privacy and data integrity between applications over a network."
  },
  {
    "id": 292,
    "acronym": "TOC",
    "expansion": "Time-of-check",
    "definition": "Refers to when a system checks a condition which may be manipulated if the condition changes before execution (TOCTOU vulnerability)."
  },
  {
    "id": 293,
    "acronym": "TOTP",
    "expansion": "Time-based One-time Password",
    "definition": "A temporary code generated using time and a secret key often used in two-factor authentication."
  },
  {
    "id": 294,
    "acronym": "TOU",
    "expansion": "Time-of-use",
    "definition": "Refers to when a resource is accessed or used which when mismatched with time-of- check may lead to race conditions."
  },
  {
    "id": 295,
    "acronym": "TPM",
    "expansion": "Trusted Platform Module",
    "definition": "A secure hardware chip used to store cryptographic keys and perform hardware-based encryption functions."
  },
  {
    "id": 296,
    "acronym": "TTP",
    "expansion": "Tactics Techniques and Procedures",
    "definition": "A cybersecurity framework describing how attackers operate and organize their behavior."
  },
  {
    "id": 297,
    "acronym": "TSIG",
    "expansion": "Transaction Signature",
    "definition": "A security mechanism used in DNS to authenticate the origin and integrity of a message."
  },
  {
    "id": 298,
    "acronym": "UAT",
    "expansion": "User Acceptance Testing",
    "definition": "A phase in the development cycle where end users test a system to ensure it meets requirements before final release."
  },
  {
    "id": 299,
    "acronym": "UAV",
    "expansion": "Unmanned Aerial Vehicle",
    "definition": "A drone that may pose a cybersecurity risk when equipped with surveillance or wireless scanning tools."
  },
  {
    "id": 300,
    "acronym": "UBA",
    "expansion": "User Behavior Analytics",
    "definition": "A method that monitors and analyzes user activity to detect anomalies that could indicate security threats."
  },
  {
    "id": 301,
    "acronym": "UDP",
    "expansion": "User Datagram Protocol",
    "definition": "A connectionless communication protocol used for fast data transmission but with no error correction."
  },
  {
    "id": 302,
    "acronym": "UEFI",
    "expansion": "Unified Extensible Firmware Interface",
    "definition": "A modern firmware interface that replaces BIOS and provides more features including secure boot."
  },
  {
    "id": 303,
    "acronym": "UEM",
    "expansion": "Unified Endpoint Management",
    "definition": "A centralized platform that manages and secures various endpoint devices like laptops smartphones and tablets."
  },
  {
    "id": 304,
    "acronym": "UPS",
    "expansion": "Uninterruptible Power Supply",
    "definition": "A device that provides backup power during outages and helps protect systems from sudden shutdowns."
  },
  {
    "id": 305,
    "acronym": "URI",
    "expansion": "Uniform Resource Identifier",
    "definition": "A general identifier used to locate or identify resources on the internet including URLs and URNs."
  },
  {
    "id": 306,
    "acronym": "URL",
    "expansion": "Universal Resource Locator",
    "definition": "A specific type of URI that provides the address to access resources on the internet (e.g. https://example.com)."
  },
  {
    "id": 307,
    "acronym": "USB",
    "expansion": "Universal Serial Bus",
    "definition": "A common interface used to connect peripherals to computers; can be a vector for malware if unmanaged."
  },
  {
    "id": 308,
    "acronym": "USB OTG",
    "expansion": "USB On the Go",
    "definition": "A USB technology that allows mobile devices to act as hosts potentially expanding attack surfaces."
  },
  {
    "id": 309,
    "acronym": "UTM",
    "expansion": "Unified Threat Management",
    "definition": "A security solution that integrates multiple features (e.g. firewall antivirus IDS) into a single appliance"
  },
  {
    "id": 310,
    "acronym": "UTP",
    "expansion": "Unshielded Twisted Pair",
    "definition": "A common Ethernet cable type that is vulnerable to electromagnetic interference if not properly shielded."
  },
  {
    "id": 311,
    "acronym": "VBA",
    "expansion": "Visual Basic for Applications",
    "definition": "A Microsoft programming language often used in scripts or applications potentially exploitable if not securely coded."
  },
  {
    "id": 312,
    "acronym": "VDE",
    "expansion": "Virtual Desktop Environment",
    "definition": "A user interface that runs on a virtual machine providing access to desktop OS and apps remotely"
  },
  {
    "id": 313,
    "acronym": "VDI",
    "expansion": "Virtual Desktop Infrastructure",
    "definition": "A centralized server-based solution delivering virtual desktops to users over a network."
  },
  {
    "id": 314,
    "acronym": "VLAN",
    "expansion": "Virtual Local Area Network",
    "definition": "A logical grouping of devices on a network segmented by function or department improving security."
  },
  {
    "id": 315,
    "acronym": "VLSM",
    "expansion": "Variable Length Subnet Masking",
    "definition": "A technique that uses subnet masks of different lengths to allocate IP addresses more efficiently."
  },
  {
    "id": 316,
    "acronym": "VM",
    "expansion": "Virtual Machine",
    "definition": "A software-emulated computer system that runs an OS and apps independently of the physical host system."
  },
  {
    "id": 317,
    "acronym": "VoIP",
    "expansion": "Voice over IP",
    "definition": "A technology that allows voice communication over internet protocols which must be secured to prevent eavesdropping."
  },
  {
    "id": 318,
    "acronym": "VPC",
    "expansion": "Virtual Private Cloud",
    "definition": "A private cloud hosted within a public cloud provider's infrastructure giving isolated and secure computing resources."
  },
  {
    "id": 319,
    "acronym": "VPN",
    "expansion": "Virtual Private Network",
    "definition": "A secure connection over the internet that encrypts data between a user and a private network."
  },
  {
    "id": 320,
    "acronym": "VTC",
    "expansion": "Video Teleconferencing",
    "definition": "The transmission of audio and video between remote users often targeted for eavesdropping or exploitation."
  },
  {
    "id": 321,
    "acronym": "WAF",
    "expansion": "Web Application Firewall",
    "definition": "A security filter that monitors and blocks malicious traffic targeting web applications."
  },
  {
    "id": 322,
    "acronym": "WAP",
    "expansion": "Wireless Access Point",
    "definition": "A device that connects wireless clients to a wired network extending connectivity and requiring proper security configuration."
  },
  {
    "id": 323,
    "acronym": "WEP",
    "expansion": "Wired Equivalent Privacy",
    "definition": "An outdated and insecure encryption protocol used in early wireless networks replaced by WPA/WPA2."
  },
  {
    "id": 324,
    "acronym": "WIDS",
    "expansion": "Wireless Intrusion Detection System",
    "definition": "A system that monitors wireless traffic to detect suspicious activity or policy violations."
  },
  {
    "id": 325,
    "acronym": "WIPS",
    "expansion": "Wireless Intrusion Prevention System",
    "definition": "An extension of WIDS that actively blocks malicious wireless activity or rogue devices."
  },
  {
    "id": 326,
    "acronym": "WO",
    "expansion": "Work Order",
    "definition": "A formal document detailing tasks approvals and responsibilities for changes or maintenance in IT operations."
  },
  {
    "id": 327,
    "acronym": "WPA",
    "expansion": "Wi-Fi Protected Access",
    "definition": "A wireless security protocol that improves on WEP by using stronger encryption and key management."
  },
  {
    "id": 328,
    "acronym": "WPS",
    "expansion": "Wi-Fi Protected Setup",
    "definition": "A method of connecting devices to Wi-Fi easily but often disabled due to known security vulnerabilities."
  },
  {
    "id": 329,
    "acronym": "WTLS",
    "expansion": "Wireless TLS",
    "definition": "The use of TLS encryption in wireless networks to secure data in transit and protect against sniffing or tampering."
  },
  {
    "id": 330,
    "acronym": "XDR",
    "expansion": "Extended Detection and Response",
    "definition": "A cybersecurity approach that integrates threat data across endpoints networks and servers for holistic response."
  },
  {
    "id": 331,
    "acronym": "XML",
    "expansion": "Extensible Markup Language",
    "definition": "A flexible format for storing and transporting structured data often used in web and security applications"
  },
  {
    "id": 332,
    "acronym": "XOR",
    "expansion": "Exclusive Or",
    "definition": "A logical operation used in cryptography where output is true if inputs differ commonly used in stream ciphers."
  },
  {
    "id": 333,
    "acronym": "XSRF",
    "expansion": "Cross-site Request Forgery",
    "definition": "A web attack that tricks users into performing unwanted actions on authenticated websites."
  },
  {
    "id": 334,
    "acronym": "XSS",
    "expansion": "Cross-site Scripting",
    "definition": "A web vulnerability where attackers inject malicious scripts into websites viewed by other users."
  }
];
