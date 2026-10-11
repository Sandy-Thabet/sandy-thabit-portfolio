import { ai } from "hatchable";

export const access = "public";
export const methods = ["POST"];

const facts = `Sandy Thabit is a Backend Developer from Cairo, Egypt. She studies Business Administration at Helwan University, expected 2027. She originally wanted to study Computer Science at university, but her academic background did not allow a CS program; she self-studied computer science and programming and turned that learning into internships, certifications, freelance work and real backend work.

Core stack: Node.js, TypeScript, JavaScript, ExpressJS, NestJS, Prisma, Mongoose, PostgreSQL, Redis, Socket.IO, Pusher, JWT, Docker, AWS EC2/S3/SES, Vercel, Render, GitHub, GitLab, Postman, Apidog.

FEVER: multi-tenant sports SaaS. Backend Developer, part-time, Jul 2025-Sep 2026. Built backend functionality for Academy/Admin, Coach, Parent and Player experiences. Worked with NestJS, TypeScript, Prisma, PostgreSQL, RBAC and PostgreSQL Row-Level Security for tenant isolation. Coach app is live on Google Play.

Akhysai (Techy): healthcare platform, Backend Developer, freelance, Jun 2025-May 2026. Three apps: Patient, Doctor, Admin. Built APIs for appointments, evaluations, bookings and sessions; JWT + Google/Facebook OAuth; Socket.IO realtime; Twilio doctor-patient communication; PostgreSQL + Prisma.

CamRent: camera rental e-commerce, freelance, Jun 2025-Jan 2026. Guest cart and wishlist with sync after login, Algolia AI search with caching, AWS S3 optimization. AI/search was a product capability integrated into the backend; Sandy did not build AI models and is not an AI engineer.

Kawi: short-video platform, Aug 2024-Oct 2025. Backend architecture, Pusher real-time likes/comments, AWS S3 video upload/playback optimization, PostgreSQL/Prisma.

AI-assisted engineering: Sandy is NOT learning AI as a specialization. She uses AI as a tool to help implement features she has already planned and defined. Her process is Define -> Set standards -> AI-assisted implementation -> Review -> Test -> Ship. She defines requirements, standards, architecture and constraints, then reviews, tests, validates and improves or rejects the AI-generated work. She remains responsible for engineering decisions and final code.

Cybersecurity: currently taking a Cybersecurity Diploma with Route Academy. She is building cybersecurity knowledge to strengthen her backend engineering; she should not be described as a cybersecurity professional.

Answer only from these facts. Never invent metrics, users, revenue, responsibilities, technologies or dates. If information is not covered, say so. Speak to recruiters in concise, confident 1-4 sentence answers. `;

export default async function(req,res){
  const question=req.body?.question;
  if(!question || typeof question!=="string" || question.length>1000)return res.status(400).json({error:"Please enter a question up to 1000 characters."});
  try{
    const result=await ai.generateText({model:"sonnet",purpose:"portfolio-assistant",system:"You are Ask Sandy, an assistant on Sandy Thabit's portfolio.\n\nFACTS:\n"+facts,prompt:question,maxTokens:450});
    if(result.finishReason==="length")return res.status(502).json({error:"The response was truncated. Please ask a shorter question."});
    return res.json({answer:result.text});
  }catch(e){
    const q=question.toLowerCase();
    const fallback=[
      ["fever","FEVER is a multi-tenant sports SaaS platform. Sandy worked on backend functionality for Academy/Admin, Coach, Parent and Player experiences, using NestJS, TypeScript, Prisma, PostgreSQL, RBAC and PostgreSQL Row-Level Security."],
      ["ai","Sandy uses AI as an engineering tool, not a specialization. She defines the feature, standards, architecture and constraints, uses AI to assist implementation, then personally reviews, tests, validates and improves or rejects the result."],
      ["security","Sandy has backend security experience with JWT, OAuth, RBAC and PostgreSQL Row-Level Security for tenant isolation at FEVER. She is also currently studying a Cybersecurity Diploma with Route Academy."],
      ["akhysai","Akhysai is a three-app healthcare platform for Patient, Doctor and Admin. Sandy worked on appointments, evaluations, bookings, sessions, JWT, Google/Facebook OAuth, Socket.IO, Twilio, PostgreSQL and Prisma."],
      ["camrent","CamRent is a camera-rental e-commerce backend. Sandy implemented guest cart/wishlist flows, guest-to-user synchronization, Algolia AI search with caching, and AWS S3 optimization."],
      ["kawi","Kawi is a short-video backend where Sandy worked on architecture, Pusher real-time interactions, PostgreSQL/Prisma and AWS S3 video upload/playback."],
      ["computer science","Sandy originally wanted to study Computer Science, but her academic background did not allow a CS university program. She self-studied computer science and backend engineering and turned that learning into real projects and professional experience."]
    ];
    const hit=fallback.find(([key])=>q.includes(key));
    if(hit) return res.json({answer:hit[1],fallback:true});
    return res.json({answer:"I can answer questions about Sandy's FEVER, Akhysai, CamRent and Kawi work, her backend stack, her AI-assisted engineering workflow, her Computer Science self-learning path, or her cybersecurity studies.",fallback:true});
  }
}