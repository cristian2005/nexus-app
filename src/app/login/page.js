import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold text-white text-center">Iniciar Sesión</h1>
      <p className="mt-2 text-center text-slate-400">
        Accede a tu cuenta para reservar espacios
      </p>

      <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <LoginForm />
      </div>
    </div>
  );
}