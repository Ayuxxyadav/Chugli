"use client";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content: "By accessing or using BeeChat, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."
    },
    {
      title: "2. User Accounts",
      content: "When you create an account, you must provide accurate and complete information. You are responsible for safeguarding your password and for all activities that occur under your account."
    },
    {
      title: "3. Private Rooms & Conduct",
      content: "BeeChat provides private rooms for communication. You agree not to use the service for any illegal purposes, harassment, or distribution of harmful content. We reserve the right to terminate accounts that violate these rules."
    },
    {
      title: "4. Service Availability",
      content: "We strive for zero lag and 24/7 uptime, but we do not guarantee that the service will be uninterrupted or error-free. We may modify or discontinue features at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-25 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of <span className="text-blue-500">Service</span></h1>
        <p className="mb-12 text-zinc-500">Last updated: December 2025</p>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-semibold text-white mb-3">{s.title}</h2>
              <p className="leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500">Questions about our Terms? Contact us at support@beechat.com</p>
        </div>
      </div>
    </div>
  );
}