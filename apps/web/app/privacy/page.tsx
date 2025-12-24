"use client";

export default function PrivacyPage() {
  const policies = [
    {
      title: "Data We Collect",
      content: "We only collect minimal information required for service functionality: your name, email address, and authentication data. We do not read your private messages."
    },
    {
      title: "How We Use Data",
      content: "Your data is used to manage your account, provide real-time messaging features, and maintain the security of your private rooms."
    },
    {
      title: "Real-Time Security",
      content: "Messages are transmitted via secure WebSockets. We implement industry-standard encryption to ensure your conversations stay between you and your invited members."
    },
    {
      title: "Third-Party Sharing",
      content: "BeeChat does not sell, trade, or rent your personal identification information to others. We are 100% ad-free and privacy-focused."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-25 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy <span className="text-blue-500">Policy</span></h1>
        <p className="mb-12 text-zinc-500">Your privacy is our top priority. Last updated: December 2025</p>

        <div className="space-y-10">
          {policies.map((p) => (
            <section key={p.title} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/30">
              <h2 className="text-xl font-semibold text-white mb-3">{p.title}</h2>
              <p className="leading-relaxed">{p.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 italic">"Built for privacy, powered by BeeChat."</p>
        </div>
      </div>
    </div>
  );
}