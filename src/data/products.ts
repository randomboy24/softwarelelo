import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod_win11pro",
    name: "Windows 11 Pro",
    price: 4725,
    description: "Upgrade your productivity with Windows 11 Pro. Experience a fresh perspective with a new look, enhanced security features, and a suite of powerful tools designed for modern professionals.",
    features: ["BitLocker device encryption", "WIP (Windows Information Protection)", "Hyper-V", "Windows Sandbox", "Remote Desktop"],
    badge: "BESTSELLER",
    category: "Operating System",
    licenseType: "Lifetime License",
    image: "/images/windows_11_pro.png"
  },
  {
    id: "prod_office2024",
    name: "Office 2024 Email Linked",
    price: 7500,
    description: "The classic apps you know and love, built for today's dynamic work environment. Link directly to your email account for seamless integration and cloud synchronization.",
    features: ["Word, Excel, PowerPoint", "Outlook integrated", "OneNote included", "Email-linked activation", "PC/Mac support"],
    badge: "HOT DEAL",
    category: "Productivity",
    licenseType: "One-Time Purchase",
    image: "/images/office_2024.png"
  },
  {
    id: "prod_office365",
    name: "Office 365",
    price: 4499,
    description: "Your complete toolkit for personal and professional growth. Office 365 includes premium Office apps, extra cloud storage, advanced security, and more.",
    features: ["1TB OneDrive Cloud Storage", "Premium Desktop Apps", "Advanced Security", "Cross-device sync", "Constant updates"],
    badge: "",
    category: "Productivity",
    licenseType: "Annual Subscription",
    image: "/images/office_365.png"
  },
  {
    id: "prod_qhtotalsec",
    name: "Quick Heal Total Security",
    price: 1699,
    description: "Comprehensive protection for your devices. Secure your online presence, protect against ransomware, malware, and unknown threats with Quick Heal's award-winning security suite.",
    features: ["Ransomware Protection", "Safe Banking", "Parental Control", "Data Theft Protection", "Web Tracker Blocker"],
    badge: "ESSENTIAL",
    category: "Security",
    licenseType: "1 Year License",
    image: "/images/quick_heal.png"
  },
  {
    id: "prod_mcafee",
    name: "McAfee Total Protection",
    price: 675,
    description: "All-in-one digital protection. Defend your data, privacy, and personal info across your devices with top-tier antivirus software and secure VPN.",
    features: ["Award-Winning Antivirus", "Secure VPN", "Performance Optimization", "Password Manager", "Safe Web Browsing"],
    badge: "VALUE PACK",
    category: "Security",
    licenseType: "1 Year License",
    image: "/images/mcafee.png"
  },
  {
    id: "prod_win10pro",
    name: "Windows 10 Pro",
    price: 4959,
    description: "The familiar and reliable OS for business and power users. Built-in security features, comprehensive remote access, and all the tools you need to get work done.",
    features: ["BitLocker", "Domain Join", "Group Policy Management", "Remote Desktop", "Assigned Access"],
    badge: "",
    category: "Operating System",
    licenseType: "Lifetime License",
    image: "/images/windows_10_pro.png"
  }
];
