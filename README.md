📘 SubTrack - SaaS 구독 관리 플랫폼


1. 📌 프로젝트 소개

SubTrack은 다양한 구독형 SaaS 서비스를 하나의 대시보드에서 통합 관리할 수 있는 구독 관리 플랫폼입니다.
Stripe 결제를 기반으로 사용자는 요금제를 선택하고 구독 상태를 확인할 수 있으며, 관리자는 요금제를 생성/수정/삭제할 수 있습니다.

2. 💡 주요 기능

사용자 기능

구독 요금제 목록 확인

Stripe를 통한 요금제 결제

현재 내 구독 상태 확인

구독 취소 기능

관리자 기능

요금제 생성, 수정, 삭제

관리자 전용 요금제 관리 페이지 접근

Stripe 연동

결제 완료 시 Webhook을 통해 구독 정보 자동 저장

3. 🛠 기술 스택
   
Frontend: Next.js 13 (App Router), TailwindCSS

Backend: NestJS

ORM: Prisma

Database: MongoDB Atlas

Authentication: JWT (NestJS), OAuth (NextAuth - GitHub)

Payment: Stripe

Deployment: Railway (Backend), Vercel (Frontend)
