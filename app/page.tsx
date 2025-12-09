"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, FileText, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Data
const skills = [
  // Frontend
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript", type: "tech" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript", type: "tech" },
  { name: "React", logo: "https://cdn.simpleicons.org/react", type: "tech" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs", type: "tech" },
  { name: "Redux", logo: "https://cdn.simpleicons.org/redux", type: "tech" },
  { name: "Angular", logo: "https://cdn.simpleicons.org/angular", type: "tech" },
  { name: "Ionic", logo: "https://cdn.simpleicons.org/ionic", type: "tech" },
  // Backend
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs", type: "tech" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express", type: "tech" },
  { name: "REST APIs", logo: "Globe", type: "icon" },
  { name: "Microservices", logo: "Server", type: "icon" },
  // Database
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", type: "tech" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb", type: "tech" },
  { name: "CouchDB", logo: "https://cdn.simpleicons.org/apachecouchdb", type: "tech" },
  { name: "Elasticsearch", logo: "https://cdn.simpleicons.org/elasticsearch", type: "tech" },
  // DevOps / Cloud
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker", type: "tech" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes", type: "tech" },
  { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform", type: "tech" },
  { name: "AWS (EC2, S3, Lambda)", logo: "https://cdn.simpleicons.org/amazonaws", type: "tech" },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions", type: "tech" },
  { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins", type: "tech" },
  { name: "Travis CI", logo: "https://cdn.simpleicons.org/travisci", type: "tech" },
  // General
  { name: "System Design", logo: "Layout", type: "icon" },
  { name: "API Design", logo: "Code", type: "icon" },
  { name: "Agile", logo: "Users", type: "icon" },
];

const experience = [
  {
    company: "AirFi Aviation",
    role: "Associate Lead Engineer",
    date: "2022 - Present",
    description: [
      "Architected a high-scale voucher system generating 1M+ voucher codes per month for use across 400+ flights.",
      "Managed agile ceremonies including sprint planning, stand-ups, reviews, and retrospectives.",
      "Migrated legacy AngularJS modules to React & Next.js, implementing SSG to reduce initial load time from 7 to 2.3 seconds.",
      "Optimized CI/CD pipelines using GitHub Actions and Travis CI, reducing build time to 8 minutes 30 seconds.",
      "Built and deployed RESTful APIs in TypeScript for third-party mobile apps, integrated DRM-based video streaming for secure entertainment delivery."
    ],
    logo: "/logos/airfi.jpg",
    initials: "AF"
  },
  {
    company: "Zigram",
    role: "Senior Software Engineer",
    date: "2021 - 2022",
    description: [
      "Engineered backend consolidation workflows to process 5M+ user profiles, improving data indexing and query speeds.",
      "Improved a full-stack expert research platform using Angular 7, Node.js, PostgreSQL, and ElasticSearch.",
      "Designed reusable, scalable UI components and complex user workflows."
    ],
    logo: "/logos/zigram.png",
    initials: "ZG"
  },
  {
    company: "TCS - R&I",
    role: "Systems Engineer",
    date: "2019 - 2021",
    description: [
      "Built dynamic Angular dashboards for a leading U.S. glass manufacturer, optimized website initial load time from 8.5 to 2 seconds.",
      "Implemented Jenkins CI/CD pipelines, reducing build and deployment time from 42 to 7 minutes using optimized Docker builds and automated scripting."
    ],
    logo: "/logos/tcs.png",
    initials: "TC"
  },
  {
    company: "Udacity",
    role: "Mentor & Reviewer",
    date: "2018 - 2021",
    description: [
      "Mentored 100+ students from Fullstack Javascript and Cloud Nanodegree throughout their journey.",
      "Helped them with their projects, provided guidance on problem-solving solutions, and mentored them through their nanodegree program.",
      "Provided 1:1 live chat support to students from Front-End Web Developer Nanodegree Program.",
      "Assisted students with doubts, projects, and conceptual approaches to problem-solving."
    ],
    logo: "/logos/udacity.png",
    initials: "UD"
  }
];

const recommendations = [
  {
    name: "Rohit Malaviya",
    role: "Head of Technology | VP | MD - India at AirFi AERO",
    text: "I had the opportunity to work with Shubham, and he was consistently one of the most senior reliable developers on the team... A steady, thoughtful, and committed developer.",
    initials: "RM"
  },
  {
    name: "Taskin Karlar",
    role: "2x Founder & CTO | Building AI Infra",
    text: "Shubham is a dedicated and technologically-savvy engineer. Shubham worked directly with us on a few projects that required a high level of technical skill. Working remotely with us, he had no issues in communicating with the team.",
    initials: "TK"
  },
  {
    name: "Monica Savanovic",
    role: "Business Success Manager",
    text: "Shubham was a great person to work with! Always presenting a great deal of passion and honesty in his work ethic. Despite having to work remotely, Shubham always delivered and communicated efficiently.",
    initials: "MS"
  },
  {
    name: "Laura M.",
    role: "Customer Success Manager at AirFi",
    text: "I’m happy to recommend Shubham... His ability to remain composed in high-pressure situations and deliver thoughtful solutions impressed me. I’m confident that he will continue to excel wherever he goes.",
    initials: "LM"
  },
  {
    name: "Aatif Shaikh",
    role: "Staff Engineer | Fullstack Lead at AirFi",
    text: "I highly recommend Shubham as a developer and as a person. His ability to swiftly solve even the most complex problems is truly admirable. He excels in frontend development with React and Next.js, and is equally proficient in backend technologies.",
    initials: "AS"
  },
  {
    name: "Anjani Prakash",
    role: "Associate Lead Engineer - Cloud at AirFi",
    text: "I had the pleasure of working side by side with Shubham... he is one of the most dedicated and technically skilled software engineers I've worked with. He consistently delivers high-quality work, approaches complex challenges with clarity and efficiency.",
    initials: "AP"
  },
  {
    name: "Ranjan Kale",
    role: "Sr. SDET at AirFi.aero",
    text: "Shubham is a highly capable full-stack JavaScript developer who consistently delivers quality work. He's strong in both frontend and backend development, communicates clearly, and approaches every task with ownership.",
    initials: "RK"
  },
   {
    name: "Alister Cabral",
    role: "Senior Software Engineer at Quartzy",
    text: "I had the pleasure of working with Shubham for over a year... He consistently delivered high-quality work, approached challenges with determination, and upheld strong professional ethics throughout.",
    initials: "AC"
  },
   {
    name: "Wesley de Louw",
    role: "Marketing Representative",
    text: "Shubham is an outstanding software engineer with an eye for detail and a heart for his colleagues. Shubham was always at the forefront of assisting his colleagues wherever needed and consistently provided remarkable quality work.",
    initials: "WL"
  },
  {
    name: "Shubham Kumar",
    role: "Senior Software Engineer",
    text: "I highly recommend Shubham as a software engineer... it's clear he is an exceptional developer with strong technical depth and equally strong personal qualities. Shubham consistently delivers clean, maintainable, well-structured code.",
    initials: "SK"
  },
  {
    name: "Rohit Goel",
    role: "SAP Integration Consultant",
    text: "Shubham is a highly motivated and technically sound UI developer. He developed user interfaces for few high complex applications. He is a very nice guy to work with!",
    initials: "RG"
  }
];

const projects = [
  {
    title: "Stay-Inn",
    description: "Hotel Booking App with Ionic 3 & Firestore.",
    link: "http://hotel-app-a53e7.firebaseapp.com/",
    image: "/projects/stayinn.png"
  },
  {
    title: "AutoDeploy",
    description: "Modern CI/CD pipeline implementation.",
    link: "https://github.com/shubham16598/CICD-Autodeploy",
    image: "/projects/autodeploy.png"
  },
  {
    title: "Vidjot",
    description: "Idea management app with heavy backend logic.",
    link: "https://pure-bastion-84144.herokuapp.com/",
    image: "/projects/vidjot.png"
  },
   {
    title: "MovieWall",
    description: "Movie discovery web application.",
    link: "https://github.com/shubham16598/MovieWall",
    image: "/projects/moviewall.jpeg"
  }
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 backdrop-blur-md bg-background/80 max-w-5xl mx-auto left-0 right-0">
        {/* Logo or Home Link for mobile realignment if needed, or keeping centered list */}
        <div className="flex-1 hidden sm:block">
          <Link href="/" className="font-bold text-xl tracking-tight font-serif">ssk.</Link>
        </div>

        <ul className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-muted-foreground mx-auto">
          <li>
            <Link href="#" className="hover:text-foreground transition-colors">home</Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-foreground transition-colors">projects</Link>
          </li>
          <li>
            <Link href="#recommendations" className="hover:text-foreground transition-colors">recommendations</Link>
          </li>
          <li>
            <Link href="mailto:shubham16598@gmail.com" className="hover:text-foreground transition-colors">contact</Link>
          </li>
        </ul>

        <div className="flex-1 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        
        {/* Header / Hero */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-12 mb-32"
        >
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl font-serif text-foreground">
              hi, shubham here <span className="inline-block animate-wave origin-bottom-right">👋</span>
            </h1>
            
            <div className="space-y-4 max-w-2xl">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am a full-stack software engineer with 6+ years of experience architecting high-scale full-stack systems and optimizing developer workflows. I specialize in the JavaScript ecosystem (React, Next.js, Node.js) and Cloud DevOps (AWS, Docker, Kubernetes).
                Currently architecting offline-first media platforms at <span className="font-semibold text-foreground">AirFi</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I love open source, trekking 🏔️, and stargazing 🌟.
              </p>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
               {/* Resume Button */}
              <Button asChild className="rounded-full h-11 px-6 bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md group">
                <Link href="/Shubham_Singh_Resume.pdf" target="_blank">
                  Resume <FileText className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4 px-2">
                <Link href="https://www.linkedin.com/in/shubham16598/" target="_blank" className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 p-2">
                  <Linkedin size={24} />
                </Link>
                <Link href="https://github.com/shubham16598" target="_blank" className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 p-2">
                  <Github size={24} />
                </Link>
                <Link href="mailto:shubham16598@gmail.com" className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 p-2">
                  <Mail size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Rotated Image Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl rotate-6 scale-95 opacity-50 blur-sm transition-transform group-hover:rotate-12 duration-500" />
            <div className="relative h-48 w-48 sm:h-60 sm:w-60 overflow-hidden rounded-3xl border-4 border-background shadow-2xl rotate-3 transition-transform group-hover:rotate-6 duration-500">
              <Image
                src="/image.jpeg"
                alt="Shubham Singh Kalyanwat"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-32">
          {/* Main Content Column (Experience) */}
          <div className="lg:col-span-2 space-y-24">
             {/* Experience Tab-style Header */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-8 mb-12 border-b border-border/40 pb-4">
                 <h2 className="text-2xl font-serif font-bold text-foreground border-b-2 border-foreground pb-4 -mb-4.5 px-2">
                   Work Experience
                 </h2>
                 {/* Placeholder for Education if added later */}
                 {/* <h2 className="text-xl font-serif font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-2">Education</h2> */}
              </div>

              <div className="space-y-16">
                {experience.map((job, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <Avatar className="h-14 w-14 border border-border mt-1 shrink-0 shadow-sm bg-white">
                      <AvatarImage src={job.logo} alt={job.company} className="object-cover" />
                      <AvatarFallback className="text-sm bg-secondary">{job.initials}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                       <div className="flex items-center justify-between mb-1">
                         <h3 className="text-xl font-bold text-foreground font-serif leading-tight">{job.company}</h3>
                         <span className="text-xs font-medium text-muted-foreground bg-secondary/20 px-3 py-1 rounded-full whitespace-nowrap ml-2">{job.date}</span>
                       </div>
                       <div className="text-base font-medium text-primary/90">{job.role}</div>
                       <ul className="list-disc list-outside ml-4 space-y-1.5 text-muted-foreground/90 leading-relaxed text-sm pt-1">
                         {Array.isArray(job.description) ? (
                           job.description.map((desc, i) => (
                             <li key={i} className="pl-1 marker:text-muted-foreground/40">{desc}</li>
                           ))
                         ) : (
                           <li>{job.description}</li>
                         )}
                       </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar Column (Skills) */}
          <div className="lg:col-span-1">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-32"
            >
              <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground font-sans">My Toolkit</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill.name} variant="outline" className="flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-sm hover:bg-secondary/50 transition-colors cursor-default border-border/60 bg-background/50 backdrop-blur-sm">
                 {skill.type === "tech" && (
                   <img src={skill.logo} alt={skill.name} className="w-4 h-4 object-contain" />
                 )}
                 {skill.type === "icon" && (
                      skill.logo === "Globe" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe w-4 h-4 text-blue-500"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> :
                      skill.logo === "Server" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server w-4 h-4 text-green-500"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg> :
                      skill.logo === "Layout" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout w-4 h-4 text-purple-500"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg> :
                      skill.logo === "Code" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code w-4 h-4 text-orange-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> :
                      skill.logo === "Users" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4 text-indigo-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> : null
                 )}
                {skill.name}
              </Badge>
            ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Recommendations - Masonry Grid */}
        <motion.section
          id="recommendations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-32"
        >
           <h2 className="mb-10 text-2xl font-serif font-bold text-foreground">Recommendations</h2>
           <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="break-inside-avoid rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-border/80 relative">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10 border border-border/50">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">{rec.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-foreground text-sm font-sans">{rec.name}</h3>
                    <p className="text-xs text-muted-foreground">{rec.role}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed relative z-10">
                  {rec.text}
                </p>
              </div>
            ))}
           </div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="mb-10 text-2xl font-serif font-bold text-foreground">Selected Works</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <Link
                key={idx}
                href={project.link}
                target="_blank"
                className="group block space-y-4"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-border/50 ring-1 ring-border/50 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-lg font-serif group-hover:underline decoration-border underline-offset-4 transition-all">{project.title}</h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Shubham Singh Kalyanwat.</p>
          <div className="flex gap-6">
               <Link href="https://github.com/shubham16598" className="hover:text-foreground transition-colors">GitHub</Link>
               <Link href="https://www.linkedin.com/in/shubham16598/" className="hover:text-foreground transition-colors">LinkedIn</Link>
               <Link href="mailto:shubham16598@gmail.com" className="hover:text-foreground transition-colors">Email</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
