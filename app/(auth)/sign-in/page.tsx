import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              card: "bg-slate-900 border border-white/10",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-slate-800 border border-white/10 text-white",
              socialButtonsBlockButtonText: "text-slate-200",
              dividerLine: "bg-white/10",
              dividerText: "text-slate-400",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-950 border border-white/10 text-white",
              formButtonPrimary: "bg-brand-500 hover:bg-brand-400 text-slate-900",
              footerActionText: "text-slate-400",
              footerActionLink: "text-brand-400",
            },
          }}
        />
      </div>
    </div>
  );
}
